.. _general-software-workflow-tools:

Workflow Tools
==============

Workflow tools help organize multi-step analysis pipelines and repeated
computational workloads.

Nextflow
--------

Nextflow is available on Pegasus as a software module.

.. important::

   Nextflow is not currently available as a system module on Triton.

Load Nextflow
~~~~~~~~~~~~~

Check the available versions:

.. code-block:: bash

   module avail nextflow

Load the verified version:

.. code-block:: bash

   module load nextflow/24.10.6

The module automatically loads Java 17.

Confirm the installation:

.. code-block:: bash

   nextflow -version
   java -version

Complete Pegasus Example
~~~~~~~~~~~~~~~~~~~~~~~~

This example runs one Nextflow process through the LSF ``general`` queue.

The verified storage project is ``dssas`` and the verified LSF project is
``hpc``.

Create the workflow files in project scratch:

.. code-block:: bash

   mkdir -p /scratch/projects/dssas/$USER/nextflow-example
   cd /scratch/projects/dssas/$USER/nextflow-example

Create ``hello_lsf.nf``:

.. code-block:: bash

   cat > hello_lsf.nf <<'EOF'
   nextflow.enable.dsl = 2

   params.outdir = "${baseDir}/results"

   process VERIFY_LSF {
       tag 'lsf-smoke-test'

       publishDir params.outdir, mode: 'copy'

       output:
       path 'lsf_test.txt'

       script:
       '''
       {
           echo "hostname=$(hostname)"
           echo "job_id=${LSB_JOBID:-not-set}"
           echo "queue=${LSB_QUEUE:-not-set}"
           echo "project=${LSB_PROJECT_NAME:-not-set}"
           echo "allocated_cpus=${LSB_DJOB_NUMPROC:-not-set}"
           echo "working_directory=$PWD"
           echo "date=$(date)"
       } | tee lsf_test.txt
       '''
   }

   workflow {
       VERIFY_LSF()
   }
   EOF

Create ``pegasus_lsf.config``:

.. code-block:: bash

   cat > pegasus_lsf.config <<'EOF'
   process {
       executor = 'lsf'
       queue = 'general'
       clusterOptions = '-P hpc'

       cpus = 1
       memory = '1 GB'
       time = '10m'
   }

   executor {
       queueSize = 10
   }
   EOF

Prepare the Nextflow work directory in project scratch:

.. code-block:: bash

   export NXF_WORK=/scratch/projects/dssas/$USER/nextflow-example/work
   mkdir -p "$NXF_WORK"

Nextflow must be launched from a filesystem that supports file locking.
Create a launch directory in the home directory:

.. code-block:: bash

   mkdir -p "$HOME/nextflow-launch/lsf-example"
   cd "$HOME/nextflow-launch/lsf-example"

Run the workflow using the files stored in project scratch:

.. code-block:: bash

   nextflow run \
       /scratch/projects/dssas/$USER/nextflow-example/hello_lsf.nf \
       -c /scratch/projects/dssas/$USER/nextflow-example/pegasus_lsf.config \
       -w "$NXF_WORK" \
       -with-trace trace.txt

A successful run reports the LSF executor:

.. code-block:: text

   executor > lsf (1)

Verify the published result:

.. code-block:: bash

   cat /scratch/projects/dssas/$USER/nextflow-example/results/lsf_test.txt

The output should include a compute-node hostname and LSF information similar
to:

.. code-block:: text

   hostname=n176
   job_id=442287
   queue=general
   project=hpc
   allocated_cpus=1

Inspect the task trace:

.. code-block:: bash

   column -t -s $'\t' trace.txt

Storage Requirement
~~~~~~~~~~~~~~~~~~~

Do not launch Nextflow directly from ``/scratch/projects`` on Pegasus. The
scratch filesystem does not support the file locks required by the Nextflow
cache database.

Use:

* the home directory for the Nextflow launch directory and ``.nextflow`` cache;
* project scratch for ``NXF_WORK``, workflow files, input data, and results.

Resuming a Workflow
~~~~~~~~~~~~~~~~~~~

Nextflow can reuse completed tasks after an interrupted or failed run:

.. code-block:: bash

   nextflow run \
       /scratch/projects/dssas/$USER/nextflow-example/hello_lsf.nf \
       -c /scratch/projects/dssas/$USER/nextflow-example/pegasus_lsf.config \
       -w "$NXF_WORK" \
       -resume

Use the same work directory when resuming.

Recommended Practice
--------------------

* Launch Nextflow from the home directory.
* Store workflow files, task work directories, data, and results in project
  scratch.
* Configure computational processes to use the LSF executor.
* Request resources appropriate for each process.
* Record the Nextflow version and workflow configuration.
* Remove obsolete work directories only after required results are confirmed.