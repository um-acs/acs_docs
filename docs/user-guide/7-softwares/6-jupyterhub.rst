.. _general-software-jupyterhub:

JupyterHub and Personal JupyterLab
==================================

IDSC users can work with Jupyter in two ways:

* Use an IDSC-managed JupyterHub service.
* Start a personal JupyterLab server inside an LSF job.

JupyterHub is a managed web service. Personal JupyterLab gives users more
control over the environment and requested resources.

.. important::

Do not run compute-intensive notebooks directly on a login node. Use
JupyterHub or start JupyterLab inside an LSF job.

IDSC-Managed JupyterHub
-----------------------

IDSC provides separate JupyterHub services for Pegasus and Triton.

Pegasus JupyterHub Access
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: text

   https://pegasusdev.ccs.miami.edu:8000

Triton JupyterHub Access
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: text

   https://t2.idsc.miami.edu:8000/hub/login


.. note::

   Both JupyterHub services were verified from the UM CaneNet wireless network.
   They did not load through the UM Accord VPN during testing.

   Access through the IDSC VPN has not yet been verified.


Typical Workflow:
~~~~~~~~~~~~~~~~~~

#. Connect to the UM CaneNet network.
#. Open the JupyterHub service for the target cluster.
#. Log in with the required credentials.
#. Start a notebook server.
#. Select the requested resources, if prompted.
#. Open Jupyter Notebook or JupyterLab.
#. Save work regularly.
#. Stop the notebook server when finished.

.. warning::

   Closing the browser does not always stop the notebook server. Stop the
   server from the JupyterHub control panel to release its resources.

.. caution::

   If a service does not load, first confirm that the device is connected to
   CaneNet. Contact IDSC support if the problem continues.


Personal JupyterLab Through LSF
-------------------------------

Users who need more control can start JupyterLab inside an LSF job and connect
to it through an SSH tunnel.

The following workflow was tested on Pegasus.

.. note::

   This starts a personal JupyterLab server. It does not start the managed
   JupyterHub service.


Step 1: Connect to Pegasus
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Connect using the normal Pegasus SSH method.

For example, when an SSH configuration alias is available:

.. code-block:: bash

   ssh pegasus

Step 2: Start an Interactive LSF Job
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Start a CPU job:

.. code-block:: bash

   bsub -P <project> -q general -Is -W 02:00 -n 1 \
      -R "rusage[mem=4000]" bash

After the job starts, record the compute-node hostname:

.. code-block:: bash

   hostname

Example:

.. code-block:: text

   n195


Step 3: Create the Startup Script
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Create this script once in the home directory:

.. code-block:: bash

   cat > ~/start_jupyterlab.sh <<'EOF'
   #!/bin/bash

   PORT=${1:-7777}

   export JUPYTER_CONFIG_DIR="$HOME/.jupyter"
   export JUPYTER_DATA_DIR="$HOME/.local/share/jupyter"
   export JUPYTER_RUNTIME_DIR="$HOME/.local/share/jupyter/runtime"
   export XDG_RUNTIME_DIR="$JUPYTER_RUNTIME_DIR"

   mkdir -p "$JUPYTER_CONFIG_DIR"
   mkdir -p "$JUPYTER_DATA_DIR"
   mkdir -p "$JUPYTER_RUNTIME_DIR"

   chmod 700 "$JUPYTER_RUNTIME_DIR"

   echo "Compute node: $(hostname)"
   echo "JupyterLab port: $PORT"

   jupyter lab \
      --no-browser \
      --ip=0.0.0.0 \
      --port="$PORT" \
      --ServerApp.use_redirect_file=False
   EOF

   chmod +x ~/start_jupyterlab.sh

The user-specific Jupyter directories prevent Jupyter from attempting to write
configuration or runtime files into a shared, read-only software installation.


Step 4: Start JupyterLab
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Inside the LSF job, run:

.. code-block:: bash

   ~/start_jupyterlab.sh 7777

JupyterLab will print a URL containing an authentication token.

Example:

.. code-block:: text

   http://127.0.0.1:7777/lab?token=<token>

Keep the LSF session open while using JupyterLab.


Step 5: Create the SSH Tunnel
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Open another terminal on the local computer.

Using an SSH configuration alias:

.. code-block:: bash

   ssh -N -L 7777:<compute-node>:7777 <pegasus-ssh-alias>

Example:

.. code-block:: bash

   ssh -N -L 7777:n195:7777 pegasus

When connecting through the Acorn gateway:

.. code-block:: bash

   ssh -N -L 7777:<compute-node>:7777 \
      -J <username>@acorn-gw.idsc.miami.edu \
      <username>@pegasus2.idsc.miami.edu

.. note::

   The tunnel command normally produces no output. Leave the terminal open
   while using JupyterLab.


Step 6: Open JupyterLab
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Open the localhost URL printed by JupyterLab:

