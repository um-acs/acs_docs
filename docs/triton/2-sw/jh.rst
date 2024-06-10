.. warning:: 
   Please make sure to save your work frequently in case a shutdown happens.
   
JupyterHub on Triton User Menu
==============================

Introduction
------------

`JupyterHub <https://jupyterhub.readthedocs.io/en/stable/index.html>`__
provides Jupyter Notebook for multiple users.

Through JupyterHub on Triton, you can request and start a Jupyter
Notebook server on one of Triton's compute nodes (using
`LSF job scheduler <https://acs-docs.readthedocs.io/triton/3-jobs/1-lsf.html>`__ 
behind the scenes). In this way, you can interactively test
your Python or R programs through the Notebook with the supercomputer
resources.

Currently all requested Notebook servers are running in only two compute
nodes. It is recommended to use the Notebook as a testing tool and submit formal jobs via LSF.

Using JupyterHub on Triton
--------------------------

Login
~~~~~

-  First you need to have access to Triton. Please check the `IDSC ACS Policies <https://acs-docs.readthedocs.io/policies/policies.html#policies>`__
-  Connect with the UM network on campus or via
   `VPN <https://www.it.miami.edu/a-z-listing/virtual-private-network/index.html>`__.
-  Open the Login page https://jupyter.ccs.miami.edu:8000 on your
   browser.
-  Log in using your UM CaneID and the associated password.

Starting your Jupyter Notebook server
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Press the ``Start My Notebook Server`` button to launch the resource
   request page.
-  Choose the memory, number of CPU cores, time you want to run the
   Notebook server and whether or not you want to use a GPU.
-  Press the ``Request`` button to request and start a Notebook server.

Logout
~~~~~~

When using the JupyterHub, you need to be clear that there are three things you need to turn off:

1. Close Notebook File - After saving, press ``File`` in the menu bar and choose ``Close and Halt``.
2. Stop Notebook Server - Click the ``Control Panel`` button at the top-right corner and press ``Stop My Notebook Server``.
3. Logout from JupyterHub - Click the ``Logout from JupyterHub`` button at the top-right corner.
   
.. warning::
   If you only logout from JupyterHub without stopping the Notebook Server first, 
   the Notebook Server will run until the time you set up when starting it. This could result in unintended increased SU usage. 
   
Using Jupyter Notebook
----------------------

After the notebook server starts, you will see the interface page
showing your home directory.

You can create notebook files, text files and folders, or open terminals
using the ``New`` button at the top-right corner under the menu bar.

Details can be found at the official `Jupyter Notebook User
Documentation <https://jupyter-notebook.readthedocs.io/en/stable/notebook.html>`__.

Creating Your Python Kernel
~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  $ ``ssh <caneid>@triton.ccs.miami.edu`` to login to Triton
-  $ ``ml anaconda3``
   or ``ml wml_anaconda3`` if you need to install deep learning packages
-  $ ``conda create -n <your environment> python=<version> <package1> <package2> ...`` 
-  $ ``conda activate <your environment>``
-  (your environment)$ ``conda install ipykernel``
-  (your environment)$
   ``ipython kernel install --user --name <kernel name> --display-name "<the displayed name for the kernel>"``

Here is an example:

(Please press ``y`` on your keyboard when you see ``Proceed ([y]/n)?``)

::

    $ ml anaconda3
    $ conda create -n myenv python=3.7 numpy scipy
    $ conda activate myenv
    (myenv)$ conda install ipykernel
    (myenv)$ ipython kernel install --user --name my_py37_kernel --display-name "My Python 3.7 with NumPy and SciPy"

Later on, you can still install new packages to the kernel using ``conda install <package>`` after activating the environment.

.. note::
   If the package could not be found, you can search `Anaconda
   Cloud <https://anaconda.org/>`__ and **choose Platform** ``linux-ppc64le``
   
   If Anaconda Cloud does not have the package neither, you could try ``pip install``

.. warning:: 
   Issues may arise when using pip and conda together.
   Only after conda has been used to install as many packages
   as possible should pip be used to install any remaining software. If
   modifications are needed to the environment, it is best to create a new
   environment rather than running conda after pip.

After a package is installed, you can use it in your notebook by running ``import <package name>`` in a cell.

Creating Your R kernel
~~~~~~~~~~~~~~~~~~~~~~
   
-  $ ``ml anaconda3``
-  $ ``conda create -n <your r environemnt> -c conda-forge r-base``
-  $ ``conda activate <your r environemnt>``
-  $ ``conda install -c conda-forge jupyter_client``
-  (<your r environemnt>)$ ``R``
-  (inside R) > ``install.packages(c('repr', 'IRdisplay', 'IRkernel'))``
-  (inside R) > ``IRkernel::installspec(name='<your r kernel name>', displayname='<display name of your kernel>')``

Later on, you can still install new R packages to the kernel by activating the environment, entering R and running ``install.packages('<package name>')``
(The pacakge will be installed at ``/~/.conda/envs/<your r environment>/lib/R/library``)

After a R package is installed, you can use it in your notebook by running ``library('<package name>')`` in a cell.

Removing Personal Kernels
~~~~~~~~~~~~~~~~~~~~~~~~~~~
You can view a list of all your kernels at the following path:

``/home/<your_caneid>/.local/share/jupyter/kernels``

From this directory you can delete kernels using Linux **rm kernel_name** command. 



Using Pre-installed Kernels
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Several kernels has been pre-installed on Triton. You can use them to test your code if you do not need
additional packages. On the Notebook Dashboard page, you can create a
new notebook file (.ipynb) with a selected kernel by clicking on the
``New`` button at the top-right corner under the menu bar. On the
Notebook Editor page, you can change kernel by clicking ``Kernel`` in
the menubar and choosing ``Change kernel``.

-  Python 2.7 and Python 3.7 kernels are the Anaconda2 2019.07 and Anaconda3 2019.07 base environments.
   Each of them has over 150 packages automatically installed. 

-  WML CE kernels have the `IBM Watson Machine
   Learning Community Edition
   packages <https://public.dhe.ibm.com/ibmdl/export/pub/software/server/ibm-ai/conda/#/>`__.
   (You can check different versions by changing
   the ``Releases`` version in the ``Filters`` bar on the website.)

-  R kernel includes the `R Base
   Package <https://stat.ethz.ch/R-manual/R-devel/library/base/html/base-package.html>`__.

Switching to JupyterLab
-----------------------

After the Jupyter Notebook server starts, you can switch to JupyterLab by changing the url from ``.../tree`` to ``.../lab``. If you want to stop the server from JupyterLab, choose ``File`` >> ``Hub Control Panel`` in the menu bar, then press ``Stop My Notebook Server`` button in the panel.
