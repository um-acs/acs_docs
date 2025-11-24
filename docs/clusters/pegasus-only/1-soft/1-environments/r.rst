R on Pegasus
============

R is available on Pegasus through the ``module`` command. You can load 
R into your environment by typing the following on the commandline:

::

    [username@pegasus ~]$ module load R

This loads the default version of R, currently ``4.1.0``. To load a specific
version of R, say, ``3.6.3``, you can type the following:

::

    [username@pegasus ~]$ module load R/3.6.3


To see a list of available software, including R versions, use the command 
``module avail``. For more information about software available on Pegasus, 
see `Software on the Pegasus Cluster <https://acs-docs.readthedocs.io/clusters/pegasus-only/1-soft/README.html>`__.

Batch R
-------

To run a batch R file on the compute nodes on Pegasus, submit the file to LSF
with ``R CMD BATCH filename.R``, with ``filename`` being the name of your R script.
This can be done using the following (two) commands:

::

    [username@pegasus ~]$ module load R/4.1.0
    [username@pegasus ~]$ bsub -q general -P projectID R CMD BATCH filename.R
    Job is submitted to <projectID> project.
    Job <6101046> is submitted to queue <general>.

Batch jobs can also be submitted to LSF with script files, such as 
``example.job`` shown below.

::

    example.job
    #!/bin/bash
    #BSUB -J R_job            # name of your job
    #BSUB -e filename.e%J     # file that will contain any error messages
    #BSUB -o filename.o%J     # file that will contain standard output
    #BSUB -R "span[hosts=1]"  # request run script on one node
    #BSUB -q general          # request run on general queue
    #BSUB -n 1                # request 1 core
    #BSUB -W 2                # request 2 minutes of runtime
    #BSUB -P projectID        # your projectID
    R CMD BATCH filename.R    # R command and your batch R file

When using such a script file, the batch job can be submitted by typing the 
following on the commandline

::

    [username@pegasus ~]$ bsub < example.job

Interactive R
-------------

R can also be run interactively by requesting resources on
the interactive queue. This can be done by first loading R into your 
environment

::

[username@pegasus ~]$ module load R/4.1.0

and then requesting an interactive R session by typing on the commandline

::

[username@pegasus ~]$ bsub -Is -q interactive R

or 

::

[username@pegasus ~]$ bsub -Is -P ProjectID R

making sure to replace ProjectID with the actual name of your project.

Installing additional R packages
--------------------------------

To install additional R packages, you'll need to confirm that your package's 
pre-requisites are met by inspecting and modifying your local environment as needed 
or by loading the appropriate modules. See `Pegasus Cluster Software Installation  <https://acs-docs.readthedocs.io/pegasus/soft/4-install.html#soft-install>`__ for help with complex requirements.

From the R prompt, install any R package to your personal R library with
the standard ``install.package()`` R command. For instance, to install the 
``doParallel`` package, a parallel backend for the ``foreach``
function, one would type the following on the commandline in an interactive 
session of R.

::

    >  install.packages("doParallel", repos="http://R-Forge.R-project.org")

The result would be as follows:

::

  Installing package into ‘/nethome/CaneID/R/x86_64-pc-linux-gnu-library/4.1’
  (as ‘lib’ is unspecified)
  trying URL 'http://R-Forge.R-project.org/src/contrib/doParallel_1.0.14.tar.gz'
  Content type 'application/x-gzip' length 173692 bytes (169 KB)
  ==================================================
  downloaded 169 KB

  * installing *source* package ‘doParallel’ ...
  ** using staged installation
  ** R
  ** demo
  ** inst
  ** byte-compile and prepare package for lazy loading
  ** help
  *** installing help indices
  ** building package indices
  ** installing vignettes
  ** testing if installed package can be loaded from temporary location
  ** testing if installed package can be loaded from final location
  ** testing if installed package keeps a record of temporary installation path
  * DONE (doParallel)

  The downloaded source packages are in
  	  ‘/tmp/RtmpnBwmdD/downloaded_packages’
  >

Contact `IDSC ACS <mailto:hpc@ccs.miami.edu>`_ to review any core library 
pre-requisites and dependencies, for cluster-wide installation.  


A Sample R script
~~~~~~~~~~~~~~~~~~

Below is a sample R script which creates a graphical output file after it has been
run.

``example1.R``

--------------

.. code:: r

     # create graphical output file
    pdf("example1.pdf")

    # Define two vectors v1 and v2
    v1 <- c(1, 4, 7, 8, 10, 12)
    v2 <- c(2, 8, 9, 10, 11, 15)

    # Creat some graphs
    hist(v1)
    hist(v2)
    pie(v1)
    barplot(v2)

    # close the file
    dev.off() 

Such a script can be run as a batch job. After the script has run, the 
graphical output file can be transferred to a local computer using 
``FileZilla`` or ``scp``, in order to be viewed. 
