JupyterLab
==========

JupyterLab can run inside an Apptainer container on a Pegasus LSF compute
node. The session is accessed from a local browser through an SSH tunnel.

Use this workflow when a required Python or software environment is not
available through the managed Pegasus JupyterHub service.

.. note::

   This workflow starts a single-user JupyterLab server. It does not start a
   JupyterHub service.

.. warning::

   Do not run JupyterLab directly on a Pegasus login node. The launcher
   submits JupyterLab to an LSF compute node.

The tested workflow uses:

* Apptainer 1.0.2
* The Pegasus ``general`` LSF queue
* The official Jupyter ``minimal-notebook`` container image
* Token-based browser authentication
* SSH port forwarding through Pegasus

One-Time Setup
--------------

Create the installation directories:

.. code-block:: bash

   mkdir -p "$HOME/.local/lib/pegasus-jupyter"
   mkdir -p "$HOME/.local/share/pegasus-jupyter"
   mkdir -p "$HOME/bin"

Pull the Jupyter Image
~~~~~~~~~~~~~~~~~~~~~~

Load Apptainer:

.. code-block:: bash

   module purge
   module load apptainer/1.0.2

Pull the Jupyter minimal notebook image:

.. code-block:: bash

   apptainer pull "$HOME/.local/share/pegasus-jupyter/jupyter-minimal.sif" docker://quay.io/jupyter/minimal-notebook

Confirm that JupyterLab is available:

.. code-block:: bash

   apptainer exec "$HOME/.local/share/pegasus-jupyter/jupyter-minimal.sif" jupyter lab --version

.. note::

   The image is downloaded only once. Future sessions reuse the local
   ``jupyter-minimal.sif`` image.

Create the Launcher Script
~~~~~~~~~~~~~~~~~~~~~~~~~~

Run the following command on Pegasus:

