.. _general-software-modules:

Software Modules
================

IDSC systems use environment modules to manage software packages, compilers,
libraries, applications, and their dependencies. Loading a module changes the
current shell environment so that the selected software can be used.

Modules are the preferred starting point for system-provided software.

.. important::

   Module availability differs between systems. Always check modules on the
   system where the job will run.

Basic Commands
--------------

.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Command
     - Purpose
   * - ``module avail``
     - Show modules available in the current module environment.
   * - ``module avail <name>``
     - Search module trees and show dependency requirements.
   * - ``module load <module>/<version>``
     - Load a module.
   * - ``module list``
     - Show currently loaded modules.
   * - ``module unload <module>``
     - Unload a module.
   * - ``module purge``
     - Unload all currently loaded modules.
   * - ``module display <module>``
     - Show what the module changes in the environment.

Find Software
-------------

Search available modules:

::

   module avail

Search for a specific package:

::

   module avail python
   module avail matlab
   module avail gaussian


Load Software
-------------

Load a module:

::

   module load <module>/<version>

Check that it loaded:

::

   module list

Check the active command:

::

   which python
   python --version

Reset the environment:

::

   module purge

Modules in LSF Jobs
-------------------

Load modules inside the LSF job script. Do not rely only on modules loaded in an
interactive login shell.

Example:

.. code:: bash

   #!/bin/bash
   #BSUB -P <project>
   #BSUB -J module_test
   #BSUB -q general
   #BSUB -n 1
   #BSUB -R "rusage[mem=1000]"
   #BSUB -W 00:30
   #BSUB -o module_test.%J.out
   #BSUB -e module_test.%J.err

   module avail python
   module load python/<version>
   module list

   python --version

.. warning::

   A command that works interactively can fail in LSF if the required modules
   are not loaded inside the job script.

System Notes
------------

Pegasus
~~~~~~~

Pegasus uses ``x86_64`` architecture. Standard Linux software builds and
packages are generally more likely to be available for this architecture.

Triton/Summit
~~~~~~~~~~~~~

Triton/Summit uses ``ppc64le`` / Power architecture. Some software available on
``x86_64`` systems may not be available on ``ppc64le``. Use modules, Conda
packages, or containers that support the target architecture.

Recommended Practice
--------------------

* Check software on the system where the job will run.
* Load modules inside LSF job scripts.
* Record module versions in job output or project notes.
* Use ``module purge`` when starting a clean workflow.
* Avoid permanently loading many modules in ``~/.bashrc``.
