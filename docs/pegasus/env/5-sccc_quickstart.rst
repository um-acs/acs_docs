SCCC HPC QuickStart Guide
=========================

The purpose of this document is to provide members of the Sylvester Comprehensive Cancer Center (SCCC) community with the basic tools necessary to access the High-Performance Computing (HPC) resources at the UM Frost Institute for Data Science and Computing (IDSC). This guide is designed as a starting point for users new to Pegasus and is intended to act as a reference to supplement the on boarding training required for all users.

How do I get started?
~~~~~~~~~~~~~~~~~~~~~

After reviewing our `Policies <https://acs-docs.readthedocs.io/policies/policies.html>`__, you will need an `SCCC Project Allocation <https://redcap.miami.edu/surveys/?s=F8MK9NMW9N>`__ with a ``pegasus_project`` resource type.  If you are submitting the request on behalf of your Lab's PI, please include their CaneID in the form's ``Project Description``. 

If you are new to Pegasus, please review our `Onboarding Training Material <https://www.youtube.com/playlist?list=PLldDLMcIa33Z38fwC6e_7YSQZtwJZLSzF>`__.

If you’re new to Linux, please review our `Linux Training Material <https://acs-docs.readthedocs.io/linux>`__.

SCCC Dedicated Queues [Proposal] 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Currently, Sylvester also does not charge for use of dedicated Sylvester HPC resources on Pegasus.  These resources are restricted to labs with allocations that have been approved by Sylvester.

We can leverage the IDSC Service Units (SU) pricing model and a Tier Subscription approach to increase the performance and utilization of Sylvester HPC dedicated resources without affecting users who have financially contributed to these resources. 

::

    (a).  Tier 1 Development [Debug] (sccc-dev queue, no charge, auto approved for all SCCC Labs)
                 - For users new to HPC, like the “IDSC Early Career Research Grant”
                 - For testing and debugging new jobs (ie. new code, new applications)
                 - Job priority significantly less than Tier 2
                 - Preemptible Jobs
                 - Max Job Runtime: 8 hours
                 - Max Cores per job, and concurrent: 16 cores per job, 32 cores per project 
                 - Max Memory per job: 128GB ram per job, 512GB ram per project (1 node)
                 - No access to the 2 Sylvester GPUs or Sylvester HPC storage
                 - Scratch Space on the local 1TB NVMe (/tmp, optimal) and Pegasus HPC Scratch 

    (b). Tier 2 General (sccc queue, auto approved for all Sylvester Labs)
                 - Job priority significantly less than Tier 3.
                 - Preemptible Jobs after 1 hours of runtime 
                 - Max Job Runtime: 48 hours
                 - Max Cores per job, and concurrent: 64 cores per job (same node), no limit per project.
                 - Max Memory per job: 512GB ram per job, no limit per project.
                 - No access to the 2 Sylvester GPUs or Sylvester HPC storage
                 - Access to Sylvester HPC storage, no access to scratch on Sylvester HPC storage

    (c). Tier 3 GPU / Big Memory* (sccc-gpu queue, Sylvester Grants, approval required)
                 - Job priority significantly less than Tier 4.
                 - Preemptible Jobs after 1 hours of runtime 
                 - Max Job Runtime: 96 hours
                 - Max Cores per job, and concurrent: 64 cores per job (same node), 1 job per project.
                 - Max Memory per job: 4TB per job and project (each of the two nodes has 4TB RAM).
                 - Access to Sylvester HPC storage, no access to scratch on Sylvester HPC storage

    (d). Tier 4 Premium (sccc-premium, lab funded nodes, Sylvester approval required) 
                 - Job priority (should only wait for other Tier 4 Jobs)
                 - Queue restricted to lab funded Sylvester nodes.
                 - Job Runtime: up to PI?
                 - Resource limitations per job: up to PI, (ie. all resources, 1024 cpu cores, 8TB shared ram) 
                 - Access to Sylvester GPU queue (2 nodes, 128 cpu cores, 8TB shared ram, 2 Nvidia A100)  
                 - Full access to Sylvester HPC storage


What are specs of HPC Nodes?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Triton (96 nodes)** ::

    - OS:   CentOS 7.9, ppc64le
    - CPU:  2 x IBM Power9 (40 cores/node, 3840 cores total)
    - RAM:  16 x 16GiB RDIMM DDR4 2666MHz ECC (256GiB/node, 6.4GB/core)
    - GPU:  2 x Nvidia V100-SXM2 (16GB GPU RAM) 
    - NET:  100Gbps Infiniband (IB), 1Gbps Ethernet
    - Disk: 2 x 1.92TB Micron 5100PRO SSD (RAID1, 1080MBps/1040MBps Seq Read/Write, 186K/74K IOPS)


**Pegasus Compute (350 nodes)** ::

    - OS:   CentOS 7.6, x86_64
    - CPU:  16c/node (for a total of 4800 CPU-cores)
    - RAM:  64GiB nodes (4GiB/core, for a total of 22400GiB)
    - RAM:  256GiB nodes (16GiB/core, for a total of 4096GiB)
    - NET:  56Gbps Infiniband, 1 Gbps Ethernet 
    - Disk: Stateless (ramdisk)


**Pegasus SCCC Dedicated Compute (16 nodes)** ::

    - OS:   CentOS 7.9, x86_64 
    - CPU:  2 x Intel Xeon Gold 6338 CPU @ 2.00GHz (64 cores/node, 1024 cores total)
    - RAM:  16 x 32GiB RDIMM DDR4 3200MHz ECC (512GiB/node, 8192GiB RAM total) 
    - Net:  100Gbps Infiniband, 10Gbps Ethernet, 
    - Disk: 960GiB Samsung PM9A3 NVMe (6500MBps/1500MBps Seq Read/Write, 580K/70K IOPS)  


**Pegasus SCCC Dedicated Big Memory GPU (2 nodes)** ::

    - OS:   CentOS 7.9, x86_64  
    - CPU:  2 x Intel Xeon Gold 6338 CPU @ 2.00GHz (64 cores/node, 128 cores total)
    - RAM:  32 x 128GiB RDIMM DDR4 3200MHz ECC (4096GB/node, 8192GiB RAM total)
    - GPU:  1 x Nvidia A100 (80GB GPU RAM)  
    - Net:  100Gbps Infiniband, 10Gbps Ethernet, 
    - Disk: 960GiB Samsung PM9A3 NVMe (6500MBps/1500MBps Seq Read/Write, 580K/70K IOPS) 


How do I reset my IDSC password?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Via the `IDSC Password Management <https://idsc.miami.edu/ccs-account>`__ tool.  You will need to be connected to the **University's Secure Network** to access this tool and all SCCC HPC Resources.

How do I access the Secure Network remotely?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Via the `University of Miami's VPN <https://www.it.miami.edu/a-z-listing/virtual-private-network/index.html>`__.

How do I run Nextflow on SCCC HPC resources?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

`Running Nextflow (nf-core/sarek) <https://acs-docs.readthedocs.io/pegasus/soft/nextflow.html>`__
