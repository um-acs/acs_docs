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

See :ref:`g-modules`.

May I install software?
~~~~~~~~~~~~~~~~~~~~~~~

Yes! Users are free to compile and install software in their
respective home directories by following the software’s source code or
local installation instructions. 

See our :ref:`p-soft-install` and 


`Software Installation <https://acs-docs.readthedocs.io/pegasus/soft/4-install.html#soft-install>`__ guide for more information.


.. note :: IDSC ACS does not install user software. For global installations on Pegasus, submit a Software Request to hpc@ccs.miami.edu 


How do I request global software installation?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Submit your request to hpc@ccs.miami.edu 

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

`Scheduling Jobs <https://acs-docs.readthedocs.io/pegasus/jobs/1-lsf.html#p-jobs>`__

May I run resource-intensive jobs on login nodes?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

No. Resource-intensive jobs must be submitted to LSF.

How do I submit jobs?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

With ``bsub`` `command <https://acs-docs.readthedocs.io/pegasus/jobs/3-commands.html#lsf-commands>`__ : `LSF <https://acs-docs.readthedocs.io/pegasus/jobs/1-lsf.html#p-jobs>`__

How do I check on my submitted jobs?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

With ``bjobs`` `command <https://acs-docs.readthedocs.io/pegasus/jobs/3-commands.html#lsf-commands>`__ : `LSF <https://acs-docs.readthedocs.io/pegasus/jobs/1-lsf.html#p-jobs>`__

How do I monitor job progress?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

With ``bpeek`` `command <https://acs-docs.readthedocs.io/pegasus/jobs/3-commands.html#lsf-commands>`__ : `LSF <https://acs-docs.readthedocs.io/pegasus/jobs/1-lsf.html#p-jobs>`__

Is there a limit on how many jobs I can run?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

No. Users are limited by number of simultaneous CPUs used. Individual
users can run on up to 512 CPUs at a time, projects on up to 1000 CPUs
at a time.

How can I see pending and running job counts for queues?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

With ``bqueues`` `command <https://acs-docs.readthedocs.io/pegasus/jobs/3-commands.html#lsf-commands>`__ : `LSF <https://acs-docs.readthedocs.io/pegasus/jobs/1-lsf.html#p-jobs>`__

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

With the ``-P`` flag : `LSF jobs <https://acs-docs.readthedocs.io/pegasus/jobs/1-lsf.html#p-jobs>`__

How do I submit an interactive job?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

With the ``-Is -q interactive`` flags : `LSF interactive jobs <https://acs-docs.readthedocs.io/pegasus/jobs/5-interactive.html#p-interactive>`__

How do I submit an interactive X11 job?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

With the ``-Is -q interactive -XF`` flags : `LSF interactive jobs <https://acs-docs.readthedocs.io/pegasus/jobs/5-interactive.html#p-interactive>`__

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

See :ref:`LSF <p-jobs>` for assistance with appropriate resource
reservations and `Pegasus Queues <https://acs-docs.readthedocs.io/pegasus/jobs/2-queues.html#p-queues>`__ for default wall
times.


What about jobs in UNKWN state?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Re-queue your job in LSF : 

| ``$ bkill -r jobID`` 
| ``$ bkill -r jobID``   (a second time) 
| ``$ brequeue -e jobID``







 
How can I request gpu Resources in Pegasus or Triton
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

“If GPU resources are not accessible to you on cluster nodes, 
then please email the IDSC support team at: <a href='mailto:hpc@ccs.miami.edu'>hpc@ccs.miami.edu</a> 
with your project details and number of GPU’s  required , who needs access to it profile details, 
cluster name Pegasus or Triton, PI ,Mail ID etc.
 
If GPU resources are accessible to you on cluster nodes, 
then GPU resources can be requested by editing your LSF job script to submit to a gpu queue 
with the following parameters #BSUB -q gpu_queue_name or gpu_h100 
#BSUB -gpu "num=1"
 
does Pegasus allowed docker container to run on it or Pegasus apptainer singularity containers
 
“In general, docker container needs root permission to run application, so docker is not allowed in shared resources clusters on Pegasus or Triton.
Pegasus Supports containerization via Apptainer (Singularity) and specific containerized software like RStudio.
<a href='https://acs-docs.readthedocs.io/pegasus/Singularity/apptainerinfo.html'> More information can be found Pegasus Apptainer containers </a>
<a href='https://acs-docs.readthedocs.io/pegasus/soft/RStudio.html#rstudio-on-pegasus'> for RStudio container </a>
 
If you need any specific application request inters of containers, please email the IDSC support team at: <a href='mailto:hpc@ccs.miami.edu'>hpc@ccs.miami.edu</a> with your current project and further requirements."
 
how can I expand increase my disk quotas space or home storage or Scratch storage space
“Home storage cannot be expanded.
Scratch storage can be expanded out of courtesy and only in a case-by-case scenario. They will need to message us directly and we will review the request.
If the user requires disk space10T of storage or more, they will need to purchase either GPFS or CES storage.
<a href='https://acs-docs.readthedocs.io/services/storage.html'> Storage Services </a>
 
<a href='https://idsc.miami.edu/wp-content/uploads/2025/05/IDSC-Fee-schedule-UM-FY-2026.pdf'> Pricing details </a>
For additional disk space allocation, please email the IDSC support team at: <a href='mailto:hpc@ccs.miami.edu'>hpc@ccs.miami.edu</a> with your current allocation details and required space along with project details, PI, mail ID information etc.”
Introduction to Apptainer on Pegasus — acs_docs  documentation
 
let me know if any modification Nick and Rahman could you add it FAQ. Thanks 
 
Rahman remove this only from above  "They will need to message us directly and we will review the request." 
 