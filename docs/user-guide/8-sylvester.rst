Sylvester HPC QuickStart
=========================

The Sylvester Comprehensive Cancer Center has access to dedicated
high-performance computing (HPC) resources through IDSC's Pegasus cluster.

This guide covers the Sylvester-specific steps for requesting access, choosing
Sylvester queues, and finding related resources. For general Pegasus usage,
including connecting to the cluster, transferring files, submitting jobs, and
monitoring jobs, use the :doc:`Pegasus and Triton QuickStart <1-quickstart>`.

Before You Begin
----------------

Before using Sylvester HPC resources, you should:

- review the :ref:`policies`;
- have an active IDSC account;
- belong to an approved Sylvester project; and
- be connected through an approved University network path, such as the
  University of Miami VPN when working remotely.

If you are new to HPC or Linux, review the available onboarding and Linux
training materials before running production workloads.

1. Request or Join a Sylvester Project
--------------------------------------

New Sylvester projects require a Sylvester Project Allocation.

`Request a Sylvester Project Allocation
<https://umiami.qualtrics.com/jfe/form/SV_dgMjKPBxPuIt9ci>`__

To join an existing project, submit an IDSC Account Request and include the
Project ID.

`Request an IDSC Account
<https://uhealth.service-now.com/esc?id=sc_cat_item&sys_id=2528565647662610ddc5bfca116d4379>`__

For general information about IDSC projects and allocations, see
:ref:`g-projects`.

2. Connect to Pegasus
---------------------

Sylvester HPC resources are accessed through Pegasus.

Follow the connection instructions in the
:doc:`Pegasus and Triton QuickStart <1-quickstart>`.

For a standard Pegasus account, the login command is:

.. code-block:: bash

   ssh <username>@pegasus2.idsc.miami.edu

Replace ``<username>`` with the username associated with your IDSC account.

.. note::

   If your account uses a configured SSH alias or jump host, use the
   destination provided for your account instead of the hostname shown above.

.. important::

   Login nodes are intended for tasks such as editing files, transferring
   data, loading software, and submitting jobs. Run computational work through
   the LSF scheduler rather than directly on a login node.

3. Sylvester Utilization
------------------------

The Sylvester Utilization Dashboard provides information about the use of
Sylvester HPC resources.

`Sylvester Utilization Dashboard
<http://prometheus.idsc.miami.edu:3000/d/WZGTYp0Sz/sccc-cluster-dashboard?orgId=1>`__

If access is required, submit a request through the Sylvester dashboard access
form:

`Request Dashboard Access
<https://uhealth.service-now.com/esc?id=sc_cat_item&sys_id=4080579787f1ee1099fd11383cbb3583>`__

4. Sylvester LSF Queues
-----------------------

Sylvester workloads run through LSF on Pegasus. The previous Sylvester guide
documented the following queue families:

.. list-table::
   :header-rows: 1
   :widths: 24 24 52

   * - Queue
     - Tier
     - Intended use
   * - ``sccc-dev``
     - Tier 1
     - Development, testing, and introductory HPC workloads
   * - ``sccc``
     - Tier 2
     - General Sylvester CPU workloads
   * - ``sccc-bigmem``
     - Tier 3
     - Large-memory workloads
   * - ``sccc-gpu``
     - Tier 3
     - GPU workloads
   * - ``sccc-premium``
     - Tier 4
     - Dedicated resources purchased by participating Sylvester labs
   * - ``sccc-bigmem-premium``
     - Tier 4
     - Dedicated large-memory resources
   * - ``sccc-gpu-premium``
     - Tier 4
     - Dedicated GPU resources

.. important::

   Queue availability, runtime limits, CPU limits, memory limits, preemption
   rules, and project concurrency limits can change. Verify the current LSF
   configuration before publishing fixed limits in this guide. The canonical
   queue documentation should remain the source of truth for those values.

For general LSF usage, see :ref:`g-lsf`.

5. Submit a Sylvester Job
-------------------------

The general submission workflow is the same as the Pegasus workflow described
in the :doc:`Pegasus and Triton QuickStart <1-quickstart>`.

A Sylvester job script must use an approved Sylvester project and a queue that
your project is authorized to use.

For example:

.. code-block:: bash

   #!/bin/bash
   #BSUB -J sylvester-example
   #BSUB -P <project>
   #BSUB -q sccc
   #BSUB -n 1
   #BSUB -R "rusage[mem=1GB]"
   #BSUB -W 00:10
   #BSUB -o sylvester.%J.out
   #BSUB -e sylvester.%J.err

   set -euo pipefail

   echo "Job ID: $LSB_JOBID"
   echo "Compute host: $(hostname)"
   echo "Working directory: ${LS_SUBCWD:-$PWD}"

Replace ``<project>`` with your approved Sylvester LSF project.

Submit the job with:

.. code-block:: bash

   bsub < job.lsf

Monitor it with:

.. code-block:: bash

   bjobs

For more detailed examples, including file transfer and output retrieval, use
the :doc:`Pegasus and Triton QuickStart <1-quickstart>`.

6. Storage
----------

Use project scratch space for active computational work. General IDSC storage
policies, quotas, and supported storage services should be maintained in the
central storage documentation rather than duplicated here.

For project-specific storage questions, confirm the allocation associated with
your Sylvester project before starting large workloads.

.. important::

   The previous Sylvester guide included fixed GPFS quotas and pricing. Those
   values should be verified against the current storage policy before they
   are restored to production documentation.

7. Password and Remote Access
-----------------------------

IDSC passwords can be managed through the IDSC Password Management tool:

`IDSC Password Management
<https://idsc.miami.edu/ccs-account>`__

When remote access requires the University secure network, connect using the
University of Miami VPN:

`University of Miami VPN
<https://www.it.miami.edu/a-z-listing/virtual-private-network/index.html>`__

8. Nextflow on Sylvester
------------------------

Nextflow workloads should follow the current workflow-tool documentation rather
than the retired ``clusters/pegasus-only`` documentation path.

Use the current workflow-tools or Nextflow documentation in the shared user
guide for configuration and submission examples.

9. Additional Training
----------------------

For users new to Pegasus:

`IDSC Onboarding Training
<https://www.youtube.com/playlist?list=PLldDLMcIa33Z38fwC6e_7YSQZtwJZLSzF>`__

For users new to Linux:

`Linux Training Material
<https://acs-docs.readthedocs.io/linux/README.html>`__

Next Steps
----------

Continue with the shared IDSC user guide as needed:

- :doc:`Pegasus and Triton QuickStart <1-quickstart>` for an end-to-end job
  workflow;
- :ref:`g-projects` for project access and allocation information;
- :ref:`transfer` for file-transfer methods;
- :ref:`g-modules` for software modules;
- :ref:`g-lsf` for LSF batch-job submission;
- :ref:`g-interactive` for interactive jobs; and
- :ref:`policies` for cluster policies.