Job Scheduling with LSF
=======================

Both Triton and Pegasus currently use IBM's Spectrum **LSF** 
(load sharing facility) to distribute work across all compute 
resources. IBM's Spectrum LSF (hereafter LSF) is 
capable of supporting over 1500 users and over 
200,000 concurrent commands to LSF. 

A job is defined in IBM's documentation for LSF as 
a command that is submitted to LSF for execution.
Upon submission, jobs wait in cluster wide containers
for jobs known as **queues**. Each of Triton and Pegasus
has multiple queues, with each queue being a subset of the 
cluster nodes/hosts configured for a specific purpose. 
For instance, 2 of Triton's 96 nodes comprise the **bigmem** 
queue, and are configured for jobs requiring large (~1 TB) 
amounts of memory per node. Users are able to specify 
the queues to which their jobs are to be staged.

Commands for Queues
-----------------------

- ``bqueues`` -- View available queues
- ``bsub -q`` -- Submit a hob to a specific queue
- ``bparams`` -- View default queues

Commands for Jobs
---------------------

- ``bjobs`` -- View jobs in the system
- ``bsub``   -- Submit jobs
- ``bhist`` -- Display historical information about jobs
- ``bkill`` -- Sends signals to kill, suspend or resume unfinished jobs

Job Types
---------

Batch 
~~~~~

Batch jobs are self-contained programs that require no intervention to
run. They are defined by resource requirements such as the number of cores, 
the amount memory, and the walltime they need to complete. These
requirements can be submitted via command line flags entered one or 
multiple lines at a time, or via a script file.
Detailed information about LSF commands and example script files can be
found later in this guide.

Interactive
~~~~~~~~~~~

HPC clusters primarily take batch jobs and run them in the
*background* — users do not need to interact with the job during the
execution. However, sometimes users do need to interact with the
application during runtime. For example, an application may need 
the input from the command line or may need input from a mouse event 
in a graphical/X window. In such cases, users need to request
resources for interactive jobs as will be show shortly. 


Batch Job Scripts
-----------------

Batch job scripts can be prepared in the following two ways:
entering commnds directly to the shell, or combining 
commands into a script that is interpreted by the shell. Each of 
these is covered in turn.
a

Entering bsub commands directly
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Commands can be entered directly to the shell as shown in the example below.
In the example, each ``bsub`` command is preceded by a flag.
``jobname``, the jobname to be specified by the user is preceded
by the aptly named ``-J`` flag, the standard output is to be written
to a new file ``%J.out``, with ``%J`` denoting the job number 
to be assigned by LSF. The command to write the stdout to this file is 
preceded by the flag ``-o``. Similarly, the error files generated
during the runtime are to be written to a new file ``%J.err``, with 
``%J`` denoting the job number to be assigned by LSF. The user also
needs to specify the project under which the job is to be run. Here,
the project name is ``myproject``, and its specification is 
preceded by the ``-P`` flag. The user can optionally specify 
the queue to which the job is to be staged (otherwise the 
default queue is chosen). Here, the user has specified the 
``normal`` queue, and the specification is preceded by the 
``-q`` flag. Lastly the user specifies the command ``myprogram``
to run their program, and then presses return/enter. 

.. note::
   Note that in this batch job script, the user does not specify
   computational resources other than the queue, so LSF will 
   assign default values for computational resources (1 processor
   core, a modest amount of RAM, and no GPUs).

Upon pressing return/enter, the user gets a 
notification with details pertaining to the job submission

::

    [username@triton ~]$ bsub -J jobname -o %J.out -e %J.err -P myproject -q normal myprogram
    Job <2607> is submitted to normal queue .


Collating all bsub commands in a script
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The commands that were entered to the shell in the example above 
can be combined in a shell script, where each ``bsub`` command is 
preceded by the character sequence ``#BSUB``. The script combining 
the commands above, which we will call *example.job*  should appear as follows

.. code-block:: bash
   
   #!/bin/bash

   #BSUB -J jobname
   #BSUB -o %J.out
   #BSUB -e %J.err
   #BSUB -P myproject
   #BSUB -q normal

   myprogram

To submit all those commands to LSF, the script is redirected to bsub input:

::

     [username@triton ~]$ bsub < example.job

As in the case above, upon pressing return/enter, the user gets a
notification with details pertaining to the job submission.

Interactive Jobs 
-----------------

Interactive jobs can also take advantage of batch scheduling afforded
by LSF. On Triton and Pegasus, interactive jobs are allowed to be staged 
only to queues specially designated to run interactive jobs, and to run 
on hosts on those queues. Those queues are named *interactive* on 
both clusters. So, when requesting a session, users need 
to include the ``-Is`` flag which is required by LSF 
for interactive sessions in pseudoterminals
with shell support, as well as to specify the queue name as 
``-q interactive`` and follow that with a 
command specifying a shell environment (e.g. bash) for
the shell to run in the pseudoterminal.

::

     [username@pegasus ~]$ bsub -Is -q interactive bash

For instance, to run the batch job example in an interactive session
on Pegasus, we would need to type

::

     [username@pegasus ~]$ bsub -Is -q interactive -P myproject bash

after which the following is obtained

::

    Job <28398985> is submitted to queue <interactive>.
    <<Waiting for dispatch ...>>

