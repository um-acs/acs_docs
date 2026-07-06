.. _general-software-jupyterhub:

JupyterHub and Personal JupyterLab
==================================

IDSC users may work with Jupyter in two different ways:

#. Use an IDSC-managed JupyterHub web service, when available.
#. Start a personal JupyterLab server inside an LSF job and connect to it with
   an SSH tunnel.

These are related workflows, but they are not the same. JupyterHub is an
admin-managed web service. A personal JupyterLab server is started by the user
inside an allocated LSF job.

.. important::

   Users should not run JupyterLab directly on login nodes for compute work.
   Start JupyterLab inside an LSF job, then connect to it from a local browser
   through an SSH tunnel.

When to Use Jupyter
-------------------

Use Jupyter for:

* interactive Python or R notebook work
* testing code before writing an LSF job script
* exploring data
* checking software versions and kernels
* short CPU or GPU tests
* teaching, demonstrations, and exploratory analysis

Use LSF batch jobs instead for:

* long-running production runs
* large-memory workloads
* jobs that need many CPU cores
* jobs that must continue after closing the browser
* repeated or automated workflows
* large GPU training jobs

IDSC-Managed JupyterHub Service
-------------------------------

When available, the IDSC-managed JupyterHub service lets users log in through a
browser, select resources, and start a notebook server through the service.

Pegasus JupyterHub
~~~~~~~~~~~~~~~~~~

Pegasus JupyterHub has historically been documented at:

::

   https://pegasusdev.ccs.miami.edu:8000

Triton/Summit JupyterHub
~~~~~~~~~~~~~~~~~~~~~~~~

Triton/Summit JupyterHub has historically been documented at:

::

   https://t2.idsc.miami.edu:8000/hub/login

.. caution::

   Service URLs, login methods, and access routes can change. If a JupyterHub
   URL does not load, confirm VPN or campus network access and contact IDSC
   support for the current service access method.

Typical JupyterHub Workflow
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The usual managed-service workflow is:

#. Connect to the UM network or VPN if off-site.
#. Open the JupyterHub URL for the target system.
#. Log in with the required credentials.
#. Click **Start My Notebook Server**, or the equivalent start button.
#. Select the project, time, CPU, memory, and GPU options if shown.
#. Click **Request**, or the equivalent submit button.
#. Open Notebook or JupyterLab.
#. Save work frequently.
#. Stop the server from the JupyterHub control panel when finished.

.. warning::

   Logging out or closing the browser is not always the same as stopping the
   notebook server. Use the JupyterHub control panel to stop the server so
   resources are released.


Personal JupyterLab Through LSF
-------------------------------

If the managed JupyterHub service is unavailable or a user needs more direct
control, the user can start a personal JupyterLab server inside an LSF job and
connect through an SSH tunnel.

This workflow was tested on Pegasus using:

* an interactive LSF job
* a compute-node JupyterLab server
* a local SSH tunnel through the Pegasus login path
* a browser connection to ``http://127.0.0.1:<port>``

.. note::

   This workflow starts a personal JupyterLab server. It does not start the
   JupyterHub service.

Step 1: Connect to Pegasus
~~~~~~~~~~~~~~~~~~~~~~~~~~

Log in to Pegasus using the normal SSH method for the account.

Example using an SSH config alias:

::

   ssh pegasus

If not using an SSH config alias, connect using the current IDSC-supported
Pegasus login method.

Step 2: Start an Interactive LSF Job
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Start a CPU interactive job:

::

   bsub -P <project> -q general -Is -W 02:00 -n 1 -R "rusage[mem=4000]" bash

After the job starts, record the compute-node hostname:

::

   hostname

Example output:

::

   n195

The hostname is needed for the SSH tunnel.


Step 3: Create a JupyterLab Startup Script
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Create the script once in the user's home directory:

.. code:: bash

   cat > ~/start_jupyterlab.sh <<'EOF'
   #!/bin/bash

   PORT=${1:-7777}

   mkdir -p $HOME/.jupyter
   mkdir -p $HOME/.local/share/jupyter
   mkdir -p $HOME/.local/share/jupyter/runtime

   export JUPYTER_CONFIG_DIR=$HOME/.jupyter
   export JUPYTER_DATA_DIR=$HOME/.local/share/jupyter
   export JUPYTER_RUNTIME_DIR=$HOME/.local/share/jupyter/runtime
   export XDG_RUNTIME_DIR=$HOME/.local/share/jupyter/runtime

   chmod 700 $HOME/.local/share/jupyter/runtime

   echo "Starting JupyterLab"
   echo "Host: $(hostname)"
   echo "Port: ${PORT}"
   echo
   echo "From your laptop, create an SSH tunnel with:"
   echo "ssh -N -L ${PORT}:$(hostname):${PORT} <your-pegasus-ssh-host-or-alias>"
   echo
   echo "If using the Acorn gateway and Pegasus login host directly:"
   echo "ssh -N -L ${PORT}:$(hostname):${PORT} -J ${USER}@acorn-gw.idsc.miami.edu ${USER}@pegasus2.idsc.miami.edu"
   echo

   jupyter lab --no-browser --ip=0.0.0.0 --port=${PORT} --ServerApp.use_redirect_file=False
   EOF

   chmod +x ~/start_jupyterlab.sh

