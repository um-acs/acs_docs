Pegasus QuickStart Guide
=======================

Before you get started:
-----------------------

-  Make sure you understand our `core
   Policies <https://acs-docs.readthedocs.io/policies/policies.html>`__.
-  You need to be a member of a `Pegasus project <https://redcap.miami.edu/surveys/?s=F8MK9NMW9N>`__ with a ``pegasus_project`` resource type.
-  Make sure you connect to the UM network (on campus or via
   `VPN <https://www.it.miami.edu/a-z-listing/virtual-private-network/index.html>`__).

Basic Concepts
--------------

home directory vs. scratch directory (scratch space)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Each user will have a home directory on Pegasus located at
``/nethome/<caneid>`` as the working directory for submitting and running
jobs. It is also for installing user software and libraries that are not
provided as system utilities. Home directory contains an allocation of 250GB per user. 

Each project group will have a scratch directory located at
``/scratch/<project_name>`` for holding the input and output data. You
can have some small and intermediate data in your home directory, but
there are benefits to put data in the scratch directory: 1. everyone in
the group can share the data; 2. the scratch directory is larger
(usually 2T, and you can require more); 3. the scratch directory will be
faster. Although currently (2025.04) /nethome and /scratch have the same
hardware (storage and i/o), /scratch has priority with hardware
upgrades.

login node vs. compute node
~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can think of the login node as the "user interface" to the whole
Pegasus system. When you connect to Pegasus and run commands on the
command line, you are actually doing things on the login node.

When you submit jobs using ``bsub``, `Pegasus's job
scheduler <https://acs-docs.readthedocs.io/pegasus/jobs/1-lsf.html>`__
will look for the compute nodes that satisfy your resource request and
assign your code to the nodes to run. You do not have direct access to
the compute nodes yourself.

Basic Steps
-----------

Here are the basic steps to run a simple Python script on Pegasus. In
this example, the user has CaneID ``abc123`` and is a member of Pegasus
project ``xyz``. You need to replace these with your own CaneID and
Pegasus project name.

1. Preparing the code you would like to run
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Editing the code**

You can edit the code written in any programming language on your local
computer. The ``example.py`` here is written in Python.

::

    import matplotlib.pyplot as plt
    import time

    start = time.time()

    X, Y = [], []

    # read the input data from the scratch directory
    # remember to replace xyz with your project name
    for line in open('/scratch/xyz/data.txt', 'r'): 
        values = [float(s) for s in line.split()]
        X.append(values[0])
        Y.append(values[1])

    plt.plot(X, Y)

    # save the output data to the scratch directory
    # remember to replace xyz with your project name
    plt.savefig('/scratch/xyz/data_plot.png') 

    # give you some time to monitor the submitted job
    time.sleep(120) 

    elapsed = (time.time() - start)

    print(f"The program lasts for {elapsed} seconds.")

**Transfering the code to your Pegasus home directory**


After editing the code, you need to transfer it from the local computer
to your Pegasus home directory. You can do it with a file transfer tool
such as ``FileZilla`` GUI application and ``scp`` command-line utility.

If using ``FileZilla``, you need to put ``sftp://pegasus2.ccs.miami.edu``
in the ``Host`` field, fill in the ``Username`` and ``Password`` fields
with your CaneID and the associated password, and leave the ``Port``
field blank. By clicking the check mark icon in the menu bar, you will
connect to Pegasus and the ``Remote site`` on the right will be your
Pegasus home directory by default. Then, you can change the
``Local site`` on the left to the directory holding ``example.py`` and
transfer the file by dragging it from left to right.

If using ``scp``, you need to type, assuming ``origin`` is the absolute 
path that specifies the directory on your local computer holding 
``example.py``,  ``scp origin/example.py 
abc123@pegasus2.ccs.miami.edu:/nethome/abc123``, not forgetting to put 
your CaneID in place of ``abc123``, and then following the prompt for 
the associated password. 

After that, the file will be located at ``/nethome/abc123/example.py`` on
Pegasus for user abc123.

2. Preparing the input data
~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Getting the input data**

In this example, you prepare the ``data.txt`` file as your input data on
the local computer.

::

    0  0
    1  1
    2  4
    4 16
    5 25
    6 36

**Transferring the input data to your project scratch directory on Pegasus**

