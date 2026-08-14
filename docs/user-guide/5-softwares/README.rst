.. _general-software:


.. role:: status_available
   :class: status-available

.. role:: status_unavailable
   :class: status-unavailable

.. role:: status_limited
   :class: status-limited

.. role:: status_check
   :class: status-check




Software and Modules
====================

This section is the main software guide for IDSC advanced computing systems.
It covers software modules, Python, Conda/Miniforge, R, JupyterHub, MATLAB,
GPU frameworks, workflow tools, specialized scientific software, and debugging
or profiling tools.

Software availability can differ between Pegasus and Triton/Summit. The pages
in this section include system-specific notes where needed instead of keeping
separate Pegasus-only and Triton-only software sections.

.. note::

   Use this section as the single source of truth for software workflows.
   System-specific details should be included inside the relevant page when a
   workflow depends on architecture, queue names, module versions, service URLs,
   GPU hardware, package availability, or licensing.

**Software Availability Summary**

.. list-table::
   :header-rows: 1
   :widths: 24 18 18 40

   * - Software / Tool
     - Pegasus
     - Triton/Summit
     - Details
   * - Python
     - :status_available:`Available`
     - :status_available:`Available`
     - See :ref:`general-software-python`.
   * - Conda / Miniforge
     - :status_available:`Miniforge`
     - :status_available:`Conda`
     - See :ref:`general-software-conda-miniforge`.
   * - PyTorch
     - :status_available:`Available`
     - :status_available:`Available`
     - See :ref:`general-software-ml-frameworks`.
   * - TensorFlow
     - :status_available:`Available`
     - :status_available:`Available`
     - See :ref:`general-software-ml-frameworks`.
   * - JupyterHub
     - :status_available:`Available`
     - :status_unavailable:`Available`
     - See :ref:`general-software-jupyterhub`.
   * - R
     - :status_available:`Available`
     - :status_unavailable:`Not Available`
     - See :ref:`general-software-r`.
   * - MATLAB
     - :status_available:`Available`
     - :status_unavailable:`Not Available`
     - See :ref:`general-software-matlab`.
   * - Nextflow
     - :status_available:`Available`
     - :status_unavailable:`Not Available`
     - See :ref:`general-software-workflow-tools`.
   * - SAS
     - :status_available:`Available`
     - :status_limited:`Not listed`
     - See :ref:`general-software-specialized`.
   * - SimVascular
     - :status_available:`Available`
     - :status_limited:`Not listed`
     - See :ref:`general-software-specialized`.
   * - Gaussian
     - :status_available:`Available`
     - :status_available:`Available`
     - See :ref:`general-software-specialized`.
   * - GROMACS
     - :status_available:`Available`
     - :status_available:`Available`
     - See :ref:`general-software-specialized`.
   * - LAMMPS
     - :status_available:`Available`
     - :status_available:`Available`
     - See :ref:`general-software-specialized`.
   * - Allinea Forge
     - :status_available:`Available`
     - :status_limited:`Not listed`
     - Pegasus provides allinea/7.0.6. See :ref:`general-software-debugging-profiling`.
   * - DDT
     - :status_available:`Available`
     - :status_available:`Available`
     - Included with Allinea Forge.
   * - MAP
     - :status_available:`Available`
     - :status_limited:`Confirm`
     - Included with Allinea Forge.
   * - Performance Reports
     - :status_available:`Available` 
     - :status_limited:`Confirm`
     - Pegasus provides `allinea/7.0.6-PR`. See :ref:`general-software-debugging-profiling`.

.. caution::

   Software availability, module names, service URLs, and versions can change.
   Confirm availability on the target system with ``module avail`` or
   ``module spider`` before preparing production jobs.

.. caution::

   Availability tables can become outdated. Users should confirm module
   availability on the target system with ``module avail`` or ``module spider``.

.. toctree::
   :maxdepth: 2
   :caption: Software and Modules

   Software Modules <1-modules>
   Python <2-python>
   Conda and Miniforge <3-conda-miniforge>
   R <4-r>
   JupyterHub <5-jupyterhub>
   MATLAB <6-matlab>
   Machine Learning Frameworks <7-ml-frameworks>
   Workflow Tools <8-workflow-tools>
   Debugging and Profiling Tools <9-debugging-profiling>
   Specialized Scientific Software <10-specialized-software>
