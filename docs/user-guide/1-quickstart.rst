Pegasus and Triton QuickStart
=============================

Pegasus and Triton are shared high-performance computing (HPC) clusters
available to authorized University of Miami researchers.

The **Triton** cluster consists of 10 `IBM POWER System AC922 <https://www.ibm.com/us-en/marketplace/power-systems-ac922>`__ compute nodes (with more on the way). Each node includes **two NVIDIA Tesla V100 GPUs** and is built on the **Power9 architecture**, optimized for **data-intensive workloads** and **high-performance deep learning training**.

::

    System:               Triton Supercomputer
    Architecture:         IBM Power9
    GPUs:                 NVIDIA Tesla V100 (2 per node)
    Operating System:     Red Hat Enterprise Linux 8.6
    Default Shell:        Bash
    Access Requirements:  IDSC Account
    Data Transfer:        SCP, SFTP
    Target Workloads:     Deep Learning(GPU Heavy)


The **Pegasus** cluster is the University of Miami’s flagship high-performance computing system, currently featuring **73+ compute nodes**. Pegasus resources—both hardware and software—are shared among all authorized University of Miami users.


::

    System:               Pegasus Supercomputer
    Architecture:         x86_64
    GPUs:                 -
    Operating System:     Rocky Linux 8.8
    Default Shell:        Bash
    Access Requirements:  IDSC Account
    Data Transfer:        SCP, SFTP
    Target Workloads:     General HPC

This QuickStart walks through connecting to either cluster, creating a working
directory, submitting a simple job through the LSF scheduler, and viewing the
result.

Before You Begin
----------------

You need:

- an active CaneID;
- access to an approved Pegasus or Triton project;
- the name of the project to use for job submission; and
- a connection to the University of Miami network or
  `VPN <https://www.it.miami.edu/a-z-listing/virtual-private-network/index.html>`__.

In the commands below, replace ``<caneid>`` and ``<project>`` with your own
CaneID and project name.

1. Connect to a Cluster
-----------------------

Open a terminal application. On Windows, use PowerShell or Windows Terminal.
On macOS or Linux, use Terminal.

**Pegasus**

.. code-block:: bash

   ssh <caneid>@pegasus2.ccs.miami.edu

**Triton**

.. code-block:: bash

   ssh <caneid>@t2.idsc.miami.edu

Enter your CaneID password when prompted. After login, you will be on a cluster
login node.

.. important::

   Login nodes are intended for tasks such as editing files, transferring data,
   loading software, and submitting jobs. Run computational work through the
   LSF scheduler rather than directly on a login node.

For additional SSH options, see :ref:`ssh`. For graphical applications, see
:ref:`x11`.

2. Create a Scratch Working Directory
-------------------------------------

Use project scratch storage for active job files and output:

.. code-block:: bash

   mkdir -p /scratch/<project>/$USER/quickstart
   cd /scratch/<project>/$USER/quickstart

Confirm your location:

.. code-block:: bash

   pwd

The output should resemble:

.. code-block:: text

   /scratch/<project>/<caneid>/quickstart

3. Create a Job Script
----------------------

Create a file named ``hello.job``:

.. code-block:: bash

   nano hello.job

Add the following content, replacing ``<project>`` with your project name:

.. code-block:: bash

   #!/bin/bash
   #BSUB -J quickstart
   #BSUB -P <project>
   #BSUB -n 1
   #BSUB -R "rusage[mem=512M]"
   #BSUB -W 00:05
   #BSUB -o quickstart.%J.out
   #BSUB -e quickstart.%J.err

   echo "Hello from $(hostname)"
   echo "User: $USER"
   echo "Started: $(date)"
   echo "Working directory: $(pwd)"

In ``nano``, press ``Ctrl+O`` and then ``Enter`` to save the file. Press
``Ctrl+X`` to exit.

The ``#BSUB`` lines define the project, CPU, memory, runtime, and output files
for the job. See :ref:`g-lsf` for a complete explanation of LSF job options.

4. Submit the Job
-----------------

Submit the script to LSF:

.. code-block:: bash

   bsub < hello.job

LSF will return a job ID similar to:

.. code-block:: text

   Job <123456> is submitted.

5. Check the Job Status
-----------------------

Check your active jobs:

.. code-block:: bash

   bjobs

Common job states include:

- ``PEND`` -- waiting for resources;
- ``RUN`` -- currently running;
- ``DONE`` -- completed successfully; and
- ``EXIT`` -- ended with an error.

A completed job may no longer appear in the default ``bjobs`` output. If LSF
reports that no unfinished jobs were found, continue to the next step.

6. View the Result
------------------

List the files created by the job:

.. code-block:: bash

   ls -lh

You should see files similar to:

.. code-block:: text

   hello.job
   quickstart.123456.out
   quickstart.123456.err

View the standard output:

.. code-block:: bash

   cat quickstart.*.out

The output should resemble:

.. code-block:: text

   Hello from <compute-node>
   User: <caneid>
   Started: <date and time>
   Working directory: /scratch/<project>/<caneid>/quickstart

Check the error file as well:

.. code-block:: bash

   cat quickstart.*.err

An empty error file and the expected standard output confirm that your first
LSF job completed successfully.


7. Disconnect
------------------
To disconnect from the cluster, run:

.. code-block:: bash

   exit

Next Steps
----------

Before running production workloads, review the
:doc:`Cluster Usage Guidelines <2-guidelines>`.

Continue with the detailed guides as needed:

- :ref:`g-projects` for project access and allocation information;
- :ref:`transfer` for transferring files;
- :ref:`g-modules` for software modules;
- :ref:`g-lsf` for batch-job submission;
- :ref:`g-interactive` for interactive jobs; and
- :ref:`policies` for cluster policies.