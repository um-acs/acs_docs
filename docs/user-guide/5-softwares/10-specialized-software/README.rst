.. _general-software-specialized:

Specialized Scientific Software
===============================

This section covers selected scientific applications documented for Pegasus
and Triton. Software availability, versions, and usage can differ between the
systems, so follow the system-specific instructions on each software page.

.. important::

   The Pegasus examples in these pages were tested on Pegasus. Always confirm
   availability on the target system with ``module avail`` and inspect a module
   with ``module show``.

   The ``module spider`` command is not supported on Pegasus.

.. note::

   Run computational workloads through LSF. Do not run production calculations
   on a login node merely because an executable starts there.


.. toctree::
   :maxdepth: 1
   :caption: Molecular Science Software

   Gaussian <gaussian>
   GROMACS <gromacs>
   LAMMPS <lammps>

.. toctree::
   :maxdepth: 1
   :caption: Specialized Software

   MAPSplice <mapsplice>
   SAS <sas>
   SimVascular <simvascular>
