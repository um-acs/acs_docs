.. _p-env-intro: 

Pegasus Environment Introduction
================================

The Pegasus cluster is the University of Miami’s 73-node
high-performance supercomputer (and counting), available to all University of Miami
employees and students. Pegasus resources such as hardware (login and
compute nodes) and system software are shared by all users.

.. tip:: **Before** running commands, submitting jobs, or using software on the Pegasus supercomputer, understand our core `Policies <https://acs-docs.readthedocs.io/policies/policies.html#policies>`__.

::

    Details:              Pegasus Supercomputer
    Credentials:          IDSC Account
    Access & Allocations: Policies 
    Operating System:     Rocky Linux 8.8
    Default Shell:        Bash
    Data Transfer:        SCP and SFTP

We encourage new users to carefully read our documentation on Pegasus
and available resources, especially users who may be unfamiliar with
high-performance computing, Unix-based systems, or batch job scheduling.
Understanding what your jobs do on the cluster helps keep Pegasus
running smoothly for everyone.

-  **Do not run resource-intensive jobs on the Pegasus login nodes.**
   Submit your production jobs to LSF, and use the `interactive queue <https://acs-docs.readthedocs.io/pegasus/jobs/2-queues.html#p-queues>`__ and `LSF Job Scripts <https://acs-docs.readthedocs.io/pegasus/jobs/4-scripts.html#lsf-scripts>`__ below. Jobs with insufficient
   resource allocations interfere with cluster performance and the IDSC
   account responsible for those jobs may be suspended.
-  **Stage data for running jobs exclusively in the** ``/scratch`` **file
   system,** which is optimized for fast data access. Any files used as
   input for your jobs must first be transferred to /scratch. The
   /nethome file system is optimized for mass data storage and is
   therefore slower-access. Using /nethome while running jobs degrades
   the performance of the entire system and the IDSC account responsible
   may be suspended.
-  **Include your projectID in your job submissions.** Access to IDSC Advanced Computing resources is managed on a project basis. This allows us to better support interaction between teams (including data sharing) at the University of Miami regardless of group, school, or campus.  Any University of Miami faculty member or Principal Investigator (PI) can request a new project. All members of a project share that project’s resource allocations.  More on `Projects here <https://acs-docs.readthedocs.io/pegasus/env/3-projects.html#projects>`__.

`Connecting to Pegasus <https://acs-docs.readthedocs.io/services/1-access.html#ssh>`__: To access the Pegasus
supercomputer, open a secure shell (SSH) connection to
``pegasus2.ccs.miami.edu`` and log in with your active IDSC account. Once
authenticated, you should see the Pegasus welcome message – ***which
includes links to Pegasus documentation*** and information about your
disk quotas – then the Pegasus command prompt.

::

    ------------------------------------------------------------------------------
                     Welcome to the Pegasus Supercomputer
           Frost Institute for Data Science & Computing, University of Miami 
    ------------------------------------------------------------------------------
    
                  ** Unauthorized use/access is prohibited. **
    
    If you log on to this computer system, you acknowledge your awareness
    of and concurrence with the University Use Policy. The University will prosecute 
    violators to the full extent of the law.
    
    ACS Usage Policies: https://acs-docs.readthedocs.io/policies 
    ______________________________________________________________________________
    
    Questions and Problem Reports:
    
    -->  hpc@ccs.miami.edu
    
    If you are new to Pegasus and high-performance compute clusters, 
    start with our documentation and user guides.
    
    Documentation  :  https://acs-docs.readthedocs.io/
    Pegasus Cluster:  https://acs-docs.readthedocs.io/pegasus
    ______________________________________________________________________________
    
    Welcome to Pegasus.  Before use, please read these important system notes:
    
    --> Pegasus is currently running the LSF resource manager to 
        schedule all compute resources. 
    
        See "man bsub", our online resources, and the LSF 9.1.1 user guide
        for more detailed information.
        
        https://acs-docs.readthedocs.io/pegasus/jobs
    
    
    --> You may compile software and test commands on login nodes.  
        However, any jobs exceeding 30 minutes of run time or using 
        excessive resources on login nodes will be terminated and 
        the user's account may be suspended.
    
    --> To see which software packages are available, issue command: 
             module avail
    
        To load a module, issue command: 
             module load <module name>
    
        See "module help" or consult ACS Documentation & User Guides:
             https://acs-docs.readthedocs.io/pegasus/soft
    
    --> Pegasus has two parallel file systems available to users: 
             /nethome (permanent, quota'd, not backed-up)
             /scratch (high-speed *purged* storage)
    
        IMPORTANT:  *NO* backups are performed on Pegasus file systems
       
        Files on /scratch are subject to purging after 21 days. No critical data should be kept on /scratch
       
        See ACS Policies for more information
             https://acs-docs.readthedocs.io/policies
    
    
    If you have any questions or concerns, please do not hesitate to reach out to us at hpc@ccs.miami.edu


Pegasus Environment Links
-------------------------

`Resource Allocations <https://acs-docs.readthedocs.io/pegasus/env/3-projects.html#projects>`__ : Cluster resources,
including CPU hours and scratch space, are allocated to projects. To
access resources, all IDSC accounts must belong to a project with active
resource allocations. Join projects by contacting Principal
Investigators (PIs) directly.

`Transferring Files <https://acs-docs.readthedocs.io/services/2-transfer.html>`__ : Whether on **nethome** or
**scratch**, transfer data with secure copy (SCP) and secure FTP (SFTP)
between Pegasus file systems and local machines. Use Pegasus login nodes
for these types of transfers. See the link for more information about
transferring large amounts of data from systems outside the University
of Miami.

`Software on Pegasus <https://acs-docs.readthedocs.io/pegasus/soft/1-modules.html#p-soft>`__ : To use system
software on Pegasus, first load the software using the **module load**
command. Some modules are loaded automatically when you log into
Pegasus. The modules utility handles any paths or libraries needed for
the software to run. You can view currently loaded modules with ``module
list`` and check available software with ``module avail package``.

.. warning :: **Do not** run production jobs on the login nodes. 

Once your preferred software module is loaded, submit a job to the Pegasus job scheduler to use it.

Pegasus Job Submissions
-----------------------

`Job Submissions <https://acs-docs.readthedocs.io/pegasus/jobs/1-lsf.html#p-jobs>`__ : Pegasus cluster compute
nodes are the workhorses of the supercomputer, with significantly more
resources than the login nodes. Compute nodes are grouped into
**queues** and their available resources are assigned through scheduling
software (LSF). To do work on Pegasus, submit either a **batch** or an
**interactive** job to LSF for an appropriate queue.

In shared-resource systems like Pegasus, you must tell the LSF scheduler
how much memory, CPU, time, and other resources your jobs will use while
they are running. If your jobs use more resources than you requested
from LSF, those resources may come from other users' jobs (and vice
versa). This not only negatively impacts everyone’s jobs, it degrades
the performance of the entire cluster. If you do not know the resources
your jobs will use, benchmark them in the **debug** queue.

To test code interactively or install extra software modules at a prompt
(such as with Python or R), submit an interactive job to the interactive
queue in LSF. This will navigate you to a compute node for your work,
and you will be returned to a login node upon exiting the job. Use the
interactive queue for resource-intensive command-line jobs such as sort,
find, awk, sed, and others.