.. code-block:: bash

   cat > "$HOME/.local/lib/pegasus-jupyter/pegasus-jupyter" <<'PEGASUS_JUPYTER'
   #!/usr/bin/env bash
   set -Eeuo pipefail

   SCRIPT_DIR="$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")"
   JOB_SCRIPT="$SCRIPT_DIR/jupyter-server-job.sh"
   BASE_DIR="$HOME/.cache/pegasus-jupyter"
   LSF_LOG_DIR="$BASE_DIR/lsf"
   mkdir -p "$LSF_LOG_DIR"

   usage() {
       cat <<'USAGE'
   Usage:
     pegasus-jupyter start [options]
     pegasus-jupyter status [job-id]
     pegasus-jupyter info <job-id>
     pegasus-jupyter logs <job-id>
     pegasus-jupyter stop <job-id>

   Start options:
     --project PROJECT   Default: hpc
     --queue QUEUE       Default: general
     --time HH:MM        Default: 04:00
     --cpus NUMBER       Default: 2
     --memory MB         Default: 4000 per CPU core
   USAGE
   }

   show_info() {
       local job_id="$1"
       local file="$BASE_DIR/$job_id/connection.env"

       if [[ ! -r "$file" ]]; then
           echo "Connection information is not available for job $job_id." >&2
           echo "Run: pegasus-jupyter status $job_id" >&2
           return 1
       fi

       source "$file"

       cat <<INFO

   JupyterLab is running.

   Job ID:       $JOB_ID
   Compute node: $COMPUTE_NODE
   Server port:  $PORT

   On your computer, run:

     ssh -N -L 7777:${COMPUTE_NODE}:${PORT} \\
       ${USERNAME}@${LOGIN_NODE}

   Then open:

     http://localhost:7777/lab?token=${TOKEN}

   Alternative through Acorn:

     ssh -N -L 7777:${COMPUTE_NODE}:${PORT} \\
       -J ${USERNAME}@acorn-gw.idsc.miami.edu \\
       ${USERNAME}@${LOGIN_NODE}

   Stop the session with:

     pegasus-jupyter stop $JOB_ID

   Do not share the token.
   INFO
   }

   command_name="${1:-help}"
   shift || true

   case "$command_name" in
       start)
           project="hpc"
           queue="general"
           walltime="04:00"
           cpus="2"
           memory="4000"

           while [[ $# -gt 0 ]]; do
               case "$1" in
                   --project) project="${2:?Missing project}"; shift 2 ;;
                   --queue) queue="${2:?Missing queue}"; shift 2 ;;
                   --time) walltime="${2:?Missing runtime}"; shift 2 ;;
                   --cpus) cpus="${2:?Missing CPU count}"; shift 2 ;;
                   --memory) memory="${2:?Missing memory value}"; shift 2 ;;
                   -h|--help) usage; exit 0 ;;
                   *) echo "Unknown option: $1" >&2; usage >&2; exit 1 ;;
               esac
           done

           [[ "$cpus" =~ ^[1-9][0-9]*$ ]] ||
               { echo "--cpus must be a positive integer." >&2; exit 1; }
           [[ "$memory" =~ ^[1-9][0-9]*$ ]] ||
               { echo "--memory must be a positive integer." >&2; exit 1; }
           [[ -x "$JOB_SCRIPT" ]] ||
               { echo "Missing executable job script: $JOB_SCRIPT" >&2; exit 1; }

           echo "Submitting JupyterLab..."
           echo "Project: $project"
           echo "Queue: $queue"
           echo "Runtime: $walltime"
           echo "CPUs: $cpus"
           echo "Memory per core: ${memory} MB"

           if ! output="$(
               bsub \
                   -J "jupyter-$USER" \
                   -P "$project" \
                   -q "$queue" \
                   -W "$walltime" \
                   -n "$cpus" \
                   -R "span[hosts=1]" \
                   -R "rusage[mem=$memory]" \
                   -o "$LSF_LOG_DIR/%J.out" \
                   -e "$LSF_LOG_DIR/%J.err" \
                   "$JOB_SCRIPT" 2>&1
           )"; then
               echo "$output" >&2
               exit 1
           fi

           echo "$output"
           job_id="$(
               sed -n 's/.*Job <\([0-9][0-9]*\)>.*/\1/p' <<< "$output" |
                   head -1
           )"
           [[ -n "$job_id" ]] ||
               { echo "Could not determine the LSF job ID." >&2; exit 1; }

           interrupt() {
               echo
               echo "Stopped waiting. LSF job $job_id was not cancelled."
               echo "Run: pegasus-jupyter status $job_id"
               exit 130
           }
           trap interrupt INT

           echo
           echo "Job ID: $job_id"
           echo "Waiting for JupyterLab..."

           for ((attempt = 1; attempt <= 120; attempt++)); do
               if [[ -r "$BASE_DIR/$job_id/connection.env" ]]; then
                   trap - INT
                   show_info "$job_id"
                   exit 0
               fi

               status="$(
                   bjobs "$job_id" 2>/dev/null |
                       awk 'NR == 2 {print $3}' || true
               )"
               case "$status" in
                   EXIT|DONE)
                       trap - INT
                       echo "The JupyterLab job ended during startup." >&2
                       "$0" logs "$job_id" >&2 || true
                       exit 1
                       ;;
               esac
               sleep 3
           done

           trap - INT
           echo "JupyterLab is not ready yet."
           echo "Run: pegasus-jupyter status $job_id"
           echo "Then: pegasus-jupyter info $job_id"
           ;;

       status)
           if [[ $# -gt 0 ]]; then
               bjobs "$1" || true
           else
               bjobs -J "jupyter-$USER" || true
           fi
           ;;

       info)
           show_info "${1:?Provide a job ID}"
           ;;

       logs)
           job_id="${1:?Provide a job ID}"
           for file in \
               "$LSF_LOG_DIR/$job_id.out" \
               "$LSF_LOG_DIR/$job_id.err" \
               "$BASE_DIR/$job_id/logs/jupyter.log"
           do
               echo "=== $file ==="
               if [[ -r "$file" ]]; then
                   tail -n 150 "$file"
               else
                   echo "Not found."
               fi
               echo
           done
           ;;

       stop)
           bkill "${1:?Provide a job ID}"
           ;;

       help|-h|--help)
           usage
           ;;

       *)
           echo "Unknown command: $command_name" >&2
           usage >&2
           exit 1
           ;;
   esac
   PEGASUS_JUPYTER

Create the Internal Job Script
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Run the following command on Pegasus:

