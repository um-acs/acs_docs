.. _g-queues:

Pegasus and Triton Queues
==================

.. this should be seperated for triton and pegasus as the names are different.


LSF queues are organized using limits like job size, job length, job
purpose, and project. In general, users run jobs on the clusters with equal
resource shares. A user's current or recent resource usage lowers the 
priority applied when LSF assigns resources for their new jobs.

The **normal** queue is available for serial and single-node parallel jobs. 

The **bigmem** queue, on Pegasus, is available for jobs requiring more than 50 GB of 
memory per node. Do not submit jobs that can run on the normal queues to the
bigmem queue. 

.. warning:: Jobs using less than 1.5G of memory on the bigmem queue are in violation of acceptable use policies and the IDSC account responsible for those jobs may be suspended.

Pegasus Queues
^^^^^^^^^^^^^^^^^^

Details:

.. role:: raw-html(raw)
    :format: html

.. list-table::  
   :header-rows: 1
   
   * - Queue Name
     - Cores per node
     - Memory
     - Wall time default \/ max 
     - Description 
   * - normal
     - 16 
     - up to 50 GB per node
     - Not configured 
     - jobs intended for serial or parallel workloads that run entirely on a single node.
   * - parallel
     - 16 per node
     - up to 50 GB per node
     - Not configured 
     - jobs intended for MPI or other multi-node parallel workloads.
   * - bigmem 
     - 16--96
     - 251.8 GB--1.9 TB per node
     - 10 days 
     - single-node jobs requiring high-memory hosts; available cores and memory vary by host.
   * - interactive 
     - 16 (15 for jobs)
     - up to 250 GB per node
     - Not configured 
     - currently closed to new submissions :raw-html:`<br />` interactive jobs are limited to one task per job
   * - transfers
     - up to 4 tasks per job
     - N/A
     - N/A
     - Data transfers, checksum verification, and other I/O-intensive
       data-management work on the Pegasus Data Transfer Node. See
       :ref:`transfer-dtn`.
   * - gpu_h100 
     - 1--2 GPUs
     - 96 GB V-RAM per GPU
     - Not configured 
     - NVIDIA H100 NVL GPUs; GPU count varies by host.
   * - gpu_titan 
     - 1--2 GPUs
     - 12 GB V-RAM per GPU
     - Not configured 
     - NVIDIA TITAN X GPUs, including TITAN X (Pascal); GPU count varies by host.

Triton Queues
^^^^^^^^^^^^^^^^^^

Details:

.. role:: raw-html(raw)
    :format: html

.. list-table::   
   :header-rows: 1
   
   * - Queue Name
     - Cores per node
     - Memory
     - GPU
     - Description 
   * - normal
     - 40 
     - up to 280 GB per node
     - 2 V100s with 16GB VRAM and CUDA 12.4
     - parallel & serial jobs up to 16 cores, up to 50 GB memory 
   * - interactive 
     - 40 (15 for jobs)
     - up to 280 GB per node
     - 2 V100s with 16GB VRAM and CUDA 12.4
     - interactive jobs :raw-html:`<br />` max 1 job per user
