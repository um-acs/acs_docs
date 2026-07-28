Nextflow and MCMICRO with Apptainer
===================================

MCMICRO is a Nextflow pipeline for processing highly multiplexed microscopy
data. On Pegasus, Nextflow manages the workflow and submits processing tasks to
LSF, while Apptainer provides the software environment required by each MCMICRO
module.

The registration smoke test on this page has been verified on Pegasus with the
MCMICRO exemplar dataset, Nextflow 24.10.6, Apptainer 1.0.2, and ASHLAR 1.19.0.

Workflow Overview
-----------------

The Pegasus workflow uses:

* Nextflow to launch and monitor MCMICRO;
* LSF to run MCMICRO processes on compute nodes;
* Apptainer to run the module container images;
* project scratch storage for datasets, temporary files, and Nextflow work
  directories; and
* home storage for the shared Nextflow container cache.

Nextflow alone is not sufficient unless all MCMICRO programs and their
dependencies are installed separately. A container-free test reached the LSF
compute node but failed with ``ashlar: command not found``.

Load the Modules
----------------

Load the tested module versions:

.. code-block:: bash

   module purge
   module load nextflow/24.10.6
   module load apptainer/1.0.2

Prepare Storage
---------------

Set the project location and create the required directories:

.. code-block:: bash

   export PROJECT_ROOT=/scratch/<projectID>/$USER/mcmicro-test
   export NXF_WORK="$PROJECT_ROOT/work"

   export NXF_APPTAINER_CACHEDIR="$HOME/.nextflow/mcmicro-apptainer-cache"
   export APPTAINER_CACHEDIR="$HOME/.apptainer/cache"
   export APPTAINER_TMPDIR="$PROJECT_ROOT/apptainer-tmp"

   mkdir -p \
       "$PROJECT_ROOT" \
       "$NXF_WORK" \
       "$NXF_APPTAINER_CACHEDIR" \
       "$APPTAINER_CACHEDIR" \
       "$APPTAINER_TMPDIR"

Replace ``<projectID>`` with the appropriate Pegasus project allocation.

Keep the Nextflow work directory for the duration of the workflow. Nextflow
needs it to reuse completed tasks with ``-resume``.

Download MCMICRO
----------------

Create a launch directory in the home filesystem:

.. code-block:: bash

   mkdir -p "$HOME/nextflow-launch/mcmicro-test"
   cd "$HOME/nextflow-launch/mcmicro-test"

Download or update the MCMICRO workflow:

.. code-block:: bash

   nextflow pull labsyspharm/mcmicro

Download the Exemplar Dataset
-----------------------------

MCMICRO provides a small exemplar dataset for testing the workflow:

.. code-block:: bash

   mkdir -p "$PROJECT_ROOT/download-work"

   nextflow run labsyspharm/mcmicro/exemplar.nf \
       --name exemplar-001 \
       --path "$PROJECT_ROOT" \
       -w "$PROJECT_ROOT/download-work"

The downloaded dataset is stored at:

.. code-block:: text

   $PROJECT_ROOT/exemplar-001

This download step does not run the MCMICRO processing containers.

Create the Pegasus Configuration
--------------------------------

Create ``pegasus_mcmicro.config`` in the launch directory:

.. code-block:: groovy

   docker {
       enabled = false
   }

   singularity {
       enabled = false
   }

   apptainer {
       enabled = true
       autoMounts = true
       cacheDir = "${System.getenv('HOME')}/.nextflow/mcmicro-apptainer-cache"
       runOptions = '-C -H $PWD'
   }

   process {
       executor = 'lsf'
       queue = 'general'
       clusterOptions = '-P hpc'

       cpus = 4
       memory = '32 GB'
       time = '4h'
   }

   executor {
       queueSize = 6
   }

   params {
       contPfx = 'docker://'
       publish_dir_mode = 'copy'
   }

The Nextflow launcher can be started from a Pegasus login node because the
configuration sends MCMICRO processing tasks to LSF. Do not remove the LSF
executor configuration or run the processing tasks locally on the login node.

Pre-pull a Container Image
--------------------------

The first run must download several container images. A Nextflow-managed image
pull may appear inactive while Apptainer downloads Docker layers and converts
them into a SIF image.

If an image pull repeatedly does not complete, stop the Nextflow workflow and
pull that image manually into the same cache directory.

For example, pull the ASHLAR image:

.. code-block:: bash

   apptainer pull --disable-cache \
       "$NXF_APPTAINER_CACHEDIR/labsyspharm-ashlar-1.19.0.img" \
       docker://labsyspharm/ashlar:1.19.0

During conversion, warnings about unsupported extended attributes on the
scratch filesystem can normally be ignored if the command continues and
creates the image.

