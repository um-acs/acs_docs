Practical Examples
==================

This page gives short, copyable examples for common Apptainer workflows on IDSC
clusters. These examples assume that the user has already read the quick start,
file/bind-mount, LSF job, and GPU container pages.

The examples are intentionally small. For real work, replace the placeholder
project names, image paths, scripts, input directories, and output directories
with the correct paths for the project.

.. tip::

   Use these examples as starting templates. For production jobs, use full paths,
   project or scratch storage, explicit bind mounts, and an LSF job script.

Example 1: Quick Container Check
--------------------------------

Use this example to confirm that Apptainer is loaded and that a container image
can run a simple command.

Load Apptainer:

::

   module avail apptainer
   module load apptainer/<version>

Pull a small image:

::

   apptainer pull alpine_latest.sif docker://alpine:latest

Run a basic command:

::

   apptainer exec alpine_latest.sif cat /etc/os-release

Check the host and container architecture:

::

   uname -m
   apptainer exec alpine_latest.sif uname -m

.. caution::

   The container architecture must match the host architecture. Standard
   ``amd64`` or ``x86_64`` images do not run on ``ppc64le`` systems.

Example 2: Run a Python Script
------------------------------

This example runs a Python script stored on the host using Python from a
container image.

Create a simple Python script on the host:

.. code:: bash

   cat > pyscript.py <<'EOF'
   a = 1.5
   b = 6.3
   print(f"The sum of {a} and {b} is {a + b}")
   EOF

Pull a Python image:

::

   apptainer pull python_latest.sif docker://python:latest

Run the script inside the container:

::

   apptainer exec python_latest.sif python3 pyscript.py

The script remains on the host filesystem. Apptainer runs Python from the
container but reads the script from the current directory.

Example 3: Use Input and Output Directories
-------------------------------------------

This example shows the recommended pattern for using host input and output
directories with a container.

Create input and output directories:

::

   mkdir -p data results
   echo "Hello from host data" > data/input.txt

Run the container with explicit bind mounts:

::

   apptainer exec \
       --bind "$PWD/data":/data:ro \
       --bind "$PWD/results":/results \
       alpine_latest.sif \
       sh -c 'cat /data/input.txt > /results/output.txt'

Check the output on the host:

::

   cat results/output.txt

In this example, ``data`` is mounted read-only at ``/data`` and ``results`` is
mounted at ``/results`` for output.

.. important::

   Bind mounts do not bypass host permissions. The container can only read or
   write files that the user can access on the host.

Example 4: CPU Batch Job with LSF
---------------------------------

This example runs a Python script through Apptainer inside an LSF batch job.

Create a working directory in scratch or project storage:

::

   export PROJECT=<project>
   export WORKDIR=/scratch/projects/${PROJECT}/${USER}/apptainer_cpu_example

   mkdir -p ${WORKDIR}/scripts
   mkdir -p ${WORKDIR}/results
   mkdir -p ${WORKDIR}/containers

Create a Python script:

.. code:: bash

   cat > ${WORKDIR}/scripts/pyscript.py <<'EOF'
   from pathlib import Path

   output = Path("/results/message.txt")
   output.write_text("Hello from an Apptainer LSF job.\n")
   print("Wrote", output)
   EOF

Pull the Python image once:

::

   cd ${WORKDIR}/containers
   apptainer pull python_latest.sif docker://python:latest

Create ``apptainer_cpu_example.job``:

.. code:: bash

   #!/bin/bash
   #BSUB -P <project>
   #BSUB -J apptainer_cpu_example
   #BSUB -q general
   #BSUB -n 1
   #BSUB -R "rusage[mem=4000]"
   #BSUB -W 00:30
   #BSUB -o apptainer_cpu_example.%J.out
   #BSUB -e apptainer_cpu_example.%J.err

   module load apptainer/<version>

   WORKDIR=/scratch/projects/<project>/$USER/apptainer_cpu_example
   IMAGE=${WORKDIR}/containers/python_latest.sif

   echo "Host: $(hostname)"
   echo "Working directory: $(pwd)"
   echo "Architecture: $(uname -m)"
   apptainer --version

   apptainer exec --cleanenv \
       --bind ${WORKDIR}/scripts:/scripts:ro \
       --bind ${WORKDIR}/results:/results \
       ${IMAGE} \
       python3 /scripts/pyscript.py

Submit the job:

::

   bsub < apptainer_cpu_example.job

Check the job:

::

   bjobs