.. code-block:: text

   http://127.0.0.1:7777/lab?token=<token>

Do not open the compute-node address directly from the local browser. Compute
nodes are normally reached through the SSH tunnel.


Using a Different Port
""""""""""""""""""""""

Choose another port when ``7777`` is already in use.

Inside the LSF job:

.. code-block:: bash

   ~/start_jupyterlab.sh 8899

From the local computer:

.. code-block:: bash

   ssh -N -L 8899:<compute-node>:8899 <pegasus-ssh-alias>

Then open:

.. code-block:: text

   http://127.0.0.1:8899/lab?token=<token>


Stopping Personal JupyterLab
"""""""""""""""""""""""""""""

When finished:

#. Save all notebooks.
#. Stop running notebook kernels.
#. Press ``Ctrl-C`` in the terminal running JupyterLab.
#. Confirm shutdown if prompted.
#. Exit the LSF job.
#. Close the SSH tunnel terminal.

.. warning::

   Closing the browser does not stop JupyterLab or the LSF job.



GPU JupyterLab Through LSF
-------------------------------

To use a GPU from JupyterLab, start the server inside an LSF job that has been
allocated GPU resources.

Start a GPU Job
~~~~~~~~~~~~~~~

Pegasus H100 example:

.. code-block:: bash

   bsub -P <project> -q gpu_h100 -Is -W 02:00 -n 1 \
      -R "rusage[mem=4000]" -gpu "num=1" bash

Verify the allocation:

.. code-block:: bash

   hostname
   echo "CUDA_VISIBLE_DEVICES=$CUDA_VISIBLE_DEVICES"
   nvidia-smi -L

At least one GPU should be listed.


Start JupyterLab
~~~~~~~~~~~~~~~~

Inside the GPU job:

.. code-block:: bash

   ~/start_jupyterlab.sh 7777

Record the GPU-node hostname and create the tunnel from the local computer:

.. code-block:: bash

   ssh -N -L 7777:<gpu-node>:7777 <pegasus-ssh-alias>

When using the Acorn gateway:

.. code-block:: bash

   ssh -N -L 7777:<gpu-node>:7777 \
      -J <username>@acorn-gw.idsc.miami.edu \
      <username>@pegasus2.idsc.miami.edu

Then open:

.. code-block:: text

   http://127.0.0.1:7777/lab?token=<token>


Check GPU Access
~~~~~~~~~~~~~~~~

Basic system check:

.. code-block:: python

   import os
   import subprocess

   print("Hostname:", os.uname().nodename)
   print("CUDA_VISIBLE_DEVICES:", os.environ.get("CUDA_VISIBLE_DEVICES"))
   print(subprocess.getoutput("nvidia-smi -L"))


PyTorch Check
~~~~~~~~~~~~~

.. code-block:: python

   import torch

   print("PyTorch:", torch.__version__)
   print("CUDA available:", torch.cuda.is_available())
   print("CUDA version:", torch.version.cuda)
   print("GPU count:", torch.cuda.device_count())

   for i in range(torch.cuda.device_count()):
       print(f"GPU {i}:", torch.cuda.get_device_name(i))


TensorFlow Check
~~~~~~~~~~~~~~~~

.. code-block:: python

   import tensorflow as tf

   print("TensorFlow:", tf.__version__)
   print("GPUs:", tf.config.list_physical_devices("GPU"))

.. note::

   A working JupyterLab session does not guarantee that PyTorch or TensorFlow
   is installed in the selected kernel. Use the appropriate module, Conda
   environment, Jupyter kernel, or Apptainer container.


Troubleshooting
-----------------------

.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Problem
     - What to check
   * - JupyterHub page does not load
     - Confirm that the device is connected to CaneNet. Accord VPN did not work
       during testing.
   * - Permission error under ``/share/apps/.../.jupyter``
     - Use the startup script, which sets writable Jupyter directories under
       the user's home directory.
   * - Compute-node URL does not open
     - Open the ``127.0.0.1`` URL through the SSH tunnel.
   * - SSH tunnel appears inactive
     - No output is normal for ``ssh -N -L``. Keep the terminal open.
   * - Localhost URL does not open
     - Check that JupyterLab is still running and that the local and remote
       ports match.
   * - Direct Pegasus tunnel fails
     - Use the same SSH alias or gateway path normally used to reach Pegasus.
   * - ``nvidia-smi`` reports no devices
     - Confirm that the job requested a GPU with ``-gpu "num=1"``.
   * - Python package import fails
     - The active notebook kernel does not contain the package.
   * - PyTorch reports CUDA unavailable
     - Check the GPU allocation, selected kernel, and CUDA-compatible PyTorch
       installation.
   * - TensorFlow does not detect a GPU
     - Check the GPU allocation and TensorFlow, CUDA, and cuDNN compatibility.

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