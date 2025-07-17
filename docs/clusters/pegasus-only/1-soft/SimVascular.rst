SimVascular on Pegasus
=======================

SimVascular is available as a software module on Pegasus. SimVascular graphical jobs can be submitted to 
the LSF scheduler via the interactive queue using the tk gui.


Forwarding X11
----------------

In order to launch a SimVascular interactive job, you will need to login to Pegasus with X11 forwarding enabled.

You will also need to install an X11 server on your local machine such as Xming for Windows or XQuartz for Mac.

Please see the following guide on how to achieve this: 
https://acs-docs.readthedocs.io/services/1-access.html?highlight=x11#connect-with-x11-forwarding


Loading the Module
-------------------
The SimVascular module is dependent on the gcc/8.3.1 software module. This will come pre-loaded once the SimVascular module has been loaded.

::

    [nra20@login4 ~]$ module load simvascular
    [nra20@login4 ~]$ module list
     Currently Loaded Modulefiles:
       1) perl/5.18.1(default)   3) simvascular/2021.6.10.lua
       2) gcc/8.3.1    
       
Launching Graphical Interactive Jobs
------------------------------------- 
You can use the following command to launch an interactive job. Be Sure to use the -tk parameter when launching SimVascular in order to utilize
the tk gui.

::

    [nra20@login4 ~]$ bsub -Is -q interactive -P <projectID> -XF sv -tk
    
The graphical display will take a few seconds to load up. You are free to save projects into your home directory or your project's scratch directory. 
Saving in any directory you do not have access to may result in an error. 