.. code-block:: bash

   cat > "$HOME/.local/lib/pegasus-jupyter/jupyter-server-job.sh" <<'JUPYTER_JOB'
   #!/usr/bin/env bash
   set -Eeuo pipefail

   if ! command -v module >/dev/null 2>&1; then
       source /etc/profile.d/modules.sh 2>/dev/null || true
   fi

   module load apptainer/1.0.2

   IMAGE="$HOME/.local/share/pegasus-jupyter/jupyter-minimal.sif"
   LOGIN_NODE="pegasus2.idsc.miami.edu"
   JOB_ID="${LSB_JOBID:?This script must run as an LSF job}"
   CPUS="${LSB_DJOB_NUMPROC:-1}"
   COMPUTE_NODE="$(hostname -s)"
   PYTHON_BIN="$(command -v python3 || command -v python || true)"

   [[ -n "$PYTHON_BIN" ]] ||
       { echo "ERROR: Python is required to select the port." >&2; exit 1; }
   [[ -r "$IMAGE" ]] ||
       { echo "ERROR: Jupyter image is not readable: $IMAGE" >&2; exit 1; }

   PORT="$(
       "$PYTHON_BIN" - <<'PY'
   import socket
   sock = socket.socket()
   sock.bind(("", 0))
   print(sock.getsockname()[1])
   sock.close()
   PY
   )"

   TOKEN=""
   SESSION_DIR="$HOME/.cache/pegasus-jupyter/$JOB_ID"
   RUNTIME_DIR="$SESSION_DIR/runtime"
   CONFIG_DIR="$SESSION_DIR/config"
   LOG_DIR="$SESSION_DIR/logs"
   CONNECTION_FILE="$SESSION_DIR/connection.env"

   mkdir -p "$RUNTIME_DIR" "$CONFIG_DIR" "$LOG_DIR"
   chmod 700 "$SESSION_DIR" "$RUNTIME_DIR" "$CONFIG_DIR" "$LOG_DIR"

   export APPTAINERENV_JUPYTER_RUNTIME_DIR="$RUNTIME_DIR"
   export APPTAINERENV_JUPYTER_CONFIG_DIR="$CONFIG_DIR"
   export APPTAINERENV_OMP_NUM_THREADS="$CPUS"

   BIND_ARGS=()
   for path in /projectnb /scratch /sccc; do
       [[ -d "$path" ]] && BIND_ARGS+=(--bind "$path")
   done

   JUPYTER_PID=""

   cleanup() {
       rm -f "$CONNECTION_FILE"
       if [[ -n "$JUPYTER_PID" ]] &&
          kill -0 "$JUPYTER_PID" 2>/dev/null; then
           kill "$JUPYTER_PID" 2>/dev/null || true
       fi
   }
   trap cleanup EXIT INT TERM HUP

   cd "$HOME"

   apptainer exec \
       "${BIND_ARGS[@]}" \
       "$IMAGE" \
       jupyter lab \
           --no-browser \
           --ip=0.0.0.0 \
           --port="$PORT" \
           --ServerApp.use_redirect_file=False \
       > "$LOG_DIR/jupyter.log" 2>&1 &

   JUPYTER_PID=$!
   READY=0

   for ((attempt = 1; attempt <= 60; attempt++)); do
       if ! kill -0 "$JUPYTER_PID" 2>/dev/null; then
           break
       fi

       if [[ -z "$TOKEN" ]]; then
           TOKEN="$(
               grep -oE 'token=[A-Za-z0-9_-]+' "$LOG_DIR/jupyter.log" 2>/dev/null |
                   head -1 |
                   cut -d= -f2 || true
           )"
       fi

       if [[ -n "$TOKEN" ]] &&
          "$PYTHON_BIN" - "$PORT" <<'PY'
   import socket
   import sys
   try:
       socket.create_connection(
           ("127.0.0.1", int(sys.argv[1])),
           timeout=1
       ).close()
   except OSError:
       raise SystemExit(1)
   PY
       then
           READY=1
           break
       fi
       sleep 1
   done

   if [[ "$READY" -ne 1 ]]; then
       echo "ERROR: JupyterLab did not start." >&2
       cat "$LOG_DIR/jupyter.log" >&2
       exit 1
   fi

   cat > "$SESSION_DIR/connection.env.tmp" <<CONNECTION
   JOB_ID=$JOB_ID
   COMPUTE_NODE=$COMPUTE_NODE
   PORT=$PORT
   USERNAME=$USER
   TOKEN=$TOKEN
   LOGIN_NODE=$LOGIN_NODE
   CONNECTION

   chmod 600 "$SESSION_DIR/connection.env.tmp"
   mv "$SESSION_DIR/connection.env.tmp" "$CONNECTION_FILE"

   wait "$JUPYTER_PID"
   JUPYTER_JOB

Make the Scripts Executable
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Make both scripts executable:

