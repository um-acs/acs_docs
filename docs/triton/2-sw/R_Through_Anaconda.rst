Using R through miniforge 
============

It is best to install R through a conda enviornonent. This way you can control the version
of R and its packages independent of the Triton libaries and dependencies. Miniforge is an open source
distribution that aims to simplify package management 
and deployment. It includes numerous data science packages including that of
R.

Load Miniforge software module 
-------

First load the miniforge software module 

::

    [nra20@mgt3.summit ~]$ module load miniforge3/24.3.0-0
    

Create the R conda environment  
-------

Create your anaconda enviornment with r-base. It is recommended to use the conda-forge channel. 

::

    [nra20@mgt3.summit ~]$ conda create -n R_env -c conda-forge r-base
    

Activate your new conda environment  

::

    [nra20@mgt3.summit ~]$ conda activate R_env
    (R_env) [nra20@mgt3.summit ~]$ 

    
Note: the syntax to the left of your command line (R_env) will indicate which conda environment 
is currently active, in this case the R conda environment you just created. 
    

Common R package dependencies 
-------

Some R packages like 'tidycensus', 'sqldf', and 'kableExtra' require additional 
library dependencies in order to install properly. To install library dependencies you may
need for your R packages, you can use the following command:

::

    (R_env) [nra20@mgt3.summit ~]$ conda install -c conda-forge <package>
    
To check if a library depenency is availabe through the conda-forge channel, use the
following link: https://anaconda.org/conda-forge

The package should match Triton's architecture linux-ppc64le. The noarch architecture may also work in some cases
but not always. 


Activating conda environment upon login  
-------

Whenever you login, you will need to re-activate your conda environment to re-enter it. 
To avoid this, you can edit your .bashrc file in your home directory 


::

    [nra20@mgt3.summit ~]$ vi ~/.bashrc
    
Place the following lines in the .bashrc file:


    module load miniforge3/24.3.0-0

    conda activate R_env
    
Then ':wq!' to write, quite and save the file. Upon logging in again your R conda environment will automatically be active.

If you would like to deactivate your conda environment at any time, use the following command:

::

    (R_env) [nra20@mgt3.summit ~]$ conda deactivate r4_MyEnv
    
To obtain a list of your conda environments, use the following command:

::

    [nra20@mgt3.summit ~]$ conda env list
    
    

Running jobs
-------

In order to properly run a job using R within a conda environment you will need to 
load the miniforge module and activate your conda environment within the job script, otherwise the job may fail to find your
version of R. Please see the example job script below:

::

    
    #!/bin/bash
    #BSUB -J jobName
    #BSUB -P projectName
    #BSUB -o jobName.%J.out
    #BSUB -e jobName.%J.err
    #BSUB -W 1:00
    #BSUB -q normal
    #BSUB -n 1
    #BSUB -u youremail@miami.edu

    module load module load miniforge3/24.3.0-0
    conda activate R_env

    cd /path/to/your/R_file.R

    R CMD BATCH R_file.R
    
Note: Sometimes you may need to use the 'Rscript' command instead of 'R CMD BATCH' to run your R file within the job script. 


    

    


