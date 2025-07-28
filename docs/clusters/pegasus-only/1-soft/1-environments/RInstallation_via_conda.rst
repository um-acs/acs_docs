Using R through Anaconda
========================

If you find that the current R modules on Pegasus do not support 
dependencies for your needed R packages, an alternative option is 
to install them via an Anaconda environment. Anaconda is an open source
distribution that aims to simplify package management 
and deployment. It includes numerous data science packages including that of
R.

Anaconda Installation
---------------------

First you will need to download and install Anaconda in your home directory. 

::

    [username@pegasus ~]$ wget https://repo.anaconda.com/archive/Anaconda3-2021.05-Linux-x86_64.sh

Unpack and install the downloaded Anaconda bash script

::

    [username@pegasus ~]$ bash Anaconda3-2021.05-Linux-x86_64.sh
    

Configuring Anaconda environment 
---------------------------------

Activate conda with the new Anaconda3 folder in your home directory (Depending on your download this folder might also be named 'ENTER')

::

    [username@pegasus ~]$ source <path to conda>/bin/activate
    [username@pegasus ~]$ conda init
    
    
    
Create a conda environment that contains R 

::

    [username@pegasus ~]$ conda create -n r4_MyEnv r-base=4.1.0 r-essentials=4.1
    
    
Activate your new conda environment  

::

    [username@pegasus ~]$ conda activate r4_MyEnv
    (r4_MyEnv) [username@pegasus ~]$ 
    
Note: the syntax to the left of your command line (r4_MyEnv) will indicate which conda environment 
is currently active, in this case the R conda environment you just created. 
    

Common R package dependencies 
-----------------------------

Some R packages like 'tidycensus', 'sqldf', and 'kableExtra' require additional 
library dependencies in order to install properly. To install library dependencies you may
need for your R packages, you can use the following command:

::

    (r4_MyEnv) [username@pegasus ~]$ conda install -c conda-forge <library_name>
    
To check if a library depenency is availabe through the conda-forge channel, use the
following link: https://anaconda.org/conda-forge

Below is an example of installing library dependencies needed for 'tidycensus', then the R package itself.


::

    (r4_MyEnv) [username@pegasus ~]$ conda install -c conda-forge udunits2
    (r4_MyEnv) [username@pegasus ~]$ conda install -c conda-forge gdal
    (r4_MyEnv) [username@pegasus ~]$ conda install -c conda-forge r-rgdal
    (r4_MyEnv) [username@pegasus ~]$ R
    > install.packages('tidycensus') 
    

Activating conda environment upon login  
----------------------------------------

Whenever you login, you will need to re-activate your conda environment to re-enter it. 
To avoid this, you can edit your .bashrc file in your home directory 


::

    [username@pegasus ~]$ vi ~/.bashrc
    
Place the following lines in the .bashrc file:
    
    conda activate r4_MyEnv
    
Then ':wq!' to write, quit and save the file. Upon logging in again your R conda environment will automatically be active.

If you would like to deactivate your conda environment at any time, use the following command:

::

    (r4_MyEnv) [username@pegasus ~]$ conda deactivate r4_MyEnv
    
To obtain a list of your conda environments, use the following command:

::

    [username@pegasus ~]$ conda env list
    
    

Running jobs
--------------

In order to properly run a job using R within a conda environment you will need to 
initiate & activate the conda environment within the job script, otherwise the job may fail to find your
version of R. Please see the example job script below:

::

    
    #!/bin/bash
    #BSUB -J jobName
    #BSUB -P projectName
    #BSUB -o jobName.%J.out
    #BSUB -e jobName.%J.err
    #BSUB -W 1:00
    #BSUB -q general
    #BSUB -n 1
    #BSUB -u youremail@miami.edu

    . “/nethome/caneid/anaconda3/etc/profile.d/conda.sh” 
    conda activate r4_MyEnv

    cd /path/to/your/R_file.R

    R CMD BATCH R_file.R
    
Note: Sometimes you may need to use the 'Rscript' command instead of 'R CMD BATCH' to run your R file within the job script. 


    

    


