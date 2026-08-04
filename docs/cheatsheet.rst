UM IDSC HPC Cheat Sheet
=======================

This cheat sheet answers common beginner questions about the University of Miami
IDSC ACS HPC environment, especially Pegasus and Triton. It also includes
IDSC grant-program information and proposal-language style notes based on the
Facilities and Equipment material.

What is Pegasus?
----------------

Pegasus is the University of Miami's general-purpose HPC cluster.

* It is the main shared cluster for standard HPC workloads.
* It is used for general research computing and analytics.
* Users submit jobs through the scheduler.
* It is especially well suited to CPU-heavy workloads.
* It includes a general processing queue and large-memory resources.

Additional Pegasus details often useful in proposals:

* Pegasus was described as a 350-node Lenovo cluster.
* Each node has two Intel Sandy Bridge E5-2670 processors.
* Standard compute nodes have 32 GB RAM.
* The system was designed around fast InfiniBand data movement.
* The ``/scratch`` filesystem was designed for demanding I/O workloads.
* Pegasus also provides access to large-memory nodes in the ``bigmem`` queue.
* Interactive and GUI-enabled workflows are supported through LSF.

What is Triton?
---------------

Triton is the GPU-focused HPC cluster.

* It is designed for GPU and deep-learning workloads.
* It is intended for advanced computational and data science workloads.
* It is UM's GPU-accelerated advanced computing system.
* It was built using IBM Power Systems AC922 servers.

Triton technical summary:

* IBM Power9 / NVIDIA Volta architecture
* 96 IBM Power9 servers
* 30 TB RAM total
* 1.2 PFLOPS double-precision performance
* 240 TFLOPS deep-learning performance
* 150 TB shared flash storage
* 400 TB shared home storage

What is a project on Pegasus or Triton?
---------------------------------------

A project is the basic unit of access, accounting, and resource allocation.

* Users normally access Pegasus or Triton through a project.
* Project members share that project's compute and storage resources.
* Jobs are charged to a project.
* Only active members of an active project can submit jobs for that project.

In practice, most users either:

* join an existing project owned by a PI or faculty member, or
* ask a PI or faculty member to request a new project.

How can I get an account?
-------------------------

The usual process is:

#. Create or join a project.
#. Wait for the project to be approved.
#. Request an IDSC account associated with that project.

Important notes:

* A project is required before requesting an account.
* The account holder must be affiliated with the University of Miami.
* Off campus, access usually requires the UM VPN or UM network.

Who can use these systems?
--------------------------

University of Miami employees and students are eligible to use ACS resources,
subject to project approval and policy requirements.

How much does it cost?
----------------------

For UM users, the published FY2026 rates are:

* Consulting: $105/hour
* CPU usage: $0.011 per Service Unit (SU)
* GPU usage: $0.088 per gSU

For Non-UM users, the published FY2026 rates are:

* Consulting: $158/hour
* CPU usage: $0.017 per Service Unit (SU)
* GPU usage: $0.13 per gSU

What is a Service Unit?
-----------------------

A Service Unit (SU) is the basic billing unit for CPU-based usage.

According to the published fee information, an SU is defined as the larger of:

* 1 CPU hour, or
* 2 GB of memory per hour

The fee sheet also notes a scratch-space accounting component.

What is a gSU?
--------------

A gSU is the billing unit used for GPU jobs.

The fee sheet states that:

* 1 gSU is billed at 8 SUs.

How much does storage cost?
---------------------------

There are two different storage questions people usually mean:

Home and scratch allocations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Active users receive a 250 GB home directory allocation.
* Active projects may receive scratch storage for runtime input and output.
* Home storage is not expandable.
* Scratch expansion may be approved case by case.
* Scratch may be purged after 21 days if space is needed.

Paid project storage
~~~~~~~~~~~~~~~~~~~~

For UM users, published FY2026 storage rates are:

* GPFS storage: $50/TB/year
* Cost Effective Storage: $20/TB/year

