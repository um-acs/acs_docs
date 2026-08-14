.. _g-apptainer:

Apptainer
=========

Apptainer, formerly known as Singularity, is a container platform used on HPC
systems. It allows users to run software inside portable ``.sif`` container
images without Docker or sudo access.

.. warning::

   Apptainer is **not** a separate login system. Users log in to the cluster, load
   the Apptainer module, and then run containers.

While Docker is a widely used container runtime, HPC clusters commonly use
Singularity or Apptainer. Here is a quick comparison:

=======  ========================================  ======================================
S.NO     Docker                                    Apptainer
=======  ========================================  ======================================
1        Infrastructure/application deployment     Scientific computing/HPC
2        System service                            User application
3        Often needs elevated permissions          No extra user privileges
4        Docker-managed image layers               One portable ``.sif`` file
=======  ========================================  ======================================

Apptainer is useful on HPC systems because it allows users to:

* Run software with specific dependencies.
* Package workflows into portable ``.sif`` images.
* Reproduce environments across systems.
* Run containers without Docker or sudo access.
* Use HPC resources such as scratch storage, GPUs, and LSF jobs when configured.

A typical workflow is:

#. Log in to the cluster.
#. Load the Apptainer module.
#. Download or build a container image.
#. Test the container with ``shell``, ``exec``, or ``run``.
#. Submit real workloads through LSF.

Start with the first six pages for the normal beginner workflow. Use the
troubleshooting and examples pages when testing your own containers. The
advanced section contains older specialized examples that are still useful, but
are not part of the basic workflow.


.. admonition:: Getting Help
   :class: important

   If you are not sure which Apptainer workflow is appropriate for your project,
   contact the IDSC support team before running GPU jobs, Jupyter/RStudio
   servers, long-running container jobs, or specialized workflows.

   Some requests, such as fakeroot access, GPU/project access, or containerized
   interactive applications, may require additional guidance or approval.

   Submit an IDSC support ticket with a brief description of your project
   requirement: `IDSC Support Ticket <https://uhealth.service-now.com/esc?id=sc_cat_item&sys_id=4080579787f1ee1099fd11383cbb3583>`_


.. toctree::
   :maxdepth: 3
   :caption: Apptainer

   1-quick_start
   2-images_and_builds
   3-inspect_verify
   4-working_with_files
   5-running_jobs
   6-gpu_containers
   7-troubleshooting
   8-examples
   advanced/README