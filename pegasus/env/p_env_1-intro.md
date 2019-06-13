# Pegasus Environment Introduction

The Pegasus cluster is the University of Miami's 350-node
high-performance supercomputer, available to all University of Miami
employees and students. Pegasus resources such as hardware (login and
compute nodes) and system software are shared by all users.

***Before running commands, submitting jobs, or using software on the
Pegasus supercomputer***, understand our core [CCS AC
Policies](https://ccs.miami.edu/ac/policies).

    Details:              Pegasus Supercomputer
    Credentials:          CCS Account
    Access & Allocations: Policies 
    Operating System:     CentOS 6.5 
    Default Shell:        Bash
    Data Transfer:        SCP and SFTP

We encourage new users to carefully read our documentation on Pegasus
and available resources, especially users who may be unfamiliar with
high-performance computing, Unix-based systems, or batch job scheduling.
Understanding what your jobs do on the cluster helps keep Pegasus
running smoothly for everyone.

  

  - **Do not run resource-intensive jobs on the Pegasus login nodes.**
    Submit your production jobs to LSF, and use the [interactive
    queue](../jobs/p_jobs_2-queues.md) and [LSF Job
    Scripts](../jobs/p_jobs_4-scripts.md) below. Jobs with insufficient
    resource allocations interfere with cluster performance and the CCS
    account responsible for those jobs may be suspended.
  - **Stage data for running jobs exclusively in the `/scratch` file
    system,** which is optimized for fast data access. Any files used as
    input for your jobs must first be transferred to /scratch. The
    /nethome file system is optimized for mass data storage and is
    therefore slower-access. Using /nethome while running jobs degrades
    the performance of the entire system and the CCS account responsible
    may be suspended.

**[Connecting to Pegasus](p_env_2-connect.md)**: To access the Pegasus
supercomputer, open a secure shell (SSH) connection to
`pegasus.ccs.miami.edu` and log in with your active CCS account. Once
authenticated, you should see the Pegasus welcome message -- ***which
includes links to Pegasus documentation*** and information about your
disk quotas -- then the Pegasus command prompt.

    ------------------------------------------------------------------------------
                         Welcome to the Pegasus Supercomputer
               Center for Computational Science, University of Miami 
    ------------------------------------------------------------------------------
    ...
    ...
    ...
    --------------------------Disk Quota------------------------------
    filesystem | project    | used(GB)   | quota (GB) | Util(%)   
    ============================================================
    nethome    | user       | 0.76       | 250.00     |    0%
    scratch    | projectID  | 93.32      | 20000.00   |    0%
    ------------------------------------------------------------------
         Files on /scratch are subject to purging after 21 days       
    ------------------------------------------------------------------
    [username@pegasus ~]$

## Pegasus Filesystems

The landing location on Pegasus is your **home** directory, which
corresponds to `/nethome/username`. As shown in the Welcome message,
Pegasus has two parallel file systems available to users: **nethome**
and **scratch**.

**Do not** stage job data in the `/nethome` file system. If your jobs
read files from Pegasus, put those files exclusively in the `/scratch`
file system.

| File System | Description                       | Notes                                                                                                             |
| ----------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `/nethome`  | permanent, quota'd, not backed-up | directories are limited to 250GB and intended primarily for basic account information, source codes, and binaries |
| `/scratch`  | high-speed **purged** storage     | directories should be used for compiles and run-time input & output files                                         |

## Pegasus Environment Links

**[Resource allocations](p_env_4-projects.md)** : Cluster resources,
including CPU hours and scratch space, are allocated to projects. To
access resources, all CCS accounts must belong to a project with active
resource allocations. Join projects by contacting Principal
Investigators (PIs) directly.

**[Transferring files](p_env_3-transfer.md)** : Whether on **nethome**
or **scratch**, transfer data with secure copy (SCP) and secure FTP
(SFTP) between Pegasus file systems and local machines. Use Pegasus
login nodes for these types of transfers. See the link for more
information about transferring large amounts of data from systems
outside the University of Miami.

**[Software on Pegasus](../soft/p_soft_1-modules.md)** : To use system
software on Pegasus, first load the software using the **module load**
command. Some modules are loaded automatically when you log into
Pegasus. The modules utility handles any paths or libraries needed for
the software to run. You can view currently loaded modules with **module
list** and check available software with **module avail *package***.

**Do not** run production jobs on the login nodes. Once your preferred
software module is loaded, submit a job to the Pegasus job scheduler to
use it.

## Pegasus Job Submissions

**[Job submissions](../jobs/p_jobs_1-lsf.md)** : Pegasus cluster compute
nodes are the workhorses of the supercomputer, with significantly more
resources than the login nodes. Compute nodes are grouped into
**queues** and their available resources are assigned through scheduling
software (LSF). To do work on Pegasus, submit either a **batch** or an
**interactive** job to LSF for an appropriate queue.

In shared-resource systems like Pegasus, you must tell the LSF scheduler
how much memory, CPU, time, and other resources your jobs will use while
they are running. If your jobs use more resources than you requested
from LSF, those resources may come from other users' jobs (and vice
versa). This not only negatively impacts everyone's jobs, it degrades
the performance of the entire cluster. If you do not know the resources
your jobs will use, benchmark them in the **debug** queue.

To test code interactively or install extra software modules at a prompt
(such as with Python or R), submit an interactive job to the interactive
queue in LSF. This will navigate you to a compute node for your work,
and you will be returned to a login node upon exiting the job. Use the
interactive queue for resource-intensive command-line jobs such as sort,
find, awk, sed, and others.
