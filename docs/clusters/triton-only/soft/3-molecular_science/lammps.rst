LAMMPS on t2
==============

LAMMPS stands for Large-scale Atomic/Molecular Massively Parallel
Simulator. It allows scientists to model, analyze, and predict the physical movements and 
behaviors of atoms and molecules.

How to load LAMMPS
--------------------

To load LAMMPS into your computing environment, type in

::

  module load lammps

This loads LAMMPS 2025.07.22, and its dependencies, into your computing environment.

In order to run calculations with this software, request resources on 
the compute nodes on t2 by using the following job submission script (set of instructions):

::

  #!/bin/bash
  
  #BSUB -J jobName                 # name of your job
  #BSUB -e %J.err                  # file name for std. error output
  #BSUB -o %J.out                  # file name for std. out output
  #BSUB -q normal                  # request run on normal queue
  #BSUB -n 20                      # request 1 core
  #BSUB -W 2:00                    # request 2 hours of runtime
  #BSUB -P XYZ                     # your projectID
  #BSUB -gpu "num=1"               # request a single NVIDIA V100 GPU

  module load lammps

  ## Launch 20 tasks that use 1 GPU
  mpirun lmp -sf gpu -pk gpu 1 -in in.lj

  ## If launching multiple distributed. Adjust bsub parameters accordingly 

