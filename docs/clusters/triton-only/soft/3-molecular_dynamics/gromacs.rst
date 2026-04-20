Gromacs on t2
==============

How to load Gromacs
--------------------

To load Gromacs into your computing environment, type in

::

  module load gromacs

This load Gromacs 2025.1 into your computing environment, together with its 
dependencies.

In order to run calculations with this software, request resources on 
the compute nodes on t2 by using the following script (set of instructions):

::

  #!/bin/bash
  
  #BSUB -J benchpep_h             # name of your job
  #BSUB -e %J.err                  # error file
  #BSUB -o %J.out                  # std. out
  #BSUB -R "span[hosts=1]"  # request run script on one node
  #BSUB -q normal           # request run on normal queue
  #BSUB -n 16                # request 4 cores
  #BSUB -W 2:00                # request 2 minutes of runtime
  #BSUB -P hpc              # your projectID
  #BSUB -gpu "num=1"              # your projectID

  module load gromacs
  module load gcc-runtime/8.5.0-none-none-mb3k56y

  gmx_mpi mdrun -v -s benchpep_h.tpr -deffnm benchpep
