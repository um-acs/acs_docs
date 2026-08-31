SimVascular
===========

Pegasus
-------

Pegasus provides the exact module name:

.. code-block:: bash

   simvascular/2021.6.10.lua

Inspect the module and launcher with:

.. code-block:: bash

   module show simvascular/2021.6.10.lua
   module load simvascular/2021.6.10.lua
   which sv

The module provides:

.. code-block:: text

   /share/apps/SimVascular/SimVascularSrc/BuildWithMake/sv

.. warning::

   The current SimVascular installation is not usable on the tested Pegasus
   compute nodes.

   A headless Python launch through LSF failed before SimVascular initialized
   because ``libGLU.so.1`` was missing from the compute-node environment.
   Therefore, neither the Python interface nor the graphical interface has
   been verified as usable.

   Contact IDSC support before attempting to use this installation.
