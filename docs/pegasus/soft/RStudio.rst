RStudio on Pegasus
==================

Rstudio is available graphically as a singularity container. The current version is R/4.2.1 using a tidyverse base. 


Setup your $RSTUDIO_WORK_DIR
-------------------

::

    [pdavila@pegasus ~]$ echo "export RSTUDIO_WORK_DIR=/$HOME/rstudio/" >> ~/.bash_profile
    [pdavila@pegasus ~]$ source ~/.bash_profile
    [pdavila@pegasus ~]$ mkdir -p $RSTUDIO_WORK_DIR
    [pdavila@pegasus ~]$ cp /projectnb/pegasus/sw/rstudio/pegasus_rstudio_lsf.* $RSTUDIO_WORK_DIR/
    
    [pdavila@pegasus rstudio]$ ls -lh $RSTUDIO_WORK_DIR/
    -rw-r--r-- 1 pdavila hpc           5.0K Aug 27 11:23 pegasus_rstudio_lsf.job
    -rwxr-xr-x 1 pdavila hpc            516 Aug 27 10:46 pegasus_rstudio_lsf.sh

       
Edit your rstudio_lsf.job Script 
----------------------------
You should set your project, queue, and email.  You may also want to update the requested LSF 1. runtime, cpu cores, and memory, defaults below.  

::

    [pdavila@login4 ~]$ module load python
    [pdavila@login4 ~]$ module load singularity 
    [pdavila@login4 ~]$ cd $RSTUDIO_WORK_DIR   # Edit the Job script
    [pdavila@login4 rstudio]$ head -20 $RSTUDIO_WORK_DIR/pegasus_rstudio_lsf.job
    #!/bin/sh
    #BSUB -J rstudio_server         # Job Name
    #BSUB -o %J.out                 # Save standard output to JOBID.out
    #BSUB -e %J.err                 # Save standard error to JOBID.err
    #BSUB -P projectID              # Project ID 
    #BSUB -q normal                 # Select LSF Queue 
    #BSUB -W 8:00                   # 8 hours, 0 minutes job walltime (runtime)
    #BSUB -n 1                      # Set n = number of cores (1 in this template)
    #BSUB -R "span[hosts=1]"        # Select all cores from the same host
    #BSUB -R "rusage[mem=7800]"     # Requests 7,800 MB of RAM per core
    #BSUB -u email@miami.edu        # Email address to send notification to
    #BSUB -B                        # Email user (-u) when job is dispatched and begins execution
    #BSUB -N                        # Email user (-u) job statistics report when job finishes.
     
    ###############################################################################
    # DEFAUTS
    ###############################################################################
     
    module load singularity
     
    LOGIN_NODE="pegasus2.ccs.miami.edu"
    R="4.4.2_v5"
    BASE="tidyverse"
     
    IMAGE="rocker/${BASE}:${R}"
    IMAGE_DIR="/projectnb/pegasus/sw/rstudio/sif"
    SIF="${IMAGE_DIR}/${BASE}_${R}.sif"
    SINGULARITY_BIND="/scratch,/projectnb"

    


Run RSTUDIO on Pegasus Nodes
-------------------------------------
The wrapper script will return your JOBID, RStudio Server URL, and credentials.  It will also return the LSF command you can use to close your job, should you finish your work in less time than the requested runtime (-W 8:00). Please follow the instructions as detailed in the job message. Example below:

::

    [pdavila@pegasus ~]$ cd $RSTUDIO_WORK_DIR
    [pdavila@pegasus rstudio]$ ./pegasus_rstudio_lsf.sh 
    Job is submitted to <projectID> project.
    JOBID: 28929532
     
    << output from stdout >>
    The RStudio Singularity container (/projectnb/pegasus/sw/rstudio/sif/tidyverse_4.2.1.sif) is available.
     
     1. Create an SSH tunnel from your workstation in a new terminal with the
        following command:
     
       ssh -N -L 8787:n127:60218 pdavila@pegasus.ccs.miami.edu
     
       and point your web browser to http://localhost:8787
     
    2. log in to RStudio Server using the following credentials:
     
       user: pdavila
       password: aTAfBBKffxjdDsu+y4fs
     
    When done using RStudio Server, terminate the job by:
     
    1. Exit the RStudio Session ("power" button in the top right corner of the RStudio window)
    2. Issue the following command on the login node:
     
          bkill 28929505
     
    << output from stderr >>


The RStudio graphical interface will then appear, from which you can utilize and install any needed packages. Remember to create an ssh tunnel by opening a new terminal on your local machine and running the ssh command as specified above.

If you recieve a message where your job is pending like so:

::

    Job is submitted to <hpc> project.
    JOBID: 397799
    Your LSF job is pending.  Please run "bjobs -l 397799" for more information.


You can use the following command to retireve the connection details:

::

    bpeek 397799


**DO NOT SHARE YOUR RSTUDIO JOB CREDENTIALS!!!**
 
The password generated by pegasus_rstudio_lsf.sh is a randomly generated per JOB.
THE JOB WILL HAVE ACCESS TO ALL SINGULARITY_BIND DIRECTORIES YOU HAVE ACCESS TO ON PEGASUS.

If you run into any issues, please send an email to hpc@ccs.miami.edu 


Updating an RStudio Container
-----------------------------

