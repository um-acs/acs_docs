Job Scheduling with LSF
===============================

Triton currently uses the **LSF** resource manager to schedule all
compute resources. LSF (*load sharing facility*) supports over 1500
users and over 200,000 simultaneous job submissions. Jobs are submitted
to **queues**, the software categories we define in the scheduler to
organize work more efficiently. You can monitor your job status, queue position,
and progress using `LSF Commands <https://acs-docs.readthedocs.io/pegasus/jobs/3-commands.html#lsf-commands>`__.

.. tip:: **Reserve an appropriate amount of resources through LSF for your jobs.** 

If you do not know the resources your jobs need, use the
**debug** queue to benchmark your jobs. More on `Pegasus Queues <https://acs-docs.readthedocs.io/pegasus/jobs/2-queues.html#p-queues>`__ and `LSF Job Scripts <https://acs-docs.readthedocs.io/pegasus/jobs/4-scripts.html#lsf-scripts>`__

.. warning:: Jobs with insufficient resource allocations interfere with cluster performance and the IDSC account responsible for those jobs may be suspended (`Policies <https://ccs.miami.edu/ac/policies>`__).

.. tip:: **Stage data for running jobs exclusively in the** ``/scratch`` **file system,** which is optimized for fast data access. 

Any files used as input for your jobs must first be transferred to /scratch. See `Pegasus Resource Allocations <https://acs-docs.readthedocs.io/pegasus/env/3-projects.html#projects>`__ for more information. The
/nethome file system is optimized for mass data storage and is therefore
slower-access. 

.. warning:: Using /nethome while running jobs degrades the performance of the entire system and the IDSC account responsible may be suspended*** (`Policies <https://ccs.miami.edu/ac/policies>`__).

.. tip:: **Do not background processes with the** ``&`` **operator in LSF.** 

These spawned processes cannot be killed with **bkill** after the parent is
gone. 

.. warning:: Using the & operator while running jobs degrades the performance of the entire system and the IDSC account responsible may be suspended (`Policies <https://ccs.miami.edu/ac/policies>`__).

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

       [username@mgt3.summit hpc]$ pwd
       /scratch/projects/hpc/
       [username@mgt3.summit hpc]$ bsub < scriptfile 
       Job <391> is submitted to queue <normal>.

3. **Monitor your jobs with** ``bjobs``

   Flags can be used to specify a single job or another user’s jobs.

   ::

       [username@mgt3.summit hpc]$ bjobs
       JOBID  USER   STAT  QUEUE    FROM_HOST  EXEC_HOST   JOB_NAME  SUBMIT_TIME
       391   usernam   RUN   normal  mgt3       16*t030     testjob   Apr  9 10:22

4. **Examine job output files**

   Once your job has completed, view output information.

   ::

       [username@mgt3.summit hpc]$ cat 391.out
       Sender: LSF System <lsfadmin@t030>
       Subject: Job 391: <test> in cluster <t1> Done
       Job <test> was submitted from host <mgt3> by user <username> in cluster <t1> at Wed Apr  9 10:22:26 2025.
       Job was executed on host(s) <16*t030>, in queue <normal>, as user <username> in cluster <t1>.
       ...
