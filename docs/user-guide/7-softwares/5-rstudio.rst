.. _general-software-rstudio:

RStudio
=======

RStudio provides an interactive development environment for R. Availability and
startup methods can differ by system, so use this page for general guidance and
check the system notes for current service behavior.

.. note::

   RStudio support may not be identical on all IDSC systems. If a supported
   RStudio service exists for the system, prefer that service before creating a
   custom RStudio workflow.

When to Use RStudio
-------------------

Use RStudio for:

* interactive R development
* testing R scripts
* exploring data
* package development
* preparing analyses before submitting longer LSF jobs

For long-running R scripts, use LSF batch jobs with ``Rscript`` or
``R CMD BATCH``.

General Workflow
----------------

A typical RStudio workflow is:

#. Confirm system access and project access.
#. Connect through the supported RStudio service or approved interactive method.
#. Choose the needed R version or environment.
#. Work interactively and save frequently.
#. Stop the RStudio session when finished.

.. warning::

   Do not leave RStudio sessions running unattended. Stop the session when work
   is complete so resources are released.

R Environments
--------------

RStudio may use:

* a system R module
* a Conda-based R environment
* a project-specific R library
* a service-provided R environment
* a containerized RStudio workflow for specialized cases

For command-line R setup, see the R page. For Conda-based R environments, see
the Conda and Anaconda page.

R Package Libraries
-------------------

For large or project-specific package libraries, use a project or scratch
location instead of the home directory.

Example:

::

   mkdir -p /scratch/projects/<project>/$USER/Rlibs
   export R_LIBS_USER=/scratch/projects/<project>/$USER/Rlibs

Inside R:

.. code:: r

   .libPaths()
   install.packages("ggplot2")

System Notes
------------

Pegasus
~~~~~~~

Pegasus has historically provided RStudio through a graphical/containerized
workflow. This workflow may require a supported RStudio service, an interactive
LSF session, or a container-based setup.

If a Pegasus RStudio workflow requires special wrapper scripts, container
images, or project-specific paths, keep those details in this section rather
than creating a separate Pegasus software tree.

Triton/Summit
~~~~~~~~~~~~~

RStudio availability on Triton/Summit may differ from Pegasus. If no supported
RStudio service is available, use command-line R, JupyterHub with an R kernel,
Conda-based R, or an Apptainer workflow when appropriate.

.. admonition:: Getting Help
   :class: important

   Contact IDSC support before running custom RStudio Server containers or
   server-style RStudio workflows. These workflows may require approved
   interactive sessions, port handling, and resource cleanup.

Recommended Practice
--------------------

* Use supported RStudio services when available.
* Use LSF batch jobs for long-running R scripts.
* Store large R libraries in project or scratch storage.
* Stop interactive RStudio sessions when finished.
* Use Apptainer only when a custom RStudio environment is required.
