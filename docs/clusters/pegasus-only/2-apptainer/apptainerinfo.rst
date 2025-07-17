Introduction to Singularity/Apptainer on Pegasus
=================================================

Apptainer is a **container platform** earlier called **singularity
containers.** It allows you to create and run containers that package up
pieces of software in a way that is portable and reproducible. You can
build a container using Apptainer on your laptop, and then run it on
many of the largest HPC clusters in the world, local university or
company clusters, a single server, in the cloud, or on a workstation.
Your container is a single file, and you don’t have to worry about how
to install all the software you need on each different operating system
and it reduces configuration setup work manually. We have implemented some of the applications using singularity and completed documentation.

.. 1. `Quick start of Singularity`_ 

.. 2. `Switching OS to run specific applications`_  

.. 3. `Running Singularity container with python script`_

.. 4. `Running GUI Jupyter notebook through apptainer container`_  

.. 5. `Apptainer Interactive applications using MATLAB and R`_ 

.. 6. `Apptainer Definition Files`_

.. 7. `Apptainer GUI R Studio Server`_

.. 8. `Running LSF Job with Singularity or Apptainer`_ 

.. 9. `Comparison of LSF Job with singularity and Normal`_

.. 10. `Singularity GPU Support with PyTorch and TensorFlow`_ 

.. 11. `LSF JOB with Singularity GPU access Script submission`_ 

.. 12.  `LSF Job with MCMICRO with singularity, NextFlow`_ 

.. 13.  `Nextflow custom configuration to run LSF Job`_  

.. 14.  `nf-core Module for Nextflow`_ 

.. 15. `SIF Image Verification / Fingerprints Header`_

**Why use Apptainer**

Apptainer was created to run complex applications on HPC clusters in a
simple, portable, and reproducible way. Many container platforms are
available, but Apptainer is focused on:

     * Verifiable reproducibility and security, using cryptographic signatures,an immutable container image format, and in-memory decryption.

     * Integration over isolation by default. Easily make use of GPUs, high speed networks, parallel file systems on a cluster or server by default.

     * Mobility of compute. The single file SIF container format is easy to transport and share.

     * A simple, effective security model. You are the same user inside a container as outside, and cannot gain additional privilege on the host system by default. Read more about Security in
          Apptainer: https://apptainer.org/docs/admin/1.0/security.html

**About Singularity**

Docker is the most commonly talked about container runtime, but most HPC clusters use Singularity. The following table should make the reasons clear: 


=======  ===================================================  =================================================================
S.NO     Docker                                               Singularity 
=======  ===================================================  =================================================================
1        Designed for infrastructure deployment               Designed for scientific computing
2        Operating system service                             User application 
3        In practice, gives root access to whole system       Does not give or need extra permissions to the system 
4        Images stored in layers in hidden operating system   One image is one .sif file which you manage using normal commands.
         locations opaquely managed through some commands.
=======  ===================================================  =================================================================



Quick start of Singularity
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This guide is intended for running Apptainer on Pegasus with few intended applications scenarios. Apptainer’s command line
interface : https://apptainer.org/docs/user/1.1/cli.html#cli allows you to build and interact with containers transparently. You can run programs inside a container as if they were running on your host system. You can easily redirect IO, use pipes, pass arguments, and access files, sockets, and ports on the host system from within a container.

After logging into pegasus, see availability of apptainer modules using command
"$ **module av**"  and load module to user environment $ **Module load apptainer/1.1.5** and check
"**$ module list**" whether modules are loaded to the user environment or not.

To make it persistent across sessions, edit the **vi ~/.bashrc**  file and add  **module load apptainer/version**  at last .

Overview of the Apptainer Interface
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Verify the version of apptainer
::

     $ apptainer --version
       apptainer version 1.1.5

The help command gives an overview of Apptainer options and subcommands as follows.

::

   $ apptainer help <command> [<subcommand>]
   $ apptainer help build**
   $ apptainer help instance start

.. image:: ./apptainerhelp1.png
  :width: 600
  :alt: An image of the Text component in the visual editor.

Below command Allow users to verify cryptographic signatures of container SIF (Singularity Image Format)  image files.  

.. image:: ./apptainerverify2.png
  :width: 600
  :alt: An image of the Text component in the visual editor.

Check id and OS of host application using commands  

:: 

     $id 
     $ cat  /etc/os-release 
     NAME="CentOS Linux" 
     VERSION="7 (Core)" 
     ID="centos" 
     ID_LIKE="rhel fedora" 

Use one of the following commands to interact with Singularity containers: 

* singularity shell — for an interactive shell within the container 
* singularity exec  — for executing commands within the container 
* singularity run   — for executing a pre-defined runscript within the container 


Switching OS to run specific applications
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Shell**

The shell command allows you to spawn a new shell within your container and interact with it as though it were a small virtual machine.shell also works with the docker://, oras://, library://, and shub:// URIs. This creates an ephemeral container that disappears when the shell is exited. 

Run  shell with a container linux version of alpine. Alpine Linux is a popular OS choice for running containers. Using a single command, we can change the OS as per application requirement. 

.. code:: bash
  
     $ apptainer shell docker://alpine 
     INFO:    Using cached SIF image 
     INFO:    squashfuse not found, will not be able to mount SIF 
     INFO:    fuse2fs not found, will not be able to mount EXT3 filesystems 
     INFO:    Converting SIF file to temporary sandbox...
     Apptainer> cat  /etc/os-release 
     NAME="Alpine Linux" 
     ID=alpine 
     VERSION_ID=3.18.2 
     PRETTY_NAME="Alpine Linux v3.18" 
     HOME_URL="https://alpinelinux.org/" 
     BUG_REPORT_URL="https://gitlab.alpinelinux.org/alpine/aports/-/issues" 

Observe the same user, file contents and uid and gid  are similar when inside the container and outside the container.  

:: 

     Apptainer> id 
     Apptainer> exit    #Exit from the container   

:: 

     $ apptainer shell docker://python 
     INFO:    Using cached SIF image 
     INFO:    squashfuse not found, will not be able to mount SIF 
     INFO:    fuse2fs not found, will not be able to mount EXT3 filesystems 
     INFO:    Converting SIF file to temporary sandbox... 
     Apptainer> python 
     Python 3.11.4 (main, Jul  4 2023, 05:25:16) [GCC 12.2.0] on linux 
     Type "help", "copyright", "credits" or "license" for more information. 
     >>> 15/3 
     5.0 
     >>> exit() 



**Executing Commands** 

The exec command allows you to execute a custom command within a container by specifying the image file. The above shell running  container is also same as running command  with container  

:: 

     $ apptainer exec docker://alpine cat /etc/os-release 

**Running a container**

run is the command you use to create a new container from an image, while  exec lets you run commands on an already running container. 
running python in container  

:: 

     $ apptainer run docker://python 

Because Apptainer run scripts are evaluated, shell scripts arguments can behave slightly differently than in Docker/OCI runtimes, if they contain shell code that may be evaluated. To replicate Docker/OCI behavior you may need additional escaping or quoting of arguments. 

:: 

     $ docker run -it --rm alpine echo "\$HOSTNAME" 
     $HOSTNAME 
     $ apptainer run docker://alpine echo "\$HOSTNAME" 
     p700 
     $ apptainer run docker://alpine echo "\\\$HOSTNAME" 
     $HOSTNAME 

**positional syntax of Apptainer**

Apptainer uses positional syntax (i.e. the order of commands and options matters). Global options affecting the behavior of all commands follow the main apptainer command. Then sub commands are followed by their options and arguments. 

For example, to pass the --debug option to the main apptainer command and run Apptainer with debugging messages on: 

For example, to pass the --debug option to the main apptainer command and run Apptainer with debugging messages on: 
:: 

     $ apptainer --debug run docker://alpine 

To pass the --containall option to the run command and run a Apptainer image in an isolated manner: 

:: 

     $ apptainer run --containall docker://alpine 
     INFO:    Using cached SIF image 
     INFO:    squashfuse not found, will not be able to mount SIF 
     INFO:    fuse2fs not found, will not be able to mount EXT3 filesystems 
     INFO:    Converting SIF file to temporary sandbox… 
     Apptainer> cat /etc/os-release 
     NAME="Alpine Linux" 
     ID=alpine 
     VERSION_ID=3.18.2 
     PRETTY_NAME="Alpine Linux v3.18" 
     HOME_URL="https://alpinelinux.org/" 
     BUG_REPORT_URL="https://gitlab.alpinelinux.org/alpine/aports/-/issues" 
     Apptainer>exit  



**Downloading images**

You can use the pull and build commands to download images from an external resource like an OCI registry. 
You can use pull with the docker:// uri to reference OCI images served from an OCI registry. In this case pull does not just download an image file. OCI images are stored in layers, so pull must also combine those layers into a usable Apptainer file. 

:: 

     $ apptainer pull docker://alpine 
     INFO:    Using cached SIF image 
     $ ls 
     Alpine_latest.sif 
     $ apptainer shell alpine_latest.sif 

You can also use the build command to download pre-built images from an external resource. When using build you must specify a name for your container like so. 

In addition to downloading images, you can use build to create images from other images or from scratch using a definition file. You can also use build to convert an image between the container formats supported by Apptainer. 

::

     $ apptainer build alpine.sif docker://alpine 
     $ apptainer shell alpine_latest.sif 
     Similarly  downloading python , $ apptainer pull docker://pyhton 


Running Singularity container with python script
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

::

     $ apptainer shell python_latest.sif   # run python either using shell command 
     # or  run pyhton from the folder of sif image  
     $ ls 
     alpine.sif  data  python_latest.sif  rajesidsc  ubuntu 
     $ ./python_latest.sif 
     Python 3.11.4 (main, Jul  4 2023, 05:25:16) [GCC 12.2.0] on linux 
     Type "help", "copyright", "credits" or "license" for more information. 
     >>> 16/4 
     4.0 
     >>> exit() 


