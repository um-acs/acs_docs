.. _g-queues:

Queues
==================

.. this should be seperated for triton and pegasus as the names are different.


Pegasus queues are organized using limits like job size, job length, job
purpose, and project. In general, users run jobs on Pegasus with equal
resource shares. A user's current or recent resource usage lowers the 
priority applied when LSF assigns resources for their new jobs.

The **normal** queue is available for both serial and parallel jobs. 

The **bigmem** queue is available for jobs requiring more than 32 GB of 
memory per node. Submitting jobs to this queue requires project membership. 
Do not submit jobs that can run on the general and parallel queues to the
bigmem queue. 

.. warning:: Jobs using less than 1.5G of memory per core on the bigmem queue are 
in violation of acceptable use policies and the IDSC account responsible for those jobs 
may be suspended (:ref:`policies`)


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