You can use ``FileZilla`` or ``scp`` to transfer the input data to
``/scratch/projects/xyz/data.txt`` on Pegasus. You need to replace xyz with your
project name.

3. Installing dependent libraries on Pegasus
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Logging in to Pegasus**

You can use ``Terminal`` on a Mac or ``PuTTY`` on a Windows
machine to log in to Pegasus via SSH Protocol.

If using ``Terminal`` on Mac, you can run the command
``ssh abc123@pegasus2.ccs.miami.edu`` (remember to replace abc123 with
your CaneID) and follow the instruction to type your password.

If using ``PuTTY``, you need to put ``pegasus2.ccs.miami.edu`` in the
``Host Name`` field, leave ``22`` in the ``Port`` field, and select
``SSH`` as the ``Connection type``, then press ``Open``. After that, you
can follow the instruction to type your password.

At this point, you should be able to see the Pegasus welcome message and
``[abc123@pegasus ~]$`` which indicates you have logged in to the Pegasus
login node and at the home directory ``~``.

If you are new to Linux, you can check our `Linux
Guides <https://acs-docs.readthedocs.io/linux/README.html>`__.

**Installing software/libraries needed for the code**

In the example, you will need the Python interpreter and Python packages
to run the code. Also, for Python it is better to set up different
environments for different projects to avoid conflictions of packages.

::

    [abc123@pegasus ~]$ module load miniforge3
    [abc123@pegasus ~]$ conda create -n example_env python=3.8 matplotlib

4. Preparing the job script
~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Editing the job script**

The `job
script <https://acs-docs.readthedocs.io/pegasus/3-jobs/4-scripts.html>`__
is important. It tells the job scheduler how much resources your job
needs, where to find the dependent software or libraries, and how the
job should be run.

You can edit the ``example_script.job`` file to make ``example.py`` run
on a Pegasus compute node.

::

    #!/bin/bash
    #BSUB -J example_job
    #BSUB -o example_job%J.out
    #BSUB -P xyz
    #BSUB -n 1
    #BSUB -R "rusage[mem=128M]"
    #BSUB -q normal
    #BSUB -W 00:10

    module load miniforge3
    conda activate example_env
    cd ~
    python example.py

-  ``#BSUB -J example_job`` specifies the name of the job.
-  ``#BSUB -o ~/example_job%J.out`` The line gives the path and name for
   the standard output file. It contains the job report and any text you
   print out to the standard output. ``%J`` in the name of the file will
   be replaced by the unique job id.
-  ``#BSUB -P xyz`` specifies the project (remember to replace xyz with
   your project name).
-  ``#BSUB -q normal`` specifies which queue you are submitting the job
   to. Most of the "normal" jobs running on Pegasus will submit to the
   ``normal`` queue.
-  ``#BSUB -n 1`` requests 1 CPU core to run the job. Since the example
   job is simple, 1 CPU core will be enough. You can request up to 40
   cores from one computing node on Pegasus for non-distributed jobs.
-  ``#BSUB -R "rusage[mem=128M]"`` requests 128 megabytes memory to run
   the job. Since the example job is simple, 128 megabytes memory will
   be enough. You can request up to ~250 gigabytes memory from one
   computing node on Pegasus.
-  ``#BSUB -W 00:10`` requests 10 minutes to run the job. If you do not
   put this line, the default time limit is 1 day and the maximum time
   you can request is 7 days.
-  ``module load miniforge3`` loads the Miniforge (Anaconda) module on Pegasus.
-  ``conda activate example_env`` activates the Conda environment you
   created which contains the dependent Python package for the job.
-  ``cd ~`` goes to the home directory where ``example.py`` is located.
-  ``python example.py`` runs ``example.py``

**Transferring the job script to your Pegasus home directory**

You can use ``FileZilla`` or ``scp`` to transfer the job script to
``/nethome/abc123/example.job`` on Pegasus. You need to replace abc123 with
your CaneID.

5. Submitting and monitoring the job
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Job submission**

::

    [abc123@pegasus ~]$ bsub < example_script.job

**Job monitoring**

While the job is submitted, you can use ``bjobs`` to check the status.

::

    [abc123@pegasus ~]$ bjobs

When the job is running you will see:

