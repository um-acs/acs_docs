Gaussian
========

Triton
------

Gaussian 16 is an electronic structure modeling/calculation software. 
It can be loaded into a user's computing environment by the following 
command

::

  module load gaussian

In order to run calculations with this software, a user needs to create
a scratch directory in their user space, and set the value of the 
variable GAUSS_SCRDIR to the path of their scratch space. This is demonstrated
in the job submission script below:

::

  #!/bin/bash
 
  #BSUB -J h2o              # name of your job
  #BSUB -e %J.err           # file name of output written to std. error
  #BSUB -o %J.out           # file name of output written to std. out
  #BSUB -q normal           # request run on 'normal' queue
  #BSUB -n 4                # request 4 cores
  #BSUB -W 2                # request 2 minutes of runtime
  #BSUB -P XYZ              # your projectID

  module load gaussian

  export GAUSS_SCRDIR=/scratch/projects/XYZ/my_username/my_gaussian_scratch

  g16 h2o.inp

In this job submission script, the user loads gaussian and then sets the value of 
the Gaussian environment variable GAUSS_SCRDIR to the full path of their scratch space
for Gaussian calculations. This calculation will run on 4 cores, and the input file ``h2o.inp``
is modified to reflect the compute resources to be used. See below

::

  %chk=water.chk
  %NProcShared=4

  # HF/6-31G(d)

  water energy              Title section

  0   1
  O  -0.464   0.177   0.0
  H  -0.464   1.137   0.0
  H   0.441  -0.143   0.0

Pegasus
-------

Pegasus provides Gaussian 09 through the ``gaussian`` module.

Check the available versions and load the verified module:

.. code-block:: bash

   module avail gaussian
   module load gaussian/09.e.01

Confirm the executable:

.. code-block:: bash

   which g09

The installed module provides ``g09``. It does not provide ``g16``.

Complete LSF example
~~~~~~~~~~~~~~~~~~~~

Create a working directory. Replace ``dssas`` with a project that you can use:

.. code-block:: bash

   PROJECT=dssas
   WORKDIR=/scratch/$PROJECT/$USER/software-tests/gaussian

   mkdir -p "$WORKDIR"
   cd "$WORKDIR"

Create ``water.com``:

.. code-block:: bash

   cat > water.com <<'EOF'
   %mem=1GB
   %nprocshared=1
   #p hf/sto-3g sp

   Gaussian smoke test

   0 1
   O  0.000000  0.000000  0.000000
   H  0.000000  0.000000  0.960000
   H  0.000000  0.750000 -0.240000

   EOF

Create ``gaussian_test.job``:

.. code-block:: bash

   cat > gaussian_test.job <<'EOF'
   #!/bin/bash
   #BSUB -P hpc
   #BSUB -J gaussian_test
   #BSUB -q general
   #BSUB -n 1
   #BSUB -R "rusage[mem=2000]"
   #BSUB -W 00:10
   #BSUB -o gaussian.%J.out
   #BSUB -e gaussian.%J.err

   set -euo pipefail

   module purge
   module load gaussian/09.e.01

   PROJECT=dssas
   WORKDIR=/scratch/$PROJECT/$USER/software-tests/gaussian
   export GAUSS_SCRDIR="$WORKDIR/scratch/$LSB_JOBID"

   mkdir -p "$GAUSS_SCRDIR"

   g09 < water.com > water.log

   grep -q "Normal termination of Gaussian 09" water.log

   rm -rf "$GAUSS_SCRDIR"

   echo "Gaussian LSF verification successful"
   EOF

Submit the job:

.. code-block:: bash

   bsub < gaussian_test.job

After the job finishes, verify the calculation:

.. code-block:: bash

   grep "Normal termination" water.log
   cat gaussian.*.err

A successful calculation reports:

.. code-block:: text

   Normal termination of Gaussian 09

.. note::

   ``g09 -v`` is not a supported version command and should not be used.
