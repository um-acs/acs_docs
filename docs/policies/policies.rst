.. _policies:

IDSC ACS Policies
================

IDSC Advanced Computing Services resources are available to all University of Miami employees and students. Use of IDSC resources is governed by `University of Miami Acceptable Use Policies <http://it.miami.edu/about-umit/policies-and-procedures/>`_ in addition to IDSC ACS policies, terms, and conditions.


Accounts
--------

- To qualify for an IDSC account, you must be affiliated with the University of Miami.
- All IDSC accounts must be linked with a valid corresponding University of Miami account.
- Suspended accounts cannot submit jobs to IDSC clusters. 
- Suspended accounts will be disabled after 90 days.
- Disabled accounts cannot log into the Pegasus cluster.
- Disabled account data will be deleted after 30 days.

IDSC Links
----------------

- `IDSC Account Registration Form <https://uhealth.service-now.com/esc?id=sc_cat_item&sys_id=2528565647662610ddc5bfca116d4379>`_
- `IDSC Project Request Form <https://uhealth.service-now.com/esc?id=sc_cat_item&sys_id=1bd010ed87c58a10b2f12029dabb35d9>`_
- `IDSC Software Requests <https://uhealth.service-now.com/esc?id=sc_cat_item&sys_id=4080579787f1ee1099fd11383cbb3583>`_



Supercomputers
---------------------

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

- Users with disabled IDSC accounts must submit a request `here <https://uhealth.service-now.com/esc?id=sc_cat_item&sys_id=4080579787f1ee1099fd11383cbb3583>`_ for temporary account reactivation.


Allocations
-----------

- Active cluster users are allocated a logical **home** directory area on the cluster, PEGASUS: ``/nethome/username``, TRITON: ``/home/username`` , limited to 250GB. 
- Active projects can be allocated scratch directories:  PEGASUS: ``/scratch/projects/projectID``, TRITON: ``/scratch/projectID``, intended for compiles and run-time input & output files. 
- Disk allocations are only for data currently being processed.
- Data for running jobs must be staged exclusively in the ``/scratch`` file system. IDSC accounts staging job data in the ``/nethome`` filesystem may be suspended.
- Both **home** and **scratch** are available on all nodes in their respective clusters.
- Accounts exceeding the 250GB home limit will be suspended. Once usage is under 250GB, the account will be enabled.
- Data on /scratch may be purged after 21 days if necessary to maintain adaquate space for all accounts. 
- For both the above exceeded allocation scenarios, a member of IDSC will send a notification before this occurs. This will give you the opporutnity to move your data if needed. 

Software
----------

- Users are free to install software in their home directories on IDSC clusters. More information about installing software onto ACS systems on `ReadTheDocs <https://acs-docs.readthedocs.io/>`_ : `https://acs-docs.readthedocs.io/ <https://acs-docs.readthedocs.io/>`_
- Cluster software requests are reviewed quarterly. Global software packages are evaluated per request. 


Support 
--------

Contact our IDSC cluster and system support at the `IDSC ServiceNow Home Page <https://uhealth.service-now.com/esc?id=emp_taxonomy_topic&topic_id=a0ae36ae47a5ae10ddc5bfca116d43eb>`_ for help with connecting, software, jobs, data transfers, and more.  Please provide detailed descriptions, the paths to your job files and any outputs, the software modules you may have loaded, and your job ID when applicable.

Our ticketing systems has been migrated from RT to the ServiceNow Platform. 

You can find our new IDSC ServiceNow Home page for ticket submissions here: `IDSC ServiceNow Home Page <https://uhealth.service-now.com/esc?id=emp_taxonomy_topic&topic_id=a0ae36ae47a5ae10ddc5bfca116d43eb>`_

To request a new project: `IDSC Project Request form <https://uhealth.service-now.com/esc?id=sc_cat_item&sys_id=1bd010ed87c58a10b2f12029dabb35d9>`_

Need something new or have a general question: `IDSC - Make a Request or Inquiry form <https://uhealth.service-now.com/esc?id=sc_cat_item&sys_id=4080579787f1ee1099fd11383cbb3583>`_

Report an issue with the clusters that needs immediate attention: `IDSC - HPC Cluster: Report a Problem form <https://uhealth.service-now.com/esc?id=sc_cat_item&sys_id=ec74f27d47162290ddc5bfca116d43c4>`_

To request an IDSC account: `IDSC - Account Request form <https://uhealth.service-now.com/esc?id=sc_cat_item&sys_id=2528565647662610ddc5bfca116d4379>`_

Need to request a VM or a service for an existing one? (This form is restricted to members of HIHG and IDSC Software Engineering): `IDSC - Other Systems Support Request form <https://uhealth.service-now.com/esc?id=sc_cat_item&sys_id=f1aa9d494726ae10ddc5bfca116d43a2>`_


