GPU Containers
==============

Apptainer can run GPU-enabled containers on GPU compute nodes. For NVIDIA GPUs,
use the ``--nv`` option when running the container.

GPU workloads should not be run directly on login or management nodes. Start an
LSF GPU job first, then run Apptainer inside that job.

.. warning::

   Do not run GPU workloads directly on login nodes. Request a GPU allocation
   through LSF first, then load Apptainer and run the container inside the
   allocated GPU session.

Workflow
--------

A typical GPU container workflow is:

#. Start an LSF GPU session.
#. Load the Apptainer module inside the job.
#. Use a container image that matches the cluster architecture.
#. Check GPU access on the host.
#. Run the container with ``--nv``.
#. Check GPU access inside the container.
#. Check the required framework, such as PyTorch or TensorFlow.

A minimal GPU passthrough check is:

::

   bsub -P <project> -Is -q <gpu_queue> -W 00:30 -n 1 -gpu "num=1" bash
   module load apptainer/<version>
   hostname
   uname -m
   nvidia-smi
   apptainer exec --nv ubuntu_22.04.sif nvidia-smi

.. important::

   The GPU is provided by the host compute node. The NVIDIA driver comes from
   the host. CUDA, cuDNN, PyTorch, TensorFlow, and other framework libraries
   usually come from the container image. The container libraries must be
   compatible with the host driver.

Prepare a Basic Image
---------------------

Use a simple Ubuntu image to check GPU passthrough before checking PyTorch,
TensorFlow, or another framework.

Load Apptainer:

::

   module avail apptainer
   module load apptainer/<version>

For example, on Pegasus:

::

   module load apptainer/1.0.2

Pull an Ubuntu image:

::

   apptainer pull ubuntu_22.04.sif docker://ubuntu:22.04

Check that the image was created:

::

   ls -lh ubuntu_22.04.sif

Check that the image runs:

::

   apptainer exec ubuntu_22.04.sif uname -m

The container architecture should match the host architecture.

.. caution::

   Avoid using Alpine images for GPU validation. Alpine uses ``musl libc``, and
   NVIDIA tools or injected GPU libraries may not work as expected. Use Ubuntu,
   RocketCE, PyTorch, TensorFlow, or another framework image for GPU work.

Start a GPU Session
-------------------

Request an interactive GPU job through LSF. The GPU must be requested explicitly
with ``-gpu``.

For Triton/Summit:

::

   bsub -P hpc -Is -q interactive -W 00:30 -n 1 -gpu "num=1" bash

For Pegasus H100 GPUs:

::

   bsub -P hpc -Is -q gpu_h100 -W 00:30 -n 1 -gpu "num=1" bash

For another project, replace ``hpc`` with your project name:

::

   bsub -P <project> -Is -q <gpu_queue> -W 00:30 -n 1 -gpu "num=1" bash

After the job starts, the prompt should show a compute node, for example:

::

   [user@gpu2 ~]$

.. note::

   GPU queues may require access to the correct project or account. If the GPU
   job is rejected, remains pending unexpectedly, or reports that the project
   cannot use the requested GPU resources, check that you are using the correct
   project name with ``-P`` and that your account has access to the requested
   GPU queue.

Check GPU Access on the Host
----------------------------

Check the node and architecture:

::

   hostname
   uname -m

Check that the GPU is visible on the host:

::

   nvidia-smi

A successful GPU allocation should show an NVIDIA GPU, such as:

::

   Tesla V100-SXM2-16GB

or:

::

   NVIDIA H100 NVL

If ``nvidia-smi`` prints ``No devices were found``, the job did not receive a
GPU allocation. Exit the job and start a new session with ``-gpu "num=1"``.

Run with ``--nv``
-----------------

Use ``--nv`` when running a GPU container. This option exposes the NVIDIA GPU
devices and required host NVIDIA libraries inside the container.

First check that the host GPU is visible inside the GPU job:

::

   hostname
   uname -m
   nvidia-smi

Then check GPU passthrough inside the container:

::

   apptainer exec --nv ubuntu_22.04.sif nvidia-smi

If ``nvidia-smi`` works on the host but fails inside the container, check that
the command was run with ``--nv`` and that the image is compatible with the
cluster architecture.

