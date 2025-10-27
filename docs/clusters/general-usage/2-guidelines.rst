Important Guidelines
====================

Review Policies and Project Requirements
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Before running commands, submitting jobs, or using software on **Pegasus** or **Triton**, please review our  
:ref:`policies` and ensure you understand the rules governing access to IDSC resources.  
Access to IDSC clusters is managed on a **per-project basis**, facilitating team collaboration and secure data sharing.

To use Pegasus or Triton, you must be associated with a valid project:

- **Triton Users:**  
  Membership in a `Triton project <https://idsc.miami.edu/project-request>`__ with a resource type of  
  ``triton_faculty``, ``triton_student``, or ``triton_education``.

- **Pegasus Users:**  
  Membership in a `Pegasus project <https://uhealth.service-now.com/esc?id=sc_cat_item&sys_id=1bd010ed87c58a10b2f12029dabb35d9>`__ with the resource type ``pegasus_project``.

Cluster resources (CPU hours, scratch space, etc.) are allocated to projects.  
Join projects by contacting Principal Investigators (PIs). See :ref:`g-projects` for more.



Network Access Requirement
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
You must connect to the University of Miami network either:
- Directly on campus, or
- Remotely using the `VPN <https://www.it.miami.edu/a-z-listing/virtual-private-network/index.html>`__.

- **Login Node Usage – What Not to Do:**  
Do **not** run production or resource-intensive jobs on login nodes.  
Always use the :ref:`g-scripts` or :ref:`g-queues` to submit jobs to the appropriate compute queues.  
Violating this policy may result in account suspension.

To test code interactively or install extra software modules (e.g., Python or R), submit a job to the **interactive** queue in LSF.  
You’ll be placed on a compute node, and returned to the login node after exiting.

Use the **interactive** queue for resource-intensive CLI jobs (e.g., `sort`, `find`, `awk`, `sed`, etc.). See :ref:`g-interactive` for more.



Job Submissions and Scheduler Guidance
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Pegasus compute nodes run jobs through the **LSF** scheduler. Jobs must be submitted as either **batch** or **interactive**, based on use case.

In a shared-resource system, it's essential to specify:
- Requested memory
- CPU count
- Runtime
- Any additional resources

If your jobs exceed requested limits, they may impact other users and degrade system performance.  
If unsure about job requirements, benchmark first using the **debug** queue.

See :ref:`g-lsf` for complete job submission instructions.



Software Modules and Environment Management
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Pegasus and Triton use the **Environment Modules** system to load available software.  
Use ``module avail`` to see available software and ``module load <name>`` to activate it.  
Some modules are preloaded at login. Use ``module list`` to see currently loaded modules.

See :ref:`g-modules` for full usage details.



File Transfer Best Practices
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Use **SCP** or **SFTP** to move files between local machines and Pegasus or Triton.  
File transfers should be performed from login nodes.

Data can be transferred from:
- ``/scratch``
- ``/nethome`` / ``/home`` (for storage only — **not** active job execution)

See :ref:`transfer` for instructions and recommendations, including large data transfers to/from UM.



Scratch Usage for Job I/O
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
All input and output data for compute jobs must reside in the ``/scratch`` filesystem.  
This area is optimized for high-throughput access.

**Do not use** ``/nethome`` or ``/home`` for active job execution — this may degrade performance and result in account restrictions.

