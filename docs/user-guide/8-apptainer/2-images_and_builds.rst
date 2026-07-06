Container Images and Builds
===========================

Apptainer containers are commonly stored as ``.sif`` files. A ``.sif`` file is
similar in purpose to a Docker image, but it is stored as one portable file.

Downloaded ``.sif`` files are read-only by default. If you need to modify a
container, use a temporary writable layer, a sandbox directory, a persistent
overlay, or a definition file.

.. caution::

   Container images are architecture-specific. An image built or downloaded for
   ``x86_64`` may not run on a ``ppc64le`` system. Build, pull, or choose images
   that match the cluster where the container will run.

Container Image Types
---------------------

=====================  ===============================================================
Type                   Purpose
=====================  ===============================================================
``.sif`` image         Portable, stable, read-only container image
``--writable-tmpfs``   Temporary writable layer for changes during one session
Sandbox directory      Writable, unpacked container directory
Persistent overlay     Writable layer stored separately from the base ``.sif`` image
Definition file        Recipe used to build a reproducible ``.sif`` image
=====================  ===============================================================

SIF Images
----------

A ``.sif`` image is the standard Apptainer image format. Use ``.sif`` files when
you want a stable container image for running software or workflows.

Download an image from Docker Hub:

::

   apptainer pull docker://alpine

This usually creates:

::

   alpine_latest.sif

You can also use ``build`` to create a named ``.sif`` image from a remote image:

::

   apptainer build alpine.sif docker://alpine

Image Cache
-----------

When Apptainer downloads remote images, it may reuse cached layers to avoid
re-downloading the same content.

View the cache:

::

   apptainer cache list

Clean the cache:

::

   apptainer cache clean

Temporary Writable Containers
-----------------------------

Use ``--writable-tmpfs`` when you need temporary changes during one container
session.

::

   apptainer shell --writable-tmpfs alpine_latest.sif

Changes made with ``--writable-tmpfs`` disappear when the container exits. Use
this for quick testing only. Do not use it for reproducible software
installation.

Sandbox Directory
-----------------

A sandbox is an unpacked container directory that can be modified.

Create a sandbox from an existing image:

::

   apptainer build --sandbox alpine_sandbox alpine_latest.sif

Open the sandbox as writable:

::

   apptainer shell --writable alpine_sandbox

A sandbox is useful for testing changes interactively. After customization, a
sandbox can be converted back into a ``.sif`` image.

::

   apptainer build custom_alpine.sif alpine_sandbox

Persistent Overlay
------------------

A persistent overlay adds a writable layer on top of a read-only ``.sif`` image.
Changes are stored in the overlay instead of modifying the original image.

Create an overlay image:

::

   apptainer overlay create --size 1024 overlay.img

Use the overlay with a container:

::

   apptainer shell --overlay overlay.img alpine_latest.sif

Any changes written to writable locations inside the container are stored in
``overlay.img`` and can be reused later with the same base image.

.. note::

   Persistent overlays are useful for testing or user-level changes, but they
   are not the best choice for documenting a reproducible software environment.
   For reproducible builds, use a definition file.

Definition Files
----------------

A definition file is a text recipe used to build an Apptainer container image.
It is similar in purpose to a Dockerfile.

Definition files are recommended when you want a reproducible and documented
container build. Instead of installing software manually inside a sandbox, write
the installation steps in a definition file and build a new ``.sif`` image from
it.

A definition file usually contains two main parts:

* **Header**: defines the base image.
* **Body sections**: define installation steps, copied files, environment variables, run commands, tests, labels, and help text.

Common Definition File Sections
-------------------------------

=================  ============================================================
Section            Purpose
=================  ============================================================
``Bootstrap``      Defines the source type, such as Docker
``From``           Defines the base image, such as Ubuntu or Alpine
``%files``         Copies files from the host into the container during build
``%post``          Runs commands during build time inside the container
``%environment``   Sets environment variables available at runtime
``%runscript``     Defines what happens when the container is executed
``%test``          Defines tests to check whether the container works
``%labels``        Adds metadata such as author or version
``%help``          Adds help text for the container
=================  ============================================================


Advanced Definition File Sections
---------------------------------

Most users only need ``%files``, ``%post``, ``%environment``, ``%runscript``,
``%test``, ``%labels``, and ``%help``. Apptainer also supports advanced sections
that are useful for specialized builds.

