.. _p-queues:

Pegasus Job Queues
==================

Pegasus queues are organized using limits like job size, job length, job
purpose, and project. In general, users run jobs on Pegasus with equal
resource shares. A user's current or recent resource usage lowers the 
priority applied when LSF assigns resources for their new jobs.

The **general** queue is available for jobs requiring 15 or less cores.

The **parallel** queue is available for jobs requiring 16 or more cores.
Submitting jobs to this queue ***requires*** resource distribution
``-R "span[ptile=16]"`` which makes sure as few nodes as possible are used.

The **bigmem** queue is available for jobs requiring more than 32 GB of 
memory per node. Submitting jobs to this queue requires project membership. 
Do not submit jobs that can run on the general and parallel queues to the
bigmem queue. 

.. warning:: Jobs using less than 1.5G of memory per core on the bigmem queue are 
in violation of acceptable use policies and the IDSC account responsible for those jobs 
may be suspended (`Policies <https://acs-docs.readthedocs.io/policies/policies.html#policies>`__).


.. role:: raw-html(raw)
    :format: html

.. list-table:: Pegasus Job Queues  
   :header-rows: 1
   
   * - Queue Name
     - Cores per node
     - Memory
     - Wall time default \/ max 
     - Description 
   * - general 
     - 16 (15 for jobs)
     - up to 32 GB per node
     - 1 day \/ 7 days 
     - jobs up to 15 cores, up to 32 GB memory 
   * - parallel 
     - 16
     - up to 32 GB per node 
     - 1 day \/ 7 days 
     - parallel jobs requiring 16 or more cores, up to 32 GB memory per node. :raw-html:`<br />` **requires resource distribution -R "span[ptile=16]"**
   * - bigmem 
     - 16 
     - up to 250 GB per node
     - 4 hours \/ 5 days 
     - jobs requiring nodes with more than 32 GB of memory, max. of 64 cores allowed per job.
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
   * - gpu 
     - xx
     - 320 max 
     - 1 day \/ 7 days 
     - gpu debugging restricted queue 
   * - phi 
     - xx
     - 320 max 
     - 1 day \/ 7 days 
     - phi debugging restricted queue 