.. code-block:: bash

   chmod 700 "$HOME/.local/lib/pegasus-jupyter/pegasus-jupyter" 
   chmod 700 "$HOME/.local/lib/pegasus-jupyter/jupyter-server-job.sh"

Validate the scripts:

.. code-block:: bash

   bash -n "$HOME/.local/lib/pegasus-jupyter/pegasus-jupyter"
   bash -n "$HOME/.local/lib/pegasus-jupyter/jupyter-server-job.sh"

The validation commands should return no output.

Create the Launcher Command
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Create a symbolic link in ``$HOME/bin``:

.. code-block:: bash

   ln -sf "$HOME/.local/lib/pegasus-jupyter/pegasus-jupyter" "$HOME/bin/pegasus-jupyter"

Add ``$HOME/bin`` to the shell path:

.. code-block:: bash

   grep -qxF 'export PATH="$HOME/bin:$PATH"' ~/.bashrc ||
      echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc

   source ~/.bashrc

Confirm that the launcher is available:

.. code-block:: bash

   command -v pegasus-jupyter

The command should return a path similar to:

.. code-block:: text

   /nethome/<username>/bin/pegasus-jupyter

.. note::

   The setup is required only once. Future sessions can be started directly
   with the ``pegasus-jupyter`` command.

Start JupyterLab
----------------

Start a JupyterLab session by specifying an LSF project available to the
Pegasus account:

.. code-block:: bash

   pegasus-jupyter start --project <project>

Replace ``<project>`` with the appropriate LSF project.

The default resource request is:

.. list-table::
   :widths: 35 65
   :header-rows: 1

   * - Resource
     - Default
   * - Queue
     - ``general``
   * - Runtime
     - 4 hours
   * - CPU cores
     - 2
   * - Memory
     - 4,000 MB per CPU core
   * - Local browser port
     - ``7777``

The launcher submits the LSF job and waits for JupyterLab to start.

When the session is ready, the launcher displays:

* the LSF job ID
* the allocated compute node
* the JupyterLab server port
* the SSH tunnel command
* the local browser URL
* the temporary access token
* the command used to stop the session

Example output:

.. code-block:: text

   JupyterLab is running.

   Job ID:       440100
   Compute node: n195
   Server port:  42137

   On your computer, run:

     ssh -N -L 7777:n195:42137        <username>@pegasus2.idsc.miami.edu

   Then open:

     http://localhost:7777/lab?token=<token>

.. warning::

   Do not share the Jupyter token. The token provides access to the running
   JupyterLab session.

Request Different Resources
---------------------------

Optional arguments can change the queue, runtime, CPU count, or memory
request:

.. code-block:: bash

   pegasus-jupyter start       --project <project>       --queue general       --time 08:00       --cpus 4       --memory 6000

The available options are:

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Option
     - Description
   * - ``--project``
     - LSF project used for the job
   * - ``--queue``
     - LSF queue used for the job
   * - ``--time``
     - Maximum runtime in ``HH:MM`` format
   * - ``--cpus``
     - Number of CPU cores
   * - ``--memory``
     - Memory requested per CPU core, in megabytes

.. caution::

   Request only the resources required for the session. Larger requests may
   remain pending longer while waiting for available resources.

Create the SSH Tunnel
---------------------

Run the SSH command printed by the launcher from a terminal on the local
computer.

Do not run the tunnel command from inside the existing Pegasus session.

Direct Pegasus Connection
~~~~~~~~~~~~~~~~~~~~~~~~~

Use the following pattern:

.. code-block:: bash

   ssh -N -L 7777:<compute-node>:<server-port>       <username>@pegasus2.idsc.miami.edu

Keep the SSH terminal open while using JupyterLab.

Connection Through Acorn
~~~~~~~~~~~~~~~~~~~~~~~~

If direct access to Pegasus is unavailable, use the Acorn jump host:

.. code-block:: bash

   ssh -N -L 7777:<compute-node>:<server-port>       -J <username>@acorn-gw.idsc.miami.edu       <username>@pegasus2.idsc.miami.edu

.. note::

   Use the exact compute node and server port printed for the current job.
   These values change between sessions.

Open JupyterLab
---------------

Open the token URL printed by the launcher:

.. code-block:: text

   http://localhost:7777/lab?token=<token>

.. caution::

   Do not open the compute-node address or server port directly in a browser.
   Access JupyterLab only through the SSH tunnel and the local
   ``localhost`` address.

Verify the Session
------------------

Create a Python notebook and run:

.. code-block:: python

   import os
   import socket
   import sys

   print(sys.version)
   print(socket.gethostname())
   print(os.getcwd())

