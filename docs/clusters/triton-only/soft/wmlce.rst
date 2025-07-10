IBM WML CE on Triton User Menu
==============================================

Introduction
------------

To release the power of the advanced hardware, IBM provides
Watson Machine Learning Community Edition (WML CE) which is a set of
software packages for deep learning and machine learning development and
applications on the state-of-the-art POWER system equiped with the most
advanced NVIDIA GPUs. WML CE contains the popular open source deep
learning frameworks such as TensorFlow and PyTorch, IBM-optimized Caffe,
IBM's machine learning library (Snap ML) and software for distributed
training (DDL) and large model support (LMS).

Using Anaconda
--------------

The WML CE packages are distributed as conda packages in `an online
conda repository <https://public.dhe.ibm.com/ibmdl/export/pub/software/server/ibm-ai/conda/>`__.
You can use Anaconda or Miniconda to install and manage the packages.

On Triton, we have pre-installed Anaconda that is configured to point to the repository containing the WML CE packages.
After logging to the system with ``ssh <your caneid>@triton.ccs.miami.edu``, you can do ``ml wml_anaconda3`` to load the default version of 
the WML-configured Anaconda `module <https://acs-docs.readthedocs.io/triton/1-env/3-modules.html>`__. 

We recommend using the pre-installed Anaconda since it will be easier for us to track down the problem if you need assistance. However, you can also install Anaconda or Miniconda in your home directory following `the WML CE system setup guide <https://www.ibm.com/support/knowledgecenter/SS5SF7_1.7.0/navigation/wmlce_setupAnaconda.html>`__, and handle it by yourself.


Installing WML CE packages
--------------------------

-  $ ``ml wml_anaconda3``
-  $ ``conda create -n <your environment> python=<version> powerai=<version>`` 
For example, ``conda create -n my_wml_env python=3.7 powerai=1.7.0`` will create 
an environment named ``my_wml_env`` at ``~/.conda/envs`` with python 3.7 and all the WML CE packages installed.

-  $ ``conda activate <your environment>``

Installing all the WML CE packages at the same time in your environment:

-  (your environment)$ ``conda install powerai=1.6.2``

Or installing individual package:

-  (your environment)$ ``conda install <WML CE supported package>``

.. note::

   WML CE 1.7.0 and 1.6.2 need Python 3.6 or 3.7; WML CE 1.6.1 needs Python 2.7 or 3.6.
   
   You can check the packages included in each WML CE version at 
   https://public.dhe.ibm.com/ibmdl/export/pub/software/server/ibm-ai/conda/#/

Using WML CE packages
---------------------

.. warning::
   You should only do small testing on the login node using the command line interface, formal jobs need to
   be submitted via `LSF <https://acs-docs.readthedocs.io/triton/3-jobs/README.html#>`__.

Small testing using the command line interface
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  $ ``ml wml_anaconda3``
-  $ ``conda activate <your environment>``
-  (your environment)$ ``python testing_program.py``
-  $ ``conda deactivate``

Submitting jobs using LSF on Triton
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use ``#BSUB -q normal`` to submit job to queue normal for testing on
Triton now (it will change in the future).

Add ``#BSUB -gpu "num=<number of GPUs>"`` if you need GPUs in your job.
You can use up to 2 GPUs if Distributed Deep Learning (DDL) is not
involved.

A job script example:

::

    #!/bin/bash
    #BSUB -J "my_example"
    #BSUB -o "my_example_%J.out"
    #BSUB -e "my_example_%J.err"
    #BSUB -n 4
    #BSUB -gpu "num=1"
    #BSUB -q "normal"
    #BSUB -W 00:10

    ml wml_anaconda3
    conda activate <your_environment>
    python path/to/your_program.py

If the above file is named my_job_script.job, run the below command to submit the job: 

$ ``bsub < my_job_script.job`` 

The output will show in the ``my_example_<job id>.out`` file after the job is done.

Installing other packages not included in WML CE
------------------------------------------------

.. warning::
   Installing other packages could cause conflicts with the installed WML CE packages.

