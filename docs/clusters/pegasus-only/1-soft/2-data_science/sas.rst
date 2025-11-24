SAS on Pegasus
==============

SAS can be run on Pegasus in Non-interactive/Batch and
Interactive/Graphical modes.

Non-Interactive Batch Mode
--------------------------

In batch mode, SAS jobs should be submitted via LSF using the ``bsub``
command. A sample LSF script file named ``scriptfile`` to submit SAS
jobs on Pegasus may include the following lines:

``scriptfile``

--------------

::

    #BSUB -J jobname
    #BSUB -o jobname.o%J
    #BSUB -e jobname.e%J
    sas test.sas

where “test.sas” is an SAS program file.

Type the following command to submit the job:

::

    [username@pegasus ~]$ bsub < scriptfile

For general information about how to submit jobs via LSF, see
`Scheduling Jobs on Pegasus <https://acs-docs.readthedocs.io/clusters/general-usage/5-jobs/README.html>`__.

Interactive Graphical Mode
^^^^^^^^^^^^^^^^^^^^^^^^^^

To run SAS interactively, first `forward the display <https://acs-docs.readthedocs.io/services/1-access.html#x11>`__. Load the SAS module and use the
interactive queue to launch the application.

::

    [username@pegasus ~]$ module load sas
    [username@pegasus ~]$ module load java

Submit job to the interactive queue:

::

    [username@pegasus ~]$ bsub -q interactive -P myproject -Is -XF sas
    Job is submitted to project.
    Job is submitted to queue .

Notice the ``-P`` flag in the above ``bsub`` command. If you do not
specify your project, you will receive an error like the one below:

::

    [username@pegasus ~]$ bsub -q interactive -Is -XF sas
    Error: Your account has multiple projects: project1 project2.
    Please specify a project by -P option and resubmit
    Request aborted by esub. Job not submitted.
