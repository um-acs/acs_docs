# Pegasus FAQs - Frequently Asked Questions

Detailed information for FAQ topics is available here and in our [AC
Policies](https://ccs.miami.edu/ac/policies) webpage.

**How do I reset my CCS password?**

Via the CCS Portal: <https://portal.ccs.miami.edu> Click on "Reset
Password"

**How do I connect to CCS resources from off-site?**

To access CCS resources while offsite, [open a VPN connection
first](env/p_env_2-connect.md). CCS does not administer VPN accounts.

## Pegasus Projects

[Projects on Pegasus](env/p_env_4-projects.md)

**How do I join a project?**

Contact the project owner. Details can be found on the CCS Portal:
<https://portal.ccs.miami.edu/forms-access/>

**How do I request a new project?**

Any PI or faculty member may request a new project via the CCS Portal:
<https://portal.ccs.miami.edu/accounts/new/group/>

**When will my project be created?**

When the allocations committee has reviewed and approved it. Check your
request status via the CCS Portal under My Pegasus -\> My Requests.
Scratch requests over 2TB can take a month for the allocations committee
to review as availability is limited.

**How do projects work?**

[Projects on Pegasus](env/p_env_4-projects.md), [CCS Portal
Projects](https://portal.ccs.miami.edu/forms-access/)

**How can I manage my Projects and Groups?**

Manage owned Projects and Groups via the CCS Portal:
<https://portal.ccs.miami.edu> Click on My Pegasus -\> My Projects or My
Groups See [CCS Portal
Projects](https://portal.ccs.miami.edu/forms-access/) for more
information.

  

## Pegasus Software

[Software on Pegasus](soft/)

**What software is available?**

Software Modules list on the CCS Portal:
<https://portal.ccs.miami.edu/resources/software/> Software Modules from
the command line: `$ module avail`

**How do I view my currently loaded modules?**

`$ module list`

**How do I use software modules?**

[Software on Pegasus](/ac/docs/#software-peg)

**How do I request global software installation on Pegasus?** Request
new global software via the CCS Portal:
<https://portal.ccs.miami.edu/resources/soft/new>

**When will my global software request be approved/installed?**

When a minimum of 20 users require it. Software requests are reviewed
quarterly.

**How can I increase Java memory on Pegasus?**

Load the java module, then change the value of \_JAVA\_OPTIONS.

    [username@pegasus ~]$ module load java
    [username@pegasus ~]$ echo $_JAVA_OPTIONS
    -Xmx512m
    [username@pegasus ~]$ export _JAVA_OPTIONS="-Xmx4g"

  

## Pegasus Job Scheduling

[Scheduling Jobs](jobs/)

**May I run resource-intensive jobs on Pegasus login nodes?**

No. Resource-intensive jobs must be submitted to LSF.

**How do I submit jobs to Pegasus?**

With `bsub` [command](jobs/p_jobs_3-commands.md):
[LSF](jobs/p_jobs_1-lsf.md)

**How do I check on my submitted jobs?**

With `bjobs` [command](jobs/p_jobs_3-commands.md):
[LSF](jobs/p_jobs_1-lsf.md)

**How do I monitor job progress?**

With `bpeek` [command](jobs/p_jobs_3-commands.md):
[LSF](jobs/p_jobs_1-lsf.md)

**Is there a limit on how many jobs I can run?**

No. Users are limited by number of simultaneous CPUs used. Individual
users can run on up to 512 CPUs at a time, projects on up to 1000 CPUs
at a time.

**How can I see pending and running job counts for Pegasus queues?**

With `bqueues` [command](jobs/p_jobs_3-commands.md):
[LSF](jobs/p_jobs_1-lsf.md)

**Why is my job still pending?**

Jobs wait for enough resources to satisfy requirements. When the cluster
is under heavy user load, jobs will wait longer. Use `$ bjobs -l jobID`
to see PENDING REASONS. Check your resource requirements for accuracy
and feasibility.

If your job has been pending for more than 24 hours *and is not
requesting exclusive access or all cores on a node*, you may e-mail
[hpc@ccs.miami.edu](mailto:hpc@ccs.mami.edu "AC%20Support") for
assistance.

**Are other users' pending jobs slowing my job?**

No. The number of pending jobs is irrelevant to job performance in LSF.
The scheduler can handle hundreds of thousands of jobs.

**How do I submit jobs to my Project?**

With the `-P` flag: [LSF](jobs/p_jobs_1-lsf.md)

**How do I submit an interactive job?**

With the `-Is -q interactive` flags: [LSF
Interactive](jobs/p_jobs_5-interactive.md)

**How do I submit an interactive X11 job?**

With the `-Is -q interactive -XF` flags: [LSF
X11](jobs/p_jobs_5-interactive.md)

**Why was my job killed?**

Jobs are killed to protect the cluster and preserve system performance.
Common reasons include:

  - running on a login node
  - using more memory than reserved
  - using all the memory on a compute node
  - using more CPUs than reserved
  - needing more time to complete than reserved
  - using more `/tmp` space than available on compute nodes

ee [LSF](jobs/p_jobs_1-lsf.md) for assistance with appropriate resource
reservations and [Pegasus Queues](jobs/p_jobs_2-queues.md) for default
wall times.
