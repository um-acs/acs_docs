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

    [username@triton ~]$ bsub < test.job
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

For optimum performance, use the ``#BSUB -R "span[ptile=40]"``. This requires the LSF job scheduler to allocate 40 processors per host, ensuring all processors on a single host are used by that job.

**Reserve enough memory for your jobs.** Memory reservations are per core. Parallel job performance may be affected, or even interrupted, by other badly-configured jobs running on the same host.


``mpi_hello_world.job``

--------------

.. code:: bash

    #!/bin/sh
    #BSUB -n 20
    #BSUB -J mpi_hello_world
    #BSUB -o %J.out
    #BSUB -e %J.err
    #BSUB -a openmpi
    #BSUB -R "span[ptile=4]"
    #BSUB -q normal

    # Use gcc/8.3.1 and openmpi/4.0.5
    ml gcc/8.3.1 openmpi/4.0.5
    
    # Use the optimized IBM Advance Toolkit (gcc 8.3.1) and smpi
    # ml at smpi

    mpirun -n 20 ./mpi_hello_world 


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

  $ ml gcc/8.3.1
  $ ml openmpi/4.0.5
  $ mpicc -o mpi_hello_world mpi_hello_world.c
  
  
``Run the mpi_hello_world.job file``

--------------

.. code:: bash

  $ bsub < mpi_hello_world.job 
  Job <981431> is submitted to queue <normal>.


``Get mpi_hello_world.job status``

--------------

.. code:: bash

  $ bjobs -l 284204
  
  Job <284204>, Job Name <mpi_hello_world>, User <nra20>, Project <default>, Status <DONE> 
  ...                   

  Wed Jan  11 11:251:07: Done successfully. The CPU time used is 9.7 seconds.
                     HOST: t039; CPU_TIME: 0 seconds
                     HOST: t072; CPU_TIME: 0 seconds
                     HOST: t059; CPU_TIME: 0 seconds
                     HOST: t047; CPU_TIME: 0 seconds
                     HOST: t017; CPU_TIME: 0 seconds

   MEMORY USAGE:
   MAX MEM: 14 Mbytes;  AVG MEM: 9 Mbytes
   ...

--------------

.. code:: bash
  
  $ cat 284204.out
  Sender: LSF System <hpc@ccs.miami.edu>
  Subject: Job 284204: <mpi_hello_world> in cluster <triton> Done
  
  Job <mpi_hello_world> was submitted from host <login1> by user <nra20> in cluster <triton> at Wed Jan  11 11:25:03 2021
  Job was executed on host(s) <4*t039>, in queue <normal>, as user <nra20> in cluster <triton> at Wed Jan  11 11:25:03 2021
                              <4*t071>
                              <4*t059>
                              <4*t047>
                              <4*t017>
                
  ...
  
  Your job looked like:
  
  ------------------------------------------------------------
  # LSBATCH: User input
  #!/bin/sh
  #BSUB -n 20
  #BSUB -J mpi_hello_world
  #BSUB -o %J.out
  #BSUB -e %J.err
  #BSUB -a openmpi
  #BSUB -R "span[ptile=4]"
  #BSUB -q normal
  
  # Use openmpi
  ml gcc/8.3.1 openmpi/4.0.5

  # Use the optimized IBM Advance Toolkit (gcc 8.3.1) and smpi
  # ml at smpi
 
  
  mpirun -n 20 ./mpi_hello_world 
  
  ------------------------------------------------------------
  
  Successfully completed.
  
  Resource usage summary:
  
    CPU time :                                   2.49 sec.
    Max Memory :                                 53 MB
    Average Memory :                             35.67 MB
    Total Requested Memory :                     -
    Delta Memory :                               -
    Max Swap :                                   1 MB
    Max Processes :                              8
    Max Threads :                                20
    Run time :                                   3 sec.
    Turnaround time :                            6 sec.

  The output (if any) follows:
  
  Hello world from processor t047, rank 14 out of 20 processors
  Hello world from processor t039, rank 3 out of 20 processors
  Hello world from processor t039, rank 0 out of 20 processors
  Hello world from processor t039, rank 1 out of 20 processors
  Hello world from processor t039, rank 2 out of 20 processors
  Hello world from processor t017, rank 17 out of 20 processors
  Hello world from processor t047, rank 15 out of 20 processors
  Hello world from processor t017, rank 18 out of 20 processors
  Hello world from processor t047, rank 12 out of 20 processors
  Hello world from processor t017, rank 19 out of 20 processors
  Hello world from processor t047, rank 13 out of 20 processors
  Hello world from processor t017, rank 16 out of 20 processors
  Hello world from processor t072, rank 5 out of 20 processors
  Hello world from processor t059, rank 8 out of 20 processors
  Hello world from processor t072, rank 6 out of 20 processors
  Hello world from processor t072, rank 7 out of 20 processors
  Hello world from processor t072, rank 4 out of 20 processors
  Hello world from processor t059, rank 9 out of 20 processors
  Hello world from processor t059, rank 10 out of 20 processors
  Hello world from processor t059, rank 11 out of 20 processors
  

  PS:

  Read file <284204.err> for stderr output of this job.