and then a moment after notification of the session starting on 
node *n131*

::

    <<Starting on n131>> 
    [username@n131 ~]$ 

The command ``myprogram`` can then be typed directly on the (pseudo)terminal

Utilizing X11
~~~~~~~~~~~~~

In order to run Linux software that uses a Graphical User Interface 
(GUI) on Triton and Pegasus, a user needs to have or to install an X11
server (such as Xming_ for Windows or XQuartz_ for Mac OS) on their 
local computers. For instructions on how to download and install an X11 
server on your local computer, click the links provided in the last sentence. 
Additionally, make sure that *ForwardX11* is set to *yes* in the ssh 
configuration files on your local computer and on your user space 
on the cluster (in the file ~/.ssh/config).

.. _Xming: https://sourceforge.net/projects/xming/
.. _XQuartz: https://www.xquartz.org

Now, to establish an X tunnel with SSH when connecting to Pegasus or 
Triton, users need to type in the ``-X`` flag after ``ssh``. 
For example, when connecting to Pegasus:

::

    ssh -X username@pegasus.ccs.miami.edu

Finally, to run an X11 application on Triton and Pegasus, the bsub ``-XF``
option is used for job submissions. For example, to run Rstudio on 
Pegasus (having loaded rstudio beforehand), one types

::

    [username@login1 ~]$ bsub -Is -q interactive -XF rstudio

and then responds to the prompt for a password once a node is
assigned:

::

    [exm3129@login4 ~]$ bsub -Is -q interactive -P hpc -XF rstudio
    Job is submitted to <project_name> project.
    Job <job_number> is submitted to queue <interactive>.
    <<ssh X11 forwarding job>>
    <<Waiting for dispatch ...>>
    Warning: Permanently added '10.10.104.5' (ECDSA) to the list of known hosts.
    username@10.10.104.5's password: 
    <<Starting on n131>>
    
Once the password is authenticated, the Rstudio GUI is rendered.

Note that by default, the auth token is good for 20 minutes.  SSH will
block new X11 connections after 20 minutes. To avoid this on Linux or OS
X, run ``ssh -Y`` instead, or set the option **ForwardX11Trusted yes**
in your ~/.ssh/config. In Windows, use CygwinX_ to provide a
Linux-like environment.  Then run ``ssh -Y`` or set the option in your
~/.ssh/config file.

.. _CygwinX: https://x.cygwin.com

Some useful tips
----------------

.. tip:: **Reserve an appropriate amount of resources through LSF for your jobs.** 

If you do not know the resources your jobs need, use the
**debug**/**short** queues on Pegasus/Triton to benchmark your jobs. 

.. warning:: Jobs with insufficient resource allocations interfere with cluster performance and the IDSC account responsible for those jobs may be suspended (`Policies <https://ccs.miami.edu/ac/policies>`__).

.. tip:: **Stage data for running jobs exclusively in the** ``/scratch`` **file system,** which is optimized for fast data access. 

Any files used as input for your jobs must first be transferred to /scratch,
which is set up for fast read and write access. The /nethome and /home file 
systems, on the other hand, are optimized for mass data storage and should ideally
not be used to stage data for running jobs. 

.. warning:: Using /nethome or /home while running jobs degrades the performance of the entire system and the IDSC account responsible may be suspended*** (`Policies <https://ccs.miami.edu/ac/policies>`__).

.. tip:: **Do not background processes with the** ``&`` **operator in LSF.** 

These spawned processes cannot be killed with **bkill** after the parent is
gone. 

.. warning:: Using the & operator while running jobs degrades the performance of the entire system and the IDSC account responsible may be suspended (`Policies <https://ccs.miami.edu/ac/policies>`__).


Monitoring Jobs
---------------

bjobs
~~~~~

The commands ``bjobs`` displays information about your own pending,
running, and suspended jobs.

::

    [username@triton ~]$ bjobs
    JOBID  USER   STAT  QUEUE    FROM_HOST  EXEC_HOST   JOB_NAME  SUBMIT_TIME
    4225   username   RUN   normal  m1       16*n060     testjob   Mar  2 11:53
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
    6010636   zxh69   RUN   normal     login4.pega 16*n178     *acsjob-01 Feb 23 11:36
                                                   16*n180
                                                   16*n203
                                                   16*n174
    6014246   swishne RUN   interactiv n002.pegasu n002        bash       Feb 24 14:10
    6017561   asingh  PEND  interactiv login4.pega             matlab     Feb 25 14:49
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

    [username@triton ~]$ bkill 4225
    Job <4225> is being terminated

On Pegasus (Unix), SIGINT and SIGTERM are sent to give the job a chance
to clean up before termination, then SIGKILL is sent to kill the job.

bqueues
~~~~~~~

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

    [username@triton ~]$ bhosts -w | less
    HOST_NAME          STATUS       JL/U    MAX  NJOBS    RUN  SSUSP  USUSP    RSV 
    n001               ok              -     16     14     14      0      0      0
    n002               ok              -     16      4      4      0      0      0
    ...
    n342               closed_Full     -     16     16     12      0      0      4
    n343               closed_Full     -     16     16     16      0      0      0
    n344               closed_Full     -     16     16     16      0      0      0

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



