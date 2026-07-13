.. _general-software-matlab:

MATLAB
======

MATLAB is available on Pegasus and can be used interactively or through LSF batch jobs when available.

.. important::

   MATLAB is not currently available on Triton.

Find and Load MATLAB
--------------------

Search for MATLAB:

::

   module avail matlab
   module spider matlab

Load MATLAB:

::

   module load matlab/<version>

Check the command:

::

   which matlab

Interactive MATLAB
------------------

Graphical MATLAB sessions may require X11 forwarding and an interactive LSF
session.

Example pattern:

::

   bsub -P <project> -q interactive -Is -XF matlab

Desktop-free interactive pattern:

::

   bsub -P <project> -q interactive -Is -XF matlab -nodesktop

Non-display pattern:

::

   bsub -P <project> -q interactive -Is matlab -nodisplay

.. warning::

   Do not run heavy graphical MATLAB workloads directly on login nodes.

Batch MATLAB Jobs
-----------------

Example job script:

.. code:: bash

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

Recommended Practice
--------------------

* Use interactive MATLAB for development.
* Use LSF batch jobs for production runs.
* Use X11 forwarding only when a graphical interface is needed.
* Request appropriate CPU, memory, queue, and wall time.
