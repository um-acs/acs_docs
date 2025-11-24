.. _g-queues:

Queues
==================

.. this should be seperated for triton and pegasus as the names are different.


LSF queues are organized using limits like job size, job length, job
purpose, and project. In general, users run jobs on the clusters with equal
resource shares. A user's current or recent resource usage lowers the 
priority applied when LSF assigns resources for their new jobs.

The **normal** queue is available for both serial and parallel jobs. 

The **bigmem** queue, on Pegasus, is available for jobs requiring more than 50 GB of 
memory per node. Submitting jobs to this queue requires project membership. 
Do not submit jobs that can run on the normal queues to the
bigmem queue. 

.. warning:: Jobs using less than 1.5G of memory per core on the bigmem queue are in violation of acceptable use policies and the IDSC account responsible for those jobs may be suspended.


.. role:: raw-html(raw)
    :format: html

.. list-table:: Pegasus Job Queues  
   :header-rows: 1
   
   * - Queue Name
     - Cores per node
     - Memory
     - Wall time default \/ max 
     - Description 
   * - normal
     - 16 
     - up to 50 GB per node
     - 1 day \/ 7 days 
     - parallel & serial jobs up to 16 cores, up to 50 GB memory 
   * - bigmem 
     - 16 
     - up to 200 GB per node
     - 4 hours \/ 5 days 
     - jobs requiring nodes with more than 200 GB of memory, max. of 32 cores allowed per job.
   * - debug 
     - 16
     - up to 32 GB 
     - 30 mins \/ 30 mins 
     - job debugging, max. of 64 cores allowed per job.
   * - interactive 
     - 16 (15 for jobs)
     - up to 250 GB per node
     - 6 hours \/ 1 day 
     - interactive jobs :raw-html:`<br />` max 1 job per user
   * - gpu_h100 
     - 2 GPUs
     - 96 GB max V-RAM/node
     - 1 day \/ 7 days 
     - gpu h100
   * - gpu_titan 
     - 2 GPU 
     - 12 GB max V-RAM
     - 1 day \/ 7 days 
     - gpu titan v100

.. role:: raw-html(raw)
    :format: html

.. list-table:: Triton Job Queues  
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
     -  - 2 V100s with 16GB VRAM and CUDA 12.4
     - interactive jobs :raw-html:`<br />` max 1 job per user




