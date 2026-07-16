RStudio Server
===============

RStudio Server runs inside an Apptainer container on a Pegasus LSF compute
node. The RStudio interface is accessed from a local web browser through an
SSH tunnel.

The tested environment uses:

* Apptainer 1.0.2
* R 4.6.0
* RStudio Server 2026.04.0+526
* The Pegasus `general` LSF queue
* The following container image:

  .. code-block:: text

      /projectnb/pegasus/sw/rstudio/sif/tidyverse_4.6.0.sif

The launcher handles the Apptainer command, LSF job submission, compute-node
hostname, server port, temporary password, logs, and job termination.

.. important::

   RStudio is not available through an `rstudio` or
   `pegasus-rstudio` environment module. Thus, do not run 
   either of the following commands:

   .. code-block:: bash

      module load rstudio
      module load pegasus-rstudio

.. warning::

   Do not run RStudio Server directly on a Pegasus login node. The launcher
   submits RStudio Server to an LSF compute node.

One-Time Setup
--------------

- The RStudio workflow requires two scripts:

   .. code-block:: text

      pegasus-rstudio
      rstudio-server-job.sh

   Create private directories for the scripts:

   .. code-block:: bash

      mkdir -p "$HOME/.local/lib/pegasus-rstudio"
      mkdir -p "$HOME/bin"

