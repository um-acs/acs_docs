Job Scheduling with LSF
=======================

Triton currently uses the **LSF** resource manager to schedule all
compute resources. LSF (*load sharing facility*) supports over 1500
users and over 200,000 simultaneous job submissions. Jobs are submitted
to **queues**, the software categories we define in the scheduler to
organize work more efficiently. LSF distributes jobs submitted by users
to our over 340 compute nodes according to queue, user priority, and
available resources. You can monitor your job status, queue position,
and progress using LSF commands.

.. tip:: **Reserve an appropriate amount of resources through LSF for your jobs.** 

If you do not know the resources your jobs need, use the
**debug** queue to benchmark your jobs. 

.. warning:: Jobs with insufficient resource allocations interfere with cluster performance and the IDSC account responsible for those jobs may be suspended (`Policies <https://ccs.miami.edu/ac/policies>`__).

.. tip:: **Stage data for running jobs exclusively in the** ``/scratch`` **file system,** which is optimized for fast data access. 

Any files used as input for your jobs must first be transferred to /scratch.
The /home file system is optimized for mass data storage and is therefore
slower-access. 

.. warning:: Using /home while running jobs degrades the performance of the entire system and the IDSC account responsible may be suspended*** (`Policies <https://ccs.miami.edu/ac/policies>`__).

.. tip:: **Do not background processes with the** ``&`` **operator in LSF.** 

These spawned processes cannot be killed with **bkill** after the parent is
gone. 

.. warning:: Using the & operator while running jobs degrades the performance of the entire system and the IDSC account responsible may be suspended (`Policies <https://ccs.miami.edu/ac/policies>`__).

LSF Commands
------------

`LSF 10.1 Documentation <https://www.ibm.com/docs/el/spectrum-lsf/10.1.0?topic=notes-lsf-101-release/>`__

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
~~~~~~~~~~~~~~~

The command ``bsub`` will submit a job for processing. You must include
the information LSF needs to allocate the resources your job requires,
handle standard I/O streams, and run the job. For more information about
flags, type ``bsub -h`` at the Pegasus prompt. Detailed information can
be displayed with ``man bsub``. On submission, LSF will return the job
id which can be used to keep track of your job.

::

    [username@triton ~]$ bsub -J jobname -o %J.out -e %J.err -q normal -P myproject myprogram
    Job <2607> is submitted to general queue .

The Job Scripts section has more information about organizing multiple
flags into a job script file for submission.

Monitoring Jobs
~~~~~~~~~~~~~~~

bjobs
^^^^^

The commands ``bjobs`` displays information about your own pending,
running, and suspended jobs.

::

    [username@triton ~]$ bjobs
    JOBID  USER   STAT  QUEUE    FROM_HOST  EXEC_HOST   JOB_NAME  SUBMIT_TIME
    4225   usernam   RUN   normal  m1       16*n060     testjob   Mar  2 11:53
                                             16*n061
                                             16*n063
                                             16*n064

For details about your particular job, issue the command
``bjobs -l jobID`` where ``jobID`` is obtained from the ``JOBID`` field
of the above ``bjobs`` output. To display a specific user’s jobs, use
``bjobs -u username``. To display all user jobs in paging format, pipe
output to ``less``:

::

    [username@triton ~]$ bjobs -u all | less
    JOBID     USER    STAT  QUEUE      FROM_HOST   EXEC_HOST   JOB_NAME   SUBMIT_TIME
    5990529   axt651  RUN   interactiv login4.pega n002        bash       Feb 13 15:23
    6010636   zxh69   RUN   normal    login4.pega 16*n178     *acsjob-01 Feb 23 11:36
                                                   16*n180
                                                   16*n203
                                                   16*n174
    6014246   swishne RUN   interactiv n002.pegasu n002        bash       Feb 24 14:10
    6017561   asingh  PEND  interactiv login4.pega             matlab     Feb 25 14:49
    ...

bhist
^^^^^

``bhist`` displays information about your recently finished jobs. CPU
time is not normalized in ``bhist`` output. To see your *finished* and
*unfinished* jobs, use ``bhist -a``.

bkill
^^^^^

``bkill`` kills the last job submitted by the user running the command,
by default. The command ``bkill jobID`` will remove a specific job from
the queue and terminate the job **if** it is running. ``bkill 0`` will
kill all jobs belonging to current user.

::

    [username@triton ~]$ bkill 4225
    Job <4225> is being terminated

On Pegasus (Unix), SIGINT and SIGTERM are sent to give the job a chance
to clean up before termination, then SIGKILL is sent to kill the job.

bqueues
^^^^^^^

``bqueues`` displays information about queues such as queue name, queue
priority, queue status, job slot statistics, and job state statistics.
CPU time is normalized by CPU factor.

::

    [username@triton ~]$ bqueues
    QUEUE_NAME      PRIO STATUS          MAX JL/U JL/P JL/H NJOBS  PEND   RUN  SUSP 
    bigmem          500  Open:Active       -   16    -    -  1152  1120    32     0
    normal          100  Open:Active       -    -    -    -  9677  5969  3437     0
    interactive      30  Open:Active       -    4    -    -    13     1    12     0

