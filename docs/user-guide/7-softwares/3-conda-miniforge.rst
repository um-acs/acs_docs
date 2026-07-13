.. _general-software-conda-miniforge:

Conda and Miniforge
===================

Conda and Miniforge are package and environment managers used for Python, R,
machine learning, and scientific software.

* Pegasus provides Miniforge.
* Triton/Summit provides Conda.
* Package availability can differ because Pegasus uses ``x86_64`` and
  Triton/Summit uses ``ppc64le``.

.. important::

   Create environments on the system where they will run. Do not assume that an
   environment created on Pegasus will work on Triton/Summit, or the reverse.

Find Conda or Miniforge
-----------------------

Search available modules:

::

   module avail conda
   module avail miniforge
   module avail anaconda
   module spider conda
   module spider miniforge

Load the appropriate module:

::

   module load miniforge/<version>

or:

::

   module load conda/<version>

Check the command:

::

   conda --version
   conda info

Create an Environment
---------------------

Create a Python environment:

::

   conda create -n py_env python=3.11 numpy scipy
   conda activate py_env

Create an R environment:

::

   conda create -n r_env -c conda-forge r-base r-essentials
   conda activate r_env

List environments:

::

   conda env list

Deactivate:

::

   conda deactivate

Use Project or Scratch Storage
------------------------------

Large environments should be stored in project or scratch storage.

Create an environment by path:

::

   mkdir -p /scratch/projects/<project>/$USER/conda/envs
   conda create -p /scratch/projects/<project>/$USER/conda/envs/myenv python=3.11

Activate it:

::

   conda activate /scratch/projects/<project>/$USER/conda/envs/myenv

.. warning::

   Avoid storing many large Conda environments in the home directory when
   project or scratch storage is more appropriate.

Use Conda in LSF
----------------

Example job script:

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

   module load conda/<version>

   conda activate /scratch/projects/<project>/$USER/conda/envs/myenv

   python script.py

Export an Environment
---------------------

Export the active environment:

::

   conda env export > environment.yml

Recreate it:

::

   conda env create -f environment.yml

.. caution::

   Environment files can include platform-specific packages. A file exported
   from ``x86_64`` may not recreate cleanly on ``ppc64le``.

Pegasus Notes
-------------

Pegasus provides Miniforge and uses ``x86_64`` architecture. Standard
``linux-64`` Conda packages are generally the starting point.

Triton/Summit Notes
-------------------

Triton/Summit provides Conda and uses ``ppc64le`` architecture. Choose packages
that support ``linux-ppc64le`` when possible.

Some packages available on ``linux-64`` may not be available on
``linux-ppc64le``.

.. tip::

   When checking package availability for Triton/Summit, search for
   ``linux-ppc64le`` support before building a large environment.

Recommended Practice
--------------------

* Use Miniforge/Conda modules when available.
* Store large environments in project or scratch storage.
* Keep an ``environment.yml`` file with the project.
* Create environments on the system where they will run.
* Avoid mixing Conda and ``pip`` unless necessary.