Python file is executed using container by adding some script to py file 

::

     Apptainer> $ python3 pyscript.py  

     The sum of 1.5 and 6.3 is 7.8 

Which is also same as  

::

     $ singularity run /nethome/pegasus_userid/python_latest.sif python3 pyscript.py  
     INFO:    squashfuse not found, will not be able to mount SIF 
     INFO:    fuse2fs not found, will not be able to mount EXT3 filesystems 
     INFO:    Converting SIF file to temporary sandbox... 
     The sum of 1.5 and 6.3 is 7.8 

 
**Working with Files** 

Files on the host are reachable from within the container. This example works because hostfile.txt exists in the user’s nethome directory. By default Apptainer binds mounts /nethome/$USER, /tmp, and $PWD into your container at runtime. 

::

     $ apptainer exec alpine_latest.sif cat /nethome/user/hostfile.txt  
     INFO:    squashfuse not found, will not be able to mount SIF 
     INFO:    fuse2fs not found, will not be able to mount EXT3 filesystems 
     INFO:    Converting SIF file to temporary sandbox... 
     Hello from inside the container 
     Welcome to IDSC University of miami 
     INFO:    Cleaning up image.. 

You can specify additional directories to bind mount into your container with the --bind option. In this example, the data directory on the host system is bind mounted to the /mnt directory inside the container. Pipes and redirects also work with Apptainer commands just like they do with normal Linux commands. 

::

     $ apptainer exec --bind data:/mnt alpine_latest.sif cat /mnt/hostfile.txt 
     INFO:    squashfuse not found, will not be able to mount SIF 
     INFO:    fuse2fs not found, will not be able to mount EXT3 filesystems 
     INFO:    Converting SIF file to temporary sandbox... 
     Welcome to IDSC University of miami 

 
**Build images from scratch** 

Apptainer produces immutable images in the Singularity Image File (SIF) format. This ensures reproducible and verifiable images and allows for many extra benefits such as the ability to sign and verify your containers. 

However, during testing and debugging you may want an image format that is writable. This way you can shell into the image and install software and dependencies until you are satisfied that your container will fulfill your needs. For these scenarios, Apptainer also supports the sandbox format (which is really just a directory). 

**Sandbox Directories**

To build into a sandbox (container in a directory) use the build --sandbox command and option:  It creates a directory called ubuntu/ with an entire Ubuntu Operating System and some Apptainer metadata in your current working directory. 

:: 

     $ apptainer build --sandbox ubuntu/ docker://ubuntu 
     INFO:    Starting build... 
     Getting image source signatures 
     Copying blob 3153aa388d02 done   
     Copying config 5a81c4b850 done   
     Writing manifest to image destination 
     Storing signatures 
     2023/07/17 14:40:16  info unpack layer: sha256:3153aa388d026c26a2235e1ed0163e350e451f41a8a313e1804d7e1afb857ab4 
     INFO:    Creating sandbox directory... 
     INFO:    Build complete: ubuntu/ 
     $ ls 
     alpine_latest.sif  data  python_latest.sif  ubuntu 

You can use commands like shell, exec , and run with this directory just as you would with an Apptainer image. 

 
**Persistent Overlays** 

Persistent overlay directories allow you to overlay a writable file system on an immutable read-only container for the illusion of read-write access. You can run a container and make changes, and these changes are kept separately from the base container image. 

A persistent overlay is a directory or file system image that “sits on top” of your immutable SIF container. When you install new software or create and modify files the overlay will store the changes. 

If you want to use a SIF container as though it were writable, you can create a directory, an ext3 file system image, or embed an ext3 file system image in SIF to use as a persistent overlay. Then you can specify that you want to use the directory or image as an overlay at runtime with the --overlay option, or --writable if you want to use the overlay embedded in SIF. 

If you want to make changes to the image, but do not want them to persist, use the --writable-tmpfs option. This stores all changes in an in-memory temporary filesystem which is discarded as soon as the container finishes executing. You can use persistent overlays with the following commands: run , exec , shell , instance.start.
 

**Singularity’s image cache**

If you delete a local .sif image that you have pulled from a remote image repository and then pull it again, if the image is unchanged from the version you previously pulled, you will be given a copy of the image file from your local cache rather than the image being downloaded again from the remote source. This removes unnecessary network transfers and is particularly useful for large images which may take some time to transfer over the network. How do we know what is stored in the local cache. We can remove images from the cache using the singularity cache clean command. 

::  

     $ singularity cache list 
     There are 15 container file(s) using 10.59 GiB and 153 oci blob file(s) using 11.33 GiB of space 
     Total space used: 21.93 GiB 
     $ singularity cache list -v 
     NAME                     DATE CREATED           SIZE             TYPE 
     0029e44678dea8cce45ca1   2023-07-31 08:44:50    0.46 KiB         blob 
     05ab2ba4cfe019600dcac9   2023-07-07 11:01:43    0.40 KiB         blob 
     0bdc66ab19a915c27fcb43   2023-07-26 09:45:39    6.89 KiB         blob 
     0d0dce5452b7074590ad5d   2023-08-07 12:01:55    0.75 KiB         blob 

 
We can remove images from the cache using the "$ singularity cache clean"  command 


**Namespaces:**

Namespaces are logical partitions (isolation) of container resources like user, system, network, mount similarly as development, testing, staging, production environments. Namespaces provides intelligence integration with container  

:: 

     $ man namespaces 

**fake root user inside container:** 

Initially you need to get the fake root permissions from IDSC and requested to raise the ticket with brief description of project requirement to hpc@ccs.miami.edu .  A “fake root” user has almost the same administrative rights as root but only inside the container and the requested namespaces, which means that this user: can set different user/group ownership for files or directories they own can change user/group identity with su/sudo commands has full privileges inside the requested namespaces (network, ipc, uts) .

A “fake root” user can’t access or modify files and directories for which they don’t already have access or rights on the host filesystem, so a “fake root” user won’t be able to access root-only host files like /etc/shadow or the host /root directory. 

:: 


     $ apptainer shell --fakeroot alpine.sif  
     INFO:Converting SIF file to temporary sandbox.. 
     Apptainer> id 
     uid=0(root) gid=0(root) groups=65534(nobody) 
     Apptainer> ls -l 
     total 342117 
     -rwxr-xr-x    1 root     root       3338240 Jul 13 15:43 alpine.sif 
     drwxr-xr-x    2 root     root           512 Jul 17 13:43 data 
     -rwxr-xr-x    1 root     root     346984448 Jul 13 16:23 python_latest.sif 
     -rw-r--r--    1 root     root             0 Jul 17 15:13 rajesidsc 
     drwxr-xr-x   18 root     root          4096 Jul 17 14:40 ubuntu 
     Apptainer> exit 

 
:: 

     $ ls -l 
     total 342117 
     -rwxr-xr-x  1 apptaineruser ccsuser   3338240 Jul 13 15:43 alpine.sif 
     drwxr-xr-x  2 apptaineruser ccsuser       512 Jul 17 13:43 data 
     -rwxr-xr-x  1 apptaineruser ccsuser 346984448 Jul 13 16:23 python_latest.sif 
     -rw-r--r--  1 apptaineruser ccsuser         0 Jul 17 15:13 rajesidsc 
     drwxr-xr-x 18 apptaineruser ccsuser      4096 Jul 17 14:40 ubuntu 

 
Running GUI Jupyter notebook through apptainer container
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
see JupyterHub on Pegasus User Menu
https://acs-docs.readthedocs.io/pegasus/soft/Jupyterhub.html

JupyterHub on Triton User Menu
https://acs-docs.readthedocs.io/triton/2-sw/jh.html

Do not run Jupyter Notebook and RStudio container applications directly, as they will continue running on login nodes. This guide demonstrates the  way to run container applications on HPC systems.  These Containers should only be used for specific applications when the required software modules are not available on the HPC cluster. Before running any container application, please send an email or raise ticket to hpc@ccs.miami.edu, based on your project requirements and we will recommend the best execution approach  to run your application. For sample running Running jupyter notebook through apptainer container without port mapping as in kubernetes  pod configuration and click on the below kind of link to access notebook through container running on host system. Remember shell session will expire after closing, better to download workload sessions and files as backup. Any ipynb Jupyter Notebook file you will create for running applications will automatically be loaded to your Pegasus environment. You may also access files in your Pegasus environment to Jupyter notebook and to make it as permanent session download images through appatainer.  

::

    $ apptainer pull docker://jupyter/minimal-notebook
    INFO:    Converting OCI blobs to SIF format
    INFO:    Starting build...      # It takes time please wait
 
Run LSF interactive job for Jupyter notebook 
**previous:**  Apptainer> /opt/conda/bin/jupyter notebook --port  8888 --no-browser 

::

    $ bsub -q general -P hpc -Is apptainer run /nethome/rxp1166/minimal-notebook_latest.sif
    Job is submitted to <hpc> project.
    Job <28292518> is submitted to queue <general>.
    <<Waiting for dispatch ...>>
    <<Starting on n309>>


You will get Jupyter Server 2.7.0 is running at: http://127.0.0.1:8888/lab?token=token_id, make copy of link, replace localhost as http://pegasus.ccs.miami.edu:8888/lab?token=token_id and run in your browser. So that you can run and exec jupyter notebook applications as per needed. make sure to have data backup after running applications before termianting application. 

.. image:: ./apptainerjupyter3.png
  :width: 550
  :alt: screenshot


Apptainer Interactive applications using MATLAB and R
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Apptainer Matlab Interactive:**

To pull the MatLab container, 

::

     $ apptainer pull docker://mathworks/matlab 

This pulls the container and converts it to a SIF container matlab_latest.sif. To launch MatLab 

::

     $ bsub -q general -P hpc -Is apptainer run /nethome/rxp1166/matlab_latest.sif
       Job is submitted to <hpc> project.
       Job <28292508> is submitted to queue <general>.
       <<Waiting for dispatch ...>>
       <<Starting on n255>>

