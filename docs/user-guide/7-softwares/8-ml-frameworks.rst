.. _general-software-ml-frameworks:

ML Frameworks
==============

PyTorch and TensorFlow are available on both Pegasus and Triton/Summit, but the
environment must match the system architecture and GPU software stack.

This page covers non-container GPU framework workflows. For container-based GPU
workflows, see the Apptainer GPU Containers page.

.. important::

   GPU framework code must run on GPU compute nodes. Request GPU resources
   through LSF before running PyTorch or TensorFlow GPU workloads.

Availability
------------

.. list-table::
   :header-rows: 1
   :widths: 25 20 20 35

   * - Framework
     - Pegasus
     - Triton/Summit
     - Notes
   * - PyTorch
     - Available
     - Available
     - Use architecture-compatible Python, Conda, module, JupyterHub, or
       container environments.
   * - TensorFlow
     - Available
     - Available
     - GPU support depends on CUDA, cuDNN, driver, and architecture
       compatibility.

Start a GPU Session
-------------------

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

Architecture Notes
------------------

Pegasus uses ``x86_64`` architecture. Standard ``linux-64`` Python, Conda, and
framework packages are generally the starting point.

Triton/Summit uses ``ppc64le`` architecture. Standard ``amd64`` or ``x86_64``
packages and images may not work. Use Power-compatible environments such as
Open-CE, RocketCE, compatible Conda packages, or Apptainer images built for
``ppc64le``.

.. caution::

   Do not assume that a PyTorch or TensorFlow environment created on Pegasus
   will work on Triton/Summit. The architecture and package availability differ.

Check PyTorch
-------------

After starting a GPU session and loading or activating the desired environment:

::

   python -c "import torch; print('torch:', torch.__version__); print('cuda available:', torch.cuda.is_available()); print('gpu:', torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'no GPU')"

A GPU-capable PyTorch environment should report:

::

   cuda available: True

Check TensorFlow
----------------

After starting a GPU session and loading or activating the desired environment:

::

   python -c "import tensorflow as tf; print('tensorflow:', tf.__version__); print('gpus:', tf.config.list_physical_devices('GPU'))"

A GPU-capable TensorFlow environment should return one or more GPU devices.

.. caution::

   TensorFlow GPU environments are sensitive to CUDA, cuDNN, and driver
   compatibility. If TensorFlow imports but shows an empty GPU list, check the
   GPU allocation, environment, architecture, and framework build.

Pegasus Notes
-------------

Pegasus GPU workflows may use queues such as ``gpu_h100`` when the project has
access. Pegasus uses ``x86_64`` architecture.

Use supported modules, Miniforge environments, JupyterHub kernels, or Apptainer
containers that match the Pegasus GPU software stack.

Triton/Summit Notes
-------------------

Triton/Summit GPU workflows may use the ``interactive`` queue with
``-gpu "num=1"`` when the project has access. Triton/Summit uses ``ppc64le``
architecture.

Use Power-compatible environments such as Open-CE/RocketCE or other
``ppc64le``-compatible framework builds.

Recommended Practice
--------------------

* Check ``nvidia-smi`` on the host before checking the framework.
* Use the correct GPU queue and project allocation.
* Use architecture-compatible packages or containers.
* Use JupyterHub for interactive testing when appropriate.
* Use LSF batch jobs for production GPU runs.
* Use Apptainer when a portable or isolated framework stack is required.
