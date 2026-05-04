Gromacs on t2
==============

GROMACS is a molecular dynamics package primarily designed for simulations of proteins, 
lipids and nucleic acids. It was originally developed in the Biophysical Chemistry 
department of University of Groningen.

How to load Gromacs
--------------------

To load Gromacs into your computing environment, type in

::

  module load gromacs

This loads Gromacs 2025.1, and its dependencies, into your computing environment.

In order to run calculations with this software, request resources on 
the compute nodes on t2 by using the following job submission script (set of instructions):

::

  #!/bin/bash
  
  #BSUB -J benchpep_h              # name of your job
  #BSUB -e %J.err                  # file name for std. error output
  #BSUB -o %J.out                  # file name for std. out output
  #BSUB -q normal                  # request run on normal queue
  #BSUB -n 1                       # request 1 core
  #BSUB -W 2:00                    # request 2 hours of runtime
  #BSUB -P XYZ                     # your projectID
  #BSUB -gpu "num=1"               # request a single NVIDIA V100 GPU

  module load gromacs

  gmx_mpi mdrun -v -s benchpep_h.tpr -deffnm benchpep

This job submission script requests resources to run an MD simulation using 
a single MPI rank mapped to a single NVIDIA V100 GPU on an input file ``benchpep_h``.
