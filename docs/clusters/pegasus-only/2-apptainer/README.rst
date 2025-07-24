Introduction to Singularity/Apptainer on Pegasus
=================================================

**Apptainer**, formerly known as Singularity, is a container platform designed for 
high-performance computing (HPC). It enables the creation and execution of containers 
that package software in a portable and reproducible way. You can build a container 
on your laptop and run it on various platforms—HPC clusters, university or company servers, 
workstations, or the cloud. Containers are bundled into a single .sif file, 
minimizing configuration overhead and simplifying software deployment.

We have implemented and documented several applications using Apptainer.


**Singularity vs. Docker**

While Docker is a widely used container runtime, HPC clusters commonly use Singularity (Apptainer). 
Here's a quick comparison:


=======  ===================================================  =================================================================
S.NO     Docker                                               Singularity 
=======  ===================================================  =================================================================
1        Designed for infrastructure deployment               Designed for scientific computing
2        Operating system service                             User application 
3        In practice, gives root access to whole system       Does not give or need extra permissions to the system 
4        Images stored in layers in hidden operating system   One image is one .sif file which you manage using normal commands.
         locations opaquely managed through some commands.
=======  ===================================================  =================================================================


**Why use Apptainer**

Apptainer was created to run complex applications on HPC clusters in a
simple, portable, and reproducible way. Many container platforms are
available, but Apptainer is focused on:

     * Verifiable reproducibility and security, using cryptographic signatures,an immutable container image format, and in-memory decryption.

     * Integration over isolation by default. Easily make use of GPUs, high speed networks, parallel file systems on a cluster or server by default.

     * Mobility of compute. The single file SIF container format is easy to transport and share.

     * A simple, effective security model. You are the same user inside a container as outside, and cannot gain additional privilege on the host system by default. Read more about Security in
          Apptainer: https://apptainer.org/docs/admin/1.0/security.html


The following sections guide you through using Apptainer on Pegasus, from basic setup to advanced workflows like GPU acceleration and Nextflow integration:
.. toctree::
    :maxdepth: 5
    :glob: 

    System Setup and OS Switching <1-getting_started>
    Running Containers and Scripts <2-running_containers>
    Interactive Applications <3-interactive>
    Container Definition Files <4-definition_files>
    GUI Tools <5-gui>
    LSF Job Scheduling <6-lsf>
    GPU Support in Containers <7-gpu>
    Workflow Pipelines (Nextflow) <8-workflow>
    Container Security & Verification <9-security>
