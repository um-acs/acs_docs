.. _general-software-specialized:

Specialized Software
====================

This page collects specialized software that may be available only on selected
IDSC systems. These applications remain in the General Usage software section so
users can find them in one place, but each entry includes system-specific notes
when needed.

.. important::

   Specialized software availability can depend on license restrictions,
   architecture, queue access, GPU hardware, or local installation details.
   Always check ``module avail`` or contact IDSC support if a module is not
   available on the system where the job will run.

Molecular Science Software
--------------------------

Gaussian
~~~~~~~~

Gaussian is electronic-structure modeling software.

Search for Gaussian:

::

   module avail gaussian
   module spider gaussian

Load Gaussian:

::

   module load gaussian

Example LSF pattern:

.. code:: bash

   #!/bin/bash
   #BSUB -J gaussian_job
   #BSUB -P <project>
   #BSUB -q normal
   #BSUB -n 4
   #BSUB -W 00:30
   #BSUB -o gaussian_job.%J.out
   #BSUB -e gaussian_job.%J.err

   module load gaussian

   export GAUSS_SCRDIR=/scratch/projects/<project>/$USER/gaussian_scratch
   mkdir -p ${GAUSS_SCRDIR}

   g16 input.com

.. note::

   Gaussian examples were previously documented for Triton/t2. Keep the
   queue, scratch path, and project values aligned with the system where the job
   is submitted.

GROMACS
~~~~~~~

GROMACS is a molecular dynamics package for simulations of proteins, lipids,
nucleic acids, and other molecular systems.

Search and load:

::

   module avail gromacs
   module load gromacs

Example LSF pattern:

.. code:: bash

   #!/bin/bash
   #BSUB -J gromacs_job
   #BSUB -P <project>
   #BSUB -q normal
   #BSUB -n 1
   #BSUB -W 02:00
   #BSUB -gpu "num=1"
   #BSUB -o gromacs_job.%J.out
   #BSUB -e gromacs_job.%J.err

   module load gromacs

   gmx --version

.. note::

   GROMACS examples were previously documented for Triton/t2. GPU use,
   queue names, and module versions should be checked on the target system.

LAMMPS
~~~~~~

LAMMPS is the Large-scale Atomic/Molecular Massively Parallel Simulator.

Search and load:

::

   module avail lammps
   module load lammps

Example LSF pattern:

.. code:: bash

   #!/bin/bash
   #BSUB -J lammps_job
   #BSUB -P <project>
   #BSUB -q normal
   #BSUB -n 1
   #BSUB -W 02:00
   #BSUB -gpu "num=1"
   #BSUB -o lammps_job.%J.out
   #BSUB -e lammps_job.%J.err

   module load lammps

   lmp -h

.. note::

   LAMMPS examples were previously documented for Triton/t2. If running
   multi-node or GPU LAMMPS jobs, adjust LSF resource requests and commands for
   the selected system and module.

SAS
---

SAS may be available on selected systems.

Search and load:

::

   module avail sas
   module load sas

Batch SAS example:

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

Interactive graphical SAS may require X11 forwarding and an interactive LSF
session:

::

   module load sas
   module load java
   bsub -q interactive -P <project> -Is -XF sas

.. note::

   SAS examples were previously documented for Pegasus. Check module
   availability and licensing on the system where the job will run.

SimVascular
-----------

SimVascular may be available as a software module on selected systems.
Graphical SimVascular workflows require X11 forwarding and an interactive LSF
session.

Search and load:

::

   module avail simvascular
   module load simvascular

Example interactive pattern:

::

   bsub -Is -q interactive -P <project> -XF sv -tk

.. caution::

   Graphical applications should not be run directly on login nodes. Use an
   interactive LSF session and X11 forwarding when a GUI is required.

Debuggers and Profilers
-----------------------

Debugging and profiling tools such as Allinea Forge, DDT, MAP, or performance
reporting tools may be available as modules on selected systems.

Search for available tools:

::

   module avail allinea
   module avail forge
   module avail ddt
   module avail map

Use vendor documentation and module help output for tool-specific launch
instructions.

.. note::

   Allinea/Forge examples were previously documented for Pegasus. Availability
   and module names may differ across systems.

When to Contact IDSC
--------------------

Contact IDSC support when specialized software involves:

* license access
* missing modules
* system-specific launch wrappers
* GUI or X11 issues
* GPU or queue permissions
* multi-node scaling
* unclear scratch or project storage requirements

.. admonition:: Getting Help
   :class: important

   Include the software name, system name, project name, module command, job
   script, job ID, and error output when requesting support.
