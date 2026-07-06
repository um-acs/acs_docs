.. _general-software-python:

Python
======

Python can be used through software modules, Conda environments, virtual
environments, JupyterHub, or containers. This page covers module-based and
user-managed Python workflows. For Conda-specific workflows, see the Conda and
Anaconda page. For container-based Python workflows, see the Apptainer section.

.. note::

   Python versions and module names can differ across systems. Check available
   modules on the system where the job will run.

Find and Load Python
--------------------

Search for Python modules:

::

   module avail python
   module spider python

Load a Python module:

::

   module load python/<version>

Check the active Python:

::

   which python
   python --version
   python -m pip --version

Installing Python Packages with ``pip --user``
----------------------------------------------

For small user-level installs, packages can be installed into the user's home
directory with ``pip --user``.

Example:

::

   python -m pip install --user <package>

Install a specific version:

::

   python -m pip install --user <package>==<version>

Packages installed with ``--user`` are usually placed under:

::

   ~/.local/lib/pythonX.Y/site-packages

Executables may be placed under:

::

   ~/.local/bin

.. caution::

   User installs can become difficult to reproduce when many projects share the
   same ``~/.local`` package location. For project-specific work, use a virtual
   environment, Conda environment, or Apptainer image instead.

Python Virtual Environments
---------------------------

Virtual environments are recommended when different projects need different
Python packages or package versions.

Create a virtual environment:

::

   python -m venv myenv

Activate it:

::

   source myenv/bin/activate

Upgrade ``pip``:

::

   python -m pip install --upgrade pip

Install packages:

::

   python -m pip install numpy scipy pandas

Deactivate the environment:

::

   deactivate

.. tip::

   Place project-specific environments in project or scratch storage when they
   are large or tied to a specific project.

Example project location:

::

   mkdir -p /scratch/projects/<project>/$USER/envs
   python -m venv /scratch/projects/<project>/$USER/envs/myenv

Run Python in LSF
-----------------

Create ``python_job.sh``:

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

Submit the job:

::

   bsub < python_job.sh

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

   python --version
   python script.py

System Notes
------------

Pegasus
~~~~~~~

Pegasus uses ``x86_64`` architecture. Standard Python wheels and Conda packages
are generally more likely to be available for this architecture.

Triton/Summit
~~~~~~~~~~~~~

Triton/Summit uses ``ppc64le`` architecture. Some Python packages may not
provide pre-built wheels for this architecture. If ``pip`` tries to compile a
package from source, additional compiler or library modules may be required.

For complex Python environments on Triton/Summit, prefer system modules,
Miniforge/Conda with ``ppc64le`` packages, Open-CE environments, or Apptainer
images built for the correct architecture.

Perl and Other Scripting Languages
----------------------------------

Users can often install scripting-language packages in their own home or
project directories. For Perl, local module installs can be managed with tools
such as CPAN or ``cpanminus`` when available.

.. note::

   If a specific language runtime or package manager is not available as a
   module, check whether it can be installed in user space, through Conda, or
   through an Apptainer container.

Recommended Practice
--------------------

* Use modules for simple Python workflows.
* Use virtual environments for project-specific package sets.
* Use Conda when complex package dependencies are needed.
* Use Apptainer when the software stack must be portable or isolated.
* Load modules and activate environments inside LSF job scripts.
* Avoid mixing unrelated projects in the same user package directory.
