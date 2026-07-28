.. _general-software-specialized:

Specialized Scientific Software
===============================

This page covers selected scientific applications installed on Pegasus.

.. important::

   The examples below were tested on Pegasus. Always confirm availability on
   the target system with ``module avail`` and inspect a module with
   ``module show``.

   The ``module spider`` command is not supported on Pegasus.

.. note::

   Run computational workloads through LSF. Do not run production calculations
   on a login node merely because an executable starts there.


Gaussian
--------

Pegasus provides Gaussian 09 through the ``gaussian`` module.

Check the available versions and load the verified module:

.. code-block:: bash

   module avail gaussian
   module load gaussian/09.e.01

Confirm the executable:

.. code-block:: bash

   which g09

The installed module provides ``g09``. It does not provide ``g16``.

Complete LSF example
~~~~~~~~~~~~~~~~~~~~

Create a working directory. Replace ``dssas`` with a project that you can use:

.. code-block:: bash

   PROJECT=dssas
   WORKDIR=/scratch/projects/$PROJECT/$USER/software-tests/gaussian

   mkdir -p "$WORKDIR"
   cd "$WORKDIR"

Create ``water.com``:

.. code-block:: bash

   cat > water.com <<'EOF'
   %mem=1GB
   %nprocshared=1
   #p hf/sto-3g sp

   Gaussian smoke test

   0 1
   O  0.000000  0.000000  0.000000
   H  0.000000  0.000000  0.960000
   H  0.000000  0.750000 -0.240000

   EOF

Create ``gaussian_test.job``:

.. code-block:: bash

   cat > gaussian_test.job <<'EOF'
   #!/bin/bash
   #BSUB -P hpc
   #BSUB -J gaussian_test
   #BSUB -q general
   #BSUB -n 1
   #BSUB -R "rusage[mem=2000]"
   #BSUB -W 00:10
   #BSUB -o gaussian.%J.out
   #BSUB -e gaussian.%J.err

   set -euo pipefail

   module purge
   module load gaussian/09.e.01

   PROJECT=dssas
   WORKDIR=/scratch/projects/$PROJECT/$USER/software-tests/gaussian
   export GAUSS_SCRDIR="$WORKDIR/scratch/$LSB_JOBID"

   mkdir -p "$GAUSS_SCRDIR"

   g09 < water.com > water.log

   grep -q "Normal termination of Gaussian 09" water.log

   rm -rf "$GAUSS_SCRDIR"

   echo "Gaussian LSF verification successful"
   EOF

Submit the job:

.. code-block:: bash

   bsub < gaussian_test.job

After the job finishes, verify the calculation:

.. code-block:: bash

   grep "Normal termination" water.log
   cat gaussian.*.err

A successful calculation reports:

.. code-block:: text

   Normal termination of Gaussian 09

.. note::

   ``g09 -v`` is not a supported version command and should not be used.


LAMMPS
------

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

MAPSplice
---------

Pegasus provides MAPSplice 2.1.5.

MAPSplice is a legacy Python 2 application. A working environment requires both
the Python 2 and MAPSplice modules:

.. code-block:: bash

   module purge
   module load python/2.7.15
   module load mapsplice/2.1.5

Verify the environment:

.. code-block:: bash

   python --version
   which mapsplice_multi_thread
   which bowtie-build

The expected Python version is:

.. code-block:: text

   Python 2.7.15

The module exposes the compiled programs in the MAPSplice ``bin`` directory,
but it does not place the main ``mapsplice.py`` wrapper on ``PATH``. Use the
full wrapper path:

.. code-block:: bash

   MAPSPLICE_ROOT=/share/apps/mapsplice/2.1.5
   python "$MAPSPLICE_ROOT/mapsplice.py" --help

Required inputs
~~~~~~~~~~~~~~~

A normal run requires:

* a directory containing reference chromosome FASTA files;
* a Bowtie index built from the same reference;
* single-end reads supplied with ``-1``, or paired-end reads supplied with
  both ``-1`` and ``-2``;
