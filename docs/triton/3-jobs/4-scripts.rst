Triton LSF Job Scripts
=======================

The command ``bsub < ScriptFile`` will submit the given script for
processing. Your script must contain the information LSF needs to
allocate the resources your job requires, handle standard I/O streams,
and run the job. For more information about flags, type ``bsub -h`` or
``man bsub`` at the Triton prompt. Example scripts and descriptions are
below.

You must be a member of a project to submit jobs to it. See
`Projects <https://acs-docs.readthedocs.io/pegasus/env/3-projects.html#projects>`__ for more information.

On submission, LSF will return the ``jobID`` which can be used to track
your job.

::

    [username@mgt3.summit ~]$ bsub < test.job
    Job <4225> is submitted to the default queue <normal>.

Example script for a serial Job
-------------------------------

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
    #BSUB -R "rusage[mem=128M]"
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

    BSUB -J serialjob
    assign a name to job. The name of the job will show in the bjobs output.

    #BSUB -P myproject
    specify the project to use when submitting the job. This is required when a user has more than one project on Triton.

    #BSUB -e %J.err
    redirect std error to a specified file

    #BSUB -W 1:00
    set wall clock run time limit of 1 hour, otherwise queue specific default run time limit will be applied.

    #BSUB -q normal
    specify queue to be used. Without this option, default 'normal' queue will be applied.

    #BSUB -n 1
    specify number of processors. In this job, a single processor is requested.

    #BSUB -R "rusage[mem=128M]"
    specify that this job requests 128 megabytes of RAM. You can use other units (K(kilobytes), M(megabytes), G(gigabytes), T(terabytes)).
    
    #BSUB -B
    send mail to specified email when the job is dispatched and begins execution.

    #BSUB -u example@miami.edu
    send notification through email to example@miami.edu.

    #BSUB -N
    send job statistics report through email when job finishes.

Example scripts for parallel jobs
---------------------------------

We recommend using IBM Advance Toolchain and SMPI unless you have specific reason for using OpenMP or OpenMPI. IBM's SMPI scales better and has better performance than both OpenMP or OpenMPI on Triton.

**Reserve enough memory for your jobs.** Memory reservations are per core. Parallel job performance may be affected, or even interrupted, by other badly-configured jobs running on the same host.


``mpi_hello_world.job``

--------------

.. code:: bash

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


``mpi_hello_world.c``

--------------

.. code:: bash

  $ cat mpi_hello_world.c
  #include <mpi.h>
  #include <stdio.h>

  int main(int argc, char** argv) {
    // Initialize the MPI environment
    MPI_Init(NULL, NULL);

    // Get the number of processes
    int world_size;
    MPI_Comm_size(MPI_COMM_WORLD, &world_size);

    // Get the rank of the process
    int world_rank;
    MPI_Comm_rank(MPI_COMM_WORLD, &world_rank);

    // Get the name of the processor
    char processor_name[MPI_MAX_PROCESSOR_NAME];
    int name_len;
    MPI_Get_processor_name(processor_name, &name_len);

    // Print off a hello world message
    printf("Hello world from processor %s, rank %d out of %d processors\n",
           processor_name, world_rank, world_size);

    // Finalize the MPI environment.
    MPI_Finalize();
  }



``Compile the mpi_hello_world.c file``

--------------

.. code:: bash

  $ module load spectrum-mpi/10.4.0.6-20230210
  $ mpicc -o mpi_hello_world mpi_hello_world.c
  
  
``Run the mpi_hello_world.job file``

--------------

.. code:: bash

  $ bsub < mpi_hello_world.job 
  Job <391> is submitted to queue <normal>.


``Get mpi_hello_world.job status``

--------------

.. code:: bash

  $ bhist -l 391
  
  Job <391>, Job Name <mpi_hello_world>, User <nra20>, Project <hpc>, Status <DONE> 
  ...                   

  Wed Apr  9 10:22:26: Done successfully. The CPU time used is 9.7 seconds.
                     HOST: t037; CPU_TIME: 0 seconds
                     HOST: t030; CPU_TIME: 0 seconds
                     HOST: t039; CPU_TIME: 0 seconds


   MEMORY USAGE:
   MAX MEM: 34 Mbytes;  AVG MEM: 24 Mbytes
   ...

--------------

.. code:: bash
  
  $ cat 391.out
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
                                                                                                
