.. _general-software-jupyterhub:

JupyterHub
==========

JupyterHub provides browser-based Jupyter Notebook and JupyterLab sessions on
IDSC systems. It is useful for interactive development, testing, teaching,
visualization, and short exploratory analysis.

This page explains how users connect, start a server, select resources, switch
to JupyterLab, manage kernels, and stop the server.

.. warning::

   JupyterHub is for interactive work. Long-running production workloads should
   be submitted through LSF batch jobs.

Access Requirements
-------------------

Before using JupyterHub, users generally need:

* an active IDSC account
* access to the target system
* access to the required project allocation
* UM campus network access or VPN access when off-site
* permission to use requested resources such as GPU queues, if applicable

.. note::

   Service URLs and login methods can change. If a URL does not work, check the
   current IDSC service page or contact IDSC support.

JupyterHub Service URLs
-----------------------

Pegasus JupyterHub:

::

   https://pegasusdev.ccs.miami.edu:8000

Triton/Summit JupyterHub:

::

   https://t2.idsc.miami.edu:8000/hub/login

.. caution::

   Confirm current JupyterHub service URLs before publishing final
   documentation. If either service URL changes, update this page instead of
   creating a separate cluster-specific JupyterHub page.

Login
-----

The login method may differ by system.

Pegasus Notes
~~~~~~~~~~~~~

Pegasus JupyterHub uses the Pegasus login method documented by IDSC. Users may
need UM CaneID and Pegasus password access depending on the current service
configuration.

Triton/Summit Notes
~~~~~~~~~~~~~~~~~~~

Triton/Summit JupyterHub uses the Triton/Summit login method documented by
IDSC. Users may need their IDSC account credentials depending on the current
service configuration.

Starting a Server
-----------------

A typical JupyterHub workflow is:

#. Open the JupyterHub URL for the target system.
#. Log in with the required credentials.
#. Choose the project or account allocation.
#. Choose resources such as CPU cores, memory, time, and GPU options if
   available.
#. Start the server.
#. Open Notebook or JupyterLab.
#. Save work frequently.
#. Stop the server when finished.

Resource Selection
------------------

JupyterHub may ask for resource settings before the server starts. Available
options can differ between Pegasus and Triton/Summit.

Common options include:

* project or account
* queue or resource type
* requested time
* CPU cores
* memory
* GPU option, if supported

.. important::

   Select resources that match the work being done. For GPU notebooks, the
   project must have access to the requested GPU resources.

Opening JupyterLab
------------------

Some servers open in the classic Notebook interface. To switch to JupyterLab,
change the URL ending from:

::

   /tree

to:

::

   /lab

For example:

::

   https://<jupyterhub-host>/user/<username>/tree

becomes:

::

   https://<jupyterhub-host>/user/<username>/lab

Kernels and Environments
------------------------

JupyterHub may provide multiple kernels, such as Python, R, or GPU/deep-learning
kernels. Available kernels can differ by system.

Check the active Python inside a notebook:

.. code:: python

   import sys
   print(sys.executable)
   print(sys.version)

Check available packages:

::

   python -m pip list

Check GPU access from a Python kernel:

.. code:: python

   import torch
   print(torch.cuda.is_available())

or:

.. code:: python

   import tensorflow as tf
   print(tf.config.list_physical_devices("GPU"))

.. caution::

   A package being available in one JupyterHub kernel does not mean it is
   available in every kernel or on every system.

Stopping the Server
-------------------

When finished, stop the notebook server from the JupyterHub control panel.

Recommended shutdown steps:

#. Save notebook files.
#. Shut down running notebooks or kernels if needed.
#. Open the JupyterHub control panel.
#. Stop the server.
#. Log out.

.. warning::

   Closing the browser tab does not always stop the JupyterHub server. Stop the
   server from the control panel so resources are released.

When to Use LSF Instead
-----------------------

Use LSF batch jobs instead of JupyterHub for:

* long-running production workloads
* large memory jobs
* large GPU jobs
* workflows that need many CPU cores
* repeated or automated runs
* jobs that should continue without an interactive browser session

Recommended Practice
--------------------

* Use JupyterHub for interactive development and testing.
* Use LSF for long-running production jobs.
* Save notebooks and scripts in project or scratch storage when appropriate.
* Stop servers when finished.
* Confirm kernels and package versions before running important analyses.
