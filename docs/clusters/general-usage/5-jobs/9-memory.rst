===========================================
Memory Requests in LSF on Pegasus
===========================================

How to **reserve** memory under LSF on Pegasus. 

Cluster Hardware and Queue Model
================================

Standard compute nodes
----------------------
* **16 CPU cores**
* **32 GB RAM** (≈ ``32768`` MB)

Big-memory nodes (bigmem)
-------------------------
* **96 CPU cores**
* **2 TB RAM** (≈ ``2097152`` MB)

Queues and host spanning rules
------------------------------
* ``normal`` and ``general``: **single-host only**
  * Jobs in these queues **do not span multiple hosts**
  * Jobs should not exceed **16 cores** (fits a standard node)
* ``parallel``: **multi-host allowed**
  * Jobs **may span multiple hosts**
  * Use this queue for MPI / multi-node workloads
* ``bigmem``: **access to big-memory nodes**
  * Use this queue when a job needs **more memory per host** than standard nodes provide

Units and what is enforced
==========================

Memory units
------------
Pegasus is configured with::

  LSF_UNIT_FOR_LIMITS=MB

So memory values are interpreted in **MB** unless you provide suffixes.
Examples:

* ``rusage[mem=2048]``  -> 2048 MB (~2 GB)
* ``rusage[mem=32768]`` -> 32768 MB (~32 GB)
* ``rusage[mem=65536]`` -> 65536 MB (~64 GB)

Reservation vs. limit
---------------------
* ``-R "rusage[mem=...]"`` controls **reservation for scheduling**
  * This is the primary setting that steers jobs away from nodes without enough memory.
* ``-M`` is **not enforced by LSF on Pegasus** (memory-limit enforcement is disabled)
  * Do not rely on ``-M`` to stop a job from exceeding memory at runtime.
  * Use ``rusage[mem=...]`` to reserve memory for scheduling and size requests based
    on measured usage.

How rusage[mem=...] behaves on Pegasus
======================================

Per-host reservation (the most important rule)
----------------------------------------------
On Pegasus, ``rusage[mem=X]`` is applied as a **per-host (per-node) reservation**.

* If the job runs on **1 host**, it reserves approximately ``X`` MB on that host.
* If the job runs on **H hosts**, it reserves approximately ``H * X`` MB total across the job.

The number of tasks (``-n``) does **not** automatically multiply the memory reservation.
Instead, the reservation is applied **once per host used**, based on the placement.

Controlling placement (single host vs multiple hosts)
=====================================================

Single-host placement
---------------------
Use ``span[hosts=1]`` when all tasks must run on one host (typical for ``normal``/``general``).

Multi-host placement (parallel jobs)
------------------------------------
Use ``span[ptile=N]`` to control how many tasks are placed per host.

* ``ptile=8``  -> 8 tasks per host
* ``ptile=16`` -> 16 tasks per host (fills a standard 16-core node)

This placement choice translates “MB per task” into a predictable “MB per host” reservation.

A simple formula to apply (parallel queue)
==========================================

When using ``parallel`` with ``span[ptile=P]``:

1) Choose a target memory per task: ``MB_per_task``
2) Compute per-host reservation:

   ``MB_per_host = MB_per_task * P``

3) Submit:

   ``-R "span[ptile=P] rusage[mem=MB_per_host]"``

LSF will reserve ``MB_per_host`` on each host used by the job.

Guidance by queue
=================

Queue: normal / general (single host only)
------------------------------------------

These queues do not span multiple hosts, so the job must fit on a single node.

CPU guidance
^^^^^^^^^^^^
* Keep ``-n`` **<= 16** for standard nodes.

Memory guidance
^^^^^^^^^^^^^^^
* Standard nodes have ~32 GB RAM, so requests should typically be **<= 32768 MB**.
  Leave headroom when possible.

Examples
^^^^^^^^

Reserve 8 GB on one standard node::

  bsub -q normal -P <project> -n 4 -R "span[hosts=1] rusage[mem=8192]"  my_program

Reserve almost the full node memory (memory-heavy single-node work)::

  bsub -q general -P <project> -n 16 -R "span[hosts=1] rusage[mem=32000]" my_program

Queue: parallel (multi-host allowed)
------------------------------------

Use this queue when the job needs more than one node.

Examples
^^^^^^^^

32 tasks total, 8 per host, reserve ~2 GB per task::

  # MB_per_host = 2000 * 8 = 16000
  bsub -q parallel -P <project> -n 32 -R "span[ptile=8] rusage[mem=16000]" my_mpi_program

64 tasks total, 16 per host (fill standard nodes), reserve ~1.5 GB per task::

  # MB_per_host = 1536 * 16 = 24576
  bsub -q parallel -P <project> -n 64 -R "span[ptile=16] rusage[mem=24576]" my_mpi_program

Queue: bigmem (96 cores / 2 TB RAM)
-----------------------------------

Use this queue when the job needs **more memory per host** than standard nodes provide,
or when a large-core-count single-host job is required.

Single-host bigmem jobs
^^^^^^^^^^^^^^^^^^^^^^^

Reserve 512 GB on one bigmem host::

  # 512 GB = 512 * 1024 MB = 524288 MB
  bsub -q bigmem -P <project> -n 48 -R "span[hosts=1] rusage[mem=524288]" my_program

Reserve 1 TB on one bigmem host::

  # 1 TB = 1024 * 1024 MB = 1048576 MB
  bsub -q bigmem -P <project> -n 64 -R "span[hosts=1] rusage[mem=1048576]" my_program

Multi-host bigmem jobs
^^^^^^^^^^^^^^^^^^^^^^

If the bigmem queue does not allow multi-host jobs,  submit a ticket for assistance if you determine this is necessary for your work. 
Submit big multi-node jobs to ``parallel`` instead.

Verifying what you asked for and what happened
==============================================

Show what resources were requested
----------------------------------
::

  bjobs -l <jobid> | sed -n '/Requested Resources/,/RESOURCE REQUIREMENT DETAILS/p'

Confirm placement and packing
-----------------------------
In ``bjobs -l <jobid>``, look for:

* number of tasks
* list of execution hosts (and how many tasks landed on each)
* ``span[hosts=1]`` or ``span[ptile=...]``

Diagnose pending jobs
---------------------
::

  bjobs -lp <jobid>

This shows whether the job is waiting for:
* cores/slots
* memory reservation
* other constraints (host type, health resources, etc.)

Recommended starting points (Pegasus)
=====================================

Standard node jobs (single host)
--------------------------------
* Light/medium: ``rusage[mem=4000]`` to ``rusage[mem=16000]``
* Memory-heavy single-host: up to ~``rusage[mem=32000]``

Parallel jobs
-------------
* Use ``span[ptile=8]`` or ``span[ptile=16]`` for predictable packing.
* Set ``rusage[mem]`` to match expected **per-host** memory needs (use the formula above).

Bigmem jobs
-----------
* Use ``bigmem`` when per-host memory needs exceed what standard nodes can provide.
* Reserve memory in MB appropriate for bigmem (hundreds of GB up to TB-scale).

Practical reminder
==================

On Pegasus, ``rusage[mem=...]`` is the scheduling reservation knob.
Make it match the memory footprint expected **per host**, and use ``ptile`` to
make “per task” requests predictable in the ``parallel`` (or ``bigmem``) queue.