Verify ASHLAR inside the image:

.. code-block:: bash

   apptainer exec \
       "$NXF_APPTAINER_CACHEDIR/labsyspharm-ashlar-1.19.0.img" \
       ashlar --version

Expected output:

.. code-block:: text

   ashlar 1.19.0

Run the Verified Registration Test
----------------------------------

Remove reports from an earlier launch, but do not delete the work directory:

.. code-block:: bash

   rm -f registration-trace.txt \
       registration-report.html \
       registration-timeline.html

Run the exemplar dataset through registration:

.. code-block:: bash

   nextflow run labsyspharm/mcmicro \
       --in "$PROJECT_ROOT/exemplar-001" \
       --stop-at registration \
       -c pegasus_mcmicro.config \
       -w "$NXF_WORK" \
       -with-trace registration-trace.txt \
       -with-report registration-report.html \
       -with-timeline registration-timeline.html \
       -resume

A successful test reports:

.. code-block:: text

   registration:ashlar (1) | 1 of 1 ✔

The ASHLAR output is published under the exemplar project directory. Check the
registration files with:

.. code-block:: bash

   find "$PROJECT_ROOT/exemplar-001" \
       -maxdepth 3 \
       -type f \
       | sort

Continue Through Quantification
-------------------------------

After registration succeeds, continue the workflow through quantification:

.. code-block:: bash

   rm -f trace.txt report.html timeline.html

   nextflow run labsyspharm/mcmicro \
       --in "$PROJECT_ROOT/exemplar-001" \
       --stop-at quantification \
       -c pegasus_mcmicro.config \
       -w "$NXF_WORK" \
       -with-trace trace.txt \
       -with-report report.html \
       -with-timeline timeline.html \
       -resume

The ``-resume`` option reuses the completed ASHLAR registration task and any
previously downloaded container images.

Additional stages may require additional images. When Nextflow prints a message
such as:

.. code-block:: text

   Pulling Apptainer image docker://<repository>/<image>:<tag>

the corresponding image can be manually pulled into
``$NXF_APPTAINER_CACHEDIR`` using the same method shown for ASHLAR. Rerun the
workflow with ``-resume`` after the image is available.

Monitor LSF Jobs
----------------

Check submitted tasks from another terminal:

.. code-block:: bash

   bjobs -w

Inspect a pending job:

.. code-block:: bash

   bjobs -l <jobID>

A task displayed as ``0 of 1`` is not necessarily frozen. Nextflow waits in the
foreground while the LSF job is pending or running.

Common pending reasons include:

* the queue job-slot limit has been reached;
* no node currently satisfies the requested memory;
* the requested number of CPU slots is unavailable; or
* the queue is busy.

Cancel a Workflow
-----------------

Press ``Ctrl+C`` once in the Nextflow terminal. Then check whether an LSF task
remains:

.. code-block:: bash

   bjobs -w

Cancel any remaining task with:

.. code-block:: bash

   bkill <jobID>

Do not delete the Nextflow work directory if the workflow will be restarted
with ``-resume``.

Troubleshooting
---------------

Nextflow reports an existing trace file
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Nextflow does not overwrite an existing trace, report, or timeline file by
default. Remove the old files before restarting:

.. code-block:: bash

   rm -f trace.txt report.html timeline.html

A container image pull does not complete
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Stop Nextflow, remove only the incomplete image and lock file, and then pull
the image manually:

.. code-block:: bash

   rm -f \
       "$NXF_APPTAINER_CACHEDIR/<image-name>.img" \
       "$NXF_APPTAINER_CACHEDIR/<image-name>.img.lock"

   apptainer pull --disable-cache \
       "$NXF_APPTAINER_CACHEDIR/<image-name>.img" \
       docker://<repository>/<image>:<tag>

Do not delete other completed images from the cache.

Apptainer cache variables conflict
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If Apptainer reports that ``SINGULARITY_CACHEDIR`` and
``APPTAINER_CACHEDIR`` have different values, remove the older Singularity
variables before launching the workflow:

.. code-block:: bash

   unset SINGULARITY_CACHEDIR
   unset SINGULARITY_TMPDIR

   export APPTAINER_CACHEDIR="$HOME/.apptainer/cache"
   export APPTAINER_TMPDIR="$PROJECT_ROOT/apptainer-tmp"

A MCMICRO command is not found
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

An error such as:

.. code-block:: text

   ashlar: command not found

means that the process was launched without its container environment. Confirm
that ``apptainer.enabled`` is set to ``true`` in
``pegasus_mcmicro.config`` and that the required image exists in the Nextflow
Apptainer cache.