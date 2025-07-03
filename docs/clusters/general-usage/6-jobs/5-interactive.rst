.. _p-interactive: 

Pegasus Interactive Jobs
========================

HPC clusters primarily take batch jobs and run them in the
*background*—users do not need to interact with the job during the
execution. However, sometimes users do need to interact with the
application. For example, the application needs the input from the
command line or waits for a mouse event in X windows. Use
``bsub -Is -q interactive command`` to launch interactive work on
Pegasus.  Remember to include your Pegasus cluster project ID in your job submissions with the ``-P`` flag.  

To compile or install personal software on the Pegasus cluster, submit an "interactive" shell job to the Pegasus LSF scheduler and proceed with your compilations ::

    [username@pegasus ~]$ bsub -Is -q interactive -P myProjectID bash


To run a non-graphical interactive Matlab session on the Pegasus cluster, submit an interactive job ::

    [username@pegasus ~]$ bsub -Is -q interactive -P myProjectID matlab -nodisplay


To run an graphical interactive job, add ``-XF`` to your bsub flags (more on x11 below) ::

    [username@pegasus ~]$ bsub -Is -q interactive -P myProjectID -XF $(java -jar ~/.local/apps/ImageJ/ij.jar -batch ~/.local/apps/ImageJ/macros/screenmill.txt)

Upon exiting the interactive job, you will be returned to one of the
login nodes.


Interactive Job Utilizing X11 client
-------------------------------------

Additionally, the interactive queue can run X11 jobs. The bsub ``-XF``
option is used for X11 jobs, for example:

::

    [username@pegasus ~]$ bsub -Is -q interactive -P myProjectID -XF matlab
    Job <50274> is submitted to queue <interactive>.
    <<ssh X11 forwarding job>>
    <<Waiting for dispatch ...>>
    <<Starting on n003.pegasus.edu>> 

Upon exiting the X11 interactive job, you will be returned to one of the
login nodes.

To run an X11 application, establish an X tunnel with SSH when
connecting to Pegasus. For example,

::

    ssh -X username@pegasus.ccs.miami.edu

Note that by default, the auth token is good for 20 minutes.  SSH will
block new X11 connections after 20 minutes. To avoid this on Linux or OS
X, run ``ssh -Y`` instead, or set the option **ForwardX11Trusted yes**
in your ~/.ssh/config.

In Windows, use \ `Cygwin/X <https://www.cygwin.com/>`__ to provide a
Linux-like environment.  Then run ``ssh -Y`` or set the option in your
~/.ssh/config file.
