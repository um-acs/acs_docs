Triton LSF Commands
====================


Common LSF commands and descriptions:

.. raw:: html

   <table>

.. raw:: html

   <thead>

.. raw:: html

   <tr class="header">

.. raw:: html

   <th>

Command

.. raw:: html

   </th>

.. raw:: html

   <th>

Purpose

.. raw:: html

   </th>

.. raw:: html

   </tr>

.. raw:: html

   </thead>

.. raw:: html

   <tbody>

.. raw:: html

   <tr class="odd">

.. raw:: html

   <td>

bsub

.. raw:: html

   </td>

.. raw:: html

   <td>

Submits a job to LSF. Define resource requirements with flags.

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr class="even">

.. raw:: html

   <td>

bsub < scriptfile

.. raw:: html

   </td>

.. raw:: html

   <td>

Submits a job to LSF via script file. The redirection symbol < is
required when submitting a job script file

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr class="odd">

.. raw:: html

   <td>

bjobs

.. raw:: html

   </td>

.. raw:: html

   <td>

Displays your running and pending jobs.

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr class="even">

.. raw:: html

   <td>

bhist

.. raw:: html

   </td>

.. raw:: html

   <td>

Displays historical information about your finished jobs.

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr class="odd">

.. raw:: html

   <td>

bkill

.. raw:: html

   </td>

.. raw:: html

   <td>

Removes/cancels a job or jobs from the class.

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr class="even">

.. raw:: html

   <td>

bqueues

.. raw:: html

   </td>

.. raw:: html

   <td>

Shows the current configuration of queues.

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr class="odd">

.. raw:: html

   <td>

bhosts

.. raw:: html

   </td>

.. raw:: html

   <td>

Shows the load on each node.

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr class="even">

.. raw:: html

   <td>

bpeek

.. raw:: html

   </td>

.. raw:: html

   <td>

Displays stderr and stdout from your unfinished job.

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   </tbody>

.. raw:: html

   </table>

Scheduling Jobs
---------------

The command ``bsub`` will submit a job for processing. You must include
the information LSF needs to allocate the resources your job requires,
handle standard I/O streams, and run the job. For more information about
flags, type ``bsub -h`` at the Pegasus prompt. Detailed information can
be displayed with ``man bsub``. On submission, LSF will return the job
id which can be used to keep track of your job.

::

    [username@mgt3.summit ~]$ bsub -J jobname -o %J.out -e %J.err -q normal -P myproject myprogram
    Job <2607> is submitted to normal queue .

The Job Scripts section has more information about organizing multiple
flags into a job script file for submission.

Monitoring Jobs
---------------

bjobs
~~~~~

The commands ``bjobs`` displays information about your own pending,
running, and suspended jobs.

::

    [username@mgt3.summit ~]$ bjobs
    JOBID  USER   STAT  QUEUE    FROM_HOST  EXEC_HOST   JOB_NAME  SUBMIT_TIME
    4225   usernam   RUN   normal  mgt3      16*t030     testjob   Mar  2 11:53
                                             16*t031
                                             16*t032
                                             16*t033

For details about your particular job, issue the command
``bjobs -l jobID`` where ``jobID`` is obtained from the ``JOBID`` field
of the above ``bjobs`` output. To display a specific user’s jobs, use
``bjobs -u username``. To display all user jobs in paging format, pipe
output to ``less``:

::

    [username@mgt3.summit ~]$ bjobs -u all | less
    JOBID     USER    STAT  QUEUE      FROM_HOST   EXEC_HOST   JOB_NAME   SUBMIT_TIME
    5990529   axt651  RUN   interactiv mgt3        t035        bash       Feb 13 15:23
    6010636   zxh69   RUN   normal     mgt3        16*t030    *acsjob-01  Feb 23 11:36
                                                   16*t031
                                                   16*t032
                                                   16*t033
    6014246   swishne RUN   interactiv t034.mgt3   t034        bash       Feb 24 14:10
    ...

bhist
~~~~~

``bhist`` displays information about your recently finished jobs. CPU
time is not normalized in ``bhist`` output. To see your *finished* and
*unfinished* jobs, use ``bhist -a``.

bkill
~~~~~

``bkill`` kills the last job submitted by the user running the command,
by default. The command ``bkill jobID`` will remove a specific job from
the queue and terminate the job **if** it is running. ``bkill 0`` will
kill all jobs belonging to current user.

::

    [username@mgt3.summit ~]$ bkill 4225
    Job <4225> is being terminated

On Triton (Unix), SIGINT and SIGTERM are sent to give the job a chance
to clean up before termination, then SIGKILL is sent to kill the job.

bqueues
~~~~~~~

``bqueues`` displays information about queues such as queue name, queue
priority, queue status, job slot statistics, and job state statistics.
CPU time is normalized by CPU factor.

