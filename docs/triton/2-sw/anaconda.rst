Anaconda on Triton
==================

Introduction
------------

Anaconda is an open-source distribution of the Python and R programming
languages for scientific computing. The Anaconda distribution comes with
conda, which is a package manager and environment manager, and over 150
packages automatically installed (other 1,500+ packages could be
downloaded and installed easily from the Anaconda repository). In order to use Anaconda on Triton, you need to have access to the UM network and the Triton system. 
Please check `IDSC ACS Policies <https://acs-docs.readthedocs.io/policies/policies.html#policies>`__

Miniforge is used on the t2 server. 

Conda General Commands
----------------------

-  $ ``conda create -n <environment name> python=<version>`` to create
   an environment
-  $ ``conda env list`` to list all available environments
-  $ ``conda activate <environment name>`` to activate an environment

Inside an environment (after activating the environment):

-  $ ``conda list`` to list installed packages
-  $ ``conda install <package name>`` to install a package
-  $ ``conda install <package name>=<version>`` to install a package
   with a specific version
-  $ ``conda install -c <url> <package name>`` to install a package from
   a specific channel (repository)
-  $ ``conda remove <package name>`` to uninstall a package
-  $ ``conda deactivate`` to deactivate the environment

Please check the `official document <https://docs.conda.io/projects/conda/en/latest/commands.html#conda-general-commands>`__ for details. 

Conda Environment
-----------------

A Conda environment contains a specific collection of application software, frameworks and their dependencies that are maintained and run separately from software in another environment.

Using Conda environment on the command line
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- $  ``ml miniforge3/24.3.0-0``
- $  ``conda activate <your environment or system pre-installed environment>``
- Run test program (dependencies have been installed in the environment)
- $  ``conda deactivate``

.. note::
   Only small test program should be run on the command line. Formal jobs need to be submitted via `LSF <https://acs-docs.readthedocs.io/triton/3-jobs/1-lsf.html>`__.

Using Conda environment in the LSF job script
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

An LSF job script example using Conda environment:

::

    #!/bin/bash
    #BSUB -J "job_example"
    #BSUB -o "job_example_%J.out"
    #BSUB -e "job_example_%J.err"
    #BSUB -n 4
    #BSUB -R "rusage[mem=2G]"
    #BSUB -q "normal"
    #BSUB -W 00:30
    #BSUB -B
    #BSUB -N
    #BSUB -u <my_email>@miami.edu

    ml miniforge3/24.3.0-0
    conda activate <my_environment>
    python <path to my_program.py>

In my\_program.py, you can import any package that has been installed in your environment.
Details about job scheduling can be found at `Triton Job
Scheduling <https://acs-docs.readthedocs.io/triton/3-jobs/README.html>`_.

Creating an Conda environment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For Python
^^^^^^^^^^

$ ``conda create -n <environment name> python=<version> <package1> <package2> <...>``

For example, ``conda create -n my_env python=3.7 numpy scipy`` will
create an environment at ``~/.conda/envs`` with Python 3.7.x and two packages
numpy and scipy. You can also specify the package versions. 

If you have a list of specific dependencies, you can install them using a requirements file. First, activate your virtual environment. Then run the installation command:

::
   python -m pip install -r requirements.txt

Make sure the `requirements.txt` file is in the current working directory. If the file is located somewhere else, update the path or filename accordingly:

::
   python -m pip install -r path/to/your_file.txt`


.. note::
   You do not need to install all packages at the same time while creating the environment, 
   but doing so will resolve the dependencies altogether and avoid
   further conflicts, so this is the recommended way to create the environment.

For R
^^^^^

$ ``conda create -n <r environemnt name> -c conda-forge r-base``

``-c conda-forge`` guides conda to find the ``r-base`` package from
``conda-forge`` channel. 

Installing Conda packages
~~~~~~~~~~~~~~~~~~~~~~~~~

If you want to install more packages after creating the environment, you can run
``conda install <package>`` in the activated environment.

.. note::
   If the package is not found, you can do a search in the `Anaconda
   Cloud <https://anaconda.org/>`__ and **choose Platform** ``linux-ppc64le``. 
   Click on the name of the found package, the detail page will show you
   how to install the package with a specific channel.
   
   If the package is still not found, you could try ``pip install <package>``

.. warning:: 
   Issues may arise when using pip and conda together.
   Only after conda has been used to install as many packages
   as possible should pip be used to install any remaining software. If
   modifications are needed to the environment, it is best to create a new
   environment rather than running conda after pip.

Installing Your Own Anaconda
----------------------------

If you would like to manage your own Anaconda, you can install it in
your home directory following the `instruction of Installing Anaconda on
Linux
POWER <https://docs.anaconda.com/anaconda/install/linux-power8/>`__.