If you do not have credentials for Mathworks login, registered with your gmail account at https://www.mathworks.com/login and after that enter your MathWorks valid Account detials email address and PWD in terminal window. 

.. code:: bash

          Starting MATLAB with license: 11501744 - R2023a Trial - 30 Aug 2023 
          < M A T L A B (R) > 
          Copyright 1984-2023 The MathWorks, Inc. 
          R2023a Update 3 (9.14.0.2286388) 64-bit (glnxa64) 
          May 25, 2023 
          To get started, type doc. 
          For product information, visit www.mathworks.com. 
          >> a = 3; 
          >> b = a*a; 
          >> c = a*a*a; 
          >> d = sqrt(a); 
          >> fprintf('%4u square equals %4u \r', a, b) 
          >> 3 square equals    9  
          >> fprintf('%4u cube equals %4u \r', a, c) 
          >> 3 cube equals   27  
          >> fprintf('The square root of %2u is %6.4f \r', a, d) 
          >>  square root of  3 is 1.7321 
          >>exit 

 

Apptainer R Interactive
^^^^^^^^^^^^^^^^^^^^^^^

The most popular library for R is the Tidyverse, popular Docker containers for R, including a pre-built one with Tidyverse so you can grab the latest tagged container from Docker hub and it takes few seconds wait for until creation of sif image . 

:: 

     $ apptainer pull docker://rocker/tidyverse:4.0.1 

 

Now run the container's R binary when you successfully load the Tidyverse. 

 
.. code:: bash

          $ bsub -q general -P hpc -Is apptainer run tidyverse_4.0.1.sif R
            Job is submitted to <hpc> project.
            Job <28292511> is submitted to queue <general>.
            <<Waiting for dispatch ...>>
            <<Starting on n255>>
            INFO:    squashfuse not found, will not be able to mount SIF 
            INFO:    fuse2fs not found, will not be able to mount EXT3 filesystems 
            INFO:    Converting SIF file to temporary sandbox... 
            R version 4.0.1 (2020-06-06) -- "See Things Now" 
            Copyright (C) 2020 The R Foundation for Statistical Computing 
            Platform: x86_64-pc-linux-gnu (64-bit) 
            R is free software and comes with ABSOLUTELY NO WARRANTY. 
            You are welcome to redistribute it under certain conditions. 
            Type 'license()' or 'licence()' for distribution details. 
            R is a collaborative project with many contributors. 
            Type 'contributors()' for more information and 
            'citation()' on how to cite R or R packages in publications. 
            Type 'demo()' for some demos, 'help()' for on-line help, or 
            'help.start()' for an HTML browser interface to help. 
            Type 'q()' to quit R. 
            > x <- 1000L 
            > y <- 55L 
            > x 
            [1] 1000 
            > y 
            [1] 55 
            > class(x) 
            [1] "integer" 
            > class(y) 
            [1] "integer" 
            > q() # for exit  

 
**alternative approach to pull R image**

 ::

     $ apptainer pull docker://r-base:4.0.3 
     $ apptainer run r-base_4.0.3.sif R 

 
 

Apptainer Definition Files
^^^^^^^^^^^^^^^^^^^^^^^^^^


For a reproducible, verifiable and production-quality container you should build a SIF file using an Apptainer definition file. This also makes it easy to add files, environment variables, and install custom software. You can start with base images from Docker Hub and use images directly from official repositories such as Ubuntu, Debian, CentOS, Arch, and BusyBox. 

 

A definition file has a header and a body. The header determines the base container to begin with, and the body is further divided into sections that perform things like software installation, environment setup, and copying files into the container from the host system, etc. Here is an example of a **lolcow.def** definition file and give name of build as **lolcow.sif**


.. image:: ./Apptainerdeffile4.png
  :width: 600
  :alt: An image of the Text component in the visual editor.


assuming it is a file named lolcow.def. To build a container from this definition file, 

::

 $ apptainer build lolcow.sif lolcow.def 

If it needed root credentials make use of  --fakeroot to container to build lolcow.sif image from def file. Initially you need to get the fake root permissions from IDSC and requested to raise the ticket with brief description of project requirement to hpc@ccs.miami.edu .  

::

$ apptainer build --fakeroot lolcow.sif lolcow.def 

In this example, the header tells Apptainer to use a base Ubuntu 16.04 image from the default OCI registry. 

    * The %post section executes within the container at build time after the base OS has been installed. The %post section is therefore the place to perform installations of new applications. 

    * The %environment section defines some environment variables that will be available to the container at runtime. 

    * The %runscript section defines actions for the container to take when it is executed. 

    * And finally, the %labels section allows for custom metadata to be added to the container.This is a very small example of the things that you can do with a definition file. You can also use an               existing container on your host system as a base. 


For more details about def files: https://apptainer.org/docs/user/1.1/definition_files.html#definition-files 

We have changed def file in above link as rajsample.def and given name of build as raj_container.sif 

 


.. code:: bash

    Bootstrap: docker 
    From: ubuntu:18.04 
    Stage: build 
    %setup 
        touch /nethome/pegasus_usrid/file1 
        touch ${APPTAINER_ROOTFS}/file2 

    %files 
        /nethome/pegasus_userid/file1 
        /nethome/pegasus_userid/file1 /opt 

    %environment 
        export LISTEN_PORT=12345 
        export LC_ALL=C 

 
    %post 
        apt-get install -y netcat 
        NOW=`date` 
        echo "export NOW=\"${NOW}\"" >> $APPTAINER_ENVIRONMENT 

    %runscript 
        echo "Container was created $NOW" 
        echo "Arguments received: $*" 
        exec echo "$@" 

    %startscript 
        nc -lp $LISTEN_PORT 

    %test 
        grep -q NAME=\"Ubuntu\" /etc/os-release 
        if [ $? -eq 0 ]; then 
            echo "Container base is Ubuntu as expected." 
        else 
            echo "Container base is not Ubuntu." 
            exit 1 

        fi 

    %labels 
        Author alice 
        Version v0.0.1 

    %help 

        This is a demo container used to illustrate a def file that uses all supported sections. 

    



.. code:: bash

    $ apptainer build --notest raj_container.sif rajsample.def  

    INFO:    User not listed in /etc/subuid, trying root-mapped namespace 
    INFO:    fakeroot command not found 
    INFO:    Installing some packages may fail 
    INFO:    Starting build... 
    INFO:    Adding help info 
    INFO:    Adding labels 
    INFO:    Adding environment to container 
    INFO:    Adding startscript 
    INFO:    Adding runscript 
    INFO:    Adding testscript 
    INFO:    Creating SIF file... 
    INFO:    Build complete: raj_container.sif 

 

 
.. code:: bash

    $ apptainer test  raj_container.sif       # testing container 
    INFO:    Converting SIF file to temporary sandbox... 
    INFO:    underlay of /etc/localtime required more than 50 (66) bind mounts 
    Container base is Ubuntu as expected. 

 
.. code:: bash

    $./raj_container.sif Welcome to IDSC University of Maimi@!   # Running container with input text 
    Container was created Thu Jul 27 15:53:21 UTC 2023 
    Arguments received: Welcome to IDSC University of Maimi@! 
    Welcome to IDSC University of Maimi@! 

 


Apptainer GUI R Studio Server
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

see the link RStudio on Pegasus
https://acs-docs.readthedocs.io/pegasus/soft/RStudio.html . Do not run Jupyter Notebook and RStudio container applications directly, as they will continue running on login nodes. This guide demonstrates the  way to run container applications on HPC systems.  These Containers should only be used for specific applications when the required software modules are not available on the HPC cluster. Before running any container application, please send an email or raise ticket to hpc@ccs.miami.edu, based on your project requirements and we will recommend the best execution approach  to run your application.  TO know sample Rstudio container execution Create apptainer  **tidyverse_long.def** file with environment variables of user_id and password. **export LC_ALL=C** means which support scirpts in all languages for container to run applications. Containers are read-only, but RStudio will want to be able to write configuration and temporary files in the home. Let us bind mount the current work directory as the container home. 
There’s a little caveat here, in that the actual username in the RStudio server will be rstudio if the host user has ID equal to 1000 (first user in the system), and it will instead be the same as the host $USER otherwise. Let us code these conditions as follows: 


.. code:: bash

    $ vi tidyverse_long.def  
    Bootstrap: docker 
    From: rocker/tidyverse:3.6.1 
    %environment 
        export LC_ALL=C 
        export PASSWORD=password 
        echo $USER && echo $PASSWORD 
        export R_USER=$USER && [ "$(id -u)" == "1000" ] && export R_USER=rstudio 

    %startscript 

      export R_PORT=${R_PORT:-"8787"} 
      export R_ADDRESS=${R_ADDRESS:-"0.0.0.0"} 
      rserver --www-port $R_PORT --www-address $R_ADDRESS --auth-none=0 --auth-pam-helper-path=pam-helper 

    %test 
      echo $USER && echo $PASSWORD 

    %labels 
      Author IDSC Miami University Supercomputing 
      Version 0.0.1 





Apptainer builds tidyverse_long.sif image using def file. Initially you need to get the fake root permissions from IDSC HPC team and requested to raise the ticket with brief description of project requirement to hpc@ccs.miami.edu .  

:: 

    $ apptainer build --fakeroot tidyverse_long.sif tidyverse_long.def 
    INFO:    Creating SIF file... 
    INFO:    Build complete: tidyverse_long.sif 

Instance myserver will be created by an apptainer which will bind to present working directory (pwd) to the path of /home/path. 

::

    $ singularity instance start -c -B $(pwd):/home/$R_USER tidyverse_long.sif myserver 
    INFO:    squashfuse not found, will not be able to mount SIF 
    INFO:    fuse2fs not found, will not be able to mount EXT3 filesystems 
    INFO:    Converting SIF file to temporary sandbox... 
    INFO:    instance started successfully 


