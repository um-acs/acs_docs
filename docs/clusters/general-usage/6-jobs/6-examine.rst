.. _g-examine:

Examining Job Output
=======================

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
