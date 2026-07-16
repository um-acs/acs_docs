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

Find and Load Nextflow
~~~~~~~~~~~~~~~~~~~~~~

Check the available versions:

.. code-block:: bash

   module avail nextflow
   module spider nextflow

Load an available version:

.. code-block:: bash

   module load nextflow/<version>

Confirm that Nextflow is available:

.. code-block:: bash

   which nextflow
   nextflow -version

Run a Nextflow Workflow
~~~~~~~~~~~~~~~~~~~~~~~

Run workflows from project or scratch storage rather than the home directory:

.. code-block:: bash

   cd /scratch/projects/<project>/$USER/my_nextflow_project

Start the workflow:

.. code-block:: bash

   nextflow run <workflow> -profile <profile>

The workflow and profile names depend on the project being used.

.. important::

   Nextflow may coordinate the workflow from the login host, but
   computationally intensive workflow processes must be submitted to LSF.
   Do not configure workflow tasks to run directly on the login node.

Using LSF
~~~~~~~~~

Configure the workflow to use the LSF executor.

Example ``nextflow.config`` setting:

.. code-block:: groovy

   process {
       executor = 'lsf'
       queue = 'general'
   }

Additional CPU, memory, wall-time, and queue settings may be defined globally
or for individual workflow processes.

For example:

.. code-block:: groovy

   process {
       executor = 'lsf'
       queue = 'general'
       cpus = 1
       memory = '4 GB'
       time = '1h'
   }

Use project-specific values rather than applying the same resources to every
workflow process.

Using Apptainer Containers
~~~~~~~~~~~~~~~~~~~~~~~~~~

Containerized Nextflow workflows must use Apptainer rather than Docker on IDSC
systems.

Set the Nextflow work directory and Apptainer cache to project or scratch
storage:

.. code-block:: bash

   export NXF_WORK=/scratch/projects/<project>/$USER/nextflow_work
   export APPTAINER_CACHEDIR=/scratch/projects/<project>/$USER/apptainer_cache

Create the directories if necessary:

.. code-block:: bash

   mkdir -p "$NXF_WORK"
   mkdir -p "$APPTAINER_CACHEDIR"

Enable Apptainer in ``nextflow.config``:

.. code-block:: groovy

   apptainer {
       enabled = true
   }

A workflow profile may already configure LSF and Apptainer. Check the workflow
documentation before adding or overriding configuration settings.

.. warning::

   Do not store large Nextflow work directories, Apptainer caches, or workflow
   outputs in the home directory.

Resuming a Workflow
~~~~~~~~~~~~~~~~~~~

Nextflow can reuse completed tasks after an interrupted or failed run:

.. code-block:: bash

   nextflow run <workflow> -profile <profile> -resume

Use the same working directory when resuming the workflow.

Recommended Practice
--------------------

* Run workflows from project or scratch storage.
* Configure computational processes to use the LSF executor.
* Use Apptainer for containerized workflow processes.
* Keep workflow and configuration files with the project.
* Record the Nextflow, module, container, and workflow versions.
* Remove obsolete work directories only after required results are confirmed.