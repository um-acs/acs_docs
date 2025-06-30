Triton Job Queues
==================

Triton queues are organized using limits like job size, job length, job
purpose, and project. In general, users run jobs on Pegasus with equal
resource shares. Current or recent resource usage lowers the priority
applied when LSF assigns resources for new jobs from a user’s account.

The **bigmem** queue is available for jobs requiring nodes with expanded
memory. Submitting jobs to this queue requires project membership. Do
not submit jobs that can run on the general and parallel queues to the
bigmem queue. 



.. list-table:: Triton Job Queues  
   :header-rows: 1
   
   * - Queue Name
     - Processors (Cores)  
     - Memory
     - Wall time default \/ max 
     - Description 
   * - normal 
     - 512
     - 256GB max 
     - 1 day \/ 7 days 
     - Parallel and serial jobs up to 256GB memory per host
   * - bigmem 
     - 40
     - 250GB max hosts
     - 4 hours \/ 5 days 
     - Jobs requiring nodes with expanded memory up to 1TB
   * - short 
     - 64  
     - 25GB max 
     - 30 mins \/ 30 mins 
     - Jobs less than 1 hour wall time.  Scheduled with higher priority.
   * - interactive 
     - 40 
     - 250GB max 
     - 6 hours \/ 1 day 
     - Interactive jobs only max 1 job per user

