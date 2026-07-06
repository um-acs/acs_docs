.. _general-software-gpu-frameworks:

GPU Frameworks
==============

GPU frameworks such as PyTorch and TensorFlow can be used through modules,
Conda environments, JupyterHub kernels, or Apptainer containers. This page
covers general framework guidance for non-container environments.

For container-based GPU workflows, use the Apptainer GPU Containers page.

.. important::

   GPU jobs must run on GPU compute nodes. Request GPU resources through LSF
   before running GPU framework code.

Choosing a GPU Workflow
-----------------------

.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Workflow
     - When to use it
   * - Module-based framework
     - Use when a supported PyTorch, TensorFlow, or related module is available.
   * - Conda environment
     - Use when a project needs a custom package stack and compatible packages
       are available for the system architecture.
   * - JupyterHub kernel
     - Use for interactive development and small tests.
   * - Apptainer container
     - Use when the workflow needs a portable or containerized software stack.

GPU LSF Session
---------------

Request a GPU session before testing a framework.

Pegasus H100 example:

::

   bsub -P <project> -Is -q gpu_h100 -W 00:30 -n 1 -gpu "num=1" bash

Triton/Summit example:

::

   bsub -P <project> -Is -q interactive -W 00:30 -n 1 -gpu "num=1" bash

Check the host GPU:

::

   hostname
   uname -m
   nvidia-smi

.. note::

   Queue names and GPU hardware differ between systems. Use the appropriate
   queue and project allocation for the system.

Architecture Compatibility
--------------------------

GPU framework packages must match the system architecture and GPU software
stack.

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - System
     - Notes
   * - Pegasus
     - Uses ``x86_64``. Standard ``x86_64`` GPU packages and images are usually
       the starting point.
   * - Triton/Summit
     - Uses ``ppc64le``. Standard ``amd64`` or ``x86_64`` packages/images may
       not work. Use Power-compatible packages, Open-CE/RocketCE environments,
       or ``ppc64le`` containers.

PyTorch Check
-------------

After starting a GPU session and loading or activating the desired environment,
check PyTorch:

::

   python -c "import torch; print('torch:', torch.__version__); print('cuda available:', torch.cuda.is_available()); print('gpu:', torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'no GPU')"

A GPU-capable PyTorch environment should report:

::

   cuda available: True

TensorFlow Check
----------------

Check TensorFlow:

::

   python -c "import tensorflow as tf; print('tensorflow:', tf.__version__); print('gpus:', tf.config.list_physical_devices('GPU'))"

A GPU-capable TensorFlow environment should return one or more GPU devices.

.. caution::

   TensorFlow GPU environments are sensitive to CUDA, cuDNN, and driver
   compatibility. If TensorFlow imports but shows an empty GPU list, the
   environment may not match the system GPU software stack.

Pegasus Notes
-------------

Pegasus GPU workflows may use the ``gpu_h100`` queue for H100 GPU nodes when the
project has access. Pegasus uses ``x86_64`` architecture.

For custom PyTorch or TensorFlow installs, standard ``linux-64`` Conda packages
or framework-provided ``x86_64`` wheels are generally the starting point.

Triton/Summit Notes
-------------------

Triton/Summit GPU workflows may use the ``interactive`` queue with
``-gpu "num=1"`` when the project has access. Triton/Summit uses ``ppc64le``
architecture.

Power-compatible environments such as Open-CE or RocketCE may be needed for
PyTorch, TensorFlow, and related deep-learning packages.

.. important::

   Do not assume that a GPU framework environment created on Pegasus will work
   on Triton/Summit. The architecture and package availability differ.

Recommended Practice
--------------------

* Check ``nvidia-smi`` on the host before checking the framework.
* Use the right queue and project allocation.
* Use architecture-compatible packages.
* Prefer supported modules or kernels when they meet the workflow needs.
* Use Apptainer for portable or isolated framework stacks.
* Use LSF batch jobs for production GPU runs.
