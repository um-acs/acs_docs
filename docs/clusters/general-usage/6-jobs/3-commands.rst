.. _g-lsf-commands: 

LSF Commands
====================

`LSF 9.1.1 Documentation <https://ccs.maimi.edu/ac/lsf/9.1.1/>`__

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

    [username@pegasus ~]$ bsub -J jobname -o %J.out -e %J.err -q normal -P myproject myprogram
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

    [username@pegasus ~]$ bjobs
    JOBID  USER   STAT  QUEUE    FROM_HOST  EXEC_HOST   JOB_NAME  SUBMIT_TIME
    4225   usernam   RUN   normal  login1.pega       16*n060     testjob   Mar  2 11:53
                                             16*n061
                                             16*n063
                                             16*n064

For details about your particular job, issue the command
``bjobs -l jobID`` where ``jobID`` is obtained from the ``JOBID`` field
of the above ``bjobs`` output. To display a specific user’s jobs, use
``bjobs -u username``. To display all user jobs in paging format, pipe
output to ``less``:

::

    [username@pegasus ~]$ bjobs -u all | less
    JOBID     USER    STAT  QUEUE      FROM_HOST   EXEC_HOST   JOB_NAME   SUBMIT_TIME
    5990529   axt651  RUN   interactiv login1.pega n021        bash       Feb 13 15:23
    6010636   zxh69   RUN   normal    login1.pega 16*n178     *acsjob-01 Feb 23 11:36
                                                   16*n180
                                                   16*n203
                                                   16*n174
    6014246   swishne RUN   interactiv n002.pegasu n002        bash       Feb 24 14:10
    6017561   asingh  PEND  interactiv login1.pega             matlab     Feb 25 14:49
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

    [username@pegasus ~]$ bkill 4225
    Job <4225> is being terminated

On Pegasus (Unix), SIGINT and SIGTERM are sent to give the job a chance
to clean up before termination, then SIGKILL is sent to kill the job.

bqueues
~~~~~~~

``bqueues`` displays information about queues such as queue name, queue
priority, queue status, job slot statistics, and job state statistics.
CPU time is normalized by CPU factor.

::

   [nra20@pegasus ~]$ bqueues
   QUEUE_NAME      PRIO STATUS          MAX JL/U JL/P JL/H NJOBS  PEND   RUN  SUSP 
   gpu_h100_premiu  99  Open:Active       -    -    -    -     0     0     0     0
   sccc_premium     99  Open:Active       -    -    -    -     0     0     0     0
   sccc_bigmem_pre  99  Open:Active       -    -    -    -     0     0     0     0
   sccc_gpu_premiu  99  Open:Active       -    -    -    -     0     0     0     0
   admin            50  Open:Active       -    -    -    -     0     0     0     0
   hihg             30  Open:Active       -    -    -    -     0     0     0     0
   bigmem           30  Open:Active       -    -    -    -    82    50    32     0
   gpu_titan        30  Open:Active       -    -    -    -     0     0     0     0
   gpu_h100         30  Open:Active       -    -    -    -     0     0     0     0
   interactive      30  Open:Active       -    -    -    -     2     0     2     0
   jupyter          30  Open:Active       -    -    -    -     0     0     0     0
   hp               30  Open:Active       -    -    -    -     0     0     0     0
   normal           30  Open:Active       -    -    -    -     0     0     0     0
   sccc             10  Open:Active       -    -    -    -     1     0     1     0
   sccc_dev         10  Open:Active       -    -    -    -     0     0     0     0
   sccc_bigmem      10  Open:Active       -    -    -    -     0     0     0     0
   sccc_gpu         10  Open:Active       -    -    -    -     0     0     0     0
   sccc_jupyter     10  Open:Active       -    -    -    -     0     0     0     0
   sccc_restudio    10  Open:Active       -    -    -    -     0     0     0     0

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

    [username@pegasus ~]$ bhosts -w | less
   HOST_NAME          STATUS          JL/U    MAX  NJOBS    RUN  SSUSP  USUSP    RSV 
   gpu1               ok              -     96      0      0      0      0      0
   gpu2               ok              -     96      0      0      0      0      0
   login1             ok              -     16      0      0      0      0      0
   n021               ok              -     16      2      2      0      0      0
   .
   .
   n044               ok              -     16      0      0      0      0      0
   n045               ok              -     16      0      0      0      0      0

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

    [username@pegasus ~]$ cat test.out
    Sender: LSF System <lsfadmin@n069>
    Subject: Job 173772: <test> in cluster <pegasus> Done
    Job <test> was submitted from host <login1> by user <username> in cluster <pegasus>.
    Job was executed on host(s) <8*n069>, in queue <normal>, as user <username> in cluster <pegasus>.
    ...
    Your job looked like:
    ------------------------------------------------------------
    # LSBATCH: User input
    #!/bin/sh
    #BSUB -n 16
    #BSUB -J test
    #BSUB -o test.out
    ...
    ------------------------------------------------------------
    Successfully completed.
    Resource usage summary:
    CPU time : 2.26 sec.
    Max Memory : 30 MB
    Average Memory : 30.00 MB
    ...
    PS:
    Read file <test.err> for stderr output of this job.