.. important::

   The Jupyter environment variables are needed because Jupyter may otherwise
   try to write configuration files under a system Miniforge path such as
   ``/share/apps/c7/miniforge3/.jupyter``, which is not writable by users.

Step 4: Start JupyterLab Inside the LSF Job
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Inside the interactive LSF job, run:

::

   ~/start_jupyterlab.sh 7777

JupyterLab should print URLs similar to:

::

   http://<compute-node>:7777/lab?token=<token>
   http://127.0.0.1:7777/lab?token=<token>

Keep this terminal running. Do not close it while using JupyterLab.


Step 5: Create the SSH Tunnel from the Local Machine
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Open a new terminal on the local machine.

If the user has an SSH config alias that normally connects to Pegasus, use that
alias:

::

   ssh -N -L 7777:<compute-node>:7777 <pegasus-ssh-alias>

Example:

::

   ssh -N -L 7777:n195:7777 pegasus

If the user does not have an SSH config alias and must connect through the Acorn
gateway, use the jump-host form:

::

   ssh -N -L 7777:<compute-node>:7777 -J <username>@acorn-gw.idsc.miami.edu <username>@pegasus2.idsc.miami.edu

Example:

::

   ssh -N -L 7777:n195:7777 -J dxr1368@acorn-gw.idsc.miami.edu dxr1368@pegasus2.idsc.miami.edu

.. note::

   The SSH tunnel command may appear to do nothing. That is expected. Leave the
   terminal open while using JupyterLab.

Step 6: Open JupyterLab in the Browser
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Open the local tunnel URL in a browser:

::

   http://127.0.0.1:7777/lab?token=<token>

Use the token printed by the JupyterLab server.

Do not use the compute-node URL directly from the local browser:

::

   http://<compute-node>:7777/lab?token=<token>

The compute node is usually not directly reachable from the user's laptop.

Using a Different Port
~~~~~~~~~~~~~~~~~~~~~~

If port ``7777`` is already in use, choose another port such as ``8899``.

Inside the LSF job:

::

   ~/start_jupyterlab.sh 8899

From the local machine:

::

   ssh -N -L 8899:<compute-node>:8899 <pegasus-ssh-host-or-alias>

Then open:

::

   http://127.0.0.1:8899/lab?token=<token>


GPU JupyterLab Through LSF
--------------------------

To use GPUs from a notebook, the JupyterLab server must be started inside an LSF
job that has been allocated GPU resources.

.. important::

   Being on a GPU queue or GPU node is not always enough. Request a GPU with
   the LSF ``-gpu`` option. If no GPU is allocated, ``nvidia-smi`` may run but
   report ``No devices found``.

Start a GPU Interactive Job
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Pegasus H100 example:

::

   bsub -P <project> -q gpu_h100 -Is -W 02:00 -n 1 -R "rusage[mem=4000]" -gpu "num=1" bash

After the job starts, verify the GPU allocation before starting JupyterLab:

::

   hostname
   echo "CUDA_VISIBLE_DEVICES=$CUDA_VISIBLE_DEVICES"
   which nvidia-smi
   nvidia-smi
   nvidia-smi -L

Expected output from ``nvidia-smi -L`` should list at least one GPU.

Start JupyterLab from the GPU Job
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Inside the GPU job:

::

   ~/start_jupyterlab.sh 7777

Record the GPU compute-node hostname, such as:

::

   gpu2

From the local machine, tunnel to that hostname:

::

   ssh -N -L 7777:<gpu-node>:7777 <pegasus-ssh-host-or-alias>

Example with an SSH config alias:

::

   ssh -N -L 7777:gpu2:7777 pegasus

Example with the Acorn gateway:

::

   ssh -N -L 7777:gpu2:7777 -J dxr1368@acorn-gw.idsc.miami.edu dxr1368@pegasus2.idsc.miami.edu

Then open:

::

   http://127.0.0.1:7777/lab?token=<token>


Checking GPU Access from a Notebook
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Run this in a notebook cell:

