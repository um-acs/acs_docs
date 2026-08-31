SAS
===

Pegasus
-------

Pegasus provides the ``sas/9.4_2024`` module and the ``sas`` executable.

The module can be inspected with:

.. code-block:: bash

   module avail sas
   module show sas/9.4_2024

.. warning::

   The current Pegasus SAS license expired on April 29, 2025. SAS batch jobs
   fail during kernel initialization and cannot currently be used.

   Do not add SAS execution examples until the license has been renewed and a
   batch program has completed successfully.
