Sylvester HPC QuickStart Guide
==============================

The purpose of this document is to provide members of the Sylvester Comprehensive Cancer Center community with the basic tools necessary to access the High-Performance Computing (HPC) resources at the UM Frost Institute for Data Science and Computing (IDSC). This guide is designed as a starting point for users new to Pegasus and is intended to act as a reference to supplement the on boarding training required for all users.

How do I get started?
---------------------

After reviewing our `Policies <https://acs-docs.readthedocs.io/policies/policies.html>`__, you will need a Sylvester Project Allocation.  You can submit a `Sylvester Project Allocation Request <https://umiami.qualtrics.com/jfe/form/SV_dgMjKPBxPuIt9ci>`__. 

To join an existing Project, submit a `IDSC Account Request <https://uhealth.service-now.com/esc?id=sc_cat_item&sys_id=2528565647662610ddc5bfca116d4379>`__, with the Project ID.

If you are new to Pegasus, please review our `Onboarding Training Material <https://www.youtube.com/playlist?list=PLldDLMcIa33Z38fwC6e_7YSQZtwJZLSzF>`__.

If you’re new to Linux, please review our `Linux Training Material <https://acs-docs.readthedocs.io/linux/README.html>`__.

Sylvester Utilization
---------------------

For access to the `Sylvester Utilization Dashboard <http://prometheus.idsc.miami.edu:3000/d/WZGTYp0Sz/sccc-cluster-dashboard?orgId=1>`__ 
please submit a ticket through `here <https://uhealth.service-now.com/esc?id=sc_cat_item&sys_id=4080579787f1ee1099fd11383cbb3583>`_


Sylvester Dedicated HPC Queues 
------------------------------

We can leverage the `IDSC Service Units (SU) pricing model <https://idsc.miami.edu/service-unit-match/>`__ and a **Tier Subscription** approach to increase the **performance** and **utilization** of Sylvester HPC dedicated resources while maintaining high availability for users who have financially contributed to these dedicated resources. 

HPC Storage
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
- Each user may utilize up to 250 GB (50,000 files) of GPFS home space.
- Each project may utilize up to 2T (400,000 files) of GPFS scratch space.
- Each project may utilize up to 2T (400,000 files) of GPFS Sylvester project space.
- Users and Projects over quotas will not be able to create new files.
- Scratch and Project space is intended only for data in active use.
- There are no IDSC managed backups of GPFS Scratch or Project space.
- Scratch space is subject to purging when necessary for continued operation.
- Scratch space is charged only for actual utilization.
- Projects may lease additional GPFS project space annually at $500 for 10TB (2,000,000 files).
- Dedicated space is charged for total allocation and not by utilization.


Tier 1 Development (sccc-dev)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Open to all Sylvester Labs upon resource availability, requires Lab's PI approval.

::

                 - For users new to HPC, like the “IDSC Early Career Research Grant”
                 - Job priority significantly less than Tier 2
                 - Preemptible Jobs after 1 hour of runtime
                 - Max Job Runtime: 8 hours
                 - Max Cores per job, and concurrent: 16 cores per job, 32 cores per project 
                 - Max Memory per job: 128GB ram per job, 512GB ram per project (1 node)
                 - Scratch Storage: Local 1TB NVMe (optimal) and Pegasus HPC Scratch (PI respondsible)
                 - Project Storage: Pegasus HPC HOME (250GB) and Pegasus HPC Storage (PI respondsible)

Tier 2 General (sccc) 
~~~~~~~~~~~~~~~~~~~~~
Open to all Sylvester Labs upon resource availability, requires Lab's PI approval.

::

                 - Job priority significantly less than Tier 3.
                 - Preemptible Jobs after 1 hours of runtime 
                 - Max Job Runtime: 48 hours
                 - Max Cores per job, and concurrent: 64 cores per job (same node), no limit per project.
                 - Max Memory per job: 512GB ram per job, no limit per project.
                 - Scratch Storage: Local 1TB NVMe (optimal) and Pegasus HPC Scratch (PI respondsible)
                 - Project Storage: Pegasus HPC HOME (250GB) and Pegasus HPC Storage (PI respondsible)

Tier 3 Big Memory (sccc-bigmem) 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Open to all Sylvester Labs upon resource availability, requires Lab's PI approval.

::

                 - Job priority significantly less than Tier 4.
                 - Preemptible Jobs after 1 hours of runtime 
                 - Max Job Runtime: 96 hours
                 - Max Cores per job, and concurrent: 64 cores per job (same node), 1 job per project.
                 - Max Memory per job: 4TB per job and project (each of the two nodes has 4TB RAM).
                 - Scratch Storage: Local 1TB NVMe (optimal) and Pegasus HPC Scratch (PI respondsible)
                 - Project Storage: Pegasus HPC HOME (250GB) and Pegasus HPC Storage (PI respondsible)