Container Compatibility
-----------------------

Container architecture must match the cluster architecture.

========================   ========================   ===============================
Item                       Triton/Summit              Pegasus
========================   ========================   ===============================
Architecture               ppc64le                    x86_64
Example Apptainer module   apptainer/1.1.9            apptainer/1.0.2
GPU queue                  interactive                gpu_h100
GPU request                -gpu "num=1"               -gpu "num=1"
GPU examples               NVIDIA V100 class GPUs     NVIDIA H100 class GPUs
Framework image type       ppc64le-compatible images  x86_64-compatible images
========================   ========================   ===============================

.. caution::

   Standard ``amd64`` or ``x86_64`` images do not run on Triton/Summit
   ``ppc64le`` nodes. A wrong-architecture image may fail with an error similar
   to:

   ::

      images architecture (amd64) could not run on the hosts (ppc64le)

Framework Images
----------------

After GPU passthrough works, check the required machine learning framework
inside the container.

Triton/Summit
^^^^^^^^^^^^^

Triton/Summit uses ``ppc64le`` architecture. Standard public ``amd64`` or
``x86_64`` PyTorch/TensorFlow images will not run on this system. Use
``ppc64le``-compatible framework images.

RocketCE images are commonly used for Power-compatible PyTorch and TensorFlow
environments.

Example image pulls:

::

   apptainer pull rocketce_pytorch_py310.sif docker://quay.io/rocketce/pytorch:py310-rce180
   apptainer pull rocketce_tensorflow_py310.sif docker://quay.io/rocketce/tensorflow:py310-rce180

Start an interactive GPU session:

::

   bsub -P hpc -Is -q interactive -W 00:30 -n 1 -gpu "num=1" bash

The architecture should be ``ppc64le``:

::

   uname -m

Set the image and Python paths:

::

   PY=/home/rocketce/conda/envs/rocketce/bin/python
   PT=rocketce_pytorch_py310.sif
   TF=rocketce_tensorflow_py310.sif

Check PyTorch GPU access:

::

   apptainer exec --nv --cleanenv $PT $PY -c "import torch; print('torch:', torch.__version__); print('cuda available:', torch.cuda.is_available()); print('cuda:', torch.version.cuda); print('gpu:', torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'no GPU')"

A successful PyTorch GPU configuration should report:

::

   cuda available: True

and should show the GPU name.

Check TensorFlow GPU access:

::

   apptainer exec --nv --cleanenv $TF $PY -c "import tensorflow as tf; print('tensorflow:', tf.__version__); print('gpus:', tf.config.list_physical_devices('GPU'))"

A successful TensorFlow GPU configuration should return one or more GPU devices.

The RocketCE images store PyTorch and TensorFlow inside the internal Conda
environment. Use this Python path when running framework commands:

::

   /home/rocketce/conda/envs/rocketce/bin/python

Pegasus
^^^^^^^

Pegasus uses ``x86_64`` architecture. GPU container images should also be built
for ``x86_64``.

Load Apptainer:

::

   module load apptainer/1.0.2

Start an interactive GPU session on an H100 GPU node:

::

   bsub -P hpc -Is -q gpu_h100 -W 00:30 -n 1 -gpu "num=1" bash

The architecture should be ``x86_64``:

::

   uname -m

Pull a PyTorch image if it is not already available:

::

   apptainer pull pytorch_latest.sif docker://pytorch/pytorch:latest

Set the image path:

::

   PT=pytorch_latest.sif

Check PyTorch GPU access:

::

   apptainer exec --nv --cleanenv $PT python -c "import torch; print('torch:', torch.__version__); print('cuda available:', torch.cuda.is_available()); print('cuda:', torch.version.cuda); print('gpu:', torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'no GPU')"

A successful PyTorch GPU configuration should report:

::

   cuda available: True

and should show the GPU name.

TensorFlow images can also be used when the image libraries are compatible with
the host driver.

Example TensorFlow image pull:

::

   apptainer pull tensorflow_gpu.sif docker://tensorflow/tensorflow:latest-gpu

Set the image path:

::

   TF=tensorflow_gpu.sif

