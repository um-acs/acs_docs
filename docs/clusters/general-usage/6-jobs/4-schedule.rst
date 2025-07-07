.. _g-schedule: 

Scheduling Jobs
====================

The command ``bsub`` will submit a job for processing. You must include
the information LSF needs to allocate the resources your job requires,
handle standard I/O streams, and run the job. For more information about
flags, type ``bsub -h`` at the Pegasus prompt. Detailed information can
be displayed with ``man bsub``. On submission, LSF will return the job
id which can be used to keep track of your job.

::

    [username@pegasus ~]$ bsub -J jobname -o %J.out -e %J.err -q normal -P myproject myprogram
    Job <2607> is submitted to normal queue .

The Job Scripts section (See :ref:`g-lsf-scripts` for more information about organizing multiple
flags into a job script file for submission.
