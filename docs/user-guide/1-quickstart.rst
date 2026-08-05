Pegasus and Triton QuickStart
=============================

Pegasus and Triton are shared high-performance computing (HPC) clusters
available to authorized University of Miami researchers. Both systems use the
LSF scheduler to run computational work on compute hosts.

.. list-table::
   :header-rows: 1
   :widths: 16 16 24 28 16

   * - Cluster
     - Compute hosts
     - Architecture
     - Typical use
     - QuickStart queue
   * - Pegasus
     - 282
     - x86_64
     - General-purpose HPC
     - ``general``
   * - Triton
     - 72
     - IBM POWER9 (ppc64le)
     - GPU-accelerated and data-intensive workloads
     - ``short``

This QuickStart demonstrates a complete workflow from a local computer to the
cluster and back:

.. code-block:: text

   dataset + Python script + LSF job script
                      |
                      |  SCP or SFTP
                      v
              cluster scratch storage
                      |
                      |  LSF batch job
                      v
                 result file
                      |
                      |  SCP or SFTP
                      v
                 local computer

Before You Begin
----------------

You need:

- an active CaneID;
- access to Pegasus or Triton;
- the name of an approved LSF project;
- access to that project's scratch directory; and
- a connection method provided for your account, such as the University of
  Miami network, VPN, or a configured SSH jump host.

In the commands below:

- replace ``<caneid>`` with your CaneID;
- replace ``<project>`` with your LSF project name; and
- use ``general`` as ``<queue>`` on Pegasus or ``short`` on Triton.

1. Connect to a Cluster
-----------------------

Open a terminal application. On Windows, use PowerShell or Windows Terminal.
On macOS or Linux, use Terminal.

**Pegasus**

.. code-block:: bash

   ssh <caneid>@pegasus2.idsc.miami.edu

**Triton**

.. code-block:: bash

   ssh <caneid>@t2.idsc.miami.edu

Enter your CaneID password when prompted. After login, you will be on a cluster
login node.

.. note::

   If your account uses a configured SSH alias or jump host, use the same SSH
   destination supplied for your account instead of the host shown above.

.. important::

   Login nodes are intended for tasks such as editing files, transferring data,
   loading software, and submitting jobs. Run computational work through the
   LSF scheduler rather than directly on a login node.

For additional SSH options, see :ref:`ssh`. For graphical applications, see
:ref:`x11`.

2. Create a Scratch Working Directory
-------------------------------------

On the cluster, create a directory for the QuickStart files:

.. code-block:: bash

   mkdir -p /scratch/<project>/$USER/quickstart
   cd /scratch/<project>/$USER/quickstart

Confirm your location:

.. code-block:: bash

   pwd

The output should resemble:

.. code-block:: text

   /scratch/<project>/<caneid>/quickstart

The environment variable ``$PROJECT`` is not assumed to be defined. Enter the
project name directly wherever ``<project>`` appears.

3. Prepare the Example Files Locally
------------------------------------

Open a second terminal on your local computer and create a directory for the
example:

.. code-block:: bash

   mkdir -p ~/hpc-quickstart
   cd ~/hpc-quickstart

The example uses three files:

.. code-block:: text

   data.csv      Input dataset
   analyze.py    Python analysis program
   analyze.job   LSF batch-job script

Create the Dataset
~~~~~~~~~~~~~~~~~~

Create ``data.csv`` with the following content:

.. code-block:: text

   sample,value
   A,10
   B,15
   C,12
   D,18

Create the Python Script
~~~~~~~~~~~~~~~~~~~~~~~~

Create ``analyze.py``:

.. code-block:: python

   #!/usr/bin/env python3

   import csv
   import sys
   from pathlib import Path


   def main():
       if len(sys.argv) != 3:
           raise SystemExit(
               f"Usage: {sys.argv[0]} INPUT_CSV OUTPUT_CSV"
           )

       input_file = Path(sys.argv[1])
       output_file = Path(sys.argv[2])

       values = []

       with input_file.open(newline="", encoding="utf-8") as csv_file:
           reader = csv.DictReader(csv_file)

           for row in reader:
               values.append(float(row["value"]))

       if not values:
           raise ValueError(f"No data values were found in {input_file}")

       results = {
           "count": len(values),
           "minimum": min(values),
           "maximum": max(values),
           "mean": sum(values) / len(values),
       }

       with output_file.open("w", newline="", encoding="utf-8") as csv_file:
           writer = csv.writer(csv_file)
           writer.writerow(["metric", "value"])

           for metric, value in results.items():
               writer.writerow([metric, value])

       print(f"Read {len(values)} values from {input_file}")
       print(f"Wrote the analysis results to {output_file}")


   if __name__ == "__main__":
       main()

This program reads the values in ``data.csv`` and writes summary statistics to
``summary.csv``. It uses only the Python standard library.

Create the LSF Job Script
~~~~~~~~~~~~~~~~~~~~~~~~~

Create ``analyze.job``:

.. code-block:: bash

   #!/bin/bash
   #BSUB -J quickstart-python
   #BSUB -P <project>
   #BSUB -q <queue>
   #BSUB -n 1
   #BSUB -R "rusage[mem=512M]"
   #BSUB -W 00:05
   #BSUB -o quickstart.%J.out
   #BSUB -e quickstart.%J.err

   set -euo pipefail

   WORKDIR="${LS_SUBCWD:-$PWD}"
   cd "$WORKDIR"

   echo "Job ID: $LSB_JOBID"
   echo "Compute host: $(hostname)"
   echo "Architecture: $(uname -m)"
   echo "Working directory: $WORKDIR"
   echo

   python3 analyze.py data.csv summary.csv

Replace ``<project>`` with your LSF project. Replace ``<queue>`` according to
the cluster:

.. list-table::
   :header-rows: 1
   :widths: 30 30

   * - Cluster
     - Queue
   * - Pegasus
     - ``general``
   * - Triton
     - ``short``

The main LSF directives in this example specify:

- ``-J`` -- the job name;
- ``-P`` -- the LSF project;
- ``-q`` -- the queue;
- ``-n`` -- the number of CPU cores;
- ``-R`` -- the requested memory;
- ``-W`` -- the runtime limit;
- ``-o`` -- the standard-output file; and
- ``-e`` -- the standard-error file.

The token ``%J`` is replaced with the LSF job ID.

Confirm that the local directory contains all three files:

.. code-block:: bash

   ls -l data.csv analyze.py analyze.job

4. Transfer the Files to the Cluster
------------------------------------

Transfer with SCP
~~~~~~~~~~~~~~~~~

Run ``scp`` from the local computer, not from the cluster login node.

**Pegasus**

.. code-block:: bash

   scp data.csv analyze.py analyze.job \
       <caneid>@pegasus2.idsc.miami.edu:/scratch/<project>/<caneid>/quickstart/

**Triton**

.. code-block:: bash

   scp data.csv analyze.py analyze.job \
       <caneid>@t2.idsc.miami.edu:/scratch/<project>/<caneid>/quickstart/

If your account uses an SSH alias or jump host, replace the destination host
with the same destination you use successfully for ``ssh``.

Transfer with an SFTP Application
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You may instead use an SFTP application such as FileZilla, Cyberduck, or
WinSCP.

Use these connection settings:

.. list-table::
   :header-rows: 1
   :widths: 25 55

   * - Setting
     - Value
   * - Protocol
     - SFTP
   * - Port
     - ``22``
   * - Username
     - Your CaneID
   * - Pegasus host
     - ``pegasus2.ccs.miami.edu``
   * - Triton host
     - ``t2.idsc.miami.edu``
   * - Remote directory
     - ``/scratch/<project>/<caneid>/quickstart``

Connect using the same authentication or jump-host configuration required for
SSH. Upload ``data.csv``, ``analyze.py``, and ``analyze.job`` to the remote
directory.

5. Verify the Uploaded Files
----------------------------

Return to the cluster terminal:

.. code-block:: bash

   cd /scratch/<project>/$USER/quickstart
   ls -l

The directory should contain:

.. code-block:: text

   analyze.job
   analyze.py
   data.csv

You can inspect the files before submission:

.. code-block:: bash

   cat data.csv
   cat analyze.job

6. Submit the LSF Job
---------------------

Submit the job from the scratch working directory:

.. code-block:: bash

   bsub < analyze.job

LSF returns a job ID similar to:

.. code-block:: text

   Job <123456> is submitted to queue <general>.

On Triton, the queue name in the message will be ``short``.

7. Monitor the Job
------------------

Check active jobs:

.. code-block:: bash

   bjobs

Common states include:

- ``PEND`` -- waiting for resources;
- ``RUN`` -- currently running;
- ``DONE`` -- completed successfully; and
- ``EXIT`` -- ended with an error.

This example runs quickly. It may finish before ``bjobs`` displays it. If LSF
reports ``No unfinished job found``, list recent jobs with:

.. code-block:: bash

   bjobs -a

For detailed information about a specific job, use:

.. code-block:: bash

   bjobs -a -l <jobid>

8. Inspect the Output
---------------------

After the job finishes, list the directory:

.. code-block:: bash

   ls -l

The job creates files similar to:

.. code-block:: text

   quickstart.123456.out
   quickstart.123456.err
   summary.csv

On a shared filesystem, the LSF output and error files may take a few seconds
to appear after a very short job finishes.

View the standard output:

.. code-block:: bash

   cat quickstart.*.out

Near the end of the file, you should see output similar to:

.. code-block:: text

   Job ID: 123456
   Compute host: <compute-host>
   Architecture: <architecture>
   Working directory: /scratch/<project>/<caneid>/quickstart

   Read 4 values from data.csv
   Wrote the analysis results to summary.csv

Check the standard-error file:

.. code-block:: bash

   cat quickstart.*.err

An empty error file indicates that the program did not write an error message.

View the generated result:

.. code-block:: bash

   cat summary.csv

Expected result:

.. code-block:: text

   metric,value
   count,4
   minimum,10.0
   maximum,18.0
   mean,13.75

This confirms that LSF ran the Python program on a compute host, passed the
dataset to the program, and wrote the result to scratch storage.

9. Download the Result
----------------------

Run the download command from the local computer.

**Pegasus**

.. code-block:: bash

   scp \
       <caneid>@pegasus2.idsc.miami.edu:/scratch/<project>/<caneid>/quickstart/summary.csv \
       .

**Triton**

.. code-block:: bash

   scp \
       <caneid>@t2.idsc.miami.edu:/scratch/<project>/<caneid>/quickstart/summary.csv \
       .

If your account uses an SSH alias or jump host, use the same destination that
worked for the upload.

Confirm the downloaded file:

.. code-block:: bash

   cat summary.csv

You have now completed the full workflow:

.. code-block:: text

   prepare files -> upload -> submit -> monitor -> inspect -> download

10. Disconnect
--------------

To disconnect from the cluster, run:

.. code-block:: bash

   exit

Next Steps
----------

Before running production workloads, review the
:doc:`Cluster Usage Guidelines <2-guidelines>`.

Continue with the detailed guides as needed:

- :ref:`g-projects` for project access and allocation information;
- :ref:`transfer` for additional transfer methods;
- :ref:`g-modules` for software modules;
- :ref:`g-lsf` for batch-job submission;
- :ref:`g-interactive` for interactive jobs; and
- :ref:`policies` for cluster policies.