::

    $ singularity instance list 
    INSTANCE NAME    PID      IP    IMAGE 
    myserver         18808          /tmp/rootfs-1436356434/root 

 

Below command shows userid and password passed as environmental varibles.  

::

    $ singularity exec instance://myserver echo $USER $PASSWORD 

 
Open the browser http://pegasus.ccs.miami.edu:8787/    enter details then you will get Apptainer GUI R Studio Server and run R applications as per need.  

::

    $ singularity instance stop myserver   # Stop R GUI server 
    INFO:    Stopping myserver instance of /tmp/rootfs-1576125237/root 
    INFO:    Killing myserver instance of /tmp/rootfs-1576125237/root  (Timeout) 


.. image:: ./ruserid5.png
  :width: 600
  :alt: An image of the Text component in the visual editor.


.. image:: ./RGUIstudioserver6.png
  :width: 600
  :alt: An image of the Text component in the visual editor.

**new lsf approach:** 

::

    singularity instance stop myserver
    INFO:    Stopping myserver instance of /nethome/rxp1166/tidyverse_long.sif (PID=25267)
    INFO:    Killing myserver instance of /nethome/rxp1166/tidyverse_long.sif (PID=25267) (Timeout)
    (base) [rxp1166@login4 ~]$ bsub -q general -P hpc -Is singularity instance start -c -B $(pwd):/home/$R_USER tidyverse_long.sif             myserver
    Job is submitted to <hpc> project.
    Job <28292583> is submitted to queue <general>.
    <<Waiting for dispatch ...>>
    <<Starting on n263>>
    INFO:    instance started successfully


:: 

    bsub -q general -m n263 -P hpc -Is singularity run instance://myserver echo $USER $PASSWORD
    Job is submitted to <hpc> project.
    Job <28292585> is submitted to queue <general>.
    <<Waiting for dispatch ...>>
    <<Starting on n263>>



Running LSF Job with Singularity or Apptainer 
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


Comparison of LSF Job with singularity and Normal
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
 

Singularity GPU Support with PyTorch and TensorFlow
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

First check GPU are accessing to your environment, if not get access permission for GPU (need to pay for use) and requested to raise the ticket to get the GPU access with brief description of project requirement to hpc@ccs.miami.edu   

::

    $ lspci | grep VGA    
    (or) 
    $ sudo lshw -C display 
     *-display                  
    description: VGA compatible controller 
    product: G200eR2 



To access Nvidia GPU card driver installed inside of Singularity container you need to use --nv option while executing the container. To verify that you have access to the requested GPUs, run nvidia-smi inside the container: the following command takes time to build the image.  

:: 

    $ apptainer pull docker://tensorflow/tensorflow:latest-gpu 
    ... 
    INFO:    Creating SIF file... 
    INFO:    Build complete: tensorflow_latest-gpu.sif 

 


Cross check the compatibility of CUDA with TensorFlow requirements: https://www.tensorflow.org/install/source,    In my case version TensorFlow version is: 2.13.0 require s CUDA 11.8, cuDNN 8.6, Python 3.8-3.11, install modules accordingly then only it will work fine.  

CUDA and the cudatoolkit refer to the same thing. CUDA is a library used by many programs like Tensorflow and OpenCV . cudatoolkit is a set software on top of CUDA to make GPU programming easy with CUDA. You may have installed CUDA in a different path, not at the same folder where you have installed the conda. 

CUDA drivers, as shown in this image, are installed in the host running the containers (i.e. cluster node). You won't need to install the drivers in your image but you'll need to install the appropiate CUDA toolkit on it. 

.. image:: ./apptainergpu7.png
  :width: 600
  :alt: An image of the Text component in the visual editor.


**Note:** The cuda toolkit is in the container but the drivers are from the OS.  We need compatible drivers for the version of cuda used by container. 

To access the GPU inside the singularity container, we run sample LSF interactive job submission with flags. 

    * The '-q gpu_arg'  will direct to queue with nodes that have gpu 
    * The '-Is' will start interactive terminal with shell 

::

    $ bsub -q gpu_arg -P hpc -Is singularity run --nv --cleanenv tensorflow_latest-gpu.sif 
    Job is submitted to <hpc> project. 
    Job <28041843> is submitted to queue <gpu_arg>. 
    <<Waiting for dispatch ...>> 
    <<Starting on usr32>> 
    ________                               _______________ 
     ___  __/__________________________________  ____/__  /________      __ 
    __  /  _  _ \_  __ \_  ___/  __ \_  ___/_  /_   __  /_  __ \_ | /| / / 

    _  /   /  __/  / / /(__  )/ /_/ /  /   _  __/   _  / / /_/ /_ |/ |/ / 

    /_/    \___//_/ /_//____/ \____//_/    /_/      /_/  \____/____/|__/ 

    You are running this container as user with ID 4301 and group 2003, 
    which should map to the ID and group for your user on the Docker host. Great! 


nvidia-smi command. This command provides information about the NVIDIA GPUs installed on your system, including the CUDA version. This will display information about your NVIDIA GPU(s) and the CUDA version installed on your system. 


.. code:: bash

    $ apptainer> nvidia-smi 
    Fri Aug 11 04:07:59 2023        
    +-----------------------------------------------------------------------------+ 
    | NVIDIA-SMI 510.47.03    Driver Version: 510.47.03    CUDA Version: 11.6     | 
    |-------------------------------+----------------------+----------------------+ 
    | GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC | 
    | Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. | 
    |                               |                      |               MIG M. | 
    |===============================+======================+======================| 
    |   0  NVIDIA GeForce ...  Off  | 00000000:2F:00.0 Off |                  N/A | 
    | 41%   29C    P8     2W / 260W |      3MiB / 11264MiB |      0%      Default | 
    |                               |                      |                  N/A | 
    +-------------------------------+----------------------+----------------------+ 
    |   1  NVIDIA GeForce ...  Off  | 00000000:86:00.0 Off |                  N/A | 
    | 41%   36C    P8    31W / 260W |      3MiB / 11264MiB |      0%      Default | 
    |                               |                      |                  N/A | 
    +-------------------------------+----------------------+----------------------+ 

    +-----------------------------------------------------------------------------+ 
    | Processes:                                                                  | 
    |  GPU   GI   CI        PID   Type   Process name                  GPU Memory | 
    |        ID   ID                                                   Usage      | 
    |=============================================================================| 
    |  No running processes found                                                 | 
    +-----------------------------------------------------------------------------+ 

 
#Check the nvidia-cuda-toolkit version 

::

    Apptainer> uname -a 
    Linux usr32  
    Apptainer> nvcc --version 
    nvcc: NVIDIA (R) Cuda compiler driver 
    Copyright (c) 2005-2022 NVIDIA Corporation 
    Built on Wed_Sep_21_10:33:58_PDT_2022 
    Cuda compilation tools, release 11.8, V11.8.89 
    Build cuda_11.8.r11.8/compiler.31833905_0 

Apptainer experimental support is provided to use Nvidia’s nvidia-container-cli tooling for GPU container setup. This functionality, accessible via the new --nvccli flag, improves compatibility with OCI runtimes and exposes additional container configuration options. 


**NVIDIA GPUs & CUDA (Standard)**

Commands that run, or otherwise execute containers (shell, exec) can take an --nv option, which will setup the container’s environment to use an NVIDIA GPU and the basic CUDA libraries to run a CUDA enabled application. The --nv flag will: 

    * Ensure that the /dev/nvidiaX device entries are available inside the container, so that the GPU cards in the host are accessible. 

    * Locate and bind the basic CUDA libraries from the host into the container, so that they are available to the container, and match the kernel GPU driver on the host. 

    * Set the LD_LIBRARY_PATH inside the container so that the bound-in version of the CUDA libraries are used by applications run inside the container. 

**Requirements**

To use the --nv flag to run a CUDA application inside a container you must ensure that: 

    * The host has a working installation of the NVIDIA GPU driver, and a matching version of the basic NVIDIA/CUDA libraries. The host does not need to have an X server running, unless you want to run             graphical apps from the container. 
    * The NVIDIA libraries are in the system’s library search path. 
    * The application inside your container was compiled for a CUDA version, and device capability level, that is supported by the host card and driver. 

 
You can verify the GPU is available within the container by using the tensorflow **list_local_devices()** function. 

 
.. code:: bash

    Apptainer> python  
    Python 3.8.10 (default, May 26 2023, 14:05:08)  
    [GCC 9.4.0] on linux 
    Type "help", "copyright", "credits" or "license" for more information. 

    >>> from tensorflow.python.client import device_lib 
    2023-08-11 03:40:51.615500: I tensorflow/core/platform/cpu_feature_guard.cc:182] This TensorFlow binary is optimized to use available CPU instructions in performance-critical operations. 
    To enable the following instructions: AVX2 AVX512F FMA, in other operations, rebuild TensorFlow with the appropriate compiler flags. 
    
    >>> print(device_lib.list_local_devices()) 
    2023-08-11 03:41:40.858740: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1639] Created device /device:GPU:0 with 9631 MB memory:  -> device: 0, name: NVIDIA GeForce RTX 2080 Ti, pci bus id:          0000:2f:00.0, compute capability: 7.5 
    2023-08-11 03:41:40.859386: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1639] Created device /device:GPU:1 with 9631 MB memory:  -> device: 1, name: NVIDIA GeForce RTX 2080 Ti, pci bus id:          0000:86:00.0, compute capability: 7.5 
    [name: "/device:CPU:0" 
    device_type: "CPU" 
    memory_limit: 268435456 
    locality { 
    } 
    incarnation: 12113806794313645818 
    xla_global_id: -1 
    , name: "/device:GPU:0" 
    device_type: "GPU" 
    memory_limit: 10099425280 
    locality { 
    bus_id: 1 
    links { 
     } 
    } 
    incarnation: 5954538828647269706 
    physical_device_desc: "device: 0, name: NVIDIA GeForce RTX 2080 Ti, pci bus id: 0000:2f:00.0, compute capability: 7.5" 
    xla_global_id: 416903419 
    , name: "/device:GPU:1" 
    device_type: "GPU" 
    memory_limit: 10099425280 
    locality { 
     bus_id: 2 
    numa_node: 1 
    links { 
     } 
    } 
    incarnation: 3057053191604368287 
    physical_device_desc: "device: 1, name: NVIDIA GeForce RTX 2080 Ti, pci bus id: 0000:86:00.0, compute capability: 7.5" 
    xla_global_id: 2144165316 
    ] 