Tier 3 GPU Queue (sccc-gpu) 
~~~~~~~~~~~~~~~~~~~~~~~~~~~
Open to all Sylvester Labs upon resource availability, requires Lab's PI approval.

::

                 - Job priority: Significantly less than Tier 4.
                 - Preemptible Jobs after 1 hours of runtime 
                 - Max Job Runtime: 96 hours
                 - Access to Sylvester GPU's (1 Nvidia A100 per node) 
                 - Max Cores per job, and concurrent: 4 cores per job (same node), 1 job per project.
                 - Max Memory per job: 512GB per job and project.
                 - Scratch Storage: Local 1TB NVMe (optimal) and Pegasus HPC Scratch (PI respondsible)
                 - Project Storage: Pegasus HPC HOME (250GB) and Pegasus HPC Storage (PI respondsible)

Tier 4 Premium (sccc-premium, sccc-bigmem-premium, sccc-gpu-premium)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Reserved for Sylvester Labs that have purchased dedicated resources

::

                 - Job priority: Other Tier 4 Jobs
                 - Job limitations: Up to Lab PI's
                 - Scratch Storage: Local 1TB NVMe (optimal) and Pegasus HPC Scratch (PI respondsible)
                 - Project Storage: Pegasus HPC HOME (250GB), Sylvester HPC Storage, and Pegasus HPC Storage (PI respondsible)


What are specs of available HPC Nodes?
--------------------------------------

Triton (96 nodes)
~~~~~~~~~~~~~~~~~

::

    OS:   CentOS 7.9, ppc64le
    CPU:  2 x IBM Power9 (40 cores/node, 3840 cores total)
    RAM:  16 x 16GiB RDIMM DDR4 2666MHz ECC (256GiB/node, 6.4GB/core)
    GPU:  2 x Nvidia V100-SXM2 (16GB GPU RAM) 
    NET:  100Gbps Infiniband (IB), 1Gbps Ethernet
    Disk: 2 x 1.92TB Micron 5100PRO SSD (RAID1, 1080MBps/1040MBps Seq Read/Write, 186K/74K IOPS)


Pegasus Compute (350 nodes)
~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    OS:   CentOS 7.6, x86_64
    CPU:  16c/node (for a total of 4800 CPU-cores)
    RAM:  64GiB nodes (4GiB/core, for a total of 22400GiB)
    RAM:  256GiB nodes (16GiB/core, for a total of 4096GiB)
    NET:  56Gbps Infiniband, 1 Gbps Ethernet 
    Disk: Stateless (ramdisk)


Pegasus Sylvester Dedicated Compute (16 nodes)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    OS:   CentOS 7.9, x86_64 
    CPU:  2 x Intel Xeon Gold 6338 CPU @ 2.00GHz (64 cores/node, 1024 cores total)
    RAM:  16 x 32GiB RDIMM DDR4 3200MHz ECC (512GiB/node, 8192GiB RAM total) 
    Net:  100Gbps Infiniband, 10Gbps Ethernet, 
    Disk: 960GiB Samsung PM9A3 NVMe (6500MBps/1500MBps Seq Read/Write, 580K/70K IOPS)  

Pegasus Sylvester Dedicated Big Memory GPU (2 nodes)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    OS:   CentOS 7.9, x86_64  
    CPU:  2 x Intel Xeon Gold 6338 CPU @ 2.00GHz (64 cores/node, 128 cores total)
    RAM:  32 x 128GiB RDIMM DDR4 3200MHz ECC (4096GB/node, 8192GiB RAM total)
    GPU:  1 x Nvidia A100 (80GB GPU RAM)  
    Net:  100Gbps Infiniband, 10Gbps Ethernet, 
    Disk: 960GiB Samsung PM9A3 NVMe (6500MBps/1500MBps Seq Read/Write, 580K/70K IOPS) 


How do I reset my IDSC password?
--------------------------------

Via the `IDSC Password Management <https://idsc.miami.edu/ccs-account>`__ tool.  You will need to be connected to the **University's Secure Network** to access this tool and all Sylvester HPC Resources.

How do I access the Secure Network remotely?
--------------------------------------------

Via the `University of Miami's VPN <https://www.it.miami.edu/a-z-listing/virtual-private-network/index.html>`__.

How do I run Nextflow on Sylvester HPC resources?
-------------------------------------------------

`Running Nextflow (nf-core/sarek) <https://acs-docs.readthedocs.io/pegasus/soft/nextflow.html>`__
