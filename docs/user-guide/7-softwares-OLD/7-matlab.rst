.. _general-software-matlab:

MATLAB
======

MATLAB can be used interactively or through LSF batch jobs when it is available
on an IDSC system. Availability, module names, and licensing behavior may differ
by system.

.. note::

   Check module availability on the system where the job will run. MATLAB module
   names and versions can differ between systems.

Find and Load MATLAB
--------------------

Search for MATLAB modules:

::

   module avail matlab
   module spider matlab

Load MATLAB:

::

   module load matlab/<version>

Example:

::

   module load matlab/r2024b

Check the command:

::

   which matlab

Interactive MATLAB
------------------

For graphical MATLAB sessions, users may need X11 forwarding or a supported
interactive service.

.. caution::

   Graphical applications should not be run directly on login nodes for heavy
   work. Use an appropriate interactive LSF session or supported service.

Graphical interactive pattern:

::

   bsub -P <project> -q interactive -Is -XF matlab

Desktop-free interactive pattern:

::

   bsub -P <project> -q interactive -Is -XF matlab -nodesktop

Non-display interactive pattern:

::

   bsub -P <project> -q interactive -Is matlab -nodisplay

Batch MATLAB Jobs
-----------------

For production work, run MATLAB through an LSF job script.

Example ``matlab_job.sh``:

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

Submit the job:

::

   bsub < matlab_job.sh

.. important::

   Put MATLAB commands in scripts or functions when possible. Batch jobs are
   easier to reproduce and debug than long interactive sessions.

System Notes
------------

Pegasus
~~~~~~~

Pegasus MATLAB examples may use the ``interactive`` queue and X11 forwarding for
graphical sessions. Use ``-XF`` only when graphical forwarding is required.

Triton/Summit
~~~~~~~~~~~~~

MATLAB availability and licensing may differ on Triton/Summit. Check
``module avail matlab`` on the system where the job will run.

Recommended Practice
--------------------

* Use interactive MATLAB for development and testing.
* Use batch MATLAB jobs for production runs.
* Use X11 forwarding only when a graphical interface is required.
* Request appropriate memory, cores, queue, and wall time through LSF.