We can install most R packages to our personal R library from the RStudio GUI and RStudio terminal. 

Some R packages will require us to update the container.  We can update the container from any Linux environment we have sudo, for example a Windows Subsystem for Linux (WSL) VM.

Installing WSL
~~~~~~~~~~~~~~

1. Open "Admin By Request" and authenticate.  You will need admin access on your UM/UHealth IT managed Windows machine to install WSL.

2. Open PowerShell as Administrator: Right-click the Start button and select "Windows PowerShell (Admin)" or "Windows Terminal (Admin)."

3. Enable WSL: Run the following command to enable WSL and install the default Ubuntu distribution.

:: 

  PS C:\>wsl --install

If this is the first time you install WSL on your machine, it is recommended to reboot your machine to complete the setup.

You only need admin privileges to install WSL once.  After WSL is installed, you do not need admin privileges to install additional VM's. 

Let's install AlmaLinux-8, a RHEL8 distribution like the OS we run on pegasus.idsc.miami.edu.  Open a regular Windows PowerShell or Windows Terminal and run the following commands.

::

  PS C:\> wsl --list --online
  PS C:\> wsl --install AlmaLinux-8

We will now be in your new VM.

::

  # Change Directory to your home folder
  [pdavila@UH-B9XLL33 v1.0]$ cd

  [pdavila@UH-B9XLL33 ~]$ cat /etc/redhat-release
  AlmaLinux release 8.10 (Cerulean Leopard)

I suspect the default network settings will also not work.  Below is how we fix the network access.

Fix WSL network access
~~~~~~~~~~~~~~~~~~~~~~

::

  [pdavila@UH-B9XLL33 ~]$ cat fix_network.sh
  #!/usr/bin/sh

  sudo chattr -i /etc/resolv.conf
  sudo rm /etc/resolv.conf
  sudo bash -c 'echo "nameserver 10.50.50.100" > /etc/resolv.conf'
  sudo bash -c 'echo "nameserver 10.100.50.100" >> /etc/resolv.conf'
  sudo bash -c 'echo "nameserver 8.8.8.8" >> /etc/resolv.conf'
  sudo bash -c 'echo "[network]" > /etc/wsl.conf'
  sudo bash -c 'echo "generateResolvConf = false" >> /etc/wsl.conf'
  sudo chattr +i /etc/resolv.conf

  [pdavila@UH-B9XLL33 ~]$ chmod +x ./fix_network.sh
  [pdavila@UH-B9XLL33 ~]$ sudo ./fix_network.sh


We will now install e2fsprogs, rsync and epel-release.  We need e2fsprogs for the chattr (prevent WSL from change /etc/resolv.conf), rsync to transfer files cleanly and epel-release for apptainer (singularity).
::

  [pdavila@UH-B9XLL33 ~]$ sudo dnf update -y
  [pdavila@UH-B9XLL33 ~]$ sudo dnf install rsync e2fsprogs epel-release -y
  [pdavila@UH-B9XLL33 ~]$ sudo dnf install apptainer -y

Download container we want to update
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
::

  [pdavila@UH-B9XLL33 ~]$ rsync -av pdavila@pegasus.idsc.miami.edu:/sccc/projects/sccc_iavarone/rstudio/rstudio_sccc_R-4.3.3_v12.sif ./

Create sandbox from the Singularity container 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
::

  [pdavila@UH-B9XLL33 ~]$ TMPDIR=/tmp/pdavila/rstudio
  [pdavila@UH-B9XLL33 ~]$ mkdir -p $TMPDIR
  [pdavila@UH-B9XLL33 ~]$ time sudo singularity build --sandbox ${TMPDIR}/rstudio_sccc_R-4.3.3_v12 rstudio_sccc_R-4.3.3_v12.sif
 
  INFO:    Starting build...
  INFO:    Verifying bootstrap image rstudio_sccc_R-4.3.3_v12.sif
  INFO:    Extracting local image...

  INFO:    Creating sandbox directory...
  INFO:    Build complete: /tmp/pdavila/rstudio/rstudio_sccc_R-4.3.3_v12

  real    0m54.754s
  user    1m27.472s
  sys     1m5.582s

Edit the sandbox
~~~~~~~~~~~~~~~~
::

  [pdavila@UH-B9XLL33 ~]$ sudo singularity shell --writable ${TMPDIR}/rstudio_sccc_R-4.3.3_v12

We will now be inside the container.  Here we should always first run "apt update" to update repos.  Then we can upgrade OS packages, install OS packages, or even install R packages.  
::

  Singularity> apt update
  Singularity> apt install libgl1-mesa-dev libglu1-mesa-dev

  Singularity> R
  > remotes::install_github("dmurdoch/rgl")
  …
  ** testing if installed package can be loaded from final location
  ** testing if installed package keeps a record of temporary installation path
  * DONE (rgl)
  > q()

Create new container
~~~~~~~~~~~~~~~~~~~~
::

  Singularity> exit
  [pdavila@UH-B9XLL33 ~]$ time sudo singularity build rstudio_sccc_R-4.3.3_v13.sif ${TMPDIR}/rstudio_sccc_R-4.3.3_v12/

We can now use rsync to transfer the new container to Pegasus and then update our RSTUDIO LSF Job script to use the new container.



