Running LSF Job with Singularity/Apptainer 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Requirements**

Use of bsub requires the following environment variables to be set in LSF job submission.  

BSUB_ENVIRONMENT_PROFILES - a comma separated list of full paths to profile files that should be executed before running the Singularity command. This is used to set up the environment in the bsub. 

BSUB_SINGULARITY_EXEC - Singularity exe path 

CURRENT_SINGULARITY_IMAGE - the Singularity image to be run via bsub (full path) 

LSF_BIN_PATH - the full path to the LSF bin directory 

LSF_ETC_PATH - the full path to the LSF etc directory 

Alternatively, the SINGULARITY_BIND environment variable can be set to include any directory paths that are required within the containers. For example: 

Create singularity.job file and it describes, trying to execute the python script file using anaconda and singularity container   


.. code:: bash

    $ cat singularity.job  

    #!/bin/bash 
    #BSUB -P hpc 
    #BSUB -J mysingularityjob 
    #BSUB -o /scratch/projects/hpc/rajesh/sing.out 
    #BSUB -e /scratch/projects/hpc/rajesh/sing.err 
    #BSUB -q general 
    #BSUB -n 1 
    #BSUB -R "rusage[mem=200]" 
    #BSUB -W 1:00 
    #  
    module load anaconda3 
    module load apptainer/1.0.2 
    source /share/apps/anaconda/anaconda3_build/bin/activate 
    conda activate rajesh_env 
    export BSUB_SINGULARITY_EXEC="/share/builds/spack19/opt/spack/linux-centos7-sandybridge/gcc-11.3.0/apptainer-1.1.5-baeofwaslern4ytiqr36sfo4tl6tv327/bin/singularity" 
    export CURRENT_SINGULARITY_IMAGE="/nethome/rxp1166/alpine.sif, /nethome/rxp1166/python_latest.sif" 
    export LSF_BIN_PATH="/share/lsf/9.1/linux2.6-glibc2.3-x86_64/bin" 
    export LSF_ETC_PATH="/share/lsf/9.1/linux2.6-glibc2.3-x86_64/etc" 
    export APPTAINER_BIND="/nethome/rxp1166/" 
    singularity --version 
    singularity exec docker://alpine cat /etc/os-release 
    singularity run /nethome/rxp1166/python_latest.sif python3 pyscript.py 
    python3 pyscript.py  
    echo "LSF JOB IS RUNNING WITH SINGULARITY" 


**Note:** LSF job with singularity 1.1.5, will result some issues with root permissions and fetching files and to avoid those issues, loaded previous version of apptainer/1.0.2 module in script file and submit the job. 

::

    $ bsub -m "n263" <singularity.job   # submitting a job to specific node 
    $ bjobs                             # checking job still running or not 
    $bhist -l 28030909                  # job history 
    $ cd /scratch/projects/hpc/rajesh/  # moving to the ouput path
    $ cat sing.out                      # checking ouput 
    
    **Successfully completed job with singularity container.** 
    Resource usage summary: 
    CPU time :                                   2.69 sec. 
    Max Memory :                                 63 MB 
    Average Memory :                             25.00 MB 
    Total Requested Memory :                     200.00 MB 
    Delta Memory :                               137.00 MB 
    Max Processes :                              5 
    Max Threads :                                6 

    The output (if any) follows: 
    apptainer version 1.0.2 
    NAME="Alpine Linux" 
    ID=alpine 
    VERSION_ID=3.18.2 
    PRETTY_NAME="Alpine Linux v3.18" 
    HOME_URL="https://alpinelinux.org/" 
    BUG_REPORT_URL="https://gitlab.alpinelinux.org/alpine/aports/-/issues" 
    The sum of 1.5 and 6.3 is 7.8   # out put from 
    The sum of 1.5 and 6.3 is 7.8 
    LSF JOB IS RUNNING WITH SINGULARITY 


Comparison of LSF Job with Singularity and Normal
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

 Above job submitted with singularity and normal queue LSF job Submission; we can observe that deviations of utilizing CPU time and memory are less while using singularity container instead of normal LSF job submission. 


::

    Successfully completed job with normal LSF Submission. 
    Resource usage summary: 

    CPU time :                                   4.03 sec. 
    Max Memory :                                 83 MB 
    Average Memory :                             74.11 MB 
    Total Requested Memory :                     128.00 MB 
    Delta Memory :                               45.00 MB 
    Max Processes :                              5 
    Max Threads :                                6 

    The output (if any) follows: 
    The program lasts for 121.33388948440552 seconds. 
    The sum of 1.5 and 6.3 is 7.8 