After the job finishes, check the result:

::

   cat ${WORKDIR}/results/message.txt

.. tip::

   This is a good general pattern for batch jobs: keep the image, scripts,
   input data, and output directory in known host locations and bind them
   explicitly inside the job script.

Example 5: Build a Small Container from a Definition File
--------------------------------------------------------

This example builds a small image from a definition file.

Create ``hello.def``:

.. code:: bash

   cat > hello.def <<'EOF'
   Bootstrap: docker
   From: ubuntu:22.04

   %post
       apt-get update
       apt-get install -y --no-install-recommends cowsay
       apt-get clean
       rm -rf /var/lib/apt/lists/*

   %runscript
       /usr/games/cowsay "Hello from Apptainer"
   EOF

Build the image:

::

   apptainer build hello.sif hello.def

If the build requires elevated permissions and fakeroot is available:

::

   apptainer build --fakeroot hello.sif hello.def

Run the image:

::

   apptainer run hello.sif

.. warning::

   Avoid large or long-running builds on login nodes. If the build downloads
   many packages, compiles software, or uses significant CPU, memory, or disk
   I/O, start an appropriate LSF session first.

Example 6: GPU Container Check
------------------------------

This example checks GPU passthrough and PyTorch GPU visibility inside an
Apptainer container.

Start an interactive GPU session first.

For Pegasus H100 GPUs:

::

   bsub -P <project> -Is -q gpu_h100 -W 00:30 -n 1 -gpu "num=1" bash

For Triton/Summit:

::

   bsub -P <project> -Is -q interactive -W 00:30 -n 1 -gpu "num=1" bash

After the GPU job starts, load Apptainer:

::

   module load apptainer/<version>

Check the host GPU:

::

   hostname
   uname -m
   nvidia-smi

Check GPU passthrough with a container:

::

   apptainer exec --nv ubuntu_22.04.sif nvidia-smi

Check PyTorch GPU access:

::

   apptainer exec --nv --cleanenv pytorch_latest.sif python -c "import torch; print('torch:', torch.__version__); print('cuda available:', torch.cuda.is_available()); print('gpu:', torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'no GPU')"

A successful PyTorch GPU configuration should report:

::

   cuda available: True

.. caution::

   For Triton/Summit, use a ``ppc64le``-compatible framework image. Standard
   ``amd64`` or ``x86_64`` PyTorch images are not compatible with
   ``ppc64le`` nodes.

Example 7: More Isolated Run with Explicit Binds
------------------------------------------------

Use ``--contain`` when checking whether a workflow depends on host paths that
are not explicitly mounted.

Create input and output directories:

::

   mkdir -p data results
   echo "isolated input" > data/input.txt

Run with ``--contain`` and explicit bind mounts:

::

   apptainer exec --contain \
       --bind "$PWD/data":/data:ro \
       --bind "$PWD/results":/results \
       alpine_latest.sif \
       sh -c 'cat /data/input.txt > /results/isolated_output.txt'

Check the output:

::

   cat results/isolated_output.txt

This is useful for debugging workflows before moving them into batch jobs.

Example 8: Reuse Bind Mounts with ``APPTAINER_BIND``
----------------------------------------------------

For workflows that need the same bind mounts repeatedly, set
``APPTAINER_BIND``.

::

   export WORKDIR=/scratch/projects/<project>/$USER/my_apptainer_job
   mkdir -p ${WORKDIR}/data ${WORKDIR}/results

   export APPTAINER_BIND="${WORKDIR}/data:/data:ro,${WORKDIR}/results:/results"

   apptainer exec image.sif command

Unset the variable when it is no longer needed:

::

   unset APPTAINER_BIND

.. note::

   ``APPTAINER_BIND`` affects later Apptainer commands in the same shell
   session. If a later command behaves unexpectedly, check whether
   ``APPTAINER_BIND`` is still set.

Recommended Pattern
-------------------

For most user workflows:

#. Pull or build the ``.sif`` image once.
#. Store the image in an appropriate home, project, or scratch location.
#. Keep scripts and input data on the host filesystem.
#. Bind input directories read-only when possible.
#. Bind output directories explicitly.
#. Use full paths in LSF job scripts.
#. Load Apptainer inside the LSF job.
#. Use ``--cleanenv`` when host environment variables may interfere.

.. important::

   These examples are templates. Users should adjust the project name, queue,
   module version, image path, input path, output path, wall time, CPU, memory,
   and GPU requests for their own workflow.