- Create the launcher script:

   .. code-block:: bash

      cat > "$HOME/.local/lib/pegasus-rstudio/pegasus-rstudio" <<'PEGASUS_RSTUDIO'
      #!/usr/bin/env bash
      set -Eeuo pipefail

      SCRIPT_DIR="$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")"
      JOB_SCRIPT="$SCRIPT_DIR/rstudio-server-job.sh"
      BASE_DIR="$HOME/.cache/pegasus-rstudio"
      LSF_LOG_DIR="$BASE_DIR/lsf"

      mkdir -p "$LSF_LOG_DIR"

      usage() {
          cat <<'USAGE'
      Usage:
        pegasus-rstudio start [options]
        pegasus-rstudio status [job-id]
        pegasus-rstudio info <job-id>
        pegasus-rstudio logs <job-id>
        pegasus-rstudio stop <job-id>

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
              echo "Run: pegasus-rstudio status $job_id" >&2
              return 1
          fi

          source "$file"

          cat <<INFO

      RStudio is running.

      Job ID:       $JOB_ID
      Compute node: $COMPUTE_NODE
      Server port:  $PORT

      On your computer, run:

        ssh -N -L 8787:${COMPUTE_NODE}:${PORT} \\
          ${USERNAME}@${LOGIN_NODE}

      Then open:

        http://localhost:8787

      Login:
        Username: $USERNAME
        Password: $PASSWORD

      Alternative through Acorn:

        ssh -N -L 8787:${COMPUTE_NODE}:${PORT} \\
          -J ${USERNAME}@acorn-gw.idsc.miami.edu \\
          ${USERNAME}@${LOGIN_NODE}

      Stop the session with:

        pegasus-rstudio stop $JOB_ID

      Do not share the temporary password.
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
                      --project)
                          project="${2:?Missing project}"
                          shift 2
                          ;;
                      --queue)
                          queue="${2:?Missing queue}"
                          shift 2
                          ;;
                      --time)
                          walltime="${2:?Missing runtime}"
                          shift 2
                          ;;
                      --cpus)
                          cpus="${2:?Missing CPU count}"
                          shift 2
                          ;;
                      --memory)
                          memory="${2:?Missing memory value}"
                          shift 2
                          ;;
                      -h|--help)
                          usage
                          exit 0
                          ;;
                      *)
                          echo "Unknown option: $1" >&2
                          usage >&2
                          exit 1
                          ;;
                  esac
              done

              [[ "$cpus" =~ ^[1-9][0-9]*$ ]] ||
                  { echo "--cpus must be a positive integer." >&2; exit 1; }

              [[ "$memory" =~ ^[1-9][0-9]*$ ]] ||
                  { echo "--memory must be a positive integer." >&2; exit 1; }

              if [[ ! -x "$JOB_SCRIPT" ]]; then
                  echo "Missing executable job script: $JOB_SCRIPT" >&2
                  exit 1
              fi

              echo "Submitting RStudio Server..."
              echo "Project: $project"
              echo "Queue: $queue"
              echo "Runtime: $walltime"
              echo "CPUs: $cpus"
              echo "Memory per core: ${memory} MB"

              if ! output="$(
                  bsub \
                      -J "rstudio-$USER" \
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

              if [[ -z "$job_id" ]]; then
                  echo "Could not determine the submitted LSF job ID." >&2
                  exit 1
              fi

              interrupt() {
                  echo
                  echo "Stopped waiting. LSF job $job_id was not cancelled."
                  echo "Run: pegasus-rstudio status $job_id"
                  exit 130
              }

              trap interrupt INT

              echo
              echo "Job ID: $job_id"
              echo "Waiting for RStudio Server..."

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
                          echo "The RStudio job ended during startup." >&2
                          "$0" logs "$job_id" >&2 || true
                          exit 1
                          ;;
                  esac

                  sleep 3
              done

              trap - INT
              echo "RStudio is not ready yet."
              echo "Run: pegasus-rstudio status $job_id"
              echo "Then: pegasus-rstudio info $job_id"
              ;;

          status)
              if [[ $# -gt 0 ]]; then
                  bjobs "$1" || true
              else
                  bjobs -J "rstudio-$USER" || true
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
                  "$BASE_DIR/$job_id/logs/rserver.log"
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
      PEGASUS_RSTUDIO

- Create the internal LSF job script:

   .. code-block:: bash

      cat > "$HOME/.local/lib/pegasus-rstudio/rstudio-server-job.sh" <<'RSTUDIO_JOB'
      #!/usr/bin/env bash
      set -Eeuo pipefail

      if ! command -v module >/dev/null 2>&1; then
          source /etc/profile.d/modules.sh 2>/dev/null || true
      fi

      module load apptainer/1.0.2

      IMAGE="/projectnb/pegasus/sw/rstudio/sif/tidyverse_4.6.0.sif"
      LOGIN_NODE="pegasus2.idsc.miami.edu"
      JOB_ID="${LSB_JOBID:?This script must run as an LSF job}"
      CPUS="${LSB_DJOB_NUMPROC:-1}"
      COMPUTE_NODE="$(hostname -s)"
      PYTHON_BIN="$(command -v python3 || command -v python || true)"

      if [[ -z "$PYTHON_BIN" ]]; then
          echo "ERROR: Python is required to select the RStudio port." >&2
          exit 1
      fi

      if [[ ! -r "$IMAGE" ]]; then
          echo "ERROR: RStudio image is not readable: $IMAGE" >&2
          exit 1
      fi

      PORT="$(
          "$PYTHON_BIN" - <<'PY'
      import socket

      sock = socket.socket()
      sock.bind(("", 0))
      print(sock.getsockname()[1])
      sock.close()
      PY
      )"

      PASSWORD="$(openssl rand -hex 12)"
      SESSION_DIR="$HOME/.cache/pegasus-rstudio/$JOB_ID"
      TMP_DIR="$SESSION_DIR/tmp"
      DATA_DIR="$SESSION_DIR/var/lib/rstudio-server"
      LOG_DIR="$SESSION_DIR/logs"
      CONNECTION_FILE="$SESSION_DIR/connection.env"
      R_LIBRARY="$HOME/R/pegasus/4.6"

      mkdir -p "$TMP_DIR" "$DATA_DIR" "$LOG_DIR" "$R_LIBRARY"
      chmod 700 "$SESSION_DIR" "$TMP_DIR" "$DATA_DIR" "$LOG_DIR"

      cat > "$SESSION_DIR/database.conf" <<'DATABASE'
      provider=sqlite
      directory=/var/lib/rstudio-server
      DATABASE

      export APPTAINERENV_USER="$USER"
      export APPTAINERENV_PASSWORD="$PASSWORD"
      export APPTAINERENV_R_LIBS_USER="$R_LIBRARY"
      export APPTAINERENV_OMP_NUM_THREADS="$CPUS"
      export APPTAINERENV_TMPDIR="/tmp"
      export APPTAINERENV_RSTUDIO_SESSION_TIMEOUT="0"

      BIND_ARGS=(
          --bind "$TMP_DIR:/tmp"
          --bind "$DATA_DIR:/var/lib/rstudio-server"
          --bind "$SESSION_DIR/database.conf:/etc/rstudio/database.conf"
      )

      for path in /projectnb /scratch /sccc; do
          [[ -d "$path" ]] && BIND_ARGS+=(--bind "$path")
      done

      RSERVER_PID=""

      cleanup() {
          rm -f "$CONNECTION_FILE"

          if [[ -n "$RSERVER_PID" ]] &&
             kill -0 "$RSERVER_PID" 2>/dev/null; then
              kill "$RSERVER_PID" 2>/dev/null || true
          fi
      }

      trap cleanup EXIT INT TERM HUP

      apptainer exec \
          "${BIND_ARGS[@]}" \
          "$IMAGE" \
          /usr/lib/rstudio-server/bin/rserver \
              --www-port="$PORT" \
              --auth-none=0 \
              --auth-pam-helper-path=/usr/lib/rstudio-server/bin/pam-helper \
              --server-user="$USER" \
              --server-daemonize=0 \
              --server-pid-file=/var/lib/rstudio-server/rserver.pid \
              --server-data-dir=/var/lib/rstudio-server \
              --server-working-dir=/var/lib/rstudio-server \
              --secure-cookie-key-file=/var/lib/rstudio-server/secure-cookie-key \
              --rsession-path=/usr/lib/rstudio-server/bin/rsession \
              --rsession-which-r=/usr/local/bin/R \
          > "$LOG_DIR/rserver.log" 2>&1 &

      RSERVER_PID=$!
      READY=0

      for ((attempt = 1; attempt <= 60; attempt++)); do
          if ! kill -0 "$RSERVER_PID" 2>/dev/null; then
              break
          fi

          if "$PYTHON_BIN" - "$PORT" <<'PY'
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
          echo "ERROR: RStudio Server did not start." >&2
          cat "$LOG_DIR/rserver.log" >&2
          exit 1
      fi

      cat > "$SESSION_DIR/connection.env.tmp" <<CONNECTION
      JOB_ID=$JOB_ID
      COMPUTE_NODE=$COMPUTE_NODE
      PORT=$PORT
      USERNAME=$USER
      PASSWORD=$PASSWORD
      LOGIN_NODE=$LOGIN_NODE
      CONNECTION

      chmod 600 "$SESSION_DIR/connection.env.tmp"
      mv "$SESSION_DIR/connection.env.tmp" "$CONNECTION_FILE"

      wait "$RSERVER_PID"
      RSTUDIO_JOB

- Make both scripts executable:

   .. code-block:: bash

      chmod 700 "$HOME/.local/lib/pegasus-rstudio/pegasus-rstudio"
      chmod 700 "$HOME/.local/lib/pegasus-rstudio/rstudio-server-job.sh"

- Create a symbolic link in `$HOME/bin`:

   .. code-block:: bash

      ln -sf "$HOME/.local/lib/pegasus-rstudio/pegasus-rstudio" 
      ln -sf  "$HOME/bin/pegasus-rstudio"

- Add `$HOME/bin` to the shell path:

   .. code-block:: bash

      grep -qxF 'export PATH="$HOME/bin:$PATH"' ~/.bashrc ||
      echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc

      source ~/.bashrc

- Confirm that the launcher is available:

   .. code-block:: bash

      command -v pegasus-rstudio

   The command should return a path similar to:

   .. code-block:: text

      /nethome/<username>/bin/pegasus-rstudio

.. note::

The setup is required only once. Future sessions can be started directly
with the `pegasus-rstudio` command.

Start RStudio
-------------

- Start an RStudio session by specifying an LSF project available to your Pegasus account:

   .. code-block:: bash

      pegasus-rstudio start --project <project>

   Replace `<project>` with the appropriate LSF project.

- The default resource request is:

   - Queue => ``general``
   - Runtime =>> 4 hours
   - CPU cores =>> 2
   - Memory =>> 4,000 MB per CPU core
   - Local browser port =>> ``8787``

- The launcher submits the LSF job and waits for RStudio Server to start. When the  session is ready, the launcher displays:

   - the LSF job ID
   - the allocated compute node
   - the RStudio Server port
   - the SSH tunnel command
   - the local browser URL
   - the Pegasus username
   - a temporary password
   - the command used to stop the session


   Example output:

   .. code-block:: text

      RStudio is running.

      Job ID:       440027
      Compute node: n057
      Server port:  42519

Request Different Resources
---------------------------

Optional arguments can be used to change the queue, runtime, CPU count, or
memory request:

.. code-block:: bash

   pegasus-rstudio start 
   --project <project> 
   --queue general 
   --time 08:00 
   --cpus 4 
   --memory 6000

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

   Request only the resources required for the RStudio session. Larger
   requests may remain pending longer while waiting for available resources.

Create the SSH Tunnel
----------------------

Run the SSH command printed by the launcher from a terminal on the local
computer.

Do not run the tunnel command from inside the existing Pegasus session.

Direct Pegasus Connection
`````````````````````````

Use the following pattern:

.. code-block:: bash

   ssh -N -L 8787:<compute-node>:<server-port> \
      <username>@pegasus2.idsc.miami.edu

Replace:

* ``<compute-node>`` with the node printed by the launcher
* ``<server-port>`` with the port printed by the launcher
* ``<username>`` with the Pegasus username

Keep the SSH terminal open while using RStudio.

Connection Through Acorn
`````````````````````````

If direct access to Pegasus is unavailable, use the Acorn jump host:

.. code-block:: bash

   ssh -N -L 8787:<compute-node>:<server-port> \
      -J <username>@acorn-gw.idsc.miami.edu \
      <username>@pegasus2.idsc.miami.edu

.. note::

   Use the exact compute node and server port printed for the current RStudio
   job. These values change between sessions.

Open and Log In
----------------

After creating the SSH tunnel, open the following address in a local web
browser:

.. code-block:: text

   http://localhost:8787

Log in using:

* the Pegasus username
* the temporary password printed by the launcher

.. caution::

   Do not open the compute-node address or server port directly in a browser.
   Access RStudio Server only through the SSH tunnel and the local
   ``localhost`` address.

Test & Verify
------------------

Verify the Session
```````````````````````````
Verify the R environment from the RStudio Console:

.. code-block:: r

   R.version.string
   Sys.info()[["nodename"]]
   getwd()
   .libPaths()

The R version should report R 4.6.0.

The hostname should match the compute node printed by the launcher.



Test Persistent File Access
```````````````````````````

Create a test file in the Pegasus home directory:

.. code-block:: r

   test_file <- file.path(
   Sys.getenv("HOME"),
   "rstudio-test-file.txt"
   )

   writeLines(
   paste(
   "Created from RStudio on",
   Sys.info()[["nodename"]]
   ),
   test_file
   )

   file.exists(test_file)
   readLines(test_file)

Files created under `$HOME` remain available after the RStudio LSF job
ends.

Test Plotting
`````````````

Run the following command in the RStudio Console:

.. code-block:: r

   plot(
     cars,
     main = "Pegasus RStudio Test",
     xlab = "Speed",
     ylab = "Stopping distance"
   )

The plot should appear in the RStudio **Plots** pane.

Test the RStudio Terminal
`````````````````````````

Open the **Terminal** tab in RStudio and run:

.. code-block:: bash

   hostname
   pwd
   whoami
   R --version | head -1

The hostname should match the allocated compute node.

The username should match the Pegasus account used to submit the job.

Manage RStudio Sessions
-----------------------

Check Session Status
````````````````````

List the current user's RStudio jobs:

.. code-block:: bash

   pegasus-rstudio status

Check a specific job:

.. code-block:: bash

   pegasus-rstudio status <job-id>

A job may initially appear with the ``PEND`` status while it waits for
resources.

.. note::

   A pending job has not started RStudio Server and does not yet have a
   compute node, server port, or temporary password.

Recover Connection Information
```````````````````````````````

Display the connection instructions for an existing running session:

.. code-block:: bash

   pegasus-rstudio info <job-id>

This command displays the compute node, server port, SSH tunnel, browser URL,
username, and temporary password.

Use this command if the original launcher terminal was closed after the job
started.

View Logs
`````````

Display the LSF and RStudio Server logs:

.. code-block:: bash

   pegasus-rstudio logs <job-id>

The command displays:

* LSF standard output
* LSF standard error
* the RStudio Server log

Stop the Session
----------------

First, exit the RStudio session using the power button in the upper-right
corner of the RStudio interface.

Then terminate the LSF job from Pegasus:

.. code-block:: bash

   pegasus-rstudio stop <job-id>

Confirm the final LSF job state:

.. code-block:: bash

   bjobs <job-id>

A session terminated with ``bkill`` may appear with the ``EXIT`` status.

.. note::

   The ``EXIT`` status is expected when an RStudio job is manually stopped
   with ``pegasus-rstudio stop`` or ``bkill``. It does not necessarily
   indicate an RStudio startup failure.

Confirm that no RStudio Server process remains:

.. code-block:: bash

   ps -fu "$USER" | grep '[r]server'

The command should return no output after the job has stopped.

.. warning::

   Closing the browser or SSH tunnel does not automatically terminate the LSF
   job. Always stop the RStudio job when the session is no longer needed.

Troubleshooting
---------------

Command Not Found
``````````````````

If the shell reports:

.. code-block:: text

   pegasus-rstudio: command not found

confirm that the symbolic link exists:

.. code-block:: bash

   ls -l "$HOME/bin/pegasus-rstudio"

Confirm that `$HOME/bin` is included in `PATH`:

.. code-block:: bash

   echo "$PATH" | tr ':' '\n' | grep "$HOME/bin"

Reload the shell configuration:

.. code-block:: bash

   source ~/.bashrc

Confirm the command again:

.. code-block:: bash

   command -v pegasus-rstudio

.. caution::

   Do not attempt to fix this error by running:

   .. code-block:: bash

      module load pegasus-rstudio

   A `pegasus-rstudio` environment module is not currently available.

Local Port 8787 Is Already in Use
`````````````````````````````````

The default SSH tunnel uses local port ``8787``.

If another local application is already using this port, change only the
first port number in the SSH command:

.. code-block:: bash

   ssh -N -L 8788:<compute-node>:<server-port> \
      <username>@pegasus2.idsc.miami.edu

Then open:

.. code-block:: text

   http://localhost:8788

Do not change the compute-node server port printed by the launcher.

Launcher Interrupted
````````````````````

Pressing ``Ctrl+C`` while the launcher is waiting for RStudio does not
necessarily cancel the submitted LSF job.

Check for existing RStudio jobs:

.. code-block:: bash

   pegasus-rstudio status

If the job is running, recover its connection information:

.. code-block:: bash

   pegasus-rstudio info <job-id>

Stop an unwanted or duplicate job:

.. code-block:: bash

   pegasus-rstudio stop <job-id>

Job Remains Pending
````````````````````

Check the job status:

.. code-block:: bash

   pegasus-rstudio status <job-id>

For detailed LSF scheduling information, run:

.. code-block:: bash

   bjobs -l <job-id>

A job may remain pending when the requested queue does not currently have
enough available resources.

RStudio Does Not Start
````````````````````

Display the session logs:

.. code-block:: bash

   pegasus-rstudio logs <job-id>

Check whether the job is still active:

.. code-block:: bash

   bjobs <job-id>

If the job exited during startup, review the RStudio Server log shown by the
launcher.

Stop the failed job if it remains active:

.. code-block:: bash

   pegasus-rstudio stop <job-id>


Multiple RStudio Jobs Are Running
`````````````````````````````````

An old RStudio job may continue running after its browser window or SSH
tunnel is closed. This can cause the browser to connect to an older RStudio
session and reject the password generated for a newer job.

List all active RStudio jobs for the current Pegasus user:

.. code-block:: bash

   bjobs -J "rstudio-$USER"

Example:

.. code-block:: text

   JOBID   USER      STAT  QUEUE    EXEC_HOST  JOB_NAME
   440027  username  RUN   general  2*n057     rstudio-username
   440028  username  RUN   general  2*n054     rstudio-username

Stop each old or unwanted RStudio job:

.. code-block:: bash

   pegasus-rstudio stop <job-id>

For example:

.. code-block:: bash

   pegasus-rstudio stop 440027
   pegasus-rstudio stop 440028

The equivalent LSF command is:

.. code-block:: bash

   bkill <job-id>

Confirm that no active RStudio jobs remain:

.. code-block:: bash

   bjobs -J "rstudio-$USER"

.. note::

   A terminated job may briefly appear with the ``EXIT`` status. The job is
   no longer running.

.. caution::

   Before starting another RStudio session, stop all old or duplicate
   RStudio jobs. Use the compute node, server port, and temporary password
   generated for the same new job.