::

    JOBID   USER    STAT  QUEUE      FROM_HOST   EXEC_HOST   JOB_NAME   SUBMIT_TIME
    594966  abc123  RUN   normal     login1      n084        *ample_job Oct 12 11:43

If the job has finished you will see:

::

    No unfinished job found

.. COMMENTING OUT BACCT SECTION 
   User Usage: bacct
   ~~~~~~~~~~~~~~~~~

   The bacct command displays accounting statistics about finished jobs.  All times are in seconds.

   To get summary statistics about jobs that were dispatched/completed/submitted between 2020/10/01/00:00 and 2020/11/01/00:00, for user abc123 you can use:

   ::

     bacct -D 2020/10/01/00:00,2020/11/01/00:00 -u abc123
     bacct -C 2020/10/01/00:00,2020/11/01/00:00 -u abc123
     bacct -S 2020/10/01/00:00,2020/11/01/00:00 -u abc123


   Statistics about jobs submitted to a project project123:

   ::

     bacct -P project123

   Statistics about JOBID 123456:

   ::

    [abc123@pegasus ~]$ bacct -l 123456

   Example of dispatched jobs between 2020/10/01/00:00 and 2020/11/01/00:00, for user abc123:

   ::

    [abc123@pegasus ~]$ bacct -D 2020/10/01/00:00,2020/11/01/00:00 -u abc123

    Accounting information about jobs that are: 
     - submitted by users abc123, 
     - accounted on all projects.
     - completed normally or exited
     - dispatched between  Thu Oct  1 00:00:00 2020
                     ,and   Sun Nov  1 00:00:00 2020
     - executed on all hosts.
     - submitted to all queues.
     - accounted on all service classes.
    ------------------------------------------------------------------------------

    SUMMARY:      ( time unit: second ) 
     Total number of done jobs:       8      Total number of exited jobs:     2
     Total CPU time consumed:       7.8      Average CPU time consumed:     0.8
     Maximum CPU time of a job:     1.9      Minimum CPU time of a job:     0.0
     Total wait time in queues:     8.0
     Average wait time in queue:    0.8
     Maximum wait time in queue:    2.0      Minimum wait time in queue:    0.0
     Average turnaround time:       500 (seconds/job)
     Maximum turnaround time:      2513      Minimum turnaround time:         7
     Average hog factor of a job:  0.03 ( cpu time / turnaround time )
     Maximum hog factor of a job:  0.09      Minimum hog factor of a job:  0.00
     Average expansion factor of a job:  13.81 ( turnaround time / run time )
     Maximum expansion factor of a job:  114.00
     Minimum expansion factor of a job:  1.00
     Total Run time consumed:      4873      Average Run time consumed:     487
     Maximum Run time of a job:    2513      Minimum Run time of a job:       0
     Total throughput:             0.03 (jobs/hour)  during  384.74 hours
     Beginning time:       Oct 14 12:23      Ending time:          Oct 30 13:08

   Example of "long form" output of dispatched jobs between 2020/10/01/00:00 and 2020/11/01/00:00, for project123:  

   ::

     $ bacct -l -D 2020/10/01/00:00,2020/11/01/00:00 -P project123


     Accounting information about jobs that are: 
       - submitted by users abc123, 
       - accounted on projects project123, 
       - completed normally or exited
       - dispatched between  Thu Oct  1 00:00:00 2020
                       ,and   Sun Nov  1 00:00:00 2020
       - executed on all hosts.
       - submitted to all queues.
       - accounted on all service classes.
     ------------------------------------------------------------------------------

     Job <1234568>, Job Name <email-test>, User <abc123>, Project <project123>, Mail
                         <abc123@miami.edu>, Status <DONE>, Queue <normal>, Command
                         <#!/bin/bash;#BSUB -J email-test;#BSUB -P acprojects ;#BS
                         UB -o %J.out;#BSUB -e %J.err;#BSUB -W 1:00;#BSUB -q normal
                         ;#BSUB -n 1;#BSUB -R "rusage[mem=128M]";#BSUB -B;#BSUB -N;
                         #BSUB -u pedro@miami.edu;#;# cd /path/to/scratch/directory
                         ;date;sleep 100;date>, Share group charged </abc123>
     Wed Oct 14 20:33:28: Submitted from host <login1>, CWD <$HOME>, Output File <%J
                        .out>, Error File <%J.err>;
     Wed Oct 14 20:33:28: Dispatched 1 Task(s) on Host(s) <t077>, Allocated 1 Slot(s
                          ) on Host(s) <t077>, Effective RES_REQ <select[((type == L
                        INUXPPC64LE ) && (type == any))] order[r15s:pg] rusage[mem
                        =128.00] >;
     Wed Oct 14 20:35:09: Completed <done>.

     Accounting information about this job:
           Share group charged </abc123>
           CPU_T     WAIT     TURNAROUND   STATUS     HOG_FACTOR    MEM    SWAP
            0.10        0            101     done         0.0010     7M      0M
     ------------------------------------------------------------------------------

     Job <1234569>, Job Name <email-test>, User <abc123>, Project <project123>, Mail
     ...

     ------------------------------------------------------------------------------
     SUMMARY:      ( time unit: second ) 
     Total number of done jobs:       8      Total number of exited jobs:     0
     Total CPU time consumed:       1.0      Average CPU time consumed:     0.1
     Maximum CPU time of a job:     0.5      Minimum CPU time of a job:     0.0
     Total wait time in queues:     2.0
     Average wait time in queue:    0.2
     Maximum wait time in queue:    1.0      Minimum wait time in queue:    0.0
     Average turnaround time:       168 (seconds/job)
     Maximum turnaround time:      1002      Minimum turnaround time:        10
     Average hog factor of a job:  0.00 ( cpu time / turnaround time )
     Maximum hog factor of a job:  0.00      Minimum hog factor of a job:  0.00
     Average expansion factor of a job:  1.01 ( turnaround time / run time )
     Maximum expansion factor of a job:  1.10
     Minimum expansion factor of a job:  1.00
     Total Run time consumed:      1347      Average Run time consumed:     168
     Maximum Run time of a job:    1002      Minimum Run time of a job:      10
     Total throughput:             0.02 (jobs/hour)  during  349.72 hours
     Beginning time:       Oct 14 20:35      Ending time:          Oct 29 10:18

   If you do not provide the "-u CaneID" argument, command defaults to the user running the command.  The long form output "-l" displays detailed information for each job in a multiline format, followed by a summary.

