.. _t-soft:

===============================
Software Environment Management
===============================

Software and dependencies on Triton are deployed through Lmod_, an implementation of Environment Modules.

.. _Lmod: https://lmod.readthedocs.io/en/latest/010_user.html

Please note, different modules will be shown/hidden depending on the compiler that is loaded. The below examples are performed with
the gcc/8.3.1 compiler loaded.

Module Commands
---------------

Shortcut commands are also available :

+---------------------------+-----------------------+------------------+
| Command                   | Shortcut              | Description      |
+===========================+=======================+==================+
| module list               | ml                    | list currently   |
|                           |                       | loaded modules   |
+---------------------------+-----------------------+------------------+
| module avail              | ml av                 | list available   |
|                           |                       | modules, based   |
|                           |                       | on currently     |
|                           |                       | loaded           |
|                           |                       | hierarchies      |
|                           |                       | (compilers,      |
|                           |                       | libraries, etc.) |
+---------------------------+-----------------------+------------------+
| module avail pkgName1     | ml av pkgName1        | search available |
|                           |                       | modules, based   |
|                           |                       | on currently     |
|                           |                       | loaded           |
|                           |                       | hierarchies      |
+---------------------------+-----------------------+------------------+
| module is-avail pkgName1  | ml is-avail pkgName1  | check if         |
|                           |                       | module(s) can be |
|                           |                       | loaded, based on |
|                           |                       | currently loaded |
|                           |                       | hierarchies      |
+---------------------------+-----------------------+------------------+
| module spider             | ml spider             | list all modules |
+---------------------------+-----------------------+------------------+
| module spider pkgName1    | ml spider pkgName1    | search all       |
|                           |                       | modules          |
+---------------------------+-----------------------+------------------+
| module keyword word1      | ml keyword word1      | search module    |
|                           |                       | help and whatis  |
|                           |                       | for word(s)      |
+---------------------------+-----------------------+------------------+
| module spider             | ml spider             | show how to load |
| pkgName1/Version          | pkgName1/Version      | a specific       |
|                           |                       | module           |
+---------------------------+-----------------------+------------------+
| module load pkgName1      | ml pkgName1           | load module(s)   |
|                           |                       | by name (default |
|                           |                       | version)         |
+---------------------------+-----------------------+------------------+
| module load               | ml pkgName1/Version   | load module(s)   |
| pkgName1/Version          |                       | by name and      |
|                           |                       | version          |
+---------------------------+-----------------------+------------------+
| module unload pkgName1    | ml -pkgName1          | unload module(s) |
|                           |                       | by name          |
+---------------------------+-----------------------+------------------+
| module reset              | ml reset              | reset to system  |
|                           |                       | defaults         |
+---------------------------+-----------------------+------------------+
| module restore            | ml restore            | reset to user    |
|                           |                       | defaults, if     |
|                           |                       | they exist       |
+---------------------------+-----------------------+------------------+
| module help pkgName1      | ml help pkgName1      | show module help |
|                           |                       | info             |
+---------------------------+-----------------------+------------------+
| module whatis pkgName1    | ml whatis pkgName1    | show module      |
|                           |                       | version info     |
+---------------------------+-----------------------+------------------+
| module show pkgName1      | ml show pkgName1      | show module      |
|                           |                       | environment      |
|                           |                       | changes          |
+---------------------------+-----------------------+------------------+

Triton Standard Environment
---------------------------

The StdEnv on Triton contains the default configurations for the cluster.

-  show loaded modules with ``module list`` or ``ml``
-  show StdEnv settings with ``module show StdEnv`` or
   ``ml show StdEnv`` 
   
::

    [username@login1 ~]$ ml

	Currently Loaded Modules:
	  1) gcc/8.3.1   2) StdEnv

    [username@login1 ~]$ ml show StdEnv
	----------------------------------------------------------------------------
	   /share/mfiles/Core/StdEnv.lua:
	----------------------------------------------------------------------------
	help([[  Lua Help for the Standard Environment module configurations on Triton 
	]])
	whatis("Description: loads standard environment modules")
	load("gcc/8.3.1")


