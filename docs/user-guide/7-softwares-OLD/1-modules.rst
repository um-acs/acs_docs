.. _general-software-modules:

Software Modules
================

IDSC systems use environment modules to manage software packages, compilers,
libraries, and application versions. Loading a module updates environment
variables such as ``PATH``, ``LD_LIBRARY_PATH``, and related software paths.

Modules allow multiple software versions to exist on the same system without
users manually editing shell configuration files for every package.

.. important::

   Module availability can differ between Pegasus, Triton/Summit, and other IDSC
   systems. Always check available modules on the system where the job will run.

Basic Module Commands
---------------------

.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Command
     - Purpose
   * - ``module avail``
     - List modules available in the current module environment.
   * - ``module avail <name>``
     - Search available modules matching a package name.
   * - ``module spider <name>``
     - Search for modules across available module trees, including modules that
       may require another compiler or dependency to be loaded first.
   * - ``module load <module>``
     - Load a software module.
   * - ``module list``
     - Show currently loaded modules.
   * - ``module unload <module>``
     - Unload a software module.
   * - ``module purge``
     - Unload all currently loaded modules.
   * - ``module switch <old> <new>``
     - Replace one loaded module with another.
   * - ``module display <module>``
     - Show environment changes made by a module.

Find Available Software
-----------------------

List available modules:

::

   module avail

Search for a specific package:

::

   module avail python
   module avail R
   module avail matlab

Use ``module spider`` when ``module avail`` does not show the package or version
expected:

::

   module spider python
   module spider R
   module spider matlab

.. note::

   ``module avail`` usually shows modules available in the current module
   environment. ``module spider`` can show a broader list and may explain which
   dependency or compiler module must be loaded first.

Load and Check a Module
-----------------------

Load a module:

::

   module load <module>/<version>

Check loaded modules:

::

   module list

Check the active executable:

::

   which python
   python --version

Unload a module:

::

   module unload <module>

Reset the module environment:

::

   module purge

Using Modules in LSF Jobs
-------------------------

Load required modules inside the LSF job script. Do not rely only on modules
loaded in the login shell.

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

.. important::

   A command that works interactively may fail in LSF if the job script does not
   load the same required modules.

Compiler and Dependency Modules
-------------------------------

Some software modules depend on compiler or library modules. For example, MPI
or OpenMP software may be built with GCC or Intel compiler environments.

Use ``module spider`` to find dependency requirements:

::

   module spider <software>

Then load the required compiler or dependency module before loading the target
software, if instructed by the module output.

System Notes
------------

Pegasus
~~~~~~~

Pegasus commonly uses standard ``x86_64`` software builds. Standard public
Linux packages and many Conda packages are usually available for this
architecture.

Triton/Summit
~~~~~~~~~~~~~

Triton/Summit uses ``ppc64le`` / Power architecture. Some public ``x86_64`` or
``amd64`` software packages are not compatible. Use modules, Conda packages, or
containers that support ``ppc64le``.

The ``open-ce`` module environments may provide additional Power-compatible
software for data science and machine learning workflows.

Recommended Practice
--------------------

* Use ``module avail`` or ``module spider`` on the system where the job will run.
* Load modules inside LSF job scripts.
* Record module versions in project notes or job output.
* Use ``module purge`` when starting a clean workflow.
* Avoid adding many module commands permanently to ``~/.bashrc`` unless they are
  needed in every session.