::

    [username@mgt3.summit ~]$ bqueues
   QUEUE_NAME      PRIO STATUS          MAX JL/U JL/P JL/H NJOBS  PEND   RUN  SUSP 
   admin            50  Open:Active       -    -    -    -     0     0     0     0
   owners           43  Open:Active       -    -    -    -     0     0     0     0
   priority         43  Open:Active       -    -    -    -     0     0     0     0
   night            40  Open:Inact        -    -    -    -     0     0     0     0
   short            35  Open:Active       -    -    -    -     0     0     0     0
   dataq            33  Open:Active       -    -    -    -     0     0     0     0
   normal           30  Open:Active       -    -    -    -     0     0     0     0
   interactive      30  Open:Active       -    -    -    -     1     0     1     0
   idle             20  Open:Active       -    -    -    -     0     0     0     0

bhosts
~~~~~~

``bhosts`` displays information about all hosts such as host name, host
status, job state statistics, and jobs lot limits. ``bhosts -s``
displays information about numeric resources (shared or host-based) and
their associated hosts. ``bhosts hostname`` displays information about
an individual host and ``bhosts -w`` displays more detailed host status.
closed_Full means the configured maximum number of running jobs has been
reached (running jobs will not be affected), no new job will be assigned
to this host.

::

    [username@mgt3.summit ~]$ bhosts -w | less
   HOST_NAME          STATUS          JL/U    MAX  NJOBS    RUN  SSUSP  USUSP    RSV 
   mgt3               ok              -     32      1      1      0      0      0
   t030               ok              -     40      0      0      0      0      0
   t031               ok              -     40      0      0      0      0      0
   t032               ok              -     40      0      0      0      0      0
   t033               ok              -     40      0      0      0      0      0
   t034               ok              -     40      0      0      0      0      0
   t035               ok              -     40      0      0      0      0      0
   t036               ok              -     40      0      0      0      0      0
   t037               ok              -     40      0      0      0      0      0
   t038               ok              -     40      0      0      0      0      0
   t039               ok              -     40      0      0      0      0      0

bpeek
~~~~~

Use ``bpeek jobID`` to monitor the progress of a job and identify
errors. If errors are observed, valuable user time and system resources
can be saved by terminating an erroneous job with ``bkill jobID``. By
default, ``bpeek`` displays the standard output and standard error
produced by one of your unfinished jobs, up to the time the command is
invoked. ``bpeek -q queuename`` operates on your most recently submitted
job in that queue and ``bpeek -m hostname`` operates on your most
recently submitted job dispatched to the specified host.
``bpeek -f jobID`` display live outputs from a running job and it can be
terminated by ``Ctrl-C`` (Windows & most Linux) or ``Command-C`` (Mac).

Examining Job Output
--------------------

Once your job has completed, examine the contents of your job’s output
files. Note the script submission under **User input**, whether the job
completed, and the **Resource usage summary**.

::

    [nra20@mgt3.summit ~]$ cat 391.out
   Sender: LSF System <lsfadmin@t037>
   Subject: Job 391: <mpi_hello_world> in cluster <t1> Done
   
   Job <mpi_hello_world> was submitted from host <mgt3> by user <nra20> in cluster <t1> at Wed Apr  9 10:22:26 2025
   Job was executed on host(s) <4*t037>, in queue <normal>, as user <nra20> in cluster <t1> at Wed Apr  9 10:04:52 2025
                               <4*t030>
                               <4*t039>
   </projectnb/triton/home/nra20> was used as the home directory.
   </scratch/projects/hpc/nra20/mpi_test> was used as the working directory.
   Started at Wed Apr  9 10:04:52 2025
   Terminated at Wed Apr  9 10:05:08 2025
   Results reported at Wed Apr  9 10:05:08 2025
   
   Your job looked like:
   
   ------------------------------------------------------------
   # LSBATCH: User input
   #!/bin/sh
   #BSUB -P hpc
   #BSUB -J mpi_hello_world
   #BSUB -o %J.out
   #BSUB -e %J.err
   #BSUB -q normal
   #BSUB -n 12
   #BSUB -R "span[ptile=4]"
   #BSUB -R "rusage[mem=128M]"
   
   module load spectrum-mpi/10.4.0.6-20230210

   mpirun -n 12 ./mpi_hello_world

   ------------------------------------------------------------
   
   Successfully completed.
   
   Resource usage summary:
   
       CPU time :                                   7.67 sec.
       Max Memory :                                 34 MB
       Average Memory :                             24.75 MB
       Total Requested Memory :                     384.00 MB
       Delta Memory :                               350.00 MB
       Max Swap :                                   -
       Max Processes :                              5
       Max Threads :                                9
       Run time :                                   14 sec.
       Turnaround time :                            0 sec.
   
   The output (if any) follows:
   
   Hello world from processor t037, rank 0 out of 12 processors
   Hello world from processor t037, rank 1 out of 12 processors
   Hello world from processor t037, rank 2 out of 12 processors
   Hello world from processor t037, rank 3 out of 12 processors
   Hello world from processor t030, rank 5 out of 12 processors
   Hello world from processor t039, rank 10 out of 12 processors
   Hello world from processor t030, rank 6 out of 12 processors
   Hello world from processor t039, rank 11 out of 12 processors
   Hello world from processor t030, rank 7 out of 12 processors
   Hello world from processor t039, rank 8 out of 12 processors
   Hello world from processor t039, rank 9 out of 12 processors
   Hello world from processor t030, rank 4 out of 12 processors
   
   
   PS:
   
   Read file <391.err> for stderr output of this job.



