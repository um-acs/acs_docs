Legacy Cluster and Software Notes
=================================

The older Apptainer folder contained some material that was not really
Apptainer-specific. This page preserves the useful ideas so they are not lost,
but these topics may belong in separate cluster or software-installation
documentation later.

Sylvester HPC Notes
-------------------

The older documentation included a Sylvester HPC quick start. The main ideas
were:

* Users should log in using the approved cluster access method.
* Sylvester users may have access to dedicated queues and storage areas.
* Workloads should be submitted through the scheduler instead of running on
  login nodes.
* GPU and big-memory queues may require the correct project/account access.
* Password resets and secure network access should follow IDSC instructions.

These notes are cluster-policy material and should be maintained with the main
Pegasus/Sylvester cluster documentation, not inside the Apptainer beginner
workflow.

Queue and Resource Reminder
---------------------------

When using Apptainer on a shared cluster, choose the appropriate queue and
resources for the job:

.. code:: bash

   #BSUB -P <project>
   #BSUB -q general
   #BSUB -n 1
   #BSUB -R "rusage[mem=4000]"
   #BSUB -W 1:00

For GPU workflows, use a GPU queue and include ``--nv`` in the Apptainer command.

Software Installation Notes
---------------------------

The older documentation also included general instructions for installing
software in user space. That topic is separate from Apptainer but still useful
when a user does not need a container.

Typical user-space installation pattern:

::

   mkdir -p /nethome/$USER/software
   mkdir -p /nethome/$USER/src
   cd /nethome/$USER/src

Download and extract source or precompiled files into the source directory.
Then configure the install prefix to a directory you control:

::

   ./configure --prefix=/nethome/$USER/software/<software-name>
   make
   make install

Update ``PATH`` for the current shell:

::

   export PATH=/nethome/$USER/software/<software-name>/bin:$PATH

Check which executable is being used:

::

   which <command>
   <command> --version

Persistent PATH Updates
-----------------------

To make the path available in future shell sessions, add it to ``~/.bashrc``:

::

   echo 'export PATH=/nethome/$USER/software/<software-name>/bin:$PATH' >> ~/.bashrc
   source ~/.bashrc

Use this only for software you want available by default. Avoid adding many
conflicting software paths to ``~/.bashrc``.

Symbolic Link Notes
-------------------

The older software page also discussed symbolic links. A symlink can provide a
short command name for a longer executable path:

::

   mkdir -p /nethome/$USER/bin
   ln -s /nethome/$USER/software/<software-name>/bin/<command> /nethome/$USER/bin/<command>
   export PATH=/nethome/$USER/bin:$PATH

Check the command:

::

   which <command>

When to Use Apptainer Instead
-----------------------------

Use Apptainer instead of manual user-space installation when:

* The software has many system dependencies.
* You need a reproducible environment for a workflow.
* You want to share the same environment with collaborators.
* You need a specific OS or package stack that is difficult to install directly
  on the cluster.

Use normal user-space installation when:

* The software is small and easy to compile.
* A module is not available but dependencies are simple.
* You do not need a full containerized environment.