bhosts
^^^^^^

``bhosts`` displays information about all hosts such as host name, host
status, job state statistics, and jobs lot limits. ``bhosts -s``
displays information about numeric resources (shared or host-based) and
their associated hosts. ``bhosts hostname`` displays information about
an individual host and ``bhosts -w`` displays more detailed host status.
closed_Full means the configured maximum number of running jobs has been
reached (running jobs will not be affected), no new job will be assigned
to this host.

::

    [username@triton ~]$ bhosts -w | less
    HOST_NAME          STATUS       JL/U    MAX  NJOBS    RUN  SSUSP  USUSP    RSV 
    n001               ok              -     16     14     14      0      0      0
    n002               ok              -     16      4      4      0      0      0
    ...
    n342               closed_Full     -     16     16     12      0      0      4
    n343               closed_Full     -     16     16     16      0      0      0
    n344               closed_Full     -     16     16     16      0      0      0

bpeek
^^^^^

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
~~~~~~~~~~~~~~~~~~~~

Once your job has completed, examine the contents of your job’s output
files. Note the script submission under **User input**, whether the job
completed, and the **Resource usage summary**.

::

    [username@triton ~]$ cat test.out
    Sender: LSF System <lsfadmin@n069.triton.edu>
    Subject: Job 6021006: <test> in cluster <mk2> Done
    Job <test> was submitted from host <login4.triton.edu> by user <username> in cluster <mk2>.
    Job was executed on host(s) <8*n069>, in queue <general>, as user <username> in cluster <mk2>.
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


LSF Batch Jobs
--------------

Batch jobs are self-contained programs that require no intervention to
run. Batch jobs are defined by resource requirements such as how many
cores, how much memory, and how much time they need to complete. These
requirements can be submitted via command line flags or a script file.
Detailed information about LSF commands and example script files can be
found later in this guide.

1. **Create a job scriptfile**

   Include a job name ``-J``, the information LSF needs to allocate
   resources to your job, and names for your output and error files.

   ::

       scriptfile
       #BSUB -J test
       #BSUB -q normal
       #BSUB -P myproject
       #BSUB -o %J.out
       ...

2. **Submit your job to the appropriate project and queue with**
   ``bsub < scriptfile``

   Upon submission, a ``jobID`` and the queue name are returned.

   ::

       [username@login1 ~]$ bsub < scriptfile 
       Job <6021006> is submitted to queue <normal>.

3. **Monitor your jobs with** ``bjobs``

   Flags can be used to specify a single job or another user’s jobs.

   ::

       [username@login1 ~]$ bjobs
       JOBID  USER   STAT  QUEUE    FROM_HOST  EXEC_HOST   JOB_NAME  SUBMIT_TIME
       4225   usernam   RUN   normal  m1       16*n060     testjob   Mar  2 11:53

4. **Examine job output files**

   Once your job has completed, view output information.

   ::

       [username@triton ~]$ cat test.out
       Sender: LSF System <lsfadmin@n069.triton.edu>
       Subject: Job 6021006: <test> in cluster <triton> Done
       Job <test> was submitted from host <login4.triton.edu> by user <username> in cluster <mk2>.
       Job was executed on host(s) <8*n069>, in queue <normal>, as user <username> in cluster <mk2>.
       ...

LSF Interactive Jobs
--------------------

HPC clusters primarily take batch jobs and run them in the
*background* — users do not need to interact with the job during the
execution. However, sometimes users do need to interact with the
application. For example, the application needs the input from the
command line or waits for a mouse event in X windows. Use
``bsub -Is -q interactive command`` to launch interactive work on
Triton.

::

    [username@login1 ~]$ bsub -Is -q interactive bash


Upon exiting the interactive job, you will be returned to one of the
login nodes.

Utilizing X11 client
~~~~~~~~~~~~~~~~~~~~

Additionally, the interactive queue can run X11 jobs. The bsub ``-XF``
option is used for X11 jobs, for example:

::

    [username@login1 ~]$ bsub -Is -q interactive -XF 
    Job <50274> is submitted to queue <interactive>.
    <<ssh X11 forwarding job>>
    <<Waiting for dispatch ...>>
    <<Starting on n003.triton.edu>> 

Upon exiting the X11 interactive job, you will be returned to one of the
login nodes.

To run an X11 application, establish an X tunnel with SSH when
connecting to Triton. For example,

::

    ssh -X username@triton.ccs.miami.edu

Note that by default, the auth token is good for 20 minutes.  SSH will
block new X11 connections after 20 minutes. To avoid this on Linux or OS
X, run ``ssh -Y`` instead, or set the option **ForwardX11Trusted yes**
in your ~/.ssh/config.

In Windows, use \ `Cygwin/X <https://www.cygwin.com/>`__ to provide a
Linux-like environment.  Then run ``ssh -Y`` or set the option in your
~/.ssh/config file.

