Jupyter Containers with Apptainer
=================================

This page preserves the older Jupyter container workflow in a cleaner form.
Prefer the supported JupyterHub service when it satisfies your needs. Use a
containerized Jupyter workflow only when the required software is not available
through the standard service.

Jupyter Container Warning
-------------------------

Do not run Jupyter Notebook or JupyterLab containers directly on login nodes.
Jupyter starts a long-running web server, so it should run inside an interactive
LSF job or another approved workflow.

Before running a containerized Jupyter application, contact IDSC if you are not
sure which execution method is appropriate for your project.

Pull a Minimal Notebook Image
-----------------------------

Download a Jupyter minimal notebook image:

::

   apptainer pull docker://jupyter/minimal-notebook

This creates an image similar to:

::

   minimal-notebook_latest.sif

Run Jupyter in an LSF Session
-----------------------------

Start Jupyter through an interactive LSF job:

::

   bsub -q general -P <project> -Is apptainer run /nethome/$USER/minimal-notebook_latest.sif

The Jupyter server will print a URL containing a token, usually with
``127.0.0.1`` or ``localhost`` and port ``8888``.

Accessing the Notebook
----------------------

Copy the token URL from the terminal output. Depending on the approved access
method, you may need to replace the host part of the URL with the correct
Pegasus access hostname or use SSH port forwarding.

Example URL pattern:

::

   http://127.0.0.1:8888/lab?token=<token>

Do not share the token. It gives access to the running notebook session.

Working with Notebook Files
---------------------------

Files created in the notebook should be written to a host-mounted directory such
as your home, project, or scratch space. Back up important notebooks and outputs
before ending the interactive job.

Use ``--bind`` when the notebook needs a specific project directory:

::

   bsub -q general -P <project> -Is \
       apptainer run --bind /scratch/projects/<project>/$USER:/work \
       /nethome/$USER/minimal-notebook_latest.sif

Stopping Jupyter
----------------

Stop the notebook from the terminal or interrupt the interactive LSF session
when finished. Do not leave notebook servers running unattended.