.. code:: python

   import os
   import shutil
   import subprocess
   import sys

   print("Python executable:", sys.executable)
   print("Python version:", sys.version)
   print("Hostname:", os.uname().nodename)
   print("CUDA_VISIBLE_DEVICES:", os.environ.get("CUDA_VISIBLE_DEVICES"))

   nvidia_smi = shutil.which("nvidia-smi")
   print("nvidia-smi path:", nvidia_smi)

   if nvidia_smi:
       print("\nGPU list:")
       print(subprocess.getoutput("nvidia-smi -L"))

       print("\nFull nvidia-smi:")
       print(subprocess.getoutput("nvidia-smi"))
   else:
       print("nvidia-smi not found")

PyTorch Check
~~~~~~~~~~~~~

Run:

.. code:: python

   try:
       import torch

       print("PyTorch:", torch.__version__)
       print("CUDA available:", torch.cuda.is_available())
       print("CUDA version:", torch.version.cuda)
       print("GPU count:", torch.cuda.device_count())

       for i in range(torch.cuda.device_count()):
           print(f"GPU {i}:", torch.cuda.get_device_name(i))

   except Exception as e:
       print("PyTorch error:", repr(e))

TensorFlow Check
~~~~~~~~~~~~~~~~

Run:

.. code:: python

   try:
       import tensorflow as tf

       print("TensorFlow:", tf.__version__)
       print("GPUs:", tf.config.list_physical_devices("GPU"))

   except Exception as e:
       print("TensorFlow error:", repr(e))

.. note::

   JupyterLab working does not mean PyTorch or TensorFlow are installed in the
   active notebook environment. If the imports fail, the selected Python kernel
   does not include those packages.


Troubleshooting Personal JupyterLab
-----------------------------------

.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Problem
     - What to check
   * - ``PermissionError`` for ``/share/apps/.../.jupyter``
     - Set ``JUPYTER_CONFIG_DIR``, ``JUPYTER_DATA_DIR``, and
       ``JUPYTER_RUNTIME_DIR`` to writable user directories. Use the startup
       script above.
   * - Browser cannot open ``http://<compute-node>:<port>``
     - Use ``http://127.0.0.1:<port>`` through an SSH tunnel instead.
   * - SSH tunnel command appears to do nothing
     - This is normal for ``ssh -N -L``. Leave the terminal open and open the
       localhost URL in the browser.
   * - ``curl http://127.0.0.1:<port>`` fails locally
     - The tunnel is not active, the wrong local port was used, or the Jupyter
       server stopped.
   * - Tunnel through direct hostname fails
     - Use the same SSH alias or login path normally used to connect to Pegasus.
       If a gateway is required, use the ``-J`` jump-host option.
   * - ``nvidia-smi`` shows ``No devices found``
     - The job did not receive a GPU allocation. Request a GPU with
       ``-gpu "num=1"``.
   * - PyTorch or TensorFlow import fails
     - The active notebook kernel does not include the package. Use the correct
       module, Conda/Miniforge environment, Jupyter kernel, or container.
   * - PyTorch imports but ``torch.cuda.is_available()`` is ``False``
     - Check GPU allocation, CUDA-compatible PyTorch build, and environment.
   * - TensorFlow imports but shows no GPUs
     - Check GPU allocation and TensorFlow/CUDA/cuDNN compatibility.
   * - Notebook server keeps running after browser closes
     - Stop JupyterLab with ``Ctrl-C`` in the terminal where it is running.

Stopping the Personal JupyterLab Server
---------------------------------------

When finished:

#. Save notebooks and scripts.
#. Stop running notebooks and kernels if needed.
#. Press ``Ctrl-C`` in the terminal running JupyterLab.
#. Confirm shutdown if prompted.
#. Exit the LSF job shell.
#. Close the SSH tunnel terminal.

Example:

::

   Ctrl-C

Then:

::

   exit

.. warning::

   Closing the browser does not stop the JupyterLab server or the LSF job.
   Stop the server and exit the job when finished.

When to Contact IDSC
--------------------

Contact IDSC support if the issue involves service availability, account access,
project permissions, gateway access, GPU queue permissions, or repeated server
startup failures.

Include:

* system name
* project name
* LSF job command
* compute-node hostname
* JupyterLab port
* SSH tunnel command used
* full error message
* whether CPU and GPU sessions were tested
* output from ``nvidia-smi -L`` if using GPUs

.. admonition:: Getting Help
   :class: important

   For personal JupyterLab issues, include the LSF job command, compute-node
   hostname, JupyterLab startup command, SSH tunnel command, and full error
   output. This helps distinguish Jupyter configuration problems from LSF,
   gateway, tunnel, package, or GPU allocation problems.