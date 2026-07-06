Working with Files and Bind Mounts
==================================

This page explains how files are used from inside Apptainer containers.
Apptainer containers do not behave like fully separate virtual machines. They
can see selected host directories through bind mounts.

Default File Access
-------------------

Apptainer usually makes some host directories available inside the container at
runtime. Common examples include the current working directory,
``/nethome/$USER``, and ``/tmp``.

.. note::

   On IDSC systems, keep large datasets and job outputs in project or scratch
   storage rather than in your home directory. The home directory is useful for
   scripts, small files, and configuration files, but it is not the best place
   for large container inputs or outputs.

   Common locations include:

   * ``/nethome/$USER`` for home-directory files
   * ``/scratch/projects/<project>/$USER`` for scratch or project work
   * project-specific storage paths provided by IDSC

This means that a file created on the host can often be read from inside the
container.

Create a test file on the host:

::

   echo "Hello from the host" > hostfile.txt

Read it from inside the container:

::

   apptainer exec alpine_latest.sif cat hostfile.txt

If the file is in your current directory, Apptainer can usually access it
because the current directory is bind mounted into the container.

Run a Host Script Inside a Container
------------------------------------

Scripts stored on the host can be executed with software inside the container.
For example, create a small Python script:

::

   cat > pyscript.py <<'EOF'
   a = 1.5
   b = 6.3
   print(f"The sum of {a} and {b} is {a + b}")
   EOF

Run the script using a Python container:

::

   apptainer exec python_latest.sif python3 pyscript.py

This is a common pattern for running analysis scripts through Apptainer.

Writing Output Files
--------------------

When a container writes to a bind-mounted host directory, the output file is
created on the host.

Example:

::

   apptainer exec alpine_latest.sif sh -c 'echo "Created from inside the container" > output.txt'
   cat output.txt

The command runs inside the container, but ``output.txt`` is saved in the host
working directory.

Custom Bind Mounts
------------------

Use ``--bind`` when you need to make an additional host directory available
inside the container.

The general format is:

::

   apptainer exec --bind /host/path:/container/path image.sif command

Example:

::

   mkdir -p data
   echo "Input data" > data/input.txt
   apptainer exec --bind ./data:/mnt alpine_latest.sif cat /mnt/input.txt

In this example, the host directory ``./data`` is mounted as ``/mnt`` inside the
container.

.. important::

   Bind mounts do not bypass host file permissions. If you cannot read, write,
   or execute a file on the host, the container will not give you extra access
   to that file.

You can also bind more than one directory:

::

   apptainer exec --bind ./data:/data,./results:/results image.sif command

Read-Only Bind Mounts
^^^^^^^^^^^^^^^^^^^^^

Use ``:ro`` when a directory should be visible inside the container but should
not be modified by the container.

Example:

::

   apptainer exec --bind /path/to/input:/input:ro image.sif command

This is useful for reference data, shared datasets, or inputs that should not be
changed by a workflow.

Using ``APPTAINER_BIND``
^^^^^^^^^^^^^^^^^^^^^^^^

For longer workflows, you can use the ``APPTAINER_BIND`` environment variable
instead of typing the same ``--bind`` options repeatedly.

Example:

::

   export APPTAINER_BIND="/path/to/data:/data,/path/to/results:/results"
   apptainer exec image.sif command

Project/Scratch Bind Mount Example
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For LSF jobs or larger workflows, it is better to use explicit project or
scratch paths.

Example:

::

   export PROJECT=<project>
   export WORKDIR=/scratch/projects/${PROJECT}/${USER}/my_apptainer_job

   mkdir -p ${WORKDIR}/data
   mkdir -p ${WORKDIR}/results

   apptainer exec \
       --bind ${WORKDIR}/data:/data:ro \
       --bind ${WORKDIR}/results:/results \
       image.sif command

In this example, input data is mounted read-only at ``/data`` and output files
are written to ``/results``.

Using absolute host paths is usually safer than using relative paths in batch
jobs.

.. warning::

   LSF jobs may start from a different working directory than the one used during
   interactive testing. In batch scripts, use absolute paths for input data,
   output directories, scripts, and container images.

Set the Working Directory
-------------------------

Use ``--pwd`` to choose the starting directory inside the container.

Example:

::

   apptainer exec --bind "$PWD":/work --pwd /work alpine_latest.sif ls

This binds the current host directory to ``/work`` inside the container and
starts the command from ``/work``.

Pipes and Redirects
-------------------

Pipes and redirects work with Apptainer commands like normal Linux commands.

Write command output to a host file:

::

   apptainer exec alpine_latest.sif cat /etc/os-release > os-release.txt

Use a pipe:

::

   apptainer exec alpine_latest.sif cat /etc/os-release | grep PRETTY_NAME

Remember that redirects such as ``> output.txt`` are handled by the host shell
unless they are placed inside a command like ``sh -c``.

More Isolated Runs
------------------

Use ``--contain`` when you want a more isolated container environment.

::

   apptainer exec --contain alpine_latest.sif ls

With ``--contain``, fewer host directories are visible by default. If your job
needs input or output files, bind the required directories explicitly:

::

   apptainer exec --contain --bind "$PWD":/work --pwd /work alpine_latest.sif ls

Use this when you want to test whether your workflow depends on files or paths
from the host system.

Common Problems
---------------

.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Problem
     - What to check
   * - File not found
     - Make sure the host directory is bind mounted and that the path inside the
       container matches the command you are running.
   * - Permission denied
     - Check the file permissions on the host. Apptainer does not give extra
       access to files you cannot normally access.
   * - Output file disappeared
     - Check whether the file was written to a temporary container layer instead
       of a bind-mounted host directory.
   * - Wrong directory inside job
     - Use absolute paths or set the container working directory with ``--pwd``.
   * - Works interactively but fails in LSF
     - Use absolute paths in the batch script and bind all required input,
       output, script, and container directories explicitly.
   * - Container cannot write to output directory
     - Confirm that the host output directory exists and that you have write
       permission before starting the container.

Recommended Practice
--------------------

* Keep input data, scripts, and outputs in host directories such as your home,
  project, or scratch space.
* Use ``--bind`` for directories that are not visible automatically.
* Use read-only binds, such as ``:ro``, for input datasets that should not be
  modified.
* Use absolute paths in LSF job scripts.
* Write outputs to a bind-mounted host directory.
* Use ``--contain`` only when you want stronger isolation and know which
  directories need to be bound.

.. tip::

   A good pattern for LSF jobs is to keep the container image, scripts, input
   directory, and output directory in known host locations, then bind them
   explicitly inside the job script. This makes the workflow easier to debug and
   more reproducible.