Triton available modules
------------------------

Available modules at login include the compilers under “Compilers”, compiler-independent modules under “Core”, and modules dependent on the currently loaded compiler. 

***Note :*** some modulefiles are marked (E) for Experimental.  As with all software, please report any issues to `hpc@ccs.miami.edu <mailto:hpc@ccs.miami.edu>`_.

-  show loaded modules with ``module list`` or ``ml``
-  show module help info with ``module help NAME`` or ``ml help NAME``
-  show module whatis info with ``module whatis NAME`` or
   ``ml whatis NAME``
-  show available modules with ``module avail`` or ``ml av``
-  show module settings with ``module show NAME`` or ``ml show NAME``
-  load a module with ``module load NAME`` or ``ml NAME``

::

    [username@login1 ~]$ ml

	Currently Loaded Modules:
	  1) gcc/8.3.1   2) StdEnv


    [username@login1 ~]$ ml help gcc

	--------------------- Module Specific Help for "gcc/8.3.1" ---------------------
	The GNU Compiler Collection includes front ends for C, C++, Objective-C,
	Fortran, Ada, and Go, as well as libraries for these languages.



    [username@login1 ~]$ ml whatis gcc
	gcc/8.3.1           : Name : gcc
	gcc/8.3.1           : Version : 8.3.1
	gcc/8.3.1           : Target : power9le


    [username@login1 ~]$ ml av
	----------------------- /share/mfiles/Compiler/gcc/8.3.1 -----------------------
	   R/3.6.3                libxsmm/1.16.1         (E)
	   R/4.0.3                ncview/2.1.8           (D)
	   R/4.0.5         (D)    netcdf-c/4.8.0
	   R/4.1.0                netcdf-fortran/4.5.3
	   cmake/3.19.2           openbabel/3.0.0
	   cmake/3.20.2    (D)    openblas/0.3.13
	   ffmpeg/4.3.2           openblas/0.3.14        (D)
	   fftw/3.3.9             openfoam/2012          (D)
	   gdal/2.4.4             openmpi/4.0.5
	   gdal/3.3.0      (D)    openssl/1.1.1k
	   gromacs/2021.1         pandoc/2.7.3
	   gsl/2.6                parallel-netcdf/1.12.2
	   hdf5/1.10.7            perl/5.32.1
	   jags/4.3.0             plumed/2.8.0
	   lammps/20200721        python/3.8.10
	   lammps/20210310 (D)    smpi/10.02
	   libgit2/1.1.0          wrf/4.2
	   libicov/1.16

	------------------------ /usr/share/Modules/modulefiles ------------------------
	   dot    module-info    modules    null    use.own

	------------------------------ /share/mfiles/Core ------------------------------
	   StdEnv                (L)      libiconv/1.16
	   anaconda2/2019.07     (E)      libpciaccess/0.13.5
	   anaconda3/biohpc      (E)      libxml2/2.9.9
	   anaconda3/2019.07     (E)      ncl/6.3.0
	   anaconda3/2019.10     (E,D)    ncview/2.1.2
	   anaconda3/2020.11     (E)      netlib-scalapack/2.0.2
	   anaconda3/2023.03     (E)      numactl/2.0.12
	   cellranger-atac/3.0.2 (E)      openblas/0.3.7
	   cellranger-dna/3.0.2  (E)      openfoam/2006
	   cellranger/3.0.2      (E)      vmd/1.9.4              (E)
	   cmake/3.20.2                   wml/1.6.1              (E)
	   cuda/10.1                      wml/1.6.2              (E)
	   cuda/10.2             (D)      wml/1.7.0              (E,D)
	   gaussian/16                    wml_anaconda3/2019.10  (E)
	   java/8.0              (D)      xz/5.2.4
	   java/8.0-6.5                   zlib/1.2.11
	   lammps/2019.08

	--------------------------- /share/mfiles/Compilers ----------------------------
	   at/12.0          gcc/7.4.0        gcc/8.4.0
	   gcc/4.8.5 (D)    gcc/8.3.1 (L)    xl/16.1.1.4 (E)

	  Where:
	   D:  Default Module
	   E:  Experimental
	   L:  Module is loaded

	Use "module spider" to find all possible modules.
	Use "module keyword key1 key2 ..." to search for all possible modules matching
	any of the "keys".

    ..


    [username@login1 ~]$ ml show gcc
	----------------------------------------------------------------------------
	   /share/mfiles/Compilers/gcc/8.3.1.lua:
	----------------------------------------------------------------------------
	whatis("Name : gcc")
	whatis("Version : 8.3.1")
	whatis("Target : power9le")
	help([[The GNU Compiler Collection includes front ends for C, C++, Objective-C,
	Fortran, Ada, and Go, as well as libraries for these languages.]])
	prepend_path("MODULEPATH","/share/mfiles/Compiler/gcc/8.3.1")
	family("compiler")
	prepend_path("INFOPATH","/opt/rh/devtoolset-8/root/usr/share/info")
	prepend_path("LD_LIBRARY_PATH","/opt/rh/devtoolset-8/root/usr/lib64:/opt/rh/devtoolset-8/root/usr/lib:/opt/rh/devtoolset-			8/root/usr/lib64/dyninst:/opt/rh/devtoolset-8/root/usr/lib/dyninst:/opt/rh/devtoolset-8/root/usr/lib64:/opt/rh/devtoolset-8/root/usr/lib")
	prepend_path("MANPATH","/opt/rh/devtoolset-8/root/usr/share/man")
	prepend_path("PATH","/opt/rh/devtoolset-8/root/usr/bin")
	prepend_path("PKG_CONFIG_PATH","/opt/rh/devtoolset-8/root/usr/lib64/pkgconfig")
	prepend_path("PYTHONPATH","/opt/rh/devtoolset-8/root/usr/lib64/python2.7/site-packages:/opt/rh/devtoolset-8/root/usr/lib/python2.7/site-packages")
	setenv("PCP_DIR","/opt/rh/devtoolset-8/root")
	setenv("PERL5LIB","/opt/rh/devtoolset-8/root//usr/lib64/perl5/vendor_perl:/opt/rh/devtoolset-8/root/usr/lib/perl5:/opt/rh/devtoolset-8/root//usr/share/perl5/vendor_perl")

    [username@login1 ~]$ ml smpi
    [username@login1 ~]$ ml

	Currently Loaded Modules:
	  1) gcc/8.3.1   2) StdEnv   3) smpi/10.02


