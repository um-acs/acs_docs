.. _general-software-debugging-profiling:

Debugging and Profiling Tools
=============================

Debugging and profiling tools help users inspect, debug, and optimize
applications. Availability differs between Pegasus and Triton/Summit.

Availability
------------

.. list-table::
   :header-rows: 1
   :widths: 20 20 20

   * - Tool
     - Pegasus
     - Triton/Summit
   * - Allinea
     - Available
     - Not listed
   * - Forge
     - Not listed
     - Available
   * - DDT
     - Not available
     - Not available

Allinea
-------

Search and load:

::

   module avail allinea
   module spider allinea
   module load allinea/<version>

Allinea availability is currently documented for Pegasus.

Forge
-----

Search and load:

::

   module avail forge
   module spider forge
   module load forge/<version>

Forge availability is currently documented for Triton/Summit.

DDT
---

DDT is not listed as available based on the current software review.

.. caution::

   Do not include DDT launch instructions unless availability is confirmed with
   current system documentation or module output.

General Debugging Pattern
-------------------------

For command-line debugging or profiling tools:

#. Start an appropriate LSF session or submit a job.
#. Load the required compiler, MPI, and debugging/profiling modules.
#. Confirm the executable and environment.
#. Run the debugger or profiler according to the module or vendor instructions.
#. Save output reports in project or scratch storage.

.. note::

   Graphical debugging tools may require X11 forwarding and an interactive LSF
   session.

Recommended Practice
--------------------

* Confirm tool availability with ``module avail`` or ``module spider``.
* Match compiler, MPI, and debugger/profiler environments.
* Use interactive LSF sessions for graphical tools.
* Use project or scratch storage for reports and traces.
* Contact IDSC support for complex multi-node debugging workflows.
