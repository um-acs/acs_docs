RStudio Server Containers
=========================

This page preserves the older RStudio Server container example in a cleaner and
safer form. Prefer the supported RStudio service when possible. Use a container
only when the required R environment is not available through standard modules or
services.

RStudio Server Warning
----------------------

Do not run RStudio Server containers directly on login nodes. RStudio Server is a
long-running web application and should run through an appropriate LSF session or
an IDSC-recommended workflow.

Request guidance from IDSC before using a containerized RStudio Server for a
project workflow.

RStudio Definition File Example
-------------------------------

The older documentation used a Rocker Tidyverse image as the base. Create a file
named ``tidyverse_long.def``:

.. code:: bash

   Bootstrap: docker
   From: rocker/tidyverse:3.6.1

   %environment
       export LC_ALL=C
       export PASSWORD=password
       export R_USER=$USER
       if [ "$(id -u)" = "1000" ]; then
           export R_USER=rstudio
       fi

   %startscript
       export R_PORT=${R_PORT:-"8787"}
       export R_ADDRESS=${R_ADDRESS:-"0.0.0.0"}
       rserver \
           --www-port ${R_PORT} \
           --www-address ${R_ADDRESS} \
           --auth-none=0 \
           --auth-pam-helper-path=pam-helper

   %test
       echo "R user: ${R_USER}"

   %labels
       Author IDSC
       Version v0.0.1

This example uses environment variables to configure the RStudio user and port.
For real use, do not hard-code reusable passwords in shared files.

Build the RStudio Image
-----------------------

Build the image:

::

   apptainer build --fakeroot tidyverse_long.sif tidyverse_long.def

If fakeroot is not available, request access through IDSC with a brief
description of the project requirement.

Start an RStudio Instance
-------------------------

The older workflow used an Apptainer instance and bind-mounted the working
directory as the container home directory. Start the instance inside an
interactive LSF session:

::

   bsub -q general -P <project> -Is bash
   module load apptainer/1.1.5
   export R_USER=${USER}
   apptainer instance start -c -B $(pwd):/home/${R_USER} tidyverse_long.sif myserver

List running instances:

::

   apptainer instance list

Check environment values inside the instance:

::

   apptainer exec instance://myserver echo $USER $PASSWORD

Access RStudio
--------------

The RStudio Server normally listens on port ``8787``. Access depends on the
approved network and port-forwarding method for your cluster session.

Example URL pattern:

::

   http://<host>:8787/

Use the host and access method recommended by IDSC. Do not expose RStudio Server
publicly.

Stop the RStudio Instance
-------------------------

Stop the instance when finished:

::

   apptainer instance stop myserver

If an instance is left running, list instances and stop the correct one.
