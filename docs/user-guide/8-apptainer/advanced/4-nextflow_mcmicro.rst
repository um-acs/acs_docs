Nextflow and MCMICRO with Apptainer
===================================

This page preserves the useful parts of the older MCMICRO and Nextflow workflow.
It is an advanced workflow example, not part of the basic Apptainer quick start.

Nextflow Execution Warning
--------------------------

Nextflow can run tasks locally by default. On a shared HPC system, this can cause
containers and cache files to be downloaded to compute nodes in an uncontrolled
way. For production workflows, use a proper LSF configuration and store work,
cache, and results in project or scratch storage.

Do not run large Nextflow or MCMICRO workflows directly on login nodes.

Modules and Project Storage
---------------------------

Load the required modules inside the job or interactive session:

::

   module load apptainer/1.1.5
   module load nextflow/22.10.4

Use project or scratch storage for workflow data:

::

   /scratch/projects/<project>/$USER/exemplar-001

MCMICRO Example Job
-------------------

The older documentation used the MCMICRO exemplar dataset and submitted the
workflow through LSF. A cleaned example job is shown below.

Create ``lsfmcmicro.job``:

.. code:: bash

   #!/bin/bash
   #BSUB -P <project>
   #BSUB -J lsfmcmicrojob
   #BSUB -o /scratch/projects/<project>/$USER/lsfmcmicro.%J.out
   #BSUB -e /scratch/projects/<project>/$USER/lsfmcmicro.%J.err
   #BSUB -q general
   #BSUB -n 3
   #BSUB -R "rusage[mem=4000]"
   #BSUB -W 1:00

   module load apptainer/1.1.5
   module load nextflow/22.10.4

   export APPTAINER_BIND="/scratch/projects/<project>/$USER"

   cd /scratch/projects/<project>/$USER/exemplar-001

   nextflow run labsyspharm/mcmicro \
       --in /scratch/projects/<project>/$USER/exemplar-001 \
       -profile singularity,lsf

Submit the job:

::

   bsub < lsfmcmicro.job

Check progress:

::

   bjobs
   tail -f /scratch/projects/<project>/$USER/lsfmcmicro.<jobid>.out

Viewing MCMICRO Results
-----------------------

MCMICRO output is written under the workflow directory. The older documentation
checked output images such as cell and nuclei outlines.

General result checks:

* Confirm that expected output folders were created.
* Inspect ``cellOutlines.ome.tif`` and ``nucleiOutlines.ome.tif`` when produced.
* Use Fiji or another image viewer that supports ``.ome.tif`` and ``.tif`` files.
* Use X11 forwarding or a local workstation for GUI image viewing; do not run
  heavy GUI work on login nodes.

Nextflow Profiles
-----------------

In Nextflow, profiles define execution behavior and software environment. A
workflow may combine profiles such as:

::

   -profile singularity,lsf

The ``lsf`` profile tells Nextflow to submit tasks through LSF. The
``singularity`` profile tells the workflow to use Singularity/Apptainer-style
containers when the pipeline supports that profile.

Minimal Nextflow Example
------------------------

Create ``hello.nf``:

.. code:: groovy

   #!/usr/bin/env nextflow

   params.greeting = 'Hello world!'
   greeting_ch = Channel.of(params.greeting)

   process SPLITLETTERS {
       input:
       val x

       output:
       path 'chunk_*'

       """
       printf '$x' | split -b 6 - chunk_
       """
   }

   process CONVERTTOUPPER {
       input:
       path y

       output:
       stdout

       """
       cat $y | tr '[a-z]' '[A-Z]'
       """
   }

   workflow {
       letters_ch = SPLITLETTERS(greeting_ch)
       results_ch = CONVERTTOUPPER(letters_ch.flatten())
       results_ch.view { it }
   }

Run the workflow with a container:

::

   nextflow run /nethome/$USER/hello.nf -with-singularity /nethome/$USER/python_latest.sif

Run from an interactive LSF session:

::

   bsub -q general -P <project> -Is \
       "nextflow run /nethome/$USER/hello.nf -with-singularity /nethome/$USER/python_latest.sif"

Example Nextflow LSF Configuration
----------------------------------

Create ``lsf_apptainer.config``:

.. code:: groovy

   params {
       config_profile_description = 'Sample LSF Apptainer profile.'
       config_profile_contact = 'IDSC'
   }

   executor {
       name = 'lsf'
       perTaskReserve = false
       perJobMemLimit = true
       queueSize = 100
       submitRateLimit = '5 sec'
   }

   profiles {
       lsf {
           process.executor = 'LSF'
           process.queue = 'general'
           process.cache = 'lenient'
           process.clusterOptions = '-P <project>'
       }
   }

   singularity {
       enabled = true
       autoMounts = true
   }

   process {
       executor = 'lsf'
       queue = 'general'
       clusterOptions = '-P <project>'
       cpus = 8
       time = '2.h'
       memory = '8.GB'

       withName: 'SPLITLETTERS|CONVERTTOUPPER' {
           cpus = 4
           memory = '4.GB'
       }
   }

Run with the configuration file:

::

   nextflow run /nethome/$USER/hello.nf -c /nethome/$USER/lsf_apptainer.config

Verify that Nextflow submitted LSF jobs:

::

   bjobs
   bhist -l <jobid>

nf-core Notes
-------------

The older documentation also mentioned ``nf-core`` for managing Nextflow
pipelines.

Install ``nf-core`` inside a suitable Python or Conda environment:

::

   conda activate <environment>
   pip install nf-core

List available pipelines:

::

   nf-core list

Create a new pipeline template:

::

   nf-core create

When editing generated pipelines, keep an original copy of ``nextflow.config``
and document any site-specific changes.