6. Checking the job output
~~~~~~~~~~~~~~~~~~~~~~~~~~

**Standard output file**

This is the file you specify with ``#BSUB -o`` in your job script. In
this example, after the job is finished, the standard output file
``example_job594966.out`` will be placed in the directory you submit the
job, you can locate it to a different directory by giving the path.
``594966`` is the job id which is unique for each submitted job.

At the end of this file, you can see the report which gives the CPU
time, memory usage, run time, etc., for the job. It could guide you to
estimate the resources to request for the future jobs. Also, you can see
the text you ask to ``print`` (to the stardard output) in
``example.py``.

::

    ------------------------------------------------------------

    Successfully completed.

    Resource usage summary:

        CPU time :                                   8.89 sec.
        Max Memory :                                 51 MB
        Average Memory :                             48.50 MB
        Total Requested Memory :                     128.00 MB
        Delta Memory :                               77.00 MB
        Max Swap :                                   -
        Max Processes :                              4
        Max Threads :                                5
        Run time :                                   123 sec.
        Turnaround time :                            0 sec.

    The output (if any) follows:

    The program lasts for 120.23024702072144 seconds.

**Output data**

After the job is done, you will find the output data which is the png
file saved in the scratch space. In this example, it is
``/scratch/projects/xyz/data_plot.png``.

**Transferring output file to local computer**

You can view the output plot using any image viewer software on your
local computer. To transfer the output file from Pegasus to your local 
computer, you can use ``FileZilla`` to drag the file from right to
left, which transfers it, or you can use ``scp`` by typing, in the terminal
on your local computer (assuming your CaneID is ``abc123``, and ``destination`` is 
the absolute path that specifies the directory on the local computer to 
which you intend to move the file),
``scp abc123@pegasus2.ccs.miami.edu:/scratch/projects/xyz/data_plot.png destination`` 
and following the prompt to provide a password.

7. Chao
~~~~~~~

**Logging out from Pegasus on the command-line interface**

::

    [abc123@pegasus ~]$ exit

**Disconnecting from Pegasus on ``FileZilla``**

On FileZilla, you can click on the ``x`` icon in the menu bar to
disconnect from Pegasus.

