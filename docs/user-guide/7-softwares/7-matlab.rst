.. _general-software-matlab:

MATLAB
======

MATLAB is available on Pegasus based on the current software review. Triton/Summit
MATLAB availability is not listed here unless confirmed.

MATLAB can be used interactively or through LSF batch jobs when available.

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

Pegasus Notes
-------------

MATLAB is available on Pegasus. Use the appropriate module version and LSF
resources for the workflow.

Triton/Summit Notes
-------------------

Triton/Summit MATLAB availability should be confirmed before documenting it as
available.

Recommended Practice
--------------------

* Use interactive MATLAB for development.
* Use LSF batch jobs for production runs.
* Use X11 forwarding only when a graphical interface is needed.
* Request appropriate CPU, memory, queue, and wall time.
