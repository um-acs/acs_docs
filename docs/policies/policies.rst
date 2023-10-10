.. _policies:

IDSC ACS Policies
================

IDSC Advanced Computing Services resources are available to all University of Miami employees and students. 
The use of IDSC resources is governed by 
`University of Miami Acceptable Use Policies <http://it.miami.edu/about-umit/policies-and-procedures/>`_ 
in addition to IDSC ACS policies, terms, and conditions.


Accounts
--------

- To qualify for an IDSC account, you must be affiliated with the University of Miami.
- All IDSC accounts must be linked with a valid corresponding University of Miami account.
- Suspended accounts cannot submit jobs to IDSC clusters. 
- Suspended accounts will be disabled after **90** days.
- Disabled accounts cannot log into the Pegasus cluster.
- Disabled account data will be deleted after **30** days.

Handy IDSC Links
----------------

- `IDSC Account Registration Form <https://idsc.miami.edu/IDSC_Account_Registration>`_
- `IDSC Project Request Form <https://idsc.miami.edu/project_request>`_
- `IDSC Software Requests : e-mail IDSC <mailto:hpc@ccs.miami.edu>`_


Supercomputers
--------------

- All users of IDSC supercomputers are required to have an IDSC account.
- All SSH sessions are closed automatically after 30 minutes of inactivity.
- No backups are performed on cluster file systems.
- IDSC does not alter user files.
- Jobs running on clusters may be terminated for:
  
  - using excessive resources or exceeding 30 minutes of CPU time on login nodes
  - failing to reserve appropriate LSF resources
  - backgrounding LSF processes with the & operator
  - running on inappropriate LSF queues
  - running from data on ``/nethome``
    
  The IDSC account responsible for those jobs may be suspended.

- Users with disabled IDSC accounts must submit a request to 
`hpc@ccs.miami.edu <mailto:hpc@ccs.miami.edu>`_ for temporary account reactivation.


Allocations
-----------

- Active cluster users are allocated a logical **home** directory area on the cluster, 
on PEGASUS: ``/nethome/username``, and on TRITON: ``/home/username`` , limited to 250GB. 
- Active projects can be allocated scratch directories:  on PEGASUS: ``/scratch/projects/projectID``,
and on TRITON: ``/scratch/projectID``, intended for compiles and run-time input & output files. 
- Disk allocations are only for data currently being processed.
- Data for running jobs must be staged exclusively in the ``/scratch`` file system. 
IDSC accounts staging job data in the ``/nethome`` filesystem may be suspended.
- Both **home** and **scratch** are available on all nodes in their respective clusters.
- Accounts exceeding the 250GB home limit will be suspended. Once usage is under 250GB, the account will be enabled.
- Data on /scratch may be purged after 21 days if necessary to maintain adaquate space for all accounts. 
- For both the above exceeded allocation scenarios, a member of IDSC will send a notification 
before this occurs. This will give you the opporutnity to move your data if needed. 

Software
----------

- Users are free to install software in their home directories on IDSC clusters. 
More information about installing software onto ACS systems on 
`ReadTheDocs <https://acs-docs.readthedocs.io/>`_ : `https://acs-docs.readthedocs.io/ <https://acs-docs.readthedocs.io/>`_
- Cluster software requests are reviewed quarterly. Global software packages are evaluated per request. 


Support 
--------

Contact our IDSC cluster and system support team via email to `IDSC team (hpc@ccs.miami.edu) <mailto:hpc@ccs.miami.edu>`_ 
for help with connecting, software, jobs, data transfers, and more.  
Please provide detailed descriptions, the paths to your job files and any outputs, the software modules you may have loaded, 
and your job ID when applicable.

Suggestions:

- computer and operating system you are using
- your CCS account ID and the cluster you are using 
- complete path to your job script file, program, or job submission
- complete path to output files (if any)
- error message(s) received
- module(s) loaded ($ module list)
- whether this job ran previously and what has changed since it last worked
- steps you may have already taken to address your issues