* the correct FASTQ quality scale;
* an output directory.

Build a Bowtie index
~~~~~~~~~~~~~~~~~~~~

The following example assumes ``reference/chr1.fa`` already exists:

.. code-block:: bash

   mkdir -p index

   bowtie-build \
       reference/chr1.fa \
       index/genome

The index prefix passed to MAPSplice is ``index/genome``, not the name of an
individual ``.ebwt`` file.

Single-end LSF example
~~~~~~~~~~~~~~~~~~~~~~

Create ``mapsplice_test.job``:

.. code-block:: bash

   cat > mapsplice_test.job <<'EOF'
   #!/bin/bash
   #BSUB -P hpc
   #BSUB -J mapsplice_test
   #BSUB -q general
   #BSUB -n 4
   #BSUB -R "rusage[mem=4000]"
   #BSUB -W 02:00
   #BSUB -o mapsplice.%J.out
   #BSUB -e mapsplice.%J.err

   set -euo pipefail

   module purge
   module load python/2.7.15
   module load mapsplice/2.1.5

   MAPSPLICE_ROOT=/share/apps/mapsplice/2.1.5
   WORKDIR="$PWD"

   REF_DIR="$WORKDIR/reference"
   INDEX_PREFIX="$WORKDIR/index/genome"
   READS="$WORKDIR/reads.fastq"
   OUTPUT_DIR="$WORKDIR/output"

   rm -rf "$OUTPUT_DIR"

   python "$MAPSPLICE_ROOT/mapsplice.py" \
       -c "$REF_DIR" \
       -x "$INDEX_PREFIX" \
       -1 "$READS" \
       --qual-scale phred33 \
       -p 4 \
       -o "$OUTPUT_DIR"

   test -s "$OUTPUT_DIR/alignments.sam"

   echo "MAPSplice LSF verification successful"
   EOF

Submit the job:

.. code-block:: bash

   bsub < mapsplice_test.job

After it finishes:

.. code-block:: bash

   cat mapsplice.*.out
   cat mapsplice.*.err
   ls -lh output/alignments.sam
   sed -n '1,20p' output/stats.txt

.. note::

   Set ``--qual-scale`` to the actual encoding of the FASTQ files. The verified
   smoke test used ``phred33``.

.. caution::

   The legacy ``python/2.7.15`` module may print ``hashlib`` warnings about
   unavailable MD5 and SHA implementations on current Rocky Linux compute
   nodes. During the verified MAPSplice test, these messages were nonfatal:
   the workflow completed, produced ``alignments.sam``, and generated its
   statistics and log files.

   Because Python 2 is obsolete, inspect the MAPSplice logs and final outputs
   carefully before using the results in production.




GROMACS
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



SAS
---

Pegasus provides the ``sas/9.4_2024`` module and the ``sas`` executable.

The module can be inspected with:

.. code-block:: bash

   module avail sas
   module show sas/9.4_2024

.. warning::

   The current Pegasus SAS license expired on April 29, 2025. SAS batch jobs
   fail during kernel initialization and cannot currently be used.

   Do not add SAS execution examples until the license has been renewed and a
   batch program has completed successfully.


SimVascular
-----------

Pegasus provides the exact module name:

.. code-block:: bash

   simvascular/2021.6.10.lua

Inspect the module and launcher with:

.. code-block:: bash

   module show simvascular/2021.6.10.lua
   module load simvascular/2021.6.10.lua
   which sv

The module provides:

.. code-block:: text

   /share/apps/SimVascular/SimVascularSrc/BuildWithMake/sv

.. warning::

   The current SimVascular installation is not usable on the tested Pegasus
   compute nodes.

   A headless Python launch through LSF failed before SimVascular initialized
   because ``libGLU.so.1`` was missing from the compute-node environment.
   Therefore, neither the Python interface nor the graphical interface has
   been verified as usable.

   Contact IDSC support before attempting to use this installation.


