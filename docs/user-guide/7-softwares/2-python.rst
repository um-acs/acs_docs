.. _general-software-python:

Python
======

Python is available on both Pegasus and Triton/Summit. Users can run Python
through modules, Conda/Miniforge environments, JupyterHub kernels, or Apptainer
containers.

This page covers general command-line Python usage. For Conda environments, see
the Conda and Miniforge page. For container-based workflows, see the Apptainer
section.

Find and Load Python
--------------------

Search for Python modules:

::

   module avail python
   module spider python

Load Python:

::

   module load python/<version>

Check the active Python:

::

   which python
   python --version
   python -m pip --version

User Package Installs
---------------------

For small personal installs, use ``pip --user``:

::

   python -m pip install --user <package>

.. caution::

   User installs under ``~/.local`` can become difficult to reproduce when many
   projects share the same package location. For project-specific work, use a
   virtual environment, Conda/Miniforge environment, or Apptainer image.

Virtual Environments
--------------------

Create a virtual environment:

::

   python -m venv myenv

Activate it:

::

   source myenv/bin/activate

Install packages:

::

   python -m pip install --upgrade pip
   python -m pip install numpy scipy pandas

Deactivate it:

::

   deactivate

Project or scratch storage is better for large project-specific environments:

::

   mkdir -p /scratch/projects/<project>/$USER/envs
   python -m venv /scratch/projects/<project>/$USER/envs/myenv

Run Python in LSF
-----------------

Example job script:

.. code:: bash

   #!/bin/bash
   #BSUB -P <project>
   #BSUB -J python_job
   #BSUB -q general
   #BSUB -n 1
   #BSUB -R "rusage[mem=4000]"
   #BSUB -W 01:00
   #BSUB -o python_job.%J.out
   #BSUB -e python_job.%J.err

   module load python/<version>

   python --version
   python script.py

Using a Virtual Environment in LSF
----------------------------------

Example:

.. code:: bash

   #!/bin/bash
   #BSUB -P <project>
   #BSUB -J python_venv_job
   #BSUB -q general
   #BSUB -n 1
   #BSUB -R "rusage[mem=4000]"
   #BSUB -W 01:00
   #BSUB -o python_venv_job.%J.out
   #BSUB -e python_venv_job.%J.err

   module load python/<version>
   source /scratch/projects/<project>/$USER/envs/myenv/bin/activate

   python script.py

System Notes
------------

Pegasus
~~~~~~~

Python is available on Pegasus. Pegasus uses ``x86_64`` architecture, so
standard ``linux-64`` Python wheels and Conda packages are generally the
starting point.

Triton/Summit
~~~~~~~~~~~~~

Python is available on Triton/Summit. Triton/Summit uses ``ppc64le``
architecture, so some Python packages may not provide pre-built wheels. If a
package builds from source, compiler or library modules may be required.

.. tip::

   For complex Python environments on Triton/Summit, use system modules,
   Conda environments that support ``ppc64le``, Open-CE/RocketCE environments,
   or Apptainer images built for the correct architecture.

Recommended Practice
--------------------

* Use Python modules for simple workflows.
* Use virtual environments for project-specific packages.
* Use Conda/Miniforge when package dependency management is complex.
* Use Apptainer when portability or isolation is required.
* Load modules and activate environments inside LSF job scripts.
