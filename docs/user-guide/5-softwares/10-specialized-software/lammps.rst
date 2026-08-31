LAMMPS
======

Triton
------

LAMMPS stands for Large-scale Atomic/Molecular Massively Parallel
Simulator. It allows scientists to model, analyze, and predict the physical movements and 
behaviors of atoms and molecules.

How to load LAMMPS
~~~~~~~~~~~~~~~~~~

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
  #BSUB -n 20                      # request 20 cores
  #BSUB -W 2:00                    # request 2 hours of runtime
  #BSUB -P XYZ                     # your projectID
  #BSUB -gpu "num=1"               # request a single NVIDIA V100 GPU

  module load lammps

  ## Launch 20 tasks that use 1 GPU
  mpirun lmp -sf gpu -pk gpu 1 -in in.lj

  ## If launching multiple distributed. Adjust bsub parameters accordingly 

If Kokkos support is desired, then one needs to load LAMMPS 2024.08.29 instead

::

  #BSUB -J jobName                 # name of your job
  #BSUB -e %J.err                  # file name for std. error output
  #BSUB -o %J.out                  # file name for std. out output
  #BSUB -q normal                  # request run on normal queue
  #BSUB -n 20                      # request 20 cores
  #BSUB -W 2:00                    # request 2 hours of runtime
  #BSUB -P XYZ                     # your projectID
  #BSUB -gpu "num=2"               # request two NVIDIA V100 GPU

  module load lammps/20240829.4-gcc-13.4.0-rlyq2s7

  export OMP_PROC_BIND=spread
  export OMP_PLACES=threads

  ## Launch 20 tasks that use 2 GPUs
  mpirun lmp -in in.lj -k on g 2 -sf kk -pk kokkos ..........

Pegasus
-------

Pegasus provides LAMMPS dated July 21, 2020.

Load the module and inspect the executable:

.. code-block:: bash

   module load lammps/20200721
   which lmp
   lmp -h

The verified command is ``lmp``. Separate ``lmp_mpi`` and ``lmp_serial``
commands are not provided.

Complete LSF example
~~~~~~~~~~~~~~~~~~~~

Create a working directory:

.. code-block:: bash

   mkdir -p "$HOME/software-tests/lammps"
   cd "$HOME/software-tests/lammps"

Create ``in.lammps``:

.. code-block:: bash

   cat > in.lammps <<'EOF'
   units           lj
   atom_style      atomic
   boundary        p p p

   lattice         fcc 0.8442
   region          box block 0 4 0 4 0 4
   create_box      1 box
   create_atoms    1 box

   mass            1 1.0

   pair_style      lj/cut 2.5
   pair_coeff      1 1 1.0 1.0 2.5

   velocity        all create 1.44 87287 loop geom

   neighbor        0.3 bin
   neigh_modify    delay 0 every 1 check yes

   fix             1 all nve

   thermo          5
   thermo_style    custom step atoms temp pe ke etotal press

   timestep        0.005
   run             20

   write_data      final.data

   print "LAMMPS smoke test successful"
   EOF

Create ``lammps_test.job``:

.. code-block:: bash

   cat > lammps_test.job <<'EOF'
   #!/bin/bash
   #BSUB -P hpc
   #BSUB -J lammps_test
   #BSUB -q general
   #BSUB -n 1
   #BSUB -R "rusage[mem=1000]"
   #BSUB -W 00:05
   #BSUB -o lammps.%J.out
   #BSUB -e lammps.%J.err

   set -euo pipefail

   module purge
   module load lammps/20200721

   echo "Host: $(hostname)"
   echo "Executable: $(command -v lmp)"

   lmp -in in.lammps

   test -s log.lammps
   test -s final.data
   grep -q "LAMMPS smoke test successful" log.lammps

   echo "LAMMPS LSF verification successful"
   EOF

Submit and verify the job:

.. code-block:: bash

   bsub < lammps_test.job

   # Run these commands after the job finishes.
   cat lammps.*.out
   cat lammps.*.err
   tail -n 40 log.lammps
   ls -lh log.lammps final.data

A successful run creates ``log.lammps`` and ``final.data`` and reports:

.. code-block:: text

   LAMMPS smoke test successful
   LAMMPS LSF verification successful
