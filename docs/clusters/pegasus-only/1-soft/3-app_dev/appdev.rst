.. _p-appdev:

Application Development on Pegasus
==================================

MPI and OpenMP modules are listed under Intel and GCC compilers. These MP
libraries have been compiled and built with either the `Intel compiler
suite <http://software.intel.com/en-us/intel-compilers/>`__ or the `GNU
compiler suite <http://www.gnu.org/software/gcc/>`__.

The following sections present the compiler invocation for serial and MP
executions. All compiler commands can be used for just compiling with
the ``-c`` flag (to create just the “.o” object files) or compiling and
linking (to create executables). To use a different (non-default)
compiler, first unload intel, swap the compiler environment, and then
reload the MP environment if necessary. 

.. note:: Only **one** MP module should be loaded at a time. 


Compiling Serial Code
---------------------

Pegasus has Intel and GCC compilers.

+--------+----------------+-----------------------+-----------------------------+
| Vendor | Compiler       | Module Command        | Example                     |
+========+================+=======================+=============================+
| intel  | icc (default)  | ``module load intel`` | icc -o foo.exe foo.c        |
+--------+----------------+-----------------------+-----------------------------+
| intel  | ifor (default) | ``module load intel`` | ifort -o foo.exe foo.f90    |
+--------+----------------+-----------------------+-----------------------------+
| gnu    | gcc            | ``module load gcc``   | gcc -o foo.exe foo.c        |
+--------+----------------+-----------------------+-----------------------------+
| gnu    | gcc            | ``module load gcc``   | gfortran -o foo.exe foo.f90 |
+--------+----------------+-----------------------+-----------------------------+


Compiling Parallel Programs with MPI
------------------------------------

The **Message Passing Interface** (MPI) library allows processes in
a parallel application to communicate with one another. There is no
default MPI library in your Pegasus environment. Choose the desired MPI
implementation for your applications by loading an appropriate MPI
module. Recall that only one MPI module should be loaded at a time.

Pegasus supports Intel MPI and OpenMP for Intel and GCC compilers.

How to load MPI libraries in your Pegasus environment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

+----------+-----------+-------------------------------+---------------------------+
| Compiler | MPI       | Module Command                | Example                   |
+==========+===========+===============================+===========================+
| intel    | Intel MPI | ``module load intel impi``    | mpif90 -o foo.exe foo.f90 |
+----------+-----------+-------------------------------+---------------------------+
| intel    | Intel MPI | ``module load intel impi``    | mpicc -o foo.exe foo.c    |
+----------+-----------+-------------------------------+---------------------------+
| intel    | OpenMP    | ``module load intel openmpi`` | mpif90 -o foo.exe foo.f90 |
+----------+-----------+-------------------------------+---------------------------+
| intel    | OpenMP    | ``module load intel openmpi`` | mpicc -o foo.exe foo.c    |
+----------+-----------+-------------------------------+---------------------------+
| gcc      | OpenMP    | ``module load openmpi-gcc``   | mpif90 -o foo.exe foo.f90 |
+----------+-----------+-------------------------------+---------------------------+
| gcc      | OpenMP    | ``module load openmpi-gcc``   | mpicc -o foo.exe foo.c    |
+----------+-----------+-------------------------------+---------------------------+

Configuration options of MPI on Pegasus
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

There are three ways to configure MPI on Pegasus. Choose the option that
works best for your job requirements.

-  **Add the** ``module load`` **command to your startup files.**
   This is most convenient for users requiring only a single version of
   MPI. This method works with all MPI modules.
-  **Load the module in your current shell.**
   For current MPI versions, the ``module load`` command does not need
   to be in your startup files. Upon job submission, the remote
   processes will inherit the submission shell environment and use the
   proper MPI library. This method does **not** work with older versions
   of MPI.
-  **Load the module in your job script.**
   This is most convenient for users requiring different versions of MPI
   for different jobs. Ensure your script can execute the
   ``module command`` properly. For job script information, see
   `Scheduling Jobs on Pegasus <https://acs-docs.readthedocs.io/clusters/general-usage/5-jobs/README.html>`__.
