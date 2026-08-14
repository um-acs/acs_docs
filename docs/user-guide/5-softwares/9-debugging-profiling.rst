.. _general-software-debugging-profiling:

Debugging and Profiling Tools
================================

Debugging and profiling tools help users inspect application behavior,
identify errors, and analyze performance.

.. ## Availability

.. .. list-table::
.. :header-rows: 1
.. :widths: 24 18 18 40

.. * * Tool
..   * Pegasus
..   * Triton/Summit
..   * Details
.. * * Allinea Forge
..   * :status_available:`Available`
..   * :status_limited:`Not listed`
..   * Pegasus provides `allinea/7.0.6`.
.. * * DDT
..   * :status_available:`Available`
..   * :status_available:`Available`
..   * Included with Allinea Forge on Pegasus.
.. * * MAP
..   * :status_available:`Available`
..   * :status_limited:`Confirm`
..   * Included with Allinea Forge on Pegasus.
.. * * Performance Reports
..   * :status_available:`Available`
..   * :status_limited:`Confirm`
..   * Pegasus provides `allinea/7.0.6-PR`.

Allinea Forge
--------------

Pegasus provides Allinea Forge through the `allinea` module. The module
includes the Forge interface, DDT debugger, and MAP profiler.

Check the available versions:

.. code-block:: bash

   module avail allinea

Load the verified version:

.. code-block:: bash

   module load allinea/7.0.6

Confirm the loaded module:

.. code-block:: bash

   module list

Confirm the available commands:

.. code-block:: bash

   which forge
   which ddt
   which map

Check the installed version:

.. code-block:: bash

   forge --version
   ddt --version
   map --version

All three commands are provided by the same Allinea Forge 7.0.6 installation.

.. note::

   Pegasus does not provide separate `forge`, `ddt`, or `map` module
   names. Load `allinea/7.0.6` to make these commands available.

DDT
----

DDT is the debugger included with Allinea Forge.

After loading the module:

.. code-block:: bash

   module load allinea/7.0.6
   ddt --version

The verified executable is:

.. code-block:: text

   /share/opt/allinea/7.0.6/bin/ddt

MAP
---

MAP is the profiler included with Allinea Forge.

After loading the module:

.. code-block:: bash

   module load allinea/7.0.6
   map --version

The verified executable is:

.. code-block:: text

   /share/opt/allinea/7.0.6/bin/map

Performance Reports
-------------------

Allinea Performance Reports is provided through a separate module:

.. code-block:: bash

   module purge
   module load allinea/7.0.6-PR

Confirm the executable:

.. code-block:: bash

   which perf-report

The verified executable is:

.. code-block:: text

   /share/opt/allinea/7.0.6-PR/bin/perf-report

.. important::

   `allinea/7.0.6` and `allinea/7.0.6-PR` conflict with each other and
   should not be loaded at the same time. Purge or unload the current Allinea
   module before switching between Forge and Performance Reports.

Graphical Tools
---------------

Forge, DDT, and MAP provide graphical interfaces.

.. caution::

   Graphical launching, X11 forwarding, remote-client configuration, and
   license behavior have not yet been verified for the current Pegasus
   environment. Do not add GUI launch instructions until those workflows are
   tested.

Recommended Practice
--------------------

* Use `module avail allinea` to check the installed versions.
* Load `allinea/7.0.6` for Forge, DDT, and MAP.
* Load `allinea/7.0.6-PR` for the `perf-report` command.
* Do not load the Forge and Performance Reports modules simultaneously.
* Run debugging and profiling workloads through an appropriate LSF job rather
  than directly on a login node.
* Store profiling reports and debugging output in project or scratch storage.