::

    >>> import tensorflow as tf 
    >>> tf.config.list_physical_devices('GPU') 
    [PhysicalDevice(name='/physical_device:GPU:0', device_type='GPU'), PhysicalDevice(name='/physical_device:GPU:1', device_type='GPU')] 
    >>>print('NumGPUsAvailable:',len(tf.config.experimental.list_physical_devices('GPU'))) 
    Num GPUs Available:  2 
    >>> print('Tensorflow version: ',tf.__version__) 
    Tensorflow version:  2.13.0 



**GPU Support with PyTorch**

Pull the latest lsf GPU image supports for PyTorch  

::

    $ singularity pull  docker://chembl/lsf-gpu:latest 

Check availibility of GPU inside sigularity and CUDA is available as true in interative LSF job script .

::

    $ bsub -q gpu_arg -P hpc -Is  "singularity run --nv --cleanenv lsf-gpu_latest.sif python -c 'import torch; print(torch.cuda.is_available()); print(torch.version.cuda)'" 
    Job is submitted to <hpc> project. 
    Job <28042682> is submitted to queue <gpu_arg>. 
    <<Waiting for dispatch ...>> 
    <<Starting on usr13>> 
    True 
    9.2.148 



LSF JOB with Singularity GPU access Script submission  
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Create file **$ vi singularitygpu.job** with gpu access queue and make sure u have access to gpu nodes and no extra spaces at end of each line in a script file and pull the images to your environment python_latest.sif,tensorflow_latest-gpu.sif and activate your conda environment. In my case, TensorFlow version is: 2.13.0 require s CUDA 11.8,  Python 3.8-3.11, install modules accordingly then only it will work fine. See the previous example of “**Singularity GPU Support with PyTorch and TensorFlow**” before submitting job script. 

**Note:** The cuda toolkit is in the container but the drivers are from the OS.  We need compatible drivers for the version of cuda used by container. 

.. code:: bash

    $ vi singularitygpu.job
    #!/bin/bash 
    #BSUB -P hpc   
    #BSUB -J singularitygpu 
    #BSUB -o /scratch/projects/hpc/rajesh/singgpu.out  
    #BSUB -e /scratch/projects/hpc/rajesh/singgpu.err 
    #BSUB -q gpu_arg 
    #BSUB -W 1:00 
    # 
    module load anaconda3 
    module load apptainer/1.0.2 
    source /share/apps/anaconda/anaconda3_build/bin/activate 
    conda activate rajesh_env 
    export BSUB_SINGULARITY_EXEC="/share/builds/spack19/opt/spack/linux-centos7-sandybridge/gcc-11.3.0/apptainer-1.1.5-baeofwaslern4ytiqr36sfo4tl6tv327/bin/singularity" 
    export CURRENT_SINGULARITY_IMAGE="/nethome/rxp1166/python_latest.sif,/nethome/rxp1166/tensorflow_latest-gpu.sif" 
    export LSF_BIN_PATH="/share/lsf/9.1/linux2.6-glibc2.3-x86_64/bin" 
    export LSF_ETC_PATH="/share/lsf/9.1/linux2.6-glibc2.3-x86_64/etc" 
    export APPTAINER_BIND="/nethome/pegasus_id/" 
    singularity --version 
    singularity run /nethome/pegasus_id/python_latest.sif python pyscript.py 
    python pyscript.py 
    echo "LSF JOB IS RUNNING WITH IN SINGULARITY" 
    echo "LSF JOB GPU SCRIPT RUNNING with singularity" 
    singularity run --nv --cleanenv /nethome/rxp1166/tensorflow_latest-gpu.sif python3 -c "import tensorflow as tf; print('Num GPUs Available: ',len(tf.config.experimental.list_physical_devices('GPU'))); 
    print('Tensorflow version: ',tf.__version__)" 

 
submit the job 

.. code:: bash
 
    $ bsub <singularitygpu.job  
    $ cat /scratch/projects/hpc/rajesh/singgpu.out 
    ------------------------------------------------------------ 
    Successfully completed. 
    Resource usage summary: 

    CPU time :                                   22.10 sec. 
    Max Memory :                                 902 MB 
    Average Memory :                             229.50 MB 
    Total Requested Memory :                     - 
    Delta Memory :                               - 
    Max Processes :                              5 
    Max Threads :                                60 

    The output (if any) follows: 
    apptainer version 1.0.2 
    The sum of 1.5 and 6.3 is 7.8 
    The sum of 1.5 and 6.3 is 7.8 
    LSF JOB IS RUNNING WITH IN SINGULARITY 
    LSF JOB GPU SCRIPT RUNNING with singularity 
    Num GPUs Available:  2 
    Tensorflow version:  2.13.0 




LSF Job with MCMICRO with singularity, Nextflow
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Note1:** 

one important thing, by default nexflow will run application on local compute nodes where job submitted  to nodes on super computer, (means it will pull the image and store cashe files on respective nodes, it occupies more storage  on local nodes if more number of users are using it, its problem because of it is shared resources). **The best way is to run  nextflow with lsf job submission through  custom configuration pipeline.**

**Note2:**  

Do not download the MCMICRO to the login node and execute results. Module already available, just loaded it using **module load nextflow/22.10.4**   Reference of tutorial: https://mcmicro.org/tutorial/tutorial.html 


Download the example data “exemplar-001" and put in your project scratch space as /scratch/projects/hpc/rajesh/exemplar-001 from: https://mcmicro.org/how-to-use.html  and remember that  Nexflow default execution mode is local, and so it will download labsyspharm/mcmicro  to the node running application and execute the result and to avoid the local downloads on supercomputer nodes and we can create custom configuration set up to run Nextflow with LSF Job as described in next session. Nextflow  will run all the process 100% and will generate output images as new folders in the same Directory path of “/scratch/projects/hpc/rajesh/exemplar-001”. Create a job as below and ouput takes some time please wait and check bjobs command.  

.. code:: bash

    $ cat lsfmcmicro.job 
    #!/bin/bash 
    #BSUB -P hpc 
    #BSUB -J lsfmcmicrojob 
    #BSUB -o /scratch/projects/hpc/rajesh/lsfmcmicro.out 
    #BSUB -e /scratch/projects/hpc/rajesh/lsfmcmicro.err 
    #BSUB -q general 
    #BSUB -n 3 
    #BSUB -W 1:00 
    #  
    module load anaconda3 
    module load apptainer/1.0.2 
    module load nextflow/22.10.4 
    source /share/apps/anaconda/anaconda3_build/bin/activate 
    conda activate rajesh_env 
    export BSUB_SINGULARITY_EXEC="/share/builds/spack19/opt/spack/linux-centos7-sandybridge/gcc-11.3.0/apptainer-1.1.5-baeofwaslern4ytiqr36sfo4tl6tv327/bin/singularity" 
    export CURRENT_SINGULARITY_IMAGE="/nethome/rxp1166/alpine.sif, /nethome/rxp1166/python_latest.sif" 
    export LSF_BIN_PATH="/share/lsf/9.1/linux2.6-glibc2.3-x86_64/bin" 
    export LSF_ETC_PATH="/share/lsf/9.1/linux2.6-glibc2.3-x86_64/etc" 
    export APPTAINER_BIND="/scratch/projects/hpc/rajesh/" 
    singularity --version 
    echo "running LSF Job singularity with mcmciro" 
    nextflow run labsyspharm/mcmicro --in /scratch/projects/hpc/rajesh/exemplar-001 -profile singularity,lsf 
    echo "completed job" 

Output file as  

