Running MCMICRO
===============

MCMICRO is a Nextflow pipeline for processing highly multiplexed microscopy
data. On Pegasus, Nextflow submits pipeline tasks to LSF and Apptainer provides
the software environment for each MCMICRO module.


Load the Modules
----------------

.. code-block:: bash

   module purge
   module load nextflow/24.10.6
   module load apptainer/1.0.2

Prepare the Directories
-----------------------

Replace ``<projectID>`` with the appropriate Pegasus project allocation:

.. code-block:: bash

   export PROJECT_ROOT=/scratch/<projectID>/$USER/mcmicro-test
   export NXF_WORK="$PROJECT_ROOT/work"

   export NXF_APPTAINER_CACHEDIR="$HOME/.nextflow/mcmicro-apptainer-cache"
   export APPTAINER_CACHEDIR="$HOME/.apptainer/cache"
   export APPTAINER_TMPDIR="$PROJECT_ROOT/apptainer-tmp"

   unset SINGULARITY_CACHEDIR
   unset SINGULARITY_TMPDIR

   mkdir -p \
       "$PROJECT_ROOT" \
       "$NXF_WORK" \
       "$NXF_APPTAINER_CACHEDIR" \
       "$APPTAINER_CACHEDIR" \
       "$APPTAINER_TMPDIR"

Download MCMICRO and the Exemplar Dataset
-----------------------------------------

Create a launch directory and download MCMICRO:

.. code-block:: bash

   mkdir -p "$HOME/nextflow-launch/mcmicro-test"
   cd "$HOME/nextflow-launch/mcmicro-test"

   nextflow pull labsyspharm/mcmicro

Download the exemplar dataset:

.. code-block:: bash

   nextflow run labsyspharm/mcmicro/exemplar.nf \
       --name exemplar-001 \
       --path "$PROJECT_ROOT" \
       -w "$PROJECT_ROOT/download-work"

The dataset is stored at:

.. code-block:: text

   $PROJECT_ROOT/exemplar-001

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

Pre-pull the ASHLAR Image
-------------------------

The automatic container pull may appear inactive while Apptainer converts the
Docker layers into a SIF image. The ASHLAR image can be pulled manually into
the Nextflow cache:

.. code-block:: bash

   apptainer pull --disable-cache \
       "$NXF_APPTAINER_CACHEDIR/labsyspharm-ashlar-1.19.0.img" \
       docker://labsyspharm/ashlar:1.19.0

Verify the image with a clean container environment:

.. code-block:: bash

   apptainer exec --cleanenv \
       "$NXF_APPTAINER_CACHEDIR/labsyspharm-ashlar-1.19.0.img" \
       ashlar --version

Expected output:

.. code-block:: text

   ashlar 1.19.0

Run the Registration Test
-------------------------

Run the exemplar dataset through the ASHLAR registration stage:

.. code-block:: bash

   nextflow run labsyspharm/mcmicro \
       --in "$PROJECT_ROOT/exemplar-001" \
       --stop-at registration \
       -c pegasus_mcmicro.config \
       -w "$NXF_WORK" \
       -resume

A successful test reports:

.. code-block:: text

   registration:ashlar (1) | 1 of 1 ✔
   Succeeded   : 1

In the verified Pegasus test, the workflow completed in approximately one
minute after the ASHLAR image was available.

Troubleshooting
---------------

Container pull appears stuck
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Stop Nextflow with ``Ctrl+C`` and pull the required image manually into
``$NXF_APPTAINER_CACHEDIR``. Restart the workflow with ``-resume`` so completed
tasks and cached images are reused.

``libjvm.so`` error during manual verification
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Pegasus ``JAVA_HOME`` variable may be passed into the container. Use
``apptainer exec --cleanenv`` when testing ASHLAR manually. Do not permanently
unset ``JAVA_HOME`` before starting Nextflow because Nextflow requires Java.

Nextflow alone is not sufficient
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A container-free test submitted the ASHLAR task to LSF but failed with:

.. code-block:: text

   ashlar: command not found

Apptainer is therefore required unless all MCMICRO programs and dependencies
are installed separately on Pegasus.