Check TensorFlow GPU access:

::

   apptainer exec --nv --cleanenv $TF python -c "import tensorflow as tf; print('tensorflow:', tf.__version__); print('gpus:', tf.config.list_physical_devices('GPU'))"

A successful TensorFlow GPU configuration should return one or more GPU devices.

.. caution::

   TensorFlow GPU containers are sensitive to CUDA, cuDNN, and driver
   compatibility. If TensorFlow imports successfully but returns an empty GPU
   list, the container image may not be compatible with the host GPU software
   stack. Try another TensorFlow image or use an IDSC-supported software
   environment if available.

Batch Jobs
----------

The same container commands can be used in an LSF batch script. The example
below checks a Pegasus PyTorch GPU container.

Create ``gpu_container_test.job``:

.. code:: bash

   #!/bin/bash
   #BSUB -P hpc
   #BSUB -J gpu_container_test
   #BSUB -q gpu_h100
   #BSUB -W 00:30
   #BSUB -n 1
   #BSUB -gpu "num=1"
   #BSUB -o gpu_container_test.%J.out
   #BSUB -e gpu_container_test.%J.err

   module load apptainer/1.0.2

   IMAGE=/path/to/pytorch_latest.sif

   echo "Host: $(hostname)"
   echo "Host architecture: $(uname -m)"
   nvidia-smi

   apptainer exec --nv --cleanenv $IMAGE python -c "import torch; print('torch:', torch.__version__); print('cuda available:', torch.cuda.is_available()); print('cuda:', torch.version.cuda); print('gpu:', torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'no GPU')"

Submit the job:

::

   bsub < gpu_container_test.job

After submitting the job, LSF prints the job ID. This only confirms that the job
was accepted by the scheduler. Check the job state with ``bjobs`` and review the
``.out`` and ``.err`` files after the job finishes.

A successful output should show the GPU from ``nvidia-smi`` and the framework
should report GPU availability inside the container.

For Triton/Summit, use the interactive queue, a ``ppc64le``-compatible image,
and the appropriate Python path for the selected framework image.

Common Problems
---------------

.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Problem
     - Fix
   * - ``nvidia-smi`` shows no devices
     - Request a GPU with ``-gpu "num=1"`` and check that the job is running on
       a GPU node.
   * - ``apptainer: command not found``
     - Load the cluster Apptainer module inside the LSF job.
   * - Wrong-architecture image error
     - Use ``ppc64le`` images on Triton/Summit and ``x86_64`` images on
       Pegasus.
   * - TensorFlow imports but shows ``gpus: []``
     - The image may have CUDA/cuDNN compatibility issues. Try another
       TensorFlow image or use an IDSC-supported environment if available.
   * - PyTorch reports ``cuda available: False``
     - Check that the job has a GPU allocation, the container was run with
       ``--nv``, and the image has GPU-enabled PyTorch installed.
   * - GPU works on host but not in container
     - Run the container with ``apptainer exec --nv`` and confirm that the image
       architecture matches the host architecture.
   * - Alpine image fails with NVIDIA library errors
     - Use Ubuntu, RocketCE, PyTorch, or TensorFlow images instead of Alpine for
       GPU validation.
   * - Job is rejected or stays pending
     - Check the GPU queue, project name, wall time, and whether the project has
       access to the requested GPU resources.

Recommended Practice
--------------------

* Request GPU resources through LSF before running GPU containers.
* Load Apptainer inside the GPU job.
* Use ``--nv`` for NVIDIA GPU containers.
* Check GPU access first with ``nvidia-smi`` on the host.
* Then check GPU passthrough with ``apptainer exec --nv image.sif nvidia-smi``.
* Use architecture-compatible images.
* Use ``--cleanenv`` when host environment variables or modules may interfere.
* Treat each ML framework image as image-specific until it detects the GPU
  inside the container.
* Use full paths for container images in batch job scripts.
* Avoid downloading large container images inside every submitted job.

.. tip::

   Start with a simple GPU passthrough check before debugging PyTorch,
   TensorFlow, or other frameworks. If ``nvidia-smi`` does not work inside the
   container with ``--nv``, the framework will usually not detect the GPU either.