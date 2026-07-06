Running Jobs with LSF
=====================

Use LSF for Apptainer workloads that require compute resources. Do not run heavy
container jobs directly on the login node.

The usual workflow is:

::

   prepare image and scripts -> submit LSF job -> run Apptainer inside the job

.. warning::

   Login nodes should only be used for light testing, such as checking an image,
   inspecting metadata, or running a very short command. CPU-heavy, memory-heavy,
   long-running, and GPU workloads should be submitted through LSF.

Interactive LSF Session
-----------------------

For testing, start an interactive LSF session first.

::

   bsub -q general -P <project> -n 1 -R "rusage[mem=4000]" -W 1:00 -Is bash

After the job starts on a compute node, load Apptainer and run your container:

::

   module avail apptainer
   module load apptainer/<version>
   apptainer --version
   apptainer exec alpine_latest.sif cat /etc/os-release

For example, on Pegasus the tested module was:

::

   module load apptainer/1.0.2

.. note::

   Module versions may differ across IDSC clusters. Check the available version
   on the system you are using with ``module avail apptainer``.

You can also run a Python script from the current directory:

::

   apptainer exec python_latest.sif python3 pyscript.py

Direct Interactive Command
--------------------------

For a quick test, you can run an Apptainer command directly through ``bsub``.
This is useful for short checks, but not for larger workflows.

Example:

::

   bsub -q general -P <project> -n 1 -R "rusage[mem=4000]" -W 00:10 -Is bash -lc "module load apptainer/<version> && apptainer exec alpine_latest.sif cat /etc/os-release"

For longer work, use a batch script instead.

.. tip::

   If the command becomes long or difficult to read, move it into a batch script.
   Batch scripts are easier to debug, modify, and reuse.

Batch Job Example
-----------------

Create a file named ``apptainer_cpu.job``:

.. code:: bash

   #!/bin/bash
   #BSUB -P <project>
   #BSUB -J apptainer_cpu
   #BSUB -q general
   #BSUB -n 1
   #BSUB -R "rusage[mem=4000]"
   #BSUB -W 1:00
   #BSUB -o apptainer_cpu.%J.out
   #BSUB -e apptainer_cpu.%J.err

   module load apptainer/<version>

   apptainer --version
   apptainer exec python_latest.sif python3 pyscript.py

Submit the job:

::

   bsub < apptainer_cpu.job

Check job status:

::

   bjobs

After the job finishes, check the output file:

::

   cat apptainer_cpu.<jobid>.out

Use Full Paths in Job Scripts
-----------------------------

Batch jobs may start from a different working directory than expected. For this
reason, full paths are safer in job scripts.

Example:

.. code:: bash

   IMAGE=/nethome/$USER/python_latest.sif
   WORKDIR=/scratch/projects/<project>/$USER/my_job

   mkdir -p ${WORKDIR}/results

   apptainer exec \
       --bind ${WORKDIR}:/work \
       --pwd /work \
       ${IMAGE} python3 pyscript.py

This makes the workflow easier to debug because the image, scripts, input data,
and output directory are clearly defined.

.. important::

   Use absolute paths for container images, input files, scripts, and output
   directories in batch jobs. Relative paths may work interactively but fail
   when submitted through LSF.

Binding Data Directories in Jobs
--------------------------------

Use ``--bind`` when the job needs project or scratch directories inside the
container.

Example:

.. code:: bash

   IMAGE=/nethome/$USER/python_latest.sif
   WORKDIR=/scratch/projects/<project>/$USER/my_apptainer_job

   mkdir -p ${WORKDIR}/data
   mkdir -p ${WORKDIR}/results

   apptainer exec \
       --bind ${WORKDIR}/data:/data:ro \
       --bind ${WORKDIR}/results:/results \
       ${IMAGE} python3 /data/script.py

In this example, the input directory is mounted read-only at ``/data`` and the
output directory is mounted at ``/results``.

You can also use ``APPTAINER_BIND`` when the same bind mounts are needed
repeatedly:

.. code:: bash

   export APPTAINER_BIND="/scratch/projects/<project>/$USER/data:/data:ro,/scratch/projects/<project>/$USER/results:/results"
   apptainer exec image.sif command

.. note::

   Bind mounts do not bypass host permissions. The container can only access
   files and directories that the user can access on the host system.

Using ``--cleanenv``
--------------------

Sometimes host environment variables, loaded modules, or Conda settings can
interfere with software inside a container. Use ``--cleanenv`` when you want the
container to start with a cleaner environment.

::

   apptainer exec --cleanenv image.sif command

If your workflow depends on a specific variable, pass it explicitly with the
``APPTAINERENV_`` prefix.

Example:

::

   export APPTAINERENV_MY_VARIABLE="value"
   apptainer exec --cleanenv image.sif env | grep MY_VARIABLE

.. tip::

   If a container works in one session but fails in another, try ``--cleanenv``.
   This can help identify whether the problem is caused by host environment
   variables leaking into the container.

Avoid Downloading Images Inside Jobs
------------------------------------

Avoid downloading or rebuilding large images in every job:

::

   apptainer exec docker://python python3 script.py

For repeated jobs, pull or build the image once and reuse the local ``.sif``
file:

::

   apptainer pull docker://python
   apptainer exec python_latest.sif python3 script.py

.. important::

   Store reusable ``.sif`` images in an appropriate home, project, or scratch
   location. Re-downloading remote images in every job wastes time and can make
   jobs less reliable.

GPU Jobs
--------

GPU containers require a GPU LSF allocation and the ``--nv`` option. The normal
pattern is:

::

   request GPU resources with LSF -> load Apptainer -> run with --nv

GPU examples are covered in the GPU Containers page.

Recommended Job Pattern
-----------------------

A good LSF job script usually does the following:

* Requests the correct queue, project, time, CPU, memory, and GPU resources if needed.
* Loads the Apptainer module inside the job script.
* Uses a local ``.sif`` image instead of downloading an image every time.
* Uses full paths for images, scripts, data, and output directories.
* Uses ``--bind`` for required host directories.
* Uses ``--cleanenv`` when host environment variables may interfere.
* Writes output to project or scratch storage.

Common LSF Commands
-------------------

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Command
     - Purpose
   * - ``bsub < job``
     - Submit a batch job.
   * - ``bjobs``
     - Check running or pending jobs.
   * - ``bhist -l <jobid>``
     - View detailed job history.
   * - ``bkill <jobid>``
     - Cancel a job.

Common Problems
---------------

.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Problem
     - What to check
   * - File not found
     - Use full paths and bind the required host directory into the container.
   * - Command works interactively but fails in LSF
     - Load the same modules inside the job script and use absolute paths.
   * - Image downloads every job
     - Pull or build the ``.sif`` image once before submitting repeated jobs.
   * - Permission denied
     - Check host file permissions and project access.
   * - Environment conflict
     - Try ``--cleanenv`` and pass required variables explicitly with
       ``APPTAINERENV_``.
   * - Job uses login node resources
     - Submit the workload through LSF instead of running it directly on the
       login node.
   * - Output file is missing
     - Confirm that the output path is a bind-mounted host directory and that
       the job has write permission there.