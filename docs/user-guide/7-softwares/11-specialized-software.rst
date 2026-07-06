.. _general-software-specialized:

Specialized Scientific Software
===============================

This page covers specialized scientific and application software. Availability
can differ by system, license, architecture, and module configuration.

.. important::

   Always confirm availability on the system where the job will run with
   ``module avail`` or ``module spider``.

Availability
------------

.. list-table::
   :header-rows: 1
   :widths: 25 20 20 35

   * - Software
     - Pegasus
     - Triton/Summit
     - Notes
   * - Gaussian
     - Available
     - Available
     - Electronic-structure modeling software.
   * - GROMACS
     - Available
     - Available
     - Molecular dynamics software.
   * - LAMMPS
     - Available
     - Available
     - Molecular dynamics simulator.
   * - SAS
     - Available
     - Not listed
     - Statistical software; license/access may apply.
   * - SimVascular
     - Available
     - Not listed
     - Graphical workflows may require X11 and interactive jobs.
   * - MAPSplice
     - Available
     - Not listed
     - Bioinformatics tool.

Gaussian
--------

Search and load:

::

   module avail gaussian
   module load gaussian

Example job pattern:

.. code:: bash

   #!/bin/bash
   #BSUB -J gaussian_job
   #BSUB -P <project>
   #BSUB -q general
   #BSUB -n 4
   #BSUB -W 01:00
   #BSUB -o gaussian_job.%J.out
   #BSUB -e gaussian_job.%J.err

   module load gaussian

   export GAUSS_SCRDIR=/scratch/projects/<project>/$USER/gaussian_scratch
   mkdir -p ${GAUSS_SCRDIR}

   g16 input.com

GROMACS
-------

Search and load:

::

   module avail gromacs
   module load gromacs

Check version:

::

   gmx --version

LAMMPS
------

Search and load:

::

   module avail lammps
   module load lammps

Check command help:

::

   lmp -h

SAS
---

Search and load:

::

   module avail sas
   module load sas

Batch example:

.. code:: bash

   #!/bin/bash
   #BSUB -P <project>
   #BSUB -J sas_job
   #BSUB -q general
   #BSUB -n 1
   #BSUB -W 01:00
   #BSUB -o sas_job.%J.out
   #BSUB -e sas_job.%J.err

   module load sas
   sas test.sas

SimVascular
-----------

Search and load:

::

   module avail simvascular
   module load simvascular

Graphical SimVascular workflows may require X11 forwarding and an interactive
LSF session.

Example pattern:

::

   bsub -Is -q interactive -P <project> -XF sv -tk

MAPSplice
---------

Search and load:

::

   module avail mapsplice
   module load mapsplice

Run the help command or module-provided documentation to confirm the executable
name and required inputs.

System Notes
------------

Pegasus
~~~~~~~

Gaussian, GROMACS, LAMMPS, SAS, SimVascular, and MAPSplice are available on
Pegasus based on the current software review.

Triton/Summit
~~~~~~~~~~~~~

Gaussian, GROMACS, and LAMMPS are available on Triton/Summit based on the
current software review. SAS, SimVascular, and MAPSplice are not listed for
Triton/Summit unless confirmed.

Recommended Practice
--------------------

* Confirm module names on the target system.
* Use project or scratch storage for large inputs and outputs.
* Use LSF for compute jobs.
* Request GPU resources only when the application and workflow use GPUs.
* Contact IDSC support for licensing or access questions.
