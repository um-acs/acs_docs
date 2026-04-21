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
  
