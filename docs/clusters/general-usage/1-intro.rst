Environment Overview
====================

Triton Supercomputer
^^^^^^^^^^^^^^^^^^^^

The **Triton** cluster consists of 10 `IBM POWER System AC922 <https://www.ibm.com/us-en/marketplace/power-systems-ac922>`__ compute nodes (with more on the way). Each node includes **two NVIDIA Tesla V100 GPUs** and is built on the **Power9 architecture**, optimized for **data-intensive workloads** and **high-performance deep learning training**.

::

    System:               Triton Supercomputer
    Architecture:         IBM Power9
    GPUs:                 NVIDIA Tesla V100 (2 per node)
    Operating System:     Red Hat Enterprise Linux 8.6
    Default Shell:        Bash
    Access Requirements:  IDSC Account
    Data Transfer:        SCP, SFTP
    Target Workloads:     Deep Learning(GPU Heavy)


Pegasus Supercomputer
^^^^^^^^^^^^^^^^^^^^^

The **Pegasus** cluster is the University of Miami’s flagship high-performance computing system, currently featuring **73+ compute nodes**. Pegasus resources—both hardware and software—are shared among all authorized University of Miami users.


::

    System:               Pegasus Supercomputer
    Architecture:         x86_64
    GPUs:                 -
    Operating System:     Rocky Linux 8.8
    Default Shell:        Bash
    Access Requirements:  IDSC Account
    Data Transfer:        SCP, SFTP
    Target Workloads:     General HPC



.. tip::

   Before working on **Pegasus** or **Triton**, please review our official `usage policies <https://acs-docs.readthedocs.io/policies/policies.html#policies>`__.



Important Usage Guidelines
--------------------------

- **Do not run resource-intensive jobs on login nodes.**  
  Use the `LSF batch scheduler <https://acs-docs.readthedocs.io/pegasus/jobs/4-scripts.html#lsf-scripts>`__ or the `interactive queue <https://acs-docs.readthedocs.io/pegasus/jobs/2-queues.html#p-queues>`__ instead. Login node misuse may result in account suspension.

- **Use the ``/scratch`` file system for job data.**  
  Input/output files must be staged in ``/scratch``, which is optimized for high-throughput I/O. Avoid using ``/nethome`` when using ``Pegasus`` during job execution—it can slow down the entire cluster and may result in account restrictions.

- **Include your project ID when submitting jobs.**  
  Access to IDSC resources is managed on a per-project basis. This facilitates team collaboration and data sharing across departments. Learn more on the `Projects page <https://acs-docs.readthedocs.io/pegasus/env/3-projects.html#projects>`__.
