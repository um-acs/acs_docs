Quick Start
========================

This page introduces the basic Apptainer workflow: loading the
module, checking the version, downloading images, and running containers with
``shell``, ``exec``, and ``run``.

Load Apptainer
--------------

Apptainer is available as a module on IDSC clusters. After logging in to the
cluster, check which Apptainer versions are available and load the appropriate
module.

::

   module avail apptainer
   module load apptainer/<version>
   module list
   apptainer --version

For example, on Pegasus the tested module was:

::

   module load apptainer/1.0.2

.. note::

   Module versions may differ across clusters. Always check the available
   Apptainer versions with ``module avail apptainer`` on the system you are
   using.

Cluster Module Quick Reference
------------------------------

Apptainer is available on multiple IDSC systems, but the module version,
architecture, and supported container images may differ by cluster.

==================  ==================  ==================  ==============================
Cluster/System      Architecture        Example module      Notes
==================  ==================  ==================  ==============================
Pegasus             x86_64              apptainer/1.0.2     Standard x86_64 images are used
Triton/Summit       ppc64le             apptainer/1.1.9     Requires ppc64le-compatible images
==================  ==================  ==================  ==============================

.. caution::

   Container images must match the host architecture. For example, a standard
   ``x86_64`` or ``amd64`` image may not run on a ``ppc64le`` system such as
   Triton/Summit.

To load Apptainer automatically in future sessions, add the correct module
command for your cluster to ``~/.bashrc``.

Example:

::

   module load apptainer/<version>



View Apptainer Help
-------------------

Use ``help`` to see available commands and command-specific options.

::

   apptainer help
   apptainer help build
   apptainer help shell
   apptainer help exec
   apptainer help run

Download a Container Image
--------------------------

Use ``pull`` to download a container image and save it as a local ``.sif`` file.
For example, download Alpine Linux from Docker Hub:

::

   apptainer pull docker://alpine

This creates a local image, usually named:

::

   alpine_latest.sif

Check that the image was created:

::

   ls

You can download other images the same way:

::

   apptainer pull docker://python

This creates a local Python image, usually named:

::

   python_latest.sif

For quick testing, you can also use a remote image directly without saving it
first:

::

   apptainer exec docker://alpine cat /etc/os-release

For repeated use, it is better to pull the image once and use the local
``.sif`` file.

.. tip::

   Store large ``.sif`` images in a project or scratch location instead of
   keeping many large container files in your home directory.

   Example:

   ::

      mkdir -p /scratch/projects/<project>/$USER/containers
      cd /scratch/projects/<project>/$USER/containers
      apptainer pull docker://python

   Apptainer also uses a cache when pulling images. If the cache becomes large,
   check or clean it with:

   ::

      apptainer cache list
      apptainer cache clean



Shell: Interactive Use
----------------------

Use ``shell`` when you want to enter a container and work interactively.

::

   apptainer shell alpine_latest.sif

Inside the container, check the container operating system:

::

   cat /etc/os-release

You can also check your user identity:

::

   id

Exit the container:

::

   exit

Apptainer keeps your user identity from the host system. You do not become root
inside the container by default.

Exec: Run a Command
-------------------

Use ``exec`` when you want to run a specific command inside a container without
entering an interactive shell.

::

   apptainer exec alpine_latest.sif cat /etc/os-release

Example using the Python image:

::

   apptainer exec python_latest.sif python --version

``exec`` is useful for scripts and LSF job files because the command runs and
then exits.

Run: Use the Container Default Command
--------------------------------------

Use ``run`` when you want to execute the container's default run command.

::

   apptainer run python_latest.sif

The behavior of ``run`` depends on how the container was built. Some containers
start an application, while others open an interpreter or run a predefined
script.

Choosing Between Shell, Exec, and Run
-------------------------------------

=======  ===============================================  ===============================
Command  Use                                              Example
=======  ===============================================  ===============================
shell    Interact with the container manually             Testing or exploring software
exec     Run a specific command                           Scripts and LSF jobs
run      Run the container's default command              Images with a predefined runscript
=======  ===============================================  ===============================

.. warning::

   Use login nodes only for small tests such as checking the image, viewing help,
   or running quick commands. Long-running workloads, CPU-heavy jobs, memory-heavy
   jobs, and GPU jobs should be run through LSF.


Command Order
-------------

Apptainer uses positional syntax. Options for Apptainer itself come before the
subcommand. Options for a subcommand come after the subcommand.

Enable debug mode for Apptainer:

::

   apptainer --debug run alpine_latest.sif

Run a container with stronger isolation:

::

   apptainer run --containall alpine_latest.sif


Quick Validation Checklist
--------------------------

After loading Apptainer and pulling an image, run a few simple checks before
using the image in a job.

Check the host architecture:

::

   uname -m

Check the Apptainer version:

::

   apptainer --version

Check that the image runs:

::

   apptainer exec alpine_latest.sif cat /etc/os-release

Check your identity inside the container:

::

   apptainer exec alpine_latest.sif id


.. admonition:: Important Notes
   :class: important

   * By default, Apptainer keeps your normal cluster user identity inside the container.  
     You do not become root inside the container unless you are using a special workflow 
     such as fakeroot.
   * Apptainer is used after logging in to a cluster; it is not a separate login system.
   * Use ``shell`` for interactive testing.
   * Use ``exec`` for commands, scripts, and LSF jobs.
   * Use ``run`` only when the image has a useful default command.
   * Downloaded ``.sif`` files are read-only by default.
   * Use definition files for reproducible container builds.
   * Run heavy workloads through LSF, not directly on the login node.