For Non-UM users, published FY2026 storage rates are:

* GPFS storage: $75/TB/year
* Cost Effective Storage: $30/TB/year

Notes:

* Paid storage has a 10 TB minimum per project.
* GPFS storage is intended for storage attached to the HPC environment.
* Cost Effective Storage is lower-cost storage intended more for retention than
  active processing.

What if I am a student?
-----------------------

Students can use ACS resources, but student status does not bypass the normal
project-based model.

Typical student paths are:

* join a faculty member's or PI's project,
* work under a lab or research group's project, or
* apply through student-focused IDSC opportunities when available.

The public fee pages are organized as UM versus Non-UM. They do not publish a
separate student-only rate on the pages referenced here.

Is there any subsidy or cost-share program?
-------------------------------------------

Yes. IDSC publishes a Service Unit Match program for heavier UM users.

This is intended to reduce the effective cost of larger usage levels once a
project exceeds the published threshold.

IDSC grant programs
-------------------

IDSC states that it offers several grant programs through which UM researchers,
including faculty, staff, and students, can engage in data science.

Expanding the Use of Collaborative Data Science at UM
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Purpose:

* Increase the use of data science to foster breakthroughs in disciplinary
  research.
* Help research teams become more competitive for external funding.

Award:

* $20,000 in discretionary funds
* 1 million Service Units (SUs) for HPC use

Important restriction:

* Equipment purchases are not allowed from these discretionary funds.

Eligibility:

* Open to UM Faculty with an active IDSC membership.

Access to IDSC Resources for Early Career Researchers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Purpose:

* Allow uninitiated researchers to explore how data science and computing
  resources can advance research and educational goals.

Eligibility:

* Open to UM Faculty.

Advanced Computing for Students
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Purpose:

* Allow students who are new to advanced computing to explore data science and
  computing using IDSC resources.

Eligibility:

* Open to UM students and Postdoctoral Associates.

Bridge Awards for Degree and Program Continuity
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Purpose:

* Investigator-initiated support evaluated case by case.

Eligibility:

* Open to UM Faculty and Students.

Proposal language: facilities and equipment
-------------------------------------------

The following points are useful when writing proposal language about the UM
advanced computing environment.

Facilities
~~~~~~~~~~

* IDSC resources run from the NAP data center.
* The NAP is described as UM's primary data center.
* The facility was designed for resilient operations.
* The site has maintained service through hurricanes, power outages, and other
  severe weather events.
* The NAP has its own generators and a flywheel power crossover system.
* It maintains a two-week fuel supply at full utilization.
* All IDSC resources, clusters, storage, and backup systems are described as
  operating from this facility and serving all major campuses.

Institutional computing environment summary
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* UM describes its environment as one of the largest centralized academic
  cyberinfrastructures in the country.
* Since 2007, the environment has grown to support more than 500 users.
* The environment is described as providing 240 TFLOPS of computational power.
* It also provides more than 3 PB of disk storage.

Pegasus details for proposal text
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Pegasus is often described in proposal language as follows:

* A 350-node Lenovo cluster
* Built for biomedical research and analytics
* Over 160 TFLOPS total performance
* FDR InfiniBand fabric for fast data access
* 150 TB ``/scratch`` filesystem optimized for small random reads and writes
* More than 125,000 sustained IOPS and 20 Gb/sec throughput at 4 KB file size
* More than 8 TB of burst-buffer space for large file manipulation
* 20 large-memory nodes in the ``bigmem`` queue
* Interactive access for tools such as Matlab, Knime, SAS, and R through LSF

Pegasus hardware summary
~~~~~~~~~~~~~~~~~~~~~~~~

* 350 dx360 M4 compute nodes
* Two 8-core Intel Sandy Bridge 2.6 GHz processors per node
* 32 GiB memory per standard node
* FDR InfiniBand clustering network

Triton details for proposal text
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Triton is often described in proposal language as follows:

