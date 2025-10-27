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

 
 