============================  ============================================================
Section / Variable            Purpose
============================  ============================================================
``%setup``                    Runs on the host before the container filesystem is finalized
``%startscript``              Defines what runs when an Apptainer instance is started
``$APPTAINER_ROOTFS``         Path to the temporary container root filesystem during build
``$APPTAINER_ENVIRONMENT``    File used to add runtime environment variables during build
============================  ============================================================

.. caution::

   Use ``%setup`` carefully because it runs on the host during the build process.
   Commands in ``%setup`` can access host paths, so avoid destructive commands
   and use full paths.

Example ``%setup`` section:

.. code:: bash

   %setup
       touch ${APPTAINER_ROOTFS}/example_file_from_setup

Use ``$APPTAINER_ENVIRONMENT`` inside ``%post`` when you need to write
environment variables that should be available when the container runs.

Example:

.. code:: bash

   %post
       NOW=$(date)
       echo "export BUILD_DATE=\"${NOW}\"" >> $APPTAINER_ENVIRONMENT

Use ``%startscript`` when the container will be used as a long-running instance,
such as a server-style application.

Example:

.. code:: bash

   %startscript
       echo "Starting container instance"
       sleep infinity



Example Definition File
-----------------------

Create a file named ``example.def``:

::

   nano example.def

Add the following content:

.. code:: bash

   Bootstrap: docker
   From: ubuntu:22.04

   %post
       apt-get update
       apt-get install -y --no-install-recommends cowsay
       apt-get clean
       rm -rf /var/lib/apt/lists/*

   %environment
       export LC_ALL=C

   %runscript
       echo "Container is running"
       echo "Arguments received: $*"
       if [ $# -gt 0 ]; then
           exec "$@"
       else
           /usr/games/cowsay "Hello from Apptainer"
       fi

   %test
       grep -q NAME=\"Ubuntu\" /etc/os-release
       if [ $? -eq 0 ]; then
           echo "Container base is Ubuntu as expected."
       else
           echo "Container base is not Ubuntu."
           exit 1
       fi

   %labels
       Author YourName
       Version v1.0

   %help
       This is a simple example Apptainer definition file.

Build the Container
-------------------
.. warning::

   Avoid large or long-running container builds on login nodes. If the build
   downloads many packages, compiles software, or uses significant CPU, memory,
   or disk I/O, start an appropriate LSF session first and build inside that
   session.

Build a ``.sif`` image from the definition file:

::

   apptainer build example.sif example.def

Some builds may require elevated permissions, especially when installing
software packages inside the container. If root permissions are required, 
use ``--fakeroot``:

::

   apptainer build --fakeroot example.sif example.def

If you do not have fakeroot access, request it through IDSC with a brief
description of your project requirement.

Fakeroot gives root-like permissions inside the build environment, but it does
not give access to host files that the user cannot normally access.


Fakeroot Shell Example
^^^^^^^^^^^^^^^^^^^^^^

You can also start a shell with fakeroot for testing:

::

   apptainer shell --fakeroot alpine_latest.sif

Inside the container, check the user ID:

::

   id

The user may appear as ``root`` inside the container. This does not provide root
access to the host system and does not allow access to protected host files.

Skip Build-Time Tests
---------------------

If the definition file contains a ``%test`` section and you want to skip testing
during the build, use ``--notest``:

::

   apptainer build --notest example.sif example.def

You can run the test later.

Test the Container
------------------

After the image is built, test it with:

::

   apptainer test example.sif

Run the Container
-----------------

Run the container with a command:

::

   apptainer run example.sif echo "Hello from Apptainer"

You can also run the ``.sif`` file directly:

::

   ./example.sif echo "Hello from Apptainer"

View Container Help
-------------------

View the help text defined in the ``%help`` section:

::

   apptainer run-help example.sif

Recommended Usage
-----------------

* Use ``.sif`` files for stable containers.
* Use ``--writable-tmpfs`` for temporary runtime changes.
* Use sandbox directories for interactive testing.
* Use persistent overlays only when changes must persist separately from the base image.
* Use definition files for reproducible builds.

.. important::

   For shared research workflows, keep the definition file together with the
   project code. The ``.sif`` image is useful for running the workflow, but the
   definition file documents how the image was created.