If you really need to install other packages, you can try the steps below in order until you find it.

1. ``conda install <package>`` or ``conda install <package>=<version>`` in the activated environment will
   search the package in the `IBM WML CE repo <https://public.dhe.ibm.com/ibmdl/export/pub/software/server/ibm-ai/conda/>`__,
   then the `official repo hosted by Anaconda <https://repo.anaconda.com/pkgs/main/linux-ppc64le/>`__ as configured
   in the ``wml_anaconda3``. The package will be installed if it is found in the repos.

2. Search in `Anaconda Cloud <https://anaconda.org/>`__ and **choose
   Platform** ``linux-ppc64le``, then click on the name of the found package.
   The detail page will show you how to install the package with a specific channel, such as
   ``conda install -c <a specific channel> <package>``

3. Use ``pip install <package>`` 

.. warning::
   Issues may arise when using pip and conda together. 
   Only after conda has been used to install as many packages as possible should pip be used to install any remaining software. 

Using DDL (Testing)
-------------------
 `Getting started with DDL <https://www.ibm.com/support/knowledgecenter/SS5SF7_1.7.0/navigation/wmlce_getstarted_ddl.html>`__.

.. warning::
   ddl-tensorflow operator and pytorch DDL are DEPRECATED and will be REMOVED in the next WML CE release. Please start using `horovod <https://www.ibm.com/support/knowledgecenter/SS5SF7_1.7.0/navigation/wmlce_getstarted_horovod.html>`__ with NCCL backend.

A job script example:

::

   #BSUB -L /bin/bash
   #BSUB -J "MNIST_DDL"
   #BSUB -o "MNIST_DDL.%J"
   #BSUB -n 12
   #BSUB -R "span[ptile=4]"
   #BSUB -gpu "num=2"
   #BSUB -q "normal"
   #BSUB -W 00:10

   module unload gcc
   ml wml_anaconda3
   ml xl
   ml smpi
   conda activate <your environment>
   
   # Workaround for GPU selection issue
   cat > launch.sh << EoF_l
   #! /bin/sh
   export CUDA_VISIBLE_DEVICES=0,1
   exec \$*
   EoF_l
   chmod +x launch.sh

   # Run the program
   export PAMI_IBV_ADAPTER_AFFINITY=0
   ddlrun ./launch.sh python /path/to/your_program.py

   # Clean up
   /bin/rm -f launch.sh

-  ``#BSUB -n 12`` requests 12 CPU cores 
-  ``#BSUB -R "span[ptile=4]"`` asks for 4 cores per node, so 3 nodes (12 / 4) will be involved.
-  ``#BSUB -gpu "num=2"`` requests 2 GPUs per node, and therefore 6 GPUs in total (2 * 3) are requested for this job.

Using LMS (Testing)
-------------------

`Getting started with TensorFlow large model support <https://www.ibm.com/support/knowledgecenter/SS5SF7_1.7.0/navigation/wmlce_getstarted_tflms.html>`__

LMS section of `Getting started with PyTorch <https://www.ibm.com/support/knowledgecenter/SS5SF7_1.7.0/navigation/wmlce_getstarted_pytorch.html>`__ 

System Pre-installed WML CE packages
------------------------------------
We recommend you set up your own environment and install WML CE packages so you have a total control. However, you can also use the different versions of WML CE that we have installed on the system.

You can do ``ml wml/<versions>`` to activate the environment including packages of the specific WML CE version. 
``ml -wml`` will deactivate the environment.

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

References and Additional Resources
-----------------------------------

`Watson Machine Learning Community
Edition <https://developer.ibm.com/linuxonpower/deep-learning-powerai/releases/>`__

`IBM Watson Machine Learning Community Edition Version 1.7.0
documentation <https://www.ibm.com/support/knowledgecenter/SS5SF7_1.7.0/navigation/welcome.html>`__

`Deep learning and AI on Power Systems technical
resources <https://developer.ibm.com/linuxonpower/deep-learning-powerai/library/>`__

