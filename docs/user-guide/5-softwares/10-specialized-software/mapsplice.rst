MAPSplice
=========

Pegasus
-------

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
