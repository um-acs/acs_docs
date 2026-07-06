.. _general-software-workflow-tools:

Workflow Tools
==============

Workflow engines such as Nextflow are useful for organizing multi-step analysis
pipelines. They are commonly used with LSF, modules, Conda environments, or
Apptainer containers.

.. tip::

   For workflows that depend on containers, use Apptainer on IDSC systems
   instead of Docker.

General Workflow Pattern
------------------------

A general workflow-engine pattern is:

#. Prepare workflow files and configuration.
#. Prepare required software environments or containers.
#. Run the workflow from project or scratch storage.
#. Submit through LSF.
#. Write outputs to project or scratch storage.
#. Keep logs and configuration files with the project.

Example LSF wrapper pattern:

.. code:: bash

   #!/bin/bash
   #BSUB -P <project>
   #BSUB -J workflow_job
   #BSUB -q general
   #BSUB -n 1
   #BSUB -R "rusage[mem=4000]"
   #BSUB -W 02:00
   #BSUB -o workflow_job.%J.out
   #BSUB -e workflow_job.%J.err

   module load <workflow-tool-module>

   cd /scratch/projects/<project>/$USER/my_workflow
   <workflow-command>

Nextflow
--------

Nextflow workflows may use local software, Conda environments, or Apptainer
containers depending on how the workflow is written.

Search for Nextflow:

::

   module avail nextflow
   module spider nextflow

Load Nextflow:

::

   module load nextflow/<version>

Example:

::

   module load nextflow/25.04.2

Run a workflow from a project directory:

::

   cd /scratch/projects/<project>/$USER/my_nextflow_project
   nextflow run <workflow> -profile <profile>

.. note::

   Some Nextflow workflows, such as nf-core workflows, may require additional
   configuration for LSF, Apptainer, Conda, or project-specific paths.

Nextflow with Apptainer
-----------------------

For containerized Nextflow workflows, configure the workflow to use Apptainer.
Keep Apptainer cache and work directories in project or scratch storage when the
workflow creates large intermediate files.

Example environment variables:

::

   export NXF_WORK=/scratch/projects/<project>/$USER/nextflow_work
   export APPTAINER_CACHEDIR=/scratch/projects/<project>/$USER/apptainer_cache

.. caution::

   Avoid writing large Nextflow work directories, Apptainer caches, or workflow
   outputs to the home directory.

AWS CLI
-------

If the AWS command line interface is available as a module, load it before use:

::

   module avail aws
   module load aws-cli/<version>

IDSC does not administer or manage AWS services. Users are responsible for AWS
account permissions, IAM credentials, buckets, billing, and data-transfer
policies.

.. warning::

   Do not place AWS access keys or secret keys in job scripts, Git
   repositories, shared directories, or documentation.

Application Development Tools
-----------------------------

Application development tools may include compilers, MPI libraries, OpenMP,
build systems, debuggers, profilers, and command-line utilities.

General module workflow:

::

   module avail <tool>
   module spider <tool>
   module load <tool>/<version>

Compiler and MPI modules may depend on each other. Use ``module spider`` to see
which compiler or dependency module is required.

Profiling and Debugging
-----------------------

Profiling and debugging tools may be provided as modules. If tools such as
Allinea Forge, DDT, MAP, or other profilers are available, check the module
environment and vendor documentation.

Recommended Practice
--------------------

* Run workflows from project or scratch storage.
* Keep workflow configuration under version control when appropriate.
* Use LSF for compute work.
* Use Apptainer for containerized workflow steps.
* Avoid storing credentials in scripts or shared folders.
* Record module versions and workflow versions in output logs.
