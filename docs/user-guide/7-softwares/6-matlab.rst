.. _general-software-matlab:

MATLAB
======

MATLAB is available on Pegasus for interactive and batch workloads.

.. important::

   MATLAB is not currently available on Triton.

Find and Load MATLAB
-----------------------

Check the available MATLAB versions:

.. code-block:: bash

   module avail matlab

Load an available version:

.. code-block:: bash

   module load matlab/<version>

Confirm that MATLAB is available:

.. code-block:: bash

   which matlab
   matlab -help

Interactive MATLAB
-----------------------

Start an interactive LSF shell before running MATLAB:

.. code-block:: bash

   bsub -P <project> -q general -Is -W 01:00 -n 1 
   -R "rusage[mem=4000]" bash

After the job starts, load MATLAB:

.. code-block:: bash

   module load matlab/<version>

For a command-line session without the desktop interface:

.. code-block:: bash

   matlab -nodesktop

For a session without graphical display support:

.. code-block:: bash

   matlab -nodisplay

To exit MATLAB:

.. code-block:: matlab

   exit

.. warning::

   Do not run compute-intensive MATLAB workloads directly on a login node.
   Start an interactive LSF job or submit a batch job.

Graphical MATLAB
-----------------------

The MATLAB desktop requires graphical forwarding between the local computer,
the login host, and the assigned compute node.

A graphical session may be started using an X11-enabled LSF job:

.. code-block:: bash

   bsub -P <project> -q general -Is -XF -W 01:00 -n 1 \
      -R "rusage[mem=4000]" bash

After the job starts:

.. code-block:: bash

   module load matlab/<version>
   matlab

.. note::

   Graphical MATLAB also requires a working local X server and an SSH
   connection with X11 forwarding enabled. Use command-line or batch MATLAB
   when the desktop interface is not required.

Batch MATLAB Jobs
-----------------

Use an LSF batch job for longer or repeatable MATLAB workloads.

Create a job script such as ``matlab_job.lsf``:

.. code-block:: bash

   #!/bin/bash
   #BSUB -P <project>
   #BSUB -J matlab_job
   #BSUB -q general
   #BSUB -n 1
   #BSUB -R "rusage[mem=4000]"
   #BSUB -W 01:00
   #BSUB -o matlab_job.%J.out
   #BSUB -e matlab_job.%J.err

   module load matlab/<version>

   matlab -batch "my_script"

Submit the job:

.. code-block:: bash

   bsub < matlab_job.lsf

Check its status:

.. code-block:: bash

   bjobs

After the job finishes, review the output and error files:

.. code-block:: bash

   less matlab_job.<job-id>.out
   less matlab_job.<job-id>.err

The ``-batch`` option runs the specified MATLAB command and exits automatically.
For example, the following command runs ``my_script.m`` from the current
working directory:

.. code-block:: bash

   matlab -batch "my_script"

Running a MATLAB Function
--------------------------

Arguments can be passed to a MATLAB function from the batch command:

.. code-block:: bash

   matlab -batch "my_function('input.dat', 10)"

Make sure the function file is in the current directory or available on the
MATLAB path.

Recommended Practice
-----------------------

* Use an interactive LSF job for development and short tests.
* Use batch jobs for long-running or repeatable workloads.
* Use the MATLAB desktop only when a graphical interface is necessary.
* Request CPU, memory, queue, and wall-time resources appropriate for the job.
* Save important output to files rather than relying only on terminal output.
