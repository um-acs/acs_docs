.. _general-software-jupyterhub:

JupyterHub
==========

JupyterHub provides browser-based Jupyter Notebook and JupyterLab sessions on
IDSC systems. It is useful for interactive testing, exploration, teaching, and
light analysis.

.. warning::

   Save work frequently. Interactive sessions can end when requested time
   expires, when a server is stopped, or during maintenance.

When to Use JupyterHub
----------------------

Use JupyterHub for:

* interactive notebook development
* testing Python or R code
* exploring data before writing batch jobs
* short interactive workflows

For long-running or production work, use LSF batch jobs.

.. important::

   JupyterHub is not a replacement for LSF batch jobs. Use it for interactive
   development and testing, then submit longer workloads through LSF.

Access Requirements
-------------------

Before using JupyterHub, users generally need:

* access to the relevant IDSC system
* access to the UM network or VPN, when required
* a valid IDSC account
* a valid project allocation for requested resources

Starting a Notebook Server
--------------------------

The general workflow is:

#. Open the JupyterHub service URL.
#. Log in with the required account credentials.
#. Choose the project and resources for the session.
#. Start the notebook server.
#. Open Jupyter Notebook or JupyterLab.
#. Save work frequently.
#. Stop the notebook server when finished.

Switching to JupyterLab
-----------------------

After the notebook server starts, the interface may open in classic Notebook.
To switch to JupyterLab, change the URL from:

::

   .../tree

to:

::

   .../lab

Stopping a Notebook Server
--------------------------

When finished, stop the notebook server instead of only closing the browser.

Recommended shutdown steps:

#. Save and close notebook files.
#. Stop the notebook server from the JupyterHub control panel.
#. Log out of JupyterHub.

.. warning::

   Logging out or closing the browser may not stop the notebook server. If the
   server is not stopped, it may continue running until the requested time
   expires.

System Notes
------------

Pegasus
~~~~~~~

Pegasus JupyterHub allows users to request notebook sessions on Pegasus compute
resources. Users may select resources such as memory, CPU cores, wall time,
project, and GPU queue when available.

Service URL:

::

   https://pegasusdev.ccs.miami.edu:8000

Pegasus login uses UM CaneID and Pegasus password.

Triton/Summit
~~~~~~~~~~~~~

Triton/Summit JupyterHub allows users to request notebook sessions using LSF
behind the scenes. Users can choose memory, CPU cores, requested time, and
whether to use GPU resources when available.

Service URL:

::

   https://t2.idsc.miami.edu:8000/hub/login

Triton/Summit login uses the user's IDSC account and password.

.. caution::

   Service URLs, login methods, kernels, and available resource options can
   change. If a service URL does not work, use the current IDSC service
   information or contact IDSC support.

Jupyter Kernels
---------------

JupyterHub may provide shared Python, R, or deep-learning kernels. Available
kernels can differ between Pegasus and Triton/Summit.

Pegasus may provide GPU/deep-learning kernels through supported environments.
Triton/Summit may provide Power-compatible kernels such as RocketCE/Open-CE
based environments.

.. note::

   Do not copy long package lists into this page. Kernel package lists change
   over time. Instead, show users how to check packages from inside the running
   notebook.

Check Python packages from a notebook cell:

.. code:: python

   import sys
   print(sys.executable)
   print(sys.version)

Check installed packages from a notebook terminal:

::

   python -m pip list

Using Custom Environments
-------------------------

If a required package is missing, users can:

* use a project-specific Conda environment
* create a Jupyter kernel for their environment, if supported
* use Apptainer for a custom container workflow
* submit production work through LSF

Recommended Practice
--------------------

* Use JupyterHub for exploration and short tests.
* Save work frequently.
* Stop notebook servers when finished.
* Use LSF batch jobs for long-running production work.
* Keep important scripts and notebooks in backed-up project locations when
  possible.
