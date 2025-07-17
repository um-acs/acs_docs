Pegasus FAQs - Frequently Asked Questions
=========================================

Detailed information for FAQ topics is available here and in `IDSC ACS Policies <https://acs-docs.readthedocs.io/policies/policies.html#policies>`__

If you are new to Pegasus and HPC clusters, review this documentation on
the Pegasus system, the job scheduler, and modularized software. 

.. note :: IDSC ACS does not install, provide support for, or provide documentation on how to code in your preferred software. ACS documentation contains information on using software in a Linux cluster environment.


Pegasus Projects
----------------

`Projects on Pegasus <https://acs-docs.readthedocs.io/pegasus/env/3-projects.html#projects>`__

How do I join a project?
~~~~~~~~~~~~~~~~~~~~~~~~

Contact the project owner. 

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

Pegasus Software
----------------

`Software on Pegasus <https://acs-docs.readthedocs.io/pegasus/soft/1-modules.html#p-soft>`__

What software is available?
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Software Modules from the command line: ``$ module avail``

How do I view my currently loaded modules?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

``$ module list``

How do I use software modules?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

`Software on Pegasus <https://acs-docs.readthedocs.io/pegasus/soft/1-modules.html#p-soft>`__

May I install software?
~~~~~~~~~~~~~~~~~~~~~~~

Yes! Pegasus users are free to compile and install software in their
respective home directories by following the software’s source code or
local installation instructions. See our `Software Installation <https://acs-docs.readthedocs.io/pegasus/soft/4-install.html#soft-install>`__
 guide for more information.


.. note :: IDSC ACS does not install user software. For global installations on Pegasus, submit a Software Request to hpc@ccs.miami.edu 


How do I request global software installation on Pegasus?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Submit your request to hpc@ccs.miami.edu 

We only globally install software when we receive multiple requests for
the software.

When will my global software request be approved/installed?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When a minimum of 20 users require it, software requests will be
approved. Software requests are reviewed and installed quarterly.

How can I increase Java memory on Pegasus?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Load the java module, then change the value of \_JAVA_OPTIONS.

::

    [username@pegasus ~]$ module load java
    [username@pegasus ~]$ echo $_JAVA_OPTIONS
    -Xmx512m
    [username@pegasus ~]$ export _JAVA_OPTIONS="-Xmx4g"

Pegasus Job Scheduling
----------------------

`Scheduling Jobs <https://acs-docs.readthedocs.io/pegasus/jobs/1-lsf.html#p-jobs>`__

May I run resource-intensive jobs on Pegasus login nodes?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

No. Resource-intensive jobs must be submitted to LSF.

How do I submit jobs to Pegasus?
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

How can I see pending and running job counts for Pegasus queues?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

With ``bqueues`` `command <https://acs-docs.readthedocs.io/pegasus/jobs/3-commands.html#lsf-commands>`__ : `LSF <https://acs-docs.readthedocs.io/pegasus/jobs/1-lsf.html#p-jobs>`__

Why is my job still pending?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Jobs wait for enough resources to satisfy requirements. When the cluster
is under heavy user load, jobs will wait longer. Use
``$ bjobs -l jobID`` to see PENDING REASONS. Check your resource
requirements for accuracy and feasibility.

The Pegasus job scheduler operates under Fairshare scheduling. Fairshare
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

