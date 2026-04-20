Gromacs on t2
==============

How to load Gromacs
--------------------

To load Gromacs into your computing environment, type in

::

  module load gromacs

This loads Gromacs 2025.1 into your computing environment, together with its 
dependencies.

In order to run calculations with this software, request resources on 
the compute nodes on t2 by using the following script (set of instructions):

::

  #!/bin/bash
  
  #BSUB -J benchpep_h              # name of your job
  #BSUB -e %J.err                  # file name for std. error output
  #BSUB -o %J.out                  # file name for std. out output
  #BSUB -q normal                  # request run on normal queue
  #BSUB -n 16                      # request 16 cores
  #BSUB -W 2:00                    # request 2 hours of runtime
  #BSUB -P XYZ                     # your projectID
  #BSUB -gpu "num=1"               # request a single NVIDIA V100 GPU

  module load gromacs