* GPU-accelerated advanced computing system
* IBM Power Systems AC922 design
* Built to maximize data movement between IBM POWER9 CPUs and accelerators
* 96 IBM Power9 servers
* 30 TB RAM
* 1.2 PFLOPS double precision
* 240 TFLOPS deep learning
* 150 TB shared flash storage
* 400 TB shared home storage

W.A.D.E. Storage Cloud
~~~~~~~~~~~~~~~~~~~~~~

W.A.D.E. stands for Worldwide Advanced-Data Environment.

Key points:

* Provides more than 7 PB of active data to the UM research community
* Supports everything from small spreadsheets to multi-terabyte image files and
  NGS datasets
* Composed of four DDN storage clusters running GPFS
* Designed to let researchers process data on Pegasus and share it broadly
* Supports secure sharing across Mac, Windows, and Linux
* Supports SCP, SFTP, bbcp, Aspera, and web-based access

How do I connect?
-----------------

Connection is typically through SSH.

Common hostnames include:

* Pegasus: ``pegasus2.ccs.miami.edu``
* Triton: ``t2.idsc.miami.edu``

If you are off campus, use the UM VPN or UM network as required.

Where should I put files for running jobs?
------------------------------------------

Use scratch space for active job input and output.

Do not use home storage for heavy runtime I/O.

Are files backed up?
--------------------

No. ACS policies state that cluster file systems are not backed up.

Users are responsible for keeping their own copies of important data.

Can I run big jobs on the login node?
-------------------------------------

No.

Login nodes are for editing, compiling, light testing, and job submission.
Production or resource-intensive work must be submitted through the scheduler.

How do I submit jobs?
---------------------

Jobs are submitted through LSF using ``bsub``.

Jobs should include the project ID, for example:

.. code-block:: bash

   bsub -P projectID my_job_script.sh

Can I install software myself?
------------------------------

Usually yes, in your own home directory or user space.

System-wide software installs are reviewed by ACS and are generally added when
there is broader demand.

Can I use Docker?
-----------------

Not on the shared systems in the normal way, because Docker requires elevated
privileges.

Pegasus documentation points users to Apptainer instead.

Can I store PHI or PII?
-----------------------

No.

ACS terms and conditions state that PHI and PII must not be stored on these
systems.

What should I include in a help request?
----------------------------------------

A good help request should include:

* a clear description of the problem,
* the commands you ran,
* relevant file paths,
* job scripts,
* output and error messages,
* loaded modules or software versions, and
* the job ID, if applicable.

Fast answers to common questions
--------------------------------

**Do I need a project before I get an account?**
   Yes.

**Can a student get access?**
   Yes, usually through a faculty or PI project or through student-focused IDSC
   programs.

**Is Pegasus for CPU work?**
   Yes, primarily general-purpose and CPU-heavy HPC work.

**Is Triton for GPU work?**
   Yes.

**Do I get free storage expansion in home?**
   No, home storage is not expandable.

**Can scratch be deleted automatically?**
   Yes, scratch may be purged if space is needed.

**Are backups provided?**
   No.

**Can I run jobs without specifying a project?**
   In normal practice, jobs are associated with an active project.

**Can I use the system from home?**
   Yes, typically through VPN plus SSH.

**Who do I contact first?**
   Start with the ACS / HPC support portal and include as much detail as
   possible.

Suggested help-desk questions to add to an FAQ
----------------------------------------------

Other beginner questions people often ask include:

* How do I reset my password?
* How do I check whether my account is active?
* How do I know which cluster to use?
* How do I transfer files to and from the cluster?
* How do I see my current storage usage?
* How do I know whether my project is active?
* How do I see job status and queue position?
* How do I request more scratch space?
* How do I know whether I should use Pegasus or Triton?
* How do I cite ACS or IDSC resources in a paper?
* Which grant program is appropriate for faculty, students, or postdocs?
* Can grant funds be used for equipment?
* What proposal language can I use to describe the UM computing environment?