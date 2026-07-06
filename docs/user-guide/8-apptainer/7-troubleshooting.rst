Troubleshooting Common Issues
=============================

This page lists common problems users may see when running Apptainer on IDSC
clusters. Use it after checking the quick start, file/bind-mount, LSF job, and
GPU container pages.

.. tip::

   When debugging, start with a small command first. Check the Apptainer module,
   host architecture, image architecture, working directory, bind mounts, and
   environment before running a full workflow.

Apptainer Command Not Found
---------------------------

If the ``apptainer`` command is not available, load the module first.

::

   module avail apptainer
   module load apptainer/<version>
   apptainer --version

For example, on Pegasus:

::

   module load apptainer/1.0.2

For LSF jobs, load the module inside the job script, not only in the login
shell.

.. important::

   Commands that work in an interactive login shell may fail in a batch job if
   the required module is not loaded inside the job script.

Image Is Read-Only
------------------

Downloaded ``.sif`` images are read-only by default. This is normal.

For temporary changes during one session:

::

   apptainer shell --writable-tmpfs image.sif

Changes made with ``--writable-tmpfs`` disappear when the container exits.

For reproducible software installation, write a definition file and build a new
``.sif`` image instead of manually modifying a downloaded image.

Wrong Architecture
------------------

Container images must match the architecture of the cluster where they run.

Check the host architecture:

::

   uname -m

Check the image by running a small command:

::

   apptainer exec image.sif uname -m

A wrong-architecture image may fail with an error similar to:

::

   images architecture (amd64) could not run on the hosts (ppc64le)

.. caution::

   Standard ``amd64`` or ``x86_64`` images do not run on ``ppc64le`` systems.
   Use an image that matches the target cluster architecture.

File Not Found Inside Container
-------------------------------

The file may not be inside the container, or the host directory may not be bound
into the container.

Check the file on the host:

::

   ls /path/to/file

Bind the needed directory:

::

   apptainer exec --bind /host/data:/data image.sif ls /data

Use full paths in LSF job scripts because the job may start in a different
working directory than expected.

.. tip::

   If a file is found interactively but not in LSF, print ``pwd`` and ``ls`` in
   the job output, then use absolute paths for the image, scripts, input data,
   and output directory.

Permission Denied for Host Files
--------------------------------

Apptainer runs as your normal user by default. It does not give extra permission
to read or write host files that the user cannot normally access.

Check permissions on the host:

::

   ls -ld /path/to/directory
   ls -l /path/to/file

If project storage is being used, confirm that the account has access to the
project directory.

.. important::

   Bind mounts do not bypass host permissions. If the user cannot access a file
   on the host, the container cannot access it either.

Output File Is Missing
----------------------

If a job finishes but the expected output file is missing, check where the file
was written.

Common causes include:

* The output was written inside the container instead of a bind-mounted host
  directory.
* The job started in a different working directory than expected.
* The output directory did not exist before the container command started.
* The user did not have write permission to the host output directory.

Create and bind the output directory explicitly:

::

   mkdir -p /scratch/projects/<project>/$USER/results

   apptainer exec        --bind /scratch/projects/<project>/$USER/results:/results        image.sif command

Fakeroot Not Available
----------------------

Some builds require fakeroot:

::

   apptainer build --fakeroot image.sif image.def

If fakeroot is not available for the account, request access through IDSC with a
brief description of the project requirement.

Fakeroot gives root-like permissions inside the build environment, but it does
not give access to host files that the account cannot normally access.

.. caution::

   Fakeroot is for container build workflows. It does not provide root access on
   the host cluster.

Package Installation Fails During Build
---------------------------------------

If ``apt-get`` or another package manager fails during a build, check the
following:

* Use ``--fakeroot`` if the build needs elevated permissions.
* Run package installation commands inside ``%post`` of a definition file.
* Use a base image that supports the package manager being used.
* Avoid trying to install software into a read-only ``.sif`` at runtime.
* Check whether the package repository is available from the cluster network.

Example Ubuntu build section:

.. code:: bash

   %post
       apt-get update
       apt-get install -y --no-install-recommends python3
       apt-get clean
       rm -rf /var/lib/apt/lists/*

Container Works Interactively but Fails in LSF
----------------------------------------------

The LSF job environment may not match the interactive shell.

Check that the job script:

* Loads the Apptainer module.
* Uses full paths for images, scripts, data, and output.
* Binds required project or scratch directories.
* Uses ``--cleanenv`` when host modules or Conda environments conflict.
* Writes output to host storage, not to a read-only container path.
* Creates the output directory before the container command runs.

Minimal debug job:

.. code:: bash

   #!/bin/bash
   #BSUB -P <project>
   #BSUB -J apptainer_debug
   #BSUB -q general
   #BSUB -n 1
   #BSUB -R "rusage[mem=1000]"
   #BSUB -W 0:30
   #BSUB -o apptainer_debug.%J.out
   #BSUB -e apptainer_debug.%J.err

   module load apptainer/<version>

   echo "Host: $(hostname)"
   echo "Working directory: $(pwd)"
   echo "Architecture: $(uname -m)"
   apptainer --version

   echo "Visible files:"
   ls -lh

   echo "Container environment:"
   apptainer exec image.sif env | sort | head

GPU Not Visible Inside Container
--------------------------------

If a GPU container cannot see the GPU, check these items:

* The job must run on a GPU node.
* The GPU must be requested through LSF.
* The command must include ``--nv``.
* The image must match the cluster architecture.
* The image must contain a GPU-capable framework such as PyTorch or TensorFlow.
* The container CUDA/cuDNN/framework libraries must be compatible with the host
  NVIDIA driver.

Check the GPU on the host:

::

   nvidia-smi

Check GPU passthrough inside the container:

::

   apptainer exec --nv image.sif nvidia-smi

Then check the framework.

PyTorch example:

::

   apptainer exec --nv image.sif python3 -c "import torch; print(torch.cuda.is_available())"

TensorFlow example:

::

   apptainer exec --nv image.sif python3 -c "import tensorflow as tf; print(tf.config.list_physical_devices('GPU'))"

.. caution::

   If ``nvidia-smi`` works on the host but fails inside the container, check
   ``--nv`` and image compatibility first. If ``nvidia-smi`` works inside the
   container but the framework does not detect the GPU, the issue is usually
   related to the framework image or CUDA/cuDNN compatibility.

TensorFlow Shows an Empty GPU List
----------------------------------

TensorFlow may import successfully but still return an empty GPU list.

Example symptom:

::

   gpus: []

Common causes include:

* The job was not running on a GPU node.
* The container was not run with ``--nv``.
* The TensorFlow image was built for the wrong architecture.
* CUDA, cuDNN, or other GPU libraries in the image are not compatible with the
  host driver.
* The image contains a CPU-only TensorFlow installation.

Check GPU passthrough first:

::

   apptainer exec --nv image.sif nvidia-smi

Then check TensorFlow:

::

   apptainer exec --nv image.sif python3 -c "import tensorflow as tf; print(tf.config.list_physical_devices('GPU'))"

If ``nvidia-smi`` works inside the container but TensorFlow shows no GPUs, try a
different TensorFlow GPU image or use an IDSC-supported software environment if
available.

PyTorch Reports CUDA Is Not Available
-------------------------------------

PyTorch may import successfully but report that CUDA is not available.

Example symptom:

::

   cuda available: False

Common causes include:

* The job was not running on a GPU node.
* The container was not run with ``--nv``.
* The image contains a CPU-only PyTorch installation.
* The image is not compatible with the cluster architecture.
* CUDA libraries in the image are not compatible with the host driver.

Check PyTorch:

::

   apptainer exec --nv image.sif python3 -c "import torch; print(torch.__version__); print(torch.cuda.is_available())"

A GPU-capable PyTorch image should report:

::

   True

Environment Conflicts
---------------------

Host modules, Conda environments, and shell variables can affect software inside
the container. To reduce interference, use ``--cleanenv``:

::

   apptainer exec --cleanenv image.sif command

To pass a variable explicitly into the container, use the ``APPTAINERENV_``
prefix:

::

   export APPTAINERENV_MY_VARIABLE="value"
   apptainer exec --cleanenv image.sif env | grep MY_VARIABLE

.. tip::

   If a container works in one session but fails in another, try ``--cleanenv``.
   This can help identify whether host environment variables are affecting the
   container.

Cache Uses Too Much Space
-------------------------

Remote image downloads may use the Apptainer cache.

View the cache:

::

   apptainer cache list

Clean the cache:

::

   apptainer cache clean

Clean the cache carefully if other builds or image downloads are running.

.. note::

   For repeated jobs, pull or build a local ``.sif`` image once and reuse it
   instead of downloading the same remote image inside every job.

Remote Image Pull Fails
-----------------------

Remote image pulls may fail because of network, registry, rate-limit, or
authentication issues.

Example:

::

   apptainer pull image.sif docker://python:3.11

If the pull fails, check:

* The image name and tag.
* Whether the registry is reachable.
* Whether the image requires authentication.
* Whether the image architecture matches the target cluster.
* Whether the cache or output directory has enough space.

For repeated workflows, pull the image once and store the ``.sif`` file in an
appropriate home, project, or scratch location.

Jupyter or RStudio Left Running
-------------------------------

Do not run Jupyter Notebook or RStudio container applications directly on login
nodes. Use an interactive LSF job or the recommended IDSC service.

If an Apptainer instance was started, list and stop it:

::

   apptainer instance list
   apptainer instance stop <instance-name>

.. warning::

   Do not leave server-style container applications running unattended. Stop the
   Apptainer instance and exit the LSF session when finished.

When to Contact IDSC
--------------------

Contact IDSC if the issue involves access, permissions, services, or unclear
cluster-specific behavior.

Useful information to include:

* Cluster name.
* Project name.
* Queue name.
* Container image path.
* Full command or job script.
* Job ID, if the issue happened in LSF.
* Output and error files.
* The result of ``hostname``, ``uname -m``, and ``apptainer --version``.

.. admonition:: Getting Help
   :class: important

   If the problem involves GPU/project access, fakeroot access, Jupyter/RStudio
   server workflows, or a workflow that may affect other users, submit an IDSC
   support request with the details listed above.