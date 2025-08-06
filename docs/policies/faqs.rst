FAQs - Frequently Asked Questions
=========================================
Detailed information for FAQ topics is available here and in :ref:`policies`

**Note:** IDSC ACS does not install, provide support for, or provide documentation on how to code in your preferred software. ACS documentation contains information on using software in a Linux cluster environment.


Projects
----------------

Checkout the documentation on :ref:`g-projects` for more information.

How do I join a project?
~~~~~~~~~~~~~~~~~~~~~~~~

Contact the project owner. See :ref:`g-projects` for more info.

How do I request a new project?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Any PI or faculty member may request a new project : https://idsc.miami.edu/project_request

When will my project be created?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When the allocations committee has reviewed and approved it. 
Scratch requests over 2TB can take a month for the allocations committee
to review as availability is limited.


How can I manage my Projects and Groups?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Contact IDSC ACS at hpc@ccs.miami.edu 

Software Suites
----------------

Checkout the documentation on :ref:`p-softs` & :ref:`t-softs` for more information.

What software is available?
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Software Modules from the command line: ``$ module avail``. 

How do I view my currently loaded modules?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

``$ module list``

How do I use software modules?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

See :ref:`p-modules` and :ref:`t-modules`.

May I install software?
~~~~~~~~~~~~~~~~~~~~~~~

Yes! Users are free to compile and install software in their
respective home directories by following the software’s source code or
local installation instructions. 
See our :ref:`p-soft-install` guide for more information.

**Note:** IDSC ACS does not install user software. For global installations on Pegasus, submit a Software Request to hpc@ccs.miami.edu 


How do I request global software installation?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Submit your request to hpc@ccs.miami.edu. 
We only globally install software when we receive multiple requests for
the software.

When will my global software request be approved/installed?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When a minimum of 20 users require it, software requests will be
approved. Software requests are reviewed and installed quarterly.

How can I increase Java memory?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Load the java module, then change the value of \_JAVA_OPTIONS.

::

    [username@pegasus ~]$ module load java
    [username@pegasus ~]$ echo $_JAVA_OPTIONS
    -Xmx512m
    [username@pegasus ~]$ export _JAVA_OPTIONS="-Xmx4g"

Job Scheduling
----------------------
See our :ref:`g-lsf` guide for more information.

May I run resource-intensive jobs on login nodes?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

No. Resource-intensive jobs must be submitted to LSF.

How do I submit jobs?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

With ``bsub`` (:ref:`g-lsf-commands`)

How do I check on my submitted jobs?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

With ``bjobs`` (:ref:`g-lsf-commands`)

How do I monitor job progress?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

With ``bpeek`` (:ref:`g-lsf-commands`)

Is there a limit on how many jobs I can run?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

No. Users are limited by number of simultaneous CPUs used. Individual
users can run on up to 512 CPUs at a time, projects on up to 1000 CPUs
at a time.

How can I see pending and running job counts for queues?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

With ``bqueues`` (:ref:`g-lsf-commands`)

Why is my job still pending?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Jobs wait for enough resources to satisfy requirements. When the cluster
is under heavy user load, jobs will wait longer. Use
``$ bjobs -l jobID`` to see PENDING REASONS. Check your resource
requirements for accuracy and feasibility.

The job scheduler operates under Fairshare scheduling. Fairshare
scheduling divides the processing power of the cluster among users and
queues to provide fair access to resources, so that no user or queue can
monopolize the resources of the cluster and no queue will be starved.

If your job has been pending for more than 24 hours *and is not
requesting exclusive access or all cores on a node*, you may e-mail
`hpc@ccs.miami.edu <mailto:hpc@ccs.mami.edu>`__ for assistance.

Are other users’ pending jobs slowing my job?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

No. The number of pending jobs is irrelevant to job performance in LSF.
The scheduler can handle hundreds of thousands of jobs.

How do I submit jobs to my Project?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

With the ``-P`` flag (:ref:`g-lsf`) 

How do I submit an interactive job?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

With the ``-Is -q interactive`` (:ref:`g-interactive`) 

How do I submit an interactive X11 job?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

With the ``-Is -q interactive -XF`` flags (:ref:`g-interactive`) 

Why was my job killed?
~~~~~~~~~~~~~~~~~~~~~~

Jobs are killed to protect the cluster and preserve system performance.
Common reasons include:

-  running on a login node
-  using more memory than reserved
-  using all the memory on a compute node
-  using more CPUs than reserved
-  needing more time to complete than reserved
-  using more ``/tmp`` space than available on compute nodes

See :ref:`g-lsf` for assistance with appropriate resource
reservations and :ref:`g-queues` for default wall times.


What about jobs in UNKWN state?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Re-queue your job in LSF : 

| ``$ bkill -r jobID`` 
| ``$ bkill -r jobID``   (a second time) 
| ``$ brequeue -e jobID``



GPU Resource Requests on Pegasus or Triton
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If GPU resources are not accessible to you on cluster nodes, please email the IDSC support team at:
`hpc@ccs.miami.edu <mailto:hpc@ccs.miami.edu>`_ with the following information:

- Project details
- Number of GPUs required
- Names and profile details of users who need access
- Cluster name (Pegasus or Triton)
- Principal Investigator (PI)
- User email ID

If GPU resources **are** accessible to you on cluster nodes, then you can request GPU resources by editing your LSF job script to submit to a GPU queue with the following parameters:

.. code-block:: bash

   #BSUB -q gpu_queue_name  # Example: gpu_h100
   #BSUB -gpu "num=1"


Containerization Support on Pegasus
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Docker containers are not allowed on shared resource clusters like Pegasus or Triton because they require root privileges.
Pegasus supports containerization through:

- **Apptainer (formerly Singularity)** (:ref:`Check here <p-apptainer>`)
- **Specific containerized software like RStudio** (:ref:`Check here <p-rstudio>`)

If you need a specific application containerized, please email the IDSC support team at: `hpc@ccs.miami.edu <mailto:hpc@ccs.miami.edu>`_ with your current project and detailed requirements.


Disk Quota and Storage Expansion
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- **Home storage** cannot be expanded.
- **Scratch storage** may be expanded **on a case-by-case basis**.

If 10TB or more of storage is required, users will need to purchase either **GPFS** or **CES** storage.
Check out the details on our storage services page: :ref:`s_storage` and for pricing details, refer to the following link:
`IDSC Fee Schedule FY 2026 <https://idsc.miami.edu/wp-content/uploads/2025/05/IDSC-Fee-schedule-UM-FY-2026.pdf>`_

To request additional disk space allocation, email the IDSC support team at:
`hpc@ccs.miami.edu <mailto:hpc@ccs.miami.edu>`_ with the following information:

- Current allocation details
- Required additional space
- Project details
- PI
- User email ID





