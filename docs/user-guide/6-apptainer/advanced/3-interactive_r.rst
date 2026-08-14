.. _apptainer-interactive-r:

Interactive R
=============

This guide shows how to run R interactively on a Pegasus compute node using
an Apptainer container. The example uses the versioned
``rocker/tidyverse:4.4.2`` image, which includes R and commonly used
Tidyverse packages.

.. important::

   Run R sessions on an LSF compute node, not on a Pegasus login node.

Pull the R container
--------------------

Pull the image once from a Pegasus login node. Replace ``<project>`` with a
scratch project that you can use.

.. code-block:: bash

   module purge
   module load apptainer/1.0.2

   PROJECT=<project>
   CONTAINER_DIR=/scratch/$PROJECT/$USER/containers

   mkdir -p "$CONTAINER_DIR"

   apptainer pull \
       "$CONTAINER_DIR/tidyverse_4.4.2.sif" \
       docker://rocker/tidyverse:4.4.2

Confirm that the image was created:

.. code-block:: bash

   ls -lh "$CONTAINER_DIR/tidyverse_4.4.2.sif"

Check the R version inside the container:

.. code-block:: bash

   apptainer exec \
       "$CONTAINER_DIR/tidyverse_4.4.2.sif" \
       R --version

The image used in this example provides R 4.4.2.

Start an interactive LSF session
--------------------------------

Request an interactive compute node:

.. code-block:: bash

   bsub \
       -P hpc \
       -Is \
       -q interactive \
       -W 00:30 \
       -n 1 \
       -R "rusage[mem=2000]" \
       bash

When the job starts, confirm that the shell is running on a compute node:

.. code-block:: bash

   hostname

The hostname should identify a compute node, such as ``n021``, rather than a
login node.

Run R inside the container
--------------------------

On the compute node, load Apptainer and create a working directory:

.. code-block:: bash

   module purge
   module load apptainer/1.0.2

   mkdir -p "$HOME/software-tests/apptainer-r"
   cd "$HOME/software-tests/apptainer-r"

Set the path to the container image. Replace ``<project>`` with the project
used when the image was pulled:

.. code-block:: bash

   PROJECT=<project>
   IMAGE=/scratch/$PROJECT/$USER/containers/tidyverse_4.4.2.sif

Start an interactive R session:

.. code-block:: bash

   apptainer exec \
       --cleanenv \
       --bind "$PWD:/work" \
       "$IMAGE" \
       R --vanilla

The current host directory is mounted inside the container as ``/work``.
Files written to ``/work`` remain available after the container exits.

Example R session
-----------------

At the R prompt, load the Tidyverse packages and create a small output file:

.. code-block:: r

   R.version.string

   library(tidyverse)

   result <- tibble(
     number = 1:5,
     square = number^2
   )

   print(result)

   write_csv(
     result,
     "/work/r-container-output.csv"
   )

   q(save = "no")

After R exits, verify the output from the compute-node shell:

.. code-block:: bash

   cat r-container-output.csv
   ls -lh r-container-output.csv

The CSV file should contain:

.. code-block:: text

   number,square
   1,1
   2,4
   3,9
   4,16
   5,25

End the interactive job
-----------------------

When finished, leave the compute node:

.. code-block:: bash

   exit

The LSF interactive job ends when the shell exits.

Using project data
------------------

Bind a project or scratch directory when R needs access to data outside the
current working directory. For example:

.. code-block:: bash

   DATA_DIR=/scratch/<project>/$USER/data

   apptainer exec \
       --cleanenv \
       --bind "$DATA_DIR:/data" \
       --bind "$PWD:/work" \
       "$IMAGE" \
       R --vanilla

Inside R, the project data is available under ``/data`` and output can be
saved under ``/work``.

Troubleshooting
---------------

Image not found
~~~~~~~~~~~~~~~

Check the full image path:

.. code-block:: bash

   ls -lh "$IMAGE"

If the file is missing, confirm that ``PROJECT`` matches the project used
when the image was pulled.

Cannot write an output file
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Write results to a bound host directory such as ``/work`` or ``/data``.
The container filesystem itself is read-only.

Package not available
~~~~~~~~~~~~~~~~~~~~~

The ``rocker/tidyverse:4.4.2`` image includes the core Tidyverse packages, but
it may not include every R package required by a project. Use a project-specific
container when additional system libraries or preinstalled packages are needed.

Interactive job remains pending
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Interactive jobs wait until resources are available. Use ``bjobs`` from
another Pegasus session to check the job status.