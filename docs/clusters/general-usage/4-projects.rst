.. _g-projects:

Projects & Resources
============================

Access to IDSC Advanced Computing resources is managed on a **project** basis. 
This allows us to better support interaction between teams (including data sharing) at the University of Miami regardless of group, school, or campus. 
Project-based resource allocation also gives researchers the ability to request resources for short-term work. 
Any University of Miami faculty member or Principal Investigator (PI) can request a new project. 
All members of a project share that project’s resource allocations.

To join a project, contact the project owner. PIs and faculty, request new `IDSC Projects here <https://idsc.miami.edu/project-request>`_ (https://idsc.miami.edu/project-request)

Using projects in computing jobs
--------------------------------

To run jobs using your project’s resources, submit jobs with your assigned ``projectID`` using the ``-P`` argument to ``bsub``: ``bsub -P projectID``. 
For more information about LSF and job scheduling, see :ref:`g-schedule`.

For example, if you were assigned the project id "abc", 
a batch submission from the command line would look like:

::

    $ bsub -P abc < JOB_SCRIPT_NAME

and an interactive submission from the command line would look like:

::

    $ bsub -P abc -Is -q interactive -XF command

When your job has been submitted successfully, the project and queue information will be printed on the screen.

::

    Job is submitted to <abc> project.

    Job <11234> is submitted to default queue <normal>.

The cluster scheduler will only accept job submissions to active projects. The IDSC user must be a current member of that project.
