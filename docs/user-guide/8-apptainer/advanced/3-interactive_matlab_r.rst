Interactive MATLAB and R Containers
===================================

This page preserves the older examples for running MATLAB and R containers
through interactive LSF jobs.

Interactive Application Rule
----------------------------

Interactive applications should run on compute nodes through LSF, not directly
on login nodes.

MATLAB Container
----------------

Pull the MATLAB image:

::

   apptainer pull docker://mathworks/matlab

This creates an image similar to:

::

   matlab_latest.sif

Launch MATLAB through an interactive LSF job:

::

   bsub -q general -P <project> -Is apptainer run /nethome/$USER/matlab_latest.sif

A valid MathWorks account or license may be required. After MATLAB starts, you
can run normal MATLAB commands:

.. code:: matlab

   a = 3;
   b = a*a;
   c = a*a*a;
   d = sqrt(a);
   fprintf('%4u square equals %4u\n', a, b)
   fprintf('%4u cube equals %4u\n', a, c)
   fprintf('The square root of %2u is %6.4f\n', a, d)
   exit

R Tidyverse Container
---------------------

Pull a Tidyverse image:

::

   apptainer pull docker://rocker/tidyverse:4.0.1

Run R through an interactive LSF job:

::

   bsub -q general -P <project> -Is apptainer run /nethome/$USER/tidyverse_4.0.1.sif R

Inside R:

.. code:: r

   x <- 1000L
   y <- 55L
   x
   y
   class(x)
   class(y)
   q()

Base R Container
----------------

For a smaller R image, use ``r-base``:

::

   apptainer pull docker://r-base:4.0.3
   apptainer run r-base_4.0.3.sif R

Interactive Container Notes
---------------------------

* Use LSF for interactive sessions.
* Use full paths to images when running from a job.
* Bind project or scratch directories if the application needs data.
* Save results to host storage before ending the session.
