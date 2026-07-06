.. _general-software-conda:

Conda and Anaconda
==================

Conda is a package and environment manager commonly used for Python, R, and
scientific software. On IDSC systems, Conda may be provided through Anaconda,
Miniconda, Miniforge, or a system module.

.. note::

   Conda module names and versions can differ by system. Triton/Summit commonly
   requires Power-compatible packages for ``ppc64le``. Always check the system
   where the job will run.

Find and Load Conda
-------------------

Search for Conda-related modules:

::

   module avail conda
   module avail anaconda
   module avail miniforge
   module spider miniforge

Load the appropriate module:

::

   module load miniforge3/<version>

Check Conda:

::

   conda --version
   conda info

Basic Conda Commands
--------------------

.. list-table::
   :header-rows: 1
   :widths: 40 60

   * - Command
     - Purpose
   * - ``conda create -n <env> python=<version>``
     - Create a new Python environment.
   * - ``conda create -n <env> -c conda-forge r-base``
     - Create a new R environment.
   * - ``conda env list``
     - List Conda environments.
   * - ``conda activate <env>``
     - Activate an environment.
   * - ``conda deactivate``
     - Deactivate the current environment.
   * - ``conda list``
     - List packages in the active environment.
   * - ``conda install <package>``
     - Install a package in the active environment.
   * - ``conda remove <package>``
     - Remove a package from the active environment.
   * - ``conda env export > environment.yml``
     - Save an environment specification.
   * - ``conda env create -f environment.yml``
     - Recreate an environment from a file.

Create a Python Environment
---------------------------

Example:

::

   conda create -n py_env python=3.11 numpy scipy
   conda activate py_env
   python --version

Create an R Environment
-----------------------

Example:

::

   conda create -n r_env -c conda-forge r-base r-essentials
   conda activate r_env
   R --version

Choose an Environment Location
------------------------------

By default, Conda may create environments in the user's home directory. For
large environments, use project or scratch storage.

Example:

::

   mkdir -p /scratch/projects/<project>/$USER/conda/envs
   conda create -p /scratch/projects/<project>/$USER/conda/envs/myenv python=3.11

Activate by path:

::

   conda activate /scratch/projects/<project>/$USER/conda/envs/myenv

.. tip::

   Use named environments for small personal workflows and path-based
   environments for project or scratch locations.

Use Conda in LSF
----------------

Create ``conda_job.sh``:

.. code:: bash

   #!/bin/bash
   #BSUB -P <project>
   #BSUB -J conda_job
   #BSUB -q general
   #BSUB -n 1
   #BSUB -R "rusage[mem=4000]"
   #BSUB -W 01:00
   #BSUB -o conda_job.%J.out
   #BSUB -e conda_job.%J.err

   module load miniforge3/<version>

   conda activate /scratch/projects/<project>/$USER/conda/envs/myenv

   python script.py

Submit the job:

::

   bsub < conda_job.sh

Export and Recreate Environments
--------------------------------

Export the active environment:

::

   conda env export > environment.yml

Recreate it:

::

   conda env create -f environment.yml

.. important::

   Environment files improve reproducibility, but they may still contain
   platform-specific packages. An environment exported from ``x86_64`` may not
   recreate cleanly on ``ppc64le``.

Mixing Conda and Pip
--------------------

When possible, install packages with Conda first, then use ``pip`` only for
packages that are not available through Conda.

Recommended order:

::

   conda install <conda-packages>
   python -m pip install <pip-only-packages>

.. caution::

   Mixing Conda and ``pip`` can make environments harder to reproduce. Avoid
   running Conda after many packages have already been installed with ``pip`` in
   the same environment.

System Notes
------------

Pegasus
~~~~~~~

Pegasus uses ``x86_64`` architecture. Standard ``linux-64`` Conda packages are
usually the starting point.

Triton/Summit
~~~~~~~~~~~~~

Triton/Summit uses ``ppc64le`` architecture. When searching for Conda packages,
choose or check the ``linux-ppc64le`` platform when possible.

The Triton/Summit environment may use Miniforge and Power-compatible package
channels. Some packages available on ``linux-64`` may not be available on
``linux-ppc64le``.

.. tip::

   When checking package availability for Triton/Summit, search Anaconda Cloud
   and choose the ``linux-ppc64le`` platform.

Installing Your Own Conda
-------------------------

If a system-provided Conda module does not meet the workflow requirements, users
may install Miniconda, Miniforge, or Anaconda in their own home, project, or
scratch directory.

.. warning::

   Do not install large Conda distributions or many large environments in a home
   directory if project or scratch storage is more appropriate.