The hostname should match the compute node printed by the launcher.

Test Persistent File Access
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Run:

.. code-block:: python

   from pathlib import Path

   test_file = Path.home() / "jupyter-container-test.txt"
   test_file.write_text("Created from JupyterLab\n")
   print(test_file.read_text())

Files created under ``$HOME`` remain available after the LSF job ends.

Test Plotting
~~~~~~~~~~~~~

Run:

.. code-block:: python

   import matplotlib.pyplot as plt

   plt.plot([1, 2, 3], [1, 4, 9])
   plt.title("Pegasus JupyterLab Test")
   plt.show()

The plot should appear below the notebook cell.

Test the JupyterLab Terminal
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Open a terminal from the JupyterLab launcher and run:

.. code-block:: bash

   hostname
   pwd
   whoami
   python --version

The hostname should match the allocated compute node.

Access Project Storage
~~~~~~~~~~~~~~~~~~~~~~

Project storage is available inside the container when the corresponding host
directory exists.

For example:

.. code-block:: bash

   ls /projectnb

Use only the project or scratch path assigned to the account.

Manage JupyterLab Sessions
--------------------------

Check Session Status
~~~~~~~~~~~~~~~~~~~~

List the current user's JupyterLab jobs:

.. code-block:: bash

   pegasus-jupyter status

Check a specific job:

.. code-block:: bash

   pegasus-jupyter status <job-id>

A job may initially appear with the ``PEND`` status while waiting for
resources.

Recover Connection Information
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Display the connection instructions for a running session:

.. code-block:: bash

   pegasus-jupyter info <job-id>

View Logs
~~~~~~~~~

Display the LSF and JupyterLab logs:

.. code-block:: bash

   pegasus-jupyter logs <job-id>

Stop the Session
----------------

First, use **File > Shut Down** in JupyterLab when available.

Then terminate the LSF job from Pegasus:

.. code-block:: bash

   pegasus-jupyter stop <job-id>

Confirm the final LSF job state:

.. code-block:: bash

   bjobs <job-id>

A manually stopped session may appear with the ``EXIT`` status.

.. warning::

   Closing the browser or SSH tunnel does not terminate the LSF job. Always
   stop the JupyterLab job when the session is no longer needed.

Troubleshooting
---------------

Command Not Found
~~~~~~~~~~~~~~~~~

If the shell reports:

.. code-block:: text

   pegasus-jupyter: command not found

confirm that the symbolic link exists:

.. code-block:: bash

   ls -l "$HOME/bin/pegasus-jupyter"

Reload the shell configuration:

.. code-block:: bash

   source ~/.bashrc

Local Port 7777 Is Already in Use
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If another local application is using port ``7777``, change only the first
port number in the SSH command:

.. code-block:: bash

   ssh -N -L 7778:<compute-node>:<server-port>       <username>@pegasus2.idsc.miami.edu

Then open:

.. code-block:: text

   http://localhost:7778/lab?token=<token>

Do not change the compute-node server port printed by the launcher.

Multiple JupyterLab Jobs Are Running
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

List all active JupyterLab jobs:

.. code-block:: bash

   bjobs -J "jupyter-$USER"

Stop each old or unwanted job:

.. code-block:: bash

   pegasus-jupyter stop <job-id>

Confirm that no unwanted jobs remain:

.. code-block:: bash

   bjobs -J "jupyter-$USER"

.. caution::

   Use the compute node, server port, and token generated for the same job.
   Credentials from one job do not apply to another JupyterLab session.

Launcher Interrupted
~~~~~~~~~~~~~~~~~~~~

Pressing ``Ctrl+C`` while the launcher is waiting does not cancel the
submitted LSF job.

Check the job:

.. code-block:: bash

   pegasus-jupyter status <job-id>

Recover the connection information:

.. code-block:: bash

   pegasus-jupyter info <job-id>

Job Remains Pending
~~~~~~~~~~~~~~~~~~~

Check the job status:

.. code-block:: bash

   pegasus-jupyter status <job-id>

For detailed LSF scheduling information, run:

.. code-block:: bash

   bjobs -l <job-id>

JupyterLab Does Not Start
~~~~~~~~~~~~~~~~~~~~~~~~~

Display the session logs:

.. code-block:: bash

   pegasus-jupyter logs <job-id>

Stop the failed job if it remains active:

.. code-block:: bash

   pegasus-jupyter stop <job-id>