.. code:: bash
 
    $ cat lsfmcmicro.out 
    Sender: LSF System <hpc@ccs.miami.edu> 
    Subject: Job 28082472: <lsfmcmicrojob> in cluster <mk2> Done 
    Successfully completed. 
    Resource usage summary: 
    CPU time :                                   2728.60 sec. 
    Max Memory :                                 3599 MB 
    Average Memory :                             2381.72 MB 
    Total Requested Memory :                     1500.00 MB 
    Delta Memory :                               -2099.00 MB 
    Max Processes :                              20 
    Max Threads :                                126 
    The output (if any) follows: 
    apptainer version 1.0.2 
    running LSF Job singularity with mcmciro 
    N E X T F L O W  ~  version 23.04.3 
    NOTE: Your local project version looks outdated - a different revision is available in the remote repository [01c11e5615] 
    Launching `https://github.com/labsyspharm/mcmicro` [hopeful_lorenz] DSL2 - revision: 8a70201a37 [master] 
    [-        ] process > illumination                - 
    [-        ] process > registration:ashlar         - 
    [-        ] process > background:backsub          - 
    [-        ] process > dearray:coreograph          - 
    [-        ] process > dearray:roadie:runTask      - 
    [-        ] process > segmentation:roadie:runTask - 
    [-        ] process > illumination                - 
    [-        ] process > registration:ashlar         - 
    [-        ] process > background:backsub          - 
    [-        ] process > dearray:coreograph          - 
    [-        ] process > dearray:roadie:runTask      - 
    [-        ] process > segmentation:roadie:runTask - 
    [-        ] process > segmentation:worker         - 
    [-        ] process > segmentation:s3seg          - 
    [-        ] process > quantification:mcquant      - 
    [-        ] process > downstream:worker           - 
    [-        ] process > viz:autominerva             - 
    executor >  local (1) 
    [-        ] process > illumination                - 
    [e8/024fad] process > registration:ashlar         [  0%] 0 of 1 
    [-        ] process > background:backsub          - 
    [-        ] process > dearray:coreograph          - 
    [-        ] process > dearray:roadie:runTask      - 
    [-        ] process > segmentation:roadie:runTask - 
    [-        ] process > segmentation:worker         - 
    [-        ] process > segmentation:s3seg          - 
    [-        ] process > quantification:mcquant      - 
    [-        ] process > downstream:worker           - 
    [-        ] process > viz:autominerva             - 
    executor >  local (1) 
    [-        ] process > illumination                - 
    [e8/024fad] process > registration:ashlar         [  0%] 0 of 1 
    [-        ] process > background:backsub          - 
    [-        ] process > dearray:coreograph          - 
    [-        ] process > dearray:roadie:runTask      - 
    [-        ] process > segmentation:roadie:runTask - 
    [-        ] process > segmentation:worker         - 
    [-        ] process > segmentation:s3seg          - 
    [-        ] process > quantification:mcquant      - 
    [-        ] process > downstream:worker           - 
    [-        ] process > viz:autominerva             - 
    executor >  local (2) 
    [-        ] process > illumination                   - 
    [e8/024fad] process > registration:ashlar            [100%] 1 of 1 ✔ 
    [-        ] process > background:backsub             - 
    [-        ] process > dearray:coreograph             - 
    [-        ] process > dearray:roadie:runTask         - 
    [-        ] process > segmentation:roadie:runTask    - 
    [64/8aa893] process > segmentation:worker (unmics... [  0%] 0 of 1 
    [-        ] process > segmentation:s3seg             - 
    [-        ] process > quantification:mcquant         - 
    [-        ] process > downstream:worker              - 
    [-        ] process > viz:autominerva                - 
    executor >  local (2) 
    [-        ] process > illumination                   - 
    [e8/024fad] process > registration:ashlar            [100%] 1 of 1 ✔ 
    [-        ] process > background:backsub             - 
    [-        ] process > dearray:coreograph             - 
    [-        ] process > dearray:roadie:runTask         - 
    [-        ] process > segmentation:roadie:runTask    - 
    [64/8aa893] process > segmentation:worker (unmics... [  0%] 0 of 1 
    [-        ] process > segmentation:s3seg             - 
    [-        ] process > quantification:mcquant         - 
    [-        ] process > downstream:worker              - 
    [-        ] process > viz:autominerva                - 
    executor >  local (3) 
    [-        ] process > illumination                   - 
    [e8/024fad] process > registration:ashlar            [100%] 1 of 1 ✔ 
    [-        ] process > background:backsub             - 
    [-        ] process > dearray:coreograph             - 
    [-        ] process > dearray:roadie:runTask         - 
    [-        ] process > segmentation:roadie:runTask    - 
    [64/8aa893] process > segmentation:worker (unmics... [100%] 1 of 1 ✔ 
    [96/55c35d] process > segmentation:s3seg (1)         [  0%] 0 of 1 
    [-        ] process > quantification:mcquant         - 
    [-        ] process > downstream:worker              - 
    [-        ] process > viz:autominerva                - 
    executor >  local (4) 
    [-        ] process > illumination                   - 
    [e8/024fad] process > registration:ashlar            [100%] 1 of 1 ✔ 
    [-        ] process > background:backsub             - 
    [-        ] process > dearray:coreograph             - 
    [-        ] process > dearray:roadie:runTask         - 
    [-        ] process > segmentation:roadie:runTask    - 
    [64/8aa893] process > segmentation:worker (unmics... [100%] 1 of 1 ✔ 
    [96/55c35d] process > segmentation:s3seg (1)         [100%] 1 of 1 ✔ 
    [6b/a67e6b] process > quantification:mcquant (1)     [  0%] 0 of 1 
    [-        ] process > downstream:worker              - 
    [-        ] process > viz:autominerva                - 
    executor >  local (4) 
    [-        ] process > illumination                   - 
    [e8/024fad] process > registration:ashlar            [100%] 1 of 1 ✔ 
    [-        ] process > background:backsub             - 
    [-        ] process > dearray:coreograph             - 
    [-        ] process > dearray:roadie:runTask         - 
    [-        ] process > segmentation:roadie:runTask    - 
    [64/8aa893] process > segmentation:worker (unmics... [100%] 1 of 1 ✔ 
    [96/55c35d] process > segmentation:s3seg (1)         [100%] 1 of 1 ✔ 
    [6b/a67e6b] process > quantification:mcquant (1)     [  0%] 0 of 1 
    [-        ] process > downstream:worker              - 
    [-        ] process > viz:autominerva                - 
    executor >  local (4) 
    [-        ] process > illumination                   - 
    [e8/024fad] process > registration:ashlar            [100%] 1 of 1 ✔ 
    [-        ] process > background:backsub             - 
    [-        ] process > dearray:coreograph             - 
    [-        ] process > dearray:roadie:runTask         - 
    [-        ] process > segmentation:roadie:runTask    - 
    [64/8aa893] process > segmentation:worker (unmics... [100%] 1 of 1 ✔ 
    [96/55c35d] process > segmentation:s3seg (1)         [100%] 1 of 1 ✔ 
    [6b/a67e6b] process > quantification:mcquant (1)     [100%] 1 of 1 ✔ 
    [-        ] process > downstream:worker              - 
    [-        ] process > viz:autominerva                - 
    Completed at: 14-Sep-2023 17:04:35 
    Duration    : 5m 57s 
    CPU hours   : 0.1 
    Succeeded   : 4 
    completed job 


Inorder to see the ouput images install required softwares, I am using mac, make sure XQuartz is running before running Fiji  (See X11Forwarding in acs documentation: https://acs-docs.readthedocs.io/pegasus/soft/SimVascular.html)   

::

    Logout your session and login as ssh -X username@hostname for GUI access  

To view the results using Fiji (Download Fiji based on your system requirements: https://imagej.net/software/fiji/downloads). You can use any image viewing/processing software that works for .ome.tif and .tif files.  

::

    $ cd  Fiji.app  
    $ ls 
    Contents  db.xml.gz  ImageJ2.desktop  ImageJ-linux64  images  jars  java  lib  licenses  luts  macros  plugins  README.md  retro  scripts  WELCOME.md 
    $ ./ImageJ-linux64  # Running Fiji 

 
Open image   s3seg/ in path of   “/scratch/projects/hpc/rajesh/exemplar-001”. 

    * Check that cellOutlines.ome.tif and nucleiOutlines.ome.tif show satisfactorily outlined areas 
    * cellOutlines.ome.tif found under qc/s3seg1/unmicst-exemplar-001/ can be previewed as Hyperstack in Fiji. Each cycle appears as a 2-image stack. 
    * You can split stack into individual images. **Then, choose Image>Color>Merge Channels to overlay outline with raw image for visual inspection.** 

 
.. image:: ./mcmicroresult8.png
  :width: 600
  :alt: An image of the Text component in the visual editor.

.. image:: ./apptainerresult9.png
  :width: 600
  :alt: An image of the Text component in the visual editor.


Nextflow  custom configuration to run LSF Job
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In the Nextflow framework architecture, the executor is the component that determines the system where a pipeline process is run and supervises its execution. The executor provides an abstraction between the pipeline processes and the underlying execution system. The "profile" is the string value for the config file names in the config folder, such as "standard" for the native local environment and "Azure" for Microsoft Azure cloud computing. Two types of profiles are defined in the nextflow.config -- for defining the executor ("local", "lsf") and the execution environment ("test", "conda", "docker", "singularity"). To run the workflow in an LSF cluster, for instance, you would run Nextflow with **nextflow run -profile lsf,singularity** .

**Note:** **It is always better approach to test your application and working functionality by passing parameters as LSF inteactive job.**

Create hello.nf  for reference: https://training.seqera.io/

.. code:: bash 

    $ cat hello.nf 
    #!/usr/bin/env nextflow      
    params.greeting  = 'Hello world!'  
    greeting_ch = Channel.of(params.greeting) 
    process SPLITLETTERS {  
    input:  
        val x  
    output:  
    path 'chunk_*'  
    """  

    printf '$x' | split -b 6 - chunk_   

    """  

    }  
    process CONVERTTOUPPER {  
    input:   
        path y  
    output:  
    stdout  
    """  
    cat $y | tr '[a-z]' '[A-Z]'   

    """  

    }  
    workflow {  
    letters_ch = SPLITLETTERS(greeting_ch)  
    results_ch = CONVERTTOUPPER(letters_ch.flatten())  
    results_ch.view{ it }  

    } 


submitting LSF inteactive job and executing hello.nf using pyhton.sif 

::

    $ bsub -q general -P hpc -Is  "nextflow run /nethome/rxp1166/hello.nf -with-singularity /nethome/rxp1166/python_latest.sif" 
    Job is submitted to <hpc> project. 
    Job <28087350> is submitted to queue <general>. 
    <<Waiting for dispatch ...>> 
    <<Starting on n270>> 
    N E X T F L O W  ~  version 23.04.3 
    Launching `/nethome/rxp1166/hello.nf` [admiring_lumiere] DSL2 - revision: f306aaf9df 
    executor >  local (3) 
    [a7/64007c] process > SPLITLETTERS (1)   [100%] 1 of 1 ✔ 
    [9d/3800b1] process > CONVERTTOUPPER (2) [100%] 2 of 2 ✔ 
    HELLO  
    WORLD! 

 
submitting LSF inteactive job and executing hello.nf using pyhton.sif with profile computation sanger and LSF. Specifying -profile sanger,lsf will instruct Nextflow to run tasks as separate LSF jobs in parallel and will instruct the pipeline to build a local Singularity image from the quay.io Docker image. 

:: 

    $ bsub -q general -P hpc -Is  "nextflow run /nethome/rxp1166/hello.nf -with-singularity /nethome/rxp1166/python_latest.sif -profile sanger,lsf" 
    Job is submitted to <hpc> project. 
    Job <28087351> is submitted to queue <general>. 
    <<Waiting for dispatch ...>> 
    <<Starting on n302>> 
    N E X T F L O W  ~  version 23.04.3 
    Launching `/nethome/rxp1166/hello.nf` [nice_stallman] DSL2 - revision: f306aaf9df 
    executor >  local (3) 
    [e4/da17e7] process > SPLITLETTERS (1)   [100%] 1 of 1 ✔ 
    [b4/ed010d] process > CONVERTTOUPPER (2) [100%] 2 of 2 ✔ 
    HELLO  
    WORLD! 

  
submitting LSF inteactive job and executing hello.nf using pyhton.sif with profile computation singularity container and LSF (it works after module load singularity )
 
::

    $ bsub -q general -P hpc -Is  "nextflow run /nethome/rxp1166/hello.nf -with-singularity /nethome/rxp1166/python_latest.sif -profile singularity,lsf" 
    Job is submitted to <hpc> project. 
    Job <28087354> is submitted to queue <general>. 
    <<Waiting for dispatch ...>> 
    <<Starting on n255>> 
    N E X T F L O W  ~  version 23.04.3 
    Launching `/nethome/rxp1166/hello.nf` [nostalgic_woese] DSL2 - revision: f306aaf9df 
    executor >  local (3) 
    [37/c2c937] process > SPLITLETTERS (1)   [100%] 1 of 1 ✔ 
    [81/a59ca6] process > CONVERTTOUPPER (1) [100%] 2 of 2 ✔ 
    WORLD! 
    HELLO 

We need to keep capital p in cluster options for Project -P and remove grid job after process and need to include executor, profile and process in configuration file and i have two process splitter and convertor. one of advantage of nextflow is job will automatically convert to the required script of lsf , slurm, sge by changing one parameter in config file  like   

::

    process.executor = 'LSF' 


::

    # General information queueSize in config file      
    Queue size = the packet buffer for 1 device before it starts dropping packets 
    Total Queue Size = the total amount of devices it will buffer before its starts dropping packets. 
    4000kb/100kb = 40 devices 
    # see some sample config files  
    https://github.com/nf-core/configs/tree/master/conf 
    https://github.com/nf-core/tools#installation 


Sample Nextflow Configuration  

.. code:: bash

    $ vi raj1.config  
    params { 
        config_profile_description = 'rajesh sample profile execution.' 
        config_profile_contact = 'Rajesh' 
    } 
    executor { 
        name = 'lsf' 
        perTaskReserve = false 
        perJobMemLimit = true 
        queueSize = 100 
        submitRateLimit = '5 sec' 
    } 
    profiles { 
        lsf { 
            process.executor = 'LSF' 
            process.queue = 'general' 
            process.cache = 'lenient' 
            process.clusterOptions = '-P hpc' 
            } 
    } 
    singularity { 
        enabled = true 
        autoMounts = true 
    } 
    process { 
        executor = 'lsf' 
        queue = 'general' 
        clusterOptions = '-P hpc' 
        cpus = 8 
        time = '2.h' 
        memory = '8.GB' 
        withName: 'SPLITLETTERS|CONVERTTOUPPER' { 
        cpus = 4 
        memory = '4.GB' 
        } 
    } 

    params { 
        max_memory = '15.GB' 
        max_cpus = 25 
        max_time = '2.h' 
    } 

 
Running Nextflow Configuration file  

:: 

    $ nextflow run /nethome/rxp1166/hello.nf -c '/nethome/rxp1166/raj1.config' 
    N E X T F L O W  ~  version 23.04.3 
    Launching `/nethome/rxp1166/hello.nf` [tiny_dijkstra] DSL2 - revision: f306aaf9df 
    executor >  lsf (3) 
    [52/662484] process > SPLITLETTERS (1)   [100%] 1 of 1 ✔ 
    [85/76c420] process > CONVERTTOUPPER (1) [100%] 2 of 2 ✔ 
    WORLD! 
    HELLO 

 
Verifying the Nextflow is running the Job through LSF  

.. code:: bash

    bhist -l 28095958  #JOB ID  
    Job <28095958>, Job Name <nf-SPLITLETTERS_(1)>, User <rxp1166>, Project <hpc>,  
    Command 

 
nf-core Module for Nextflow  
^^^^^^^^^^^^^^^^^^^^^^^^^^^

nf -core,  it will maintain all nextflow pipelines easily and supports for custom config files as per DSL2 (Domain specific Language) 
After activation of any conda environment having python version

::

    $conda env list
    $ conda activate rajesh_env
    $ pip install nf-core    # wait for installation completion  



**Checking all nf-core pipelines** 

::

    $  nf-core list  

    nf-core list
                                          ,--./,-.
          ___     __   __   __   ___     /,-._.--~\
    |\ | |__  __ /  ` /  \ |__) |__         }  {
    | \| |       \__, \__/ |  \ |___     \`-._,-`-,
                                          `._,._,'
    nf-core/tools version 2.9 - https://nf-co.re
    There is a new version of nf-core/tools available! (2.10)

    ┏━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━┳━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━┓
    ┃ Pipeline Name          ┃ Stars ┃ Latest Release ┃      Released ┃ Last Pulled ┃ Have latest release? ┃
    ┡━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━╇━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━┩
    │ pixelator              │     1 │            dev │  24 hours ago │           - │ -                    │
    │ pangenome              │    33 │            dev │     yesterday │           - │ -                    │
    │ taxprofiler            │    66 │            dev │     yesterday │           - │ -                    │
    │ rnavar                 │    20 │            dev │     yesterday │           - │ -                    │
    │ rnaseq                 │   670 │            dev │     yesterday │           - │ -                    │
    │ epitopeprediction      │    25 │            dev │     yesterday │           - │ -                    │
    │ bacass                 │    46 │            dev │     yesterday │           - │ -                    │
    │ sarek                  │   276 │            dev │    2 days ago │           - │ -                    │
    │ metatdenovo            │     3 │            dev │    2 days ago │           - │ -                    │
    │ mag                    │   145 │            dev │    2 days ago │           - │ -                    │
    │ differentialabundance  │    27 │            dev │    3 days ago │           - │ -                    │
    │ readsimulator          │     0 │            dev │    3 days ago │           - │ -                    │
    │ mhcquant               │    27 │            dev │    3 days ago │           - │ -                    │
    │ rnasplice              │     9 │            dev │    4 days ago │           - │ -                    │
    │ metaboigniter          │    11 │            dev │    4 days ago │           - │ -                    │
    │ rnadnavar              │     0 │            dev │    4 days ago │           - │ -                    │
    │ dualrnaseq             │    13 │            dev │    4 days ago │           - │ -                    │
    │ fetchngs               │    87 │            dev │    4 days ago │           - │ -                    │
    │ phageannotator         │     4 │            dev │    6 days ago │           - │ -                    │
    │ bamtofastq             │    10 │            dev │    6 days ago │           - │ -                    │
    │ sammyseq               │     0 │            dev │    6 days ago │           - │ -                    │
    │ eager                  │   103 │            dev │    1 week ago │           - │ -                    │
    │ funcscan               │    43 │            dev │   1 weeks ago │           - │ -                    │
    │ nascent                │    10 │            dev │   1 weeks ago │           - │ -                    │
    │ raredisease            │    59 │            dev │   1 weeks ago │           - │ -                    │
    │ proteinfold            │    27 │            dev │   1 weeks ago │           - │ -                    │
    │ rnafusion              │   114 │            dev │   1 weeks ago │           - │ -                    │
    │ scrnaseq               │   102 │            dev │   1 weeks ago │           - │ -                    │
    │ circrna                │    31 │            dev │   2 weeks ago │           - │ -                    │
    │ multiplesequencealign  │     4 │            dev │   2 weeks ago │           - │ -                    │
    │ ampliseq               │   131 │            dev │   2 weeks ago │           - │ -                    │
    │ crisprseq              │    11 │            dev │   2 weeks ago │           - │ -                    │
    │ mcmicro                │     0 │            dev │   2 weeks ago │           - │ -                    │
    │ chipseq                │   153 │            dev │   2 weeks ago │           - │ -                    │
    │ atacseq                │   148 │            dev │   2 weeks ago │           - │ -                    │
    │ molkart                │     2 │            dev │   2 weeks ago │           - │ -                    │
    │ metapep                │     4 │            dev │   2 weeks ago │           - │ -                    │
    │ methylseq              │   117 │            dev │   3 weeks ago │           - │ -                    │
    │ viralrecon             │   101 │            dev │   3 weeks ago │           - │ -                    │
    │ pathogensurveillance   │     6 │            dev │  1 months ago │           - │ -                    │
    │ createpanelrefs        │     3 │            dev │  1 months ago │           - │ -                    │
    │ quantms                │    14 │            dev │  1 months ago │           - │ -                    │
    │ smrnaseq               │    58 │            dev │  1 months ago │           - │ -                    │
    │ nanostring             │     6 │            dev │  1 months ago │           - │ -                    │
    │ cutandrun              │    51 │            dev │  1 months ago │           - │ -                    │
    │ demultiplex            │    28 │            dev │  2 months ago │ 1 weeks ago │ No (v1.3.2)          │
    │ isoseq                 │    16 │            dev │  2 months ago │           - │ -                    │
    │ airrflow               │    32 │            dev │  3 months ago │           - │ -                    │
    │ viralintegration       │    11 │            dev │  3 months ago │           - │ -                    │
    │ hicar                  │     4 │            dev │  3 months ago │           - │ -                    │
    │ circdna                │    17 │            dev │  3 months ago │           - │ -                    │
    │ marsseq                │     4 │            dev │  3 months ago │           - │ -                    │
    │ spatialtranscriptomics │    28 │            dev │  3 months ago │           - │ -                    │
    │ hic                    │    60 │            dev │  4 months ago │           - │ -                    │
    │ nanoseq                │   123 │            dev │  5 months ago │           - │ -                    │
    │ callingcards           │     2 │            dev │  5 months ago │           - │ -                    │
    │ gwas                   │    15 │            dev │  5 months ago │           - │ -                    │
    │ hgtseq                 │    18 │            dev │  5 months ago │           - │ -                    │
    │ genomeassembler        │    13 │            dev │  5 months ago │           - │ -                    │
    │ spinningjenny          │     0 │            dev │  7 months ago │           - │ -                    │
    │ variantcatalogue       │     4 │            dev │  7 months ago │           - │ -                    │
    │ phyloplace             │     3 │            dev │  7 months ago │           - │ -                    │
    │ clipseq                │    16 │            dev │  7 months ago │           - │ -                    │
    │ radseq                 │     3 │            dev │  8 months ago │           - │ -                    │
    │ hlatyping              │    47 │            dev │  9 months ago │           - │ -                    │
    │ fastquorum             │     8 │            dev │ 11 months ago │           - │ -                    │
    │ coproid                │     8 │            dev │ 11 months ago │           - │ -                    │
    │ lncpipe                │    26 │            dev │   1 years ago │           - │ -                    │
    │ imcyto                 │    23 │            dev │   1 years ago │           - │ -                    │
    │ mnaseseq               │    10 │            dev │   1 years ago │           - │ -                    │
    │ genomeannotator        │    12 │            dev │   2 years ago │           - │ -                    │
    │ proteomicslfq          │    32 │            dev │   2 years ago │           - │ -                    │
    │ cageseq                │     9 │            dev │   2 years ago │           - │ -                    │
    │ scflow                 │    21 │            dev │   2 years ago │           - │ -                    │
    │ bactmap                │    45 │            dev │   2 years ago │           - │ -                    │
    │ diaproteomics          │    12 │            dev │   2 years ago │           - │ -                    │
    │ pgdb                   │     5 │            dev │   2 years ago │           - │ -                    │
    │ slamseq                │     4 │            dev │   2 years ago │           - │ -                    │
    └────────────────────────┴───────┴────────────────┴───────────────┴─────────────┴──────────────────────┘

checking all configuration files for user pipline and maintain orginal copy of user pipeline nexflow.config and change it as per application needs is always good approach. 

::

    $ nf-core create    # It will asks for pipeline name  and Enter details 

    rajsamplepipeline  
    ..............
    $ cd nf-core-rajeshsamplepipline/ 
    (rajesh_env) $ tree 

::

    ├── assets 
    │   ├── adaptivecard.json 
    │   ├── email_template.html 
    │   ├── email_template.txt 
    │   ├── methods_description_template.yml 
    │   ├── multiqc_config.yml 
    │   ├── nf-core-rajeshsamplepipline_logo_light.png 
    │   ├── samplesheet.csv 
    │   ├── schema_input.json 
    │   ├── sendmail_template.txt 
    │   └── slackreport.json 
    ├── bin 
    │   └── check_samplesheet.py 
    ├── CHANGELOG.md 
    ├── CITATIONS.md 
    ├── CODE_OF_CONDUCT.md 
    ├── conf 
    │   ├── base.config 
    │   ├── igenomes.config 
    │   ├── modules.config 
    │   ├── test.config 
    │   └── test_full.config 
    ├── cpnextflow.config 
    ├── docs 
    │   ├── images 
    │   │   ├── mqc_fastqc_adapter.png 
    │   │   ├── mqc_fastqc_counts.png 
    │   │   ├── mqc_fastqc_quality.png 
    │   │   ├── nf-core-rajeshsamplepipline_logo_dark.png 
    │   │   └── nf-core-rajeshsamplepipline_logo_light.png 
    │   ├── output.md 
    │   ├── README.md 
    │   └── usage.md 
    ├── lib 
    │   ├── nfcore_external_java_deps.jar 
    │   ├── NfcoreTemplate.groovy 
    │   ├── Utils.groovy 
    │   ├── WorkflowMain.groovy 
    │   └── WorkflowRajeshsamplepipline.groovy 
    ├── LICENSE 
    ├── main.nf 
    ├── modules 
    │   ├── local 
    │   │   └── samplesheet_check.nf 
    │   └── nf-core 
    │       ├── custom 
    │       │   └── dumpsoftwareversions 
    │       │       ├── main.nf 
    │       │       ├── meta.yml 
    │       │       └── templates 
    │       │           └── dumpsoftwareversions.py 
    │       ├── fastqc 
    │       │   ├── main.nf 
    │       │   └── meta.yml 
    │       └── multiqc 
    │           ├── main.nf 
    │           └── meta.yml 
    ├── modules.json 
    ├── **nextflow.config**
    ├── nextflow_schema.json 
    ├── pyproject.toml 
    ├── README.md 
    ├── subworkflows 
    │   └── local 
    │       └── input_check.nf 
    ├── tower.yml 
    └── workflows 
        └── **rajeshsamplepipline.nf**
    17 directories, 51 files 





SIF Image Verification / Fingerprints Header
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If the bootstrap image is in the SIF format, then verification will be performed at build time. This verification checks whether the image has been signed. If it has been signed the integrity of the image is checked, and the signatures matched to public keys if available. This process is equivalent to running **apptainer verify** on the bootstrap image. 

By default a failed verification, e.g. against an unsigned image, or one that has been modified after signing, will produce a warning but the build will continue.To enforce that the bootstrap image verifies correctly and has been signed by one or more keys, you can use the **Fingerprints:** header. 


.. image:: ./apptainertest10.png
  :width: 600
  :alt: An image of the Text component in the visual editor.


If, at build time, the image is not signed with keys corresponding to all of the listed fingerprints, the build will fail. 

    * The **Fingerprints:** header can be used with bootstrap agents that provide a SIF image.
    * The **library** agent always retrieves a SIF image. 
    * The **local image** agent can be used to refer to SIF or other types of images. 
    * The **Fingerprints:** header has no effect if the bootstrap image is not in SIF format. 


Signing and Verifying Containers(Container image security)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Apptainer has the ability to create and manage PGP keys and use them to sign and verify containers. This provides a trusted method for Apptainer users to share containers. It ensures a bit-for-bit reproduction of the original container as the author intended it. This sections will answer the following two questions first one is how do you verify the containers when downloading images from untrusted sources using cryptographically signing and how do you run the containers in untrusted environments by encrypting using RSA public keys, so that nobody knows nothing what is running inside the container. Second use case is not necessary right now, so providing a case study for the first scenario.  

To sign your own containers you first need to generate one or more keys. 

::

    $ apptainer key newpair 
    Enter your name (e.g., John Doe) : rajesh 
    Enter your email address (e.g., john.doe@example.com) :  
    Enter optional comment (e.g., development keys) :   
    Enter a passphrase :  
    Retype your passphrase :  
    Generating Entity and OpenPGP Key Pair... done 

The **list** subcommand will show you all of the keys you have created or saved locally.

::

    $ apptainer key list 
    Public key listing : 
    0) U: rajesh () <> 
    C: 2023-07-18 14:39:11 -0400 EDT 
    F: ########
    L: ###### 
    -------- 


In the output above the index of my key is 0 and the letters stand for the following: 

U: User 

C: Creation date and time 

F: Fingerprint 

L: Key length 

Now that you have a key generated, you can use it to sign images: 

::

    $ apptainer sign python_latest.sif 
    Signing image: python_latest.sif 
    Signature created and applied to python_latest.sif 

Because your public PGP key is saved locally you can verify the image without needing to contact the key server 

::

    $ apptainer verify python_latest.sif  
    Verifying image: python_latest.sif 
    [LOCAL]   Signing entity: rajesh 
    [LOCAL]   Fingerprint: ########## 
    Objects verified: 
    ID  |GROUP   |LINK    |TYPE 
    ------------------------------------------------ 
    1   |1       |NONE    |Def.FILE 
    2   |1       |NONE    |JSON.Generic 
    3   |1       |NONE    |JSON.Generic 
    4   |1       |NONE    |FS 
    Container verified: python_latest.sif 



SIF IDs and Groups
^^^^^^^^^^^^^^^^^^^^^
As well as the default behaviour, which signs all objects, fine-grained control of signing is possible. 

sif list a SIF file you will see it is comprised of a number of objects. Each object has an ID, and belongs to a GROUP. 

::

    $ apptainer sif list python_latest.sif  
    ------------------------------------------------------------------------------ 
    ID   |GROUP   |LINK    |SIF POSITION (start-end)  |TYPE 
    ------------------------------------------------------------------------------ 
    1    |1       |NONE    |32176-32208               |Def.FILE 
    2    |1       |NONE    |32208-36744               |JSON.Generic 
    3    |1       |NONE    |36744-37212               |JSON.Generic 
    4    |1       |NONE    |40960-346984448           |FS (Squashfs/*System/amd64) 
    5    |NONE    |1   (G) |346984448-346986245       |Signature (SHA-256)  

we can choose to sign and verify a specific object with the --sif-id option to sign and verify 

::

    $ apptainer verify --sif-id 2 python_latest.sif  
    Verifying image: python_latest.sif 
    [LOCAL]   Signing entity: rajesh 
    [LOCAL]   Fingerprint: #######################
    Objects verified: 
    ID  |GROUP   |LINK    |TYPE 
    ------------------------------------------------ 
    2   |1       |NONE    |JSON.Generic 
    Container verified: python_latest.sif 

 

This QuickStart document describes the surface of all of the things you can do with Apptainer! For additional help or support, please visit: https://www.apptainer.org/docs/ .  
If you need additional help or support, see: https://apptainer.org/help and contact HPC Team IDSC University of Miami or Raise Ticket with brief description of project requirement to hpc@ccs.miami.edu 

 













































































































  
 





 















