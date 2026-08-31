GROMACS
=======

Triton
------

GROMACS is a molecular dynamics package primarily designed for simulations of proteins, 
lipids and nucleic acids. It was originally developed in the Biophysical Chemistry 
department of University of Groningen.

How to load Gromacs
~~~~~~~~~~~~~~~~~~~

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

Pegasus
-------

Pegasus includes the ``gromacs/2018.2`` module and the ``gmx`` executable.

Inspect the installation with:

.. code-block:: bash

   module avail gromacs
   module show gromacs/2018.2

The module automatically loads ``openmpi-gcc/3.1.1`` and ``cuda/9.1.85``.
The installed command is ``gmx``; a separate ``gmx_mpi`` command is not
provided.

.. warning::

   The current GROMACS installation is not usable on the tested Pegasus
   compute nodes.

   LSF tests through the ``general`` queue failed before GROMACS could process
   an input file because ``libblas.so.3`` and ``liblapack.so.3`` were missing
   from the compute-node environment.

   The libraries were present on the login node, but computational GROMACS
   workloads must not be run there. Contact IDSC support before relying on
   this module.
