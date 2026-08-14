Cluster Usage Guidelines
========================

Review these guidelines before running research workloads on Pegasus or
Triton. They summarize the main access, login-node, storage, software, and job
submission expectations for the shared clusters.

Accounts, Projects, and Policies
--------------------------------

Access to IDSC cluster resources is managed by project. Before using Pegasus or
Triton, review :ref:`policies` and confirm that you are a member of an approved
project.

- **Triton:** Join a
  `Triton project <https://idsc.miami.edu/project-request>`__ with an
  appropriate resource type, such as ``triton_faculty``, ``triton_student``,
  or ``triton_education``.
- **Pegasus:** Join a
  `Pegasus project <https://uhealth.service-now.com/esc?id=sc_cat_item&sys_id=1bd010ed87c58a10b2f12029dabb35d9>`__
  with the ``pegasus_project`` resource type.

Cluster resources, including compute time and scratch storage, are allocated to
projects. Contact the project's Principal Investigator to request membership.
See :ref:`g-projects` for details.

Network Access
--------------

Connect from the University of Miami network. When working remotely, connect
through the University
`VPN <https://www.it.miami.edu/a-z-listing/virtual-private-network/index.html>`__
before accessing Pegasus or Triton.

Use Login Nodes Responsibly
---------------------------

Login nodes are shared access points for lightweight tasks, including:

- editing scripts and configuration files;
- transferring and organizing files;
- loading and inspecting software modules; and
- submitting and monitoring LSF jobs.

.. warning::

   Do not run production, long-running, or resource-intensive computations
   directly on a login node. Misuse of login nodes can affect other users and
   may result in account restrictions.

Submit computational work as an LSF batch job or request an interactive compute
session. See :ref:`g-scripts`, :ref:`g-queues`, and :ref:`g-interactive`.

Use Scratch Storage for Active Jobs
-----------------------------------

Use the project scratch filesystem for active job input, temporary files, and
high-throughput output:

.. code-block:: text

   /scratch/<project>/$USER

Home directories are appropriate for scripts, configuration files, source
code, and user-installed software. Avoid high-throughput or data-intensive job
I/O under ``/home`` or ``/nethome``.

See the storage documentation for retention, backup, quota, and data-management
requirements.

Request Appropriate Job Resources
---------------------------------

Pegasus and Triton use the LSF scheduler to manage shared compute resources.
Each submitted job should request resources appropriate for the workload,
including:

- project allocation;
- CPU cores;
- memory;
- runtime; and
- any required accelerator or special resource.

Requests that are too small may cause jobs to fail. Excessive requests may
increase queue time and leave resources unused. Benchmark smaller runs first
when resource requirements are unknown.

See :ref:`g-lsf` for job submission and resource-request guidance.

Manage Software with Modules and Environments
---------------------------------------------

Use the Environment Modules system to access centrally installed software:

.. code-block:: bash

   module avail
   module load <module-name>
   module list

Use project-specific environments when additional packages or isolated software
stacks are required. See :ref:`g-modules` and the relevant software guides.

Transfer Files from Login Nodes
-------------------------------

Use supported transfer methods such as SCP or SFTP to move data between your
local computer and the clusters. Perform transfers through the cluster login
endpoints rather than compute nodes.

See :ref:`transfer` for commands, graphical tools, and recommendations for
large transfers.

Getting Help
------------

When requesting support, include the cluster name, job ID, relevant commands,
and complete error messages. Do not include passwords, private keys, or other
credentials.