Triton module hierarchies
-------------------------

Switch to a different compiler with the ``module swap`` command. Any dependent modules should also swap, if both versions exist.  The SMPI module has both a gcc version, and an at/12.0 version.  

-  show currently loaded modules with ``ml``
-  show smpi module help with ``ml help smpi`` 
-  switch from gcc to at with ``ml swap gcc at`` or ``ml -gcc at``

   -  note the Lmod "reload" message for the smpi module 
   -  (confirm smpi is loaded with ``ml``)
   
-  show smpi module help with ``ml help smpi`` (a different smpi module)  
-  reset to Triton defaults with ``ml reset``


::

    [username@login1 ~]$ ml

    Currently Loaded Modules:
      1) StdEnv   2) gcc/8.3.1   3) smpi/10.02
	  
	  
	[username@login1 ~]$ ml help smpi
	
	-------------------- Module Specific Help for "smpi/10.02" ---------------------
	  Lua Help file for IBM smpi 10.02 with devtoolset-8 GCC suite 

	  gcc version 8.3.1

	  sets OMPI_CC, OMPI_FC, and OMPI_CXX to AT gcc suite


    [username@login1 ~]$ ml -gcc at

    Due to MODULEPATH changes, the following have been reloaded:
      1) smpi/10.02

    [username@login1 ~]$ ml

    Currently Loaded Modules:
      1) at/12.0   2) StdEnv   3) smpi/10.02



    [username@login1 ~]$ ml help smpi

	-------------------- Module Specific Help for "smpi/10.02" ---------------------
	  Lua Help file for IBM smpi 10.02 with Triton IBM AT 12.0 gcc suite

	  gcc version 8.3.1

	  sets OMPI_CC, OMPI_FC, and OMPI_CXX to AT gcc suite


    [username@login1 ~]$ ml reset
    Resetting modules to system default. Resetting $MODULEPATH back to system default. All extra directories will be removed from $MODULEPATH.
    [username@login1 ~]$ ml

	Currently Loaded Modules:
	  1) gcc/8.3.1   2) StdEnv


