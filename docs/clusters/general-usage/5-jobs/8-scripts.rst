.. _g-scripts:


Serial/Parallel Job Scripts
=======================

The command ``bsub < ScriptFile`` will submit the given script for
processing. Your script must contain the information LSF needs to
allocate the resources your job requires, handle standard I/O streams,
and run the job. For more information about flags, type ``bsub -h`` or
``man bsub`` at the Pegasus prompt. Example scripts and descriptions are
below.

You must be a member of a project to submit jobs to it. See :ref:`g-projects` for more information.

On submission, LSF will return the ``jobID`` which can be used to track
your job.

::

    [username@pegasus ~]$ bsub < test.job
    Job <4225> is submitted to the default queue <normal>.

**Example script for a serial Job**

``test.job``

--------------

.. code:: bash

    #!/bin/bash
    #BSUB -J myserialjob
    #BSUB -P myproject
    #BSUB -o %J.out
    #BSUB -e %J.err
    #BSUB -W 1:00
    #BSUB -q normal
    #BSUB -n 1
    #BSUB -R "rusage[mem=128]"
    #BSUB -B
    #BSUB -N
    #BSUB -u myemail@miami.edu
    #
    # Run serial executable on 1 cpu of one node
    cd /path/to/scratch/directory
    ./test.x a b c

Here is a detailed line-by-line breakdown of the keywords and their
assigned values listed in this script:

``ScriptFile_keywords``

--------------

.. code:: bash

    #!/bin/bash
    specifies the shell to be used when executing the command portion of the script.
    The default is Bash shell.

    #BSUB -J serialjob
    assign a name to job. The name of the job will show in the bjobs output.

    #BSUB -P myproject
    specify the project to use when submitting the job. This is required when a user has more than one project on Pegasus.

    #BSUB -e %J.err
    redirect std error to a specified file

    #BSUB -W 1:00
    set wall clock run time limit of 1 hour, otherwise queue specific default run time limit will be applied.

    #BSUB -q normal
    specify queue to be used. Without this option, default 'normal' queue will be applied.

    #BSUB -n 1
    specify number of processors. In this job, a single processor is requested.

    #BSUB -R "rusage[mem=128]"
    specify that this job requests 128 megabytes of RAM per core. Without this, a default RAM setting will be applied:  1500MB per core

    #BSUB -B
    send mail to specified email when the job is dispatched and begins execution.

    #BSUB -u example@miami.edu
    send notification through email to example@miami.edu.

    #BSUB -N
    send job statistics report through email when job finishes.

**Example scripts for parallel jobs**

We recommend using Intel MPI unless you have specific reason for using
OpenMP.  Intel MPI scales better and has better performance than OpenMP.

Submit parallel jobs to the **normal** job queue with ``-q normal``.

For optimum performance, the default resource allocation on the parallel
queue is ``ptile=16``. This requires the LSF job scheduler to allocate
16 processors per host, ensuring all processors on a single host are
used by that job. ***Without prior authorization, any jobs using a
number other than 16 will be rejected from the parallel queue.***
**Reserve enough memory for your jobs.** Memory reservations are per
core. Parallel job performance may be affected, or even interrupted, by
other badly-configured jobs running on the same host.

**Example script for Intel/Intel MPI**

``testparai.job``

--------------

.. code:: bash

    #!/bin/bash
    #BSUB -J mpijob
    #BSUB -o %J.out
    #BSUB -e %J.err
    #BSUB -W 1:30
    #BSUB -q normal
    #BSUB -n 32                             # Request 32 cores
    #BSUB -R "span[ptile=16]"               # Request 16 cores per node
    #BSUB -R "rusage[mem=128]"              # Request 128MB per core
    #

    mpiexec foo.exe

``foo.exe`` is the mpi executable name. It can be followed by its own
argument list.

**Example script for MPI/OpenMP**

``testparao.job``

--------------

.. code:: bash

    #!/bin/bash
    #BSUB -J mpijob
    #BSUB -o %J.out
    #BSUB -e %J.err
    #BSUB -W 1:30
    #BSUB -q normal
    #BSUB -n 32                             # Request 32 cores                
    #BSUB -R "span[ptile=16]"               # Request 16 cores per node
    #BSUB -R "rusage[mem=128]"              # Request 128MB per core
    #

    mpiexec --mca btl self,sm,openib foo.exe

The command line is similar to Intel MPI job above. Option
``--mca self,sm,openib`` tells OpenMP to use lookback, shared memory,
and openib for inter-process communication.
