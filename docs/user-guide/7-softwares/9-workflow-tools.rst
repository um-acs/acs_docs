.. _general-software-workflow-tools:

Workflow Tools
==============

Workflow tools help organize multi-step analysis pipelines and repeated
computational workflows.

Based on current software availability notes, Nextflow is available on Pegasus.
Triton/Summit availability is not listed here unless confirmed.

Nextflow
--------

Search for Nextflow:

::

   module avail nextflow
   module spider nextflow

Load Nextflow:

::

   module load nextflow/<version>

Run a workflow from project or scratch storage:

::

   cd /scratch/projects/<project>/$USER/my_nextflow_project
   nextflow run <workflow> -profile <profile>

Nextflow with Apptainer
-----------------------

For workflows that use containers, configure Nextflow to use Apptainer instead
of Docker on IDSC systems.

Example environment variables:

::

   export NXF_WORK=/scratch/projects/<project>/$USER/nextflow_work
   export APPTAINER_CACHEDIR=/scratch/projects/<project>/$USER/apptainer_cache

.. warning::

   Avoid writing large Nextflow work directories, Apptainer caches, or workflow
   outputs to the home directory.

Pegasus Notes
-------------

Nextflow is available on Pegasus based on the current software review.

Triton/Summit Notes
-------------------

Triton/Summit Nextflow availability should be confirmed before documenting it as
available.

Recommended Practice
--------------------

* Run workflows from project or scratch storage.
* Use LSF for compute workloads.
* Keep workflow configuration files with the project.
* Use Apptainer for containerized workflow steps.
* Record module and workflow versions in output logs.