More hierarchies and dependencies
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Dependency modules can be loaded in the same command, without waiting for them to appear in the output for module list (``ml av``).

Example: cdo, nco, and netcdff depend on "netcdfc".  Netcdfc depends on "hdf5".  They can be loaded in sequence, starting with the first dependency, "hdf5". 

::

    [username@login1 ~]$ ml gcc/4.8.5 hdf5 netcdfc netcdff cdo nco
        The following have been reloaded with a version change:
  	1) gcc/8.3.1 => gcc/4.8.5
	
    [username@login1 ~]$ ml

	Currently Loaded Modules:
	  1) gcc/4.8.5         4) netcdfc/4.7.4 (E)   7) cdo/1.9.8 (E)
	  2) StdEnv            5) netcdff/4.5.3 (E)
	  3) hdf5/1.8.16 (E)   6) nco/4.9.3     (E)

To view dependent modules in ``ml av``, first load their prerequisites.


**"Behind the scenes"**

After an hdf5 module is loaded, any available netcdfc modules will show in ``ml av`` output :

-  load the default hdf5 module with ``ml hdf5`` 
-  show loaded modules with ``ml`` 
-  show available modules with ``ml av`` : netcdfc module now available to load
-  load the default netcdfc module with ``ml netcdfc``
-  show newly available modules with ``ml av`` : netcdff, nco, and cdo now available to load 

::

    [username@login1 ~]$ ml hdf5
    [username@login1 ~]$ ml

	Currently Loaded Modules:
	  1) gcc/4.8.5   2) StdEnv   3) hdf5/1.8.16 (E)


    [username@login1 ~]$ ml av

	------------------- /share/mfiles/Library/gcc485/hdf5/1.8.16 -------------------
	   netcdfc/4.7.4 (E)

	----------------------- /share/mfiles/Compiler/gcc/4.8.5 -----------------------
	   hdf5/1.8.16   (E,L)    myGCCdependentProgram/1.0 (S)    openmpi/3.1.4
	   hwloc/1.11.11          openBLAS/0.3.7                   smpi/10.02
	 	 
	 ...

    ..

Once both hdf5 and netcdfc are loaded, ``ml av`` shows the next set of dependent modules :

::


    [username@login1 ~]$ ml netcdfc
    [username@login1 ~]$ ml

	Currently Loaded Modules:
	  1) gcc/4.8.5   2) StdEnv   3) hdf5/1.8.16 (E)   4) netcdfc/4.7.4 (E)

    [username@login1 ~]$ ml av

	------------ /share/mfiles/Library/gcc485/netcdfc/4.7.4/hdf5/1.8.16 ------------
	   cdo/1.9.8 (E)    nco/4.9.3 (E)    netcdff/4.5.3 (E)

	------------------- /share/mfiles/Library/gcc485/hdf5/1.8.16 -------------------
	   netcdfc/4.7.4 (E,L)

	----------------------- /share/mfiles/Compiler/gcc/4.8.5 -----------------------
	   hdf5/1.8.16   (E,L)    myGCCdependentProgram/1.0 (S)    openmpi/3.1.4
	   hwloc/1.11.11          openBLAS/0.3.7                   smpi/10.02
	 
	 ...

