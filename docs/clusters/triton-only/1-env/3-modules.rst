.. _t-soft:

Triton Software Modules
=======================

Triton software versions (and dependencies) are deployed through Lmod, an upgraded Environment Modules suite.

https://lmod.readthedocs.io/en/latest/010_user.html


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

    [username@mgt3.summit ~]$ ml

	Currently Loaded Modules:
	  1) xl/16.1.1-13   2) spectrum-mpi/10.4.0.6-20230210   3) DefApps


Triton available modules
------------------------

Available modules at login include the compilers, libraries and packages. 

***Note :*** As with all software, please report any issues to `hpc@ccs.miami.edu <mailto:hpc@ccs.miami.edu>`_.

-  show loaded modules with ``module list`` or ``ml``
-  show module help info with ``module help NAME`` or ``ml help NAME``
-  show module whatis info with ``module whatis NAME`` or
   ``ml whatis NAME``
-  show available modules with ``module avail`` or ``ml av``
-  show module settings with ``module show NAME`` or ``ml show NAME``
-  load a module with ``module load NAME`` or ``ml NAME``

::



    [username@mgt3.summit ~]$ ml help xl/16.1.1-13

	------------------- Module Specific Help for "xl/16.1.1-13" --------------------
	xlc version: 16.1.1.13
	xlf version: 16.1.1.13
	xlmass version: 9.1.1
	xlsmp version: 5.1.1



    [username@mgt3.summit ~]$ ml whatis xl/16.1.1-13
	xl/16.1.1-13        : Description: xlc 16.1.1.13, xlf 16.1.1.13, xlmass 9.1.1, xlsmp 5.1.1


    [username@mgt3.summit ~]$ ml av
		---- /sw/summit/spack-envs/summit-plus/modules/spack/linux-rhel8-ppc64le/spectrum-mpi/10.4.0.6-20230210-zh3mxrm/xl/16.1.1-13 ----
	   fftw/3.3.10        hypre/2.29.0              parallel-netcdf/1.12.2        parmetis/4.0.3
	   hdf5/1.14.3 (D)    netlib-scalapack/2.2.0    parallel-netcdf/1.12.3 (D)
	
	------- /sw/summit/spack-envs/summit-plus/modules/spack/linux-rhel8-ppc64le/xl/16.1.1-13 --------
	   bzip2/1.0.8           (D)    ncurses/6.4                    (D)
	   cmake/3.27.7          (D)    netlib-lapack/3.11.0           (D)
	   curl/8.4.0            (D)    nghttp2/1.57.0                 (D)
	   diffutils/3.9         (D)    nlohmann-json/3.11.2           (D)
	   gdbm/1.23             (D)    perl/5.38.0                    (D)
	   gmake/4.4.1           (D)    pigz/2.7                       (D)
	   gnuconfig/2022-09-17  (D)    pkgconf/1.9.5                  (D)
	   hdf5/1.14.3                  protobuf/3.21.12               (D)
	   libcatalyst/2.0.0-rc4 (D)    readline/8.2                   (D)
	   libfabric/1.19.0      (D)    sed/4.9                        (D)
	   libffi/3.4.4          (D)    snappy/1.1.10                  (D)
	   libiconv/1.17         (D)    spectrum-mpi/10.4.0.6-20230210 (L,D)
	   libmd/1.0.4           (D)    sqlite/3.43.2                  (D)
	   libpng/1.6.39         (D)    sz/2.1.12.5                    (D)
	   libsigsegv/2.14       (D)    toml11/3.7.1                   (D)
	   lizard/1.0            (D)    util-linux-uuid/2.38.1         (D)
	   lz4/1.9.4             (D)    yaml-cpp/0.7.0                 (D)
	   lzo/2.10              (D)    zfp/0.5.5
	   m4/1.4.19             (D)    zlib-ng/2.1.4                  (D)
	   metis/5.1.0           (D)    zstd/1.5.5                     (D)
	
	-------------------------------- /usr/share/Modules/modulefiles ---------------------------------
	   dot    module-git    module-info    modules    null    use.own
	
	----------- /sw/summit/spack-envs/summit-plus/modules/spack/linux-rhel8-ppc64le/Core ------------
	   alsa-lib/1.2.3.2                libxdmcp/1.1.4
	   antlr/2.7.7                     libxext/1.3.3
	   aom/v1.0.0-errata1              libxfont/1.5.4
	   apr-util/1.6.3                  libxml2/2.10.3
	   apr/1.7.4                       libxv/1.0.10
	   autoconf-archive/2023.02.20     libzmq/4.3.5
	   autoconf/2.69                   lizard/1.0
	   automake/1.16.5                 lz4/1.9.4
	   bazel/6.5.0                     lzo/2.10
	   bdftopcf/1.1                    m4/1.4.19
	   berkeley-db/18.1.40             magma/2.7.2-cuda117
	   bison/3.8.2                     magma/2.7.2-cuda121
	   boost/1.83.0                    magma/2.7.2                    (D)
	   bzip2/1.0.8                     makedepend/1.0.8
	   c-blosc/1.21.5                  mbedtls/2.28.2
	   c-blosc2/2.11.1                 mercurial/6.4.5
	   cairo/1.16.0                    meson/1.2.2
	   ccache/4.8.2                    metis/5.1.0
	   cmake/3.27.7                    mgard/2023-03-31
	   curl/8.4.0                      mkfontdir/1.0.7
	   darshan-util/3.4.4              mkfontscale/1.2.2
	   diffutils/3.9                   mpfr/4.2.0                     (D)
	   eccodes/2.25.0                  mpi-serial/2.3.0
	   elfutils/0.189                  nano/7.2
	   emacs/29.1                      nasm/2.15.05
	   expat/2.5.0                     nco/5.1.6
	   exuberant-ctags/5.8             ncurses/6.4
	   ffmpeg/4.4.1                    netcdf-c/4.9.2
	lines 37-59
	   autoconf-archive/2023.02.20     libzmq/4.3.5
	   autoconf/2.69                   lizard/1.0
	   automake/1.16.5                 lz4/1.9.4
	   bazel/6.5.0                     lzo/2.10
	   bdftopcf/1.1                    m4/1.4.19
	   berkeley-db/18.1.40             magma/2.7.2-cuda117
	   bison/3.8.2                     magma/2.7.2-cuda121
	   boost/1.83.0                    magma/2.7.2                    (D)
	   bzip2/1.0.8                     makedepend/1.0.8
	   c-blosc/1.21.5                  mbedtls/2.28.2
	   c-blosc2/2.11.1                 mercurial/6.4.5
	   cairo/1.16.0                    meson/1.2.2
	   ccache/4.8.2                    metis/5.1.0
	   cmake/3.27.7                    mgard/2023-03-31
	   curl/8.4.0                      mkfontdir/1.0.7
	   darshan-util/3.4.4              mkfontscale/1.2.2
	   diffutils/3.9                   mpfr/4.2.0                     (D)
	   eccodes/2.25.0                  mpi-serial/2.3.0
	   elfutils/0.189                  nano/7.2
	   emacs/29.1                      nasm/2.15.05
	   expat/2.5.0                     nco/5.1.6
	   exuberant-ctags/5.8             ncurses/6.4
	   ffmpeg/4.4.1                    netcdf-c/4.9.2
	lines 37-59
	   autoconf-archive/2023.02.20     libzmq/4.3.5
	   autoconf/2.69                   lizard/1.0
	   automake/1.16.5                 lz4/1.9.4
	   bazel/6.5.0                     lzo/2.10
	   bdftopcf/1.1                    m4/1.4.19
	   berkeley-db/18.1.40             magma/2.7.2-cuda117
	   bison/3.8.2                     magma/2.7.2-cuda121
	   boost/1.83.0                    magma/2.7.2                    (D)
	   bzip2/1.0.8                     makedepend/1.0.8
	   c-blosc/1.21.5                  mbedtls/2.28.2
	   c-blosc2/2.11.1                 mercurial/6.4.5
	   cairo/1.16.0                    meson/1.2.2
	   ccache/4.8.2                    metis/5.1.0
	   cmake/3.27.7                    mgard/2023-03-31
	   curl/8.4.0                      mkfontdir/1.0.7
	   darshan-util/3.4.4              mkfontscale/1.2.2
	   diffutils/3.9                   mpfr/4.2.0                     (D)
	   eccodes/2.25.0                  mpi-serial/2.3.0
	   elfutils/0.189                  nano/7.2
	   emacs/29.1                      nasm/2.15.05
	   expat/2.5.0                     nco/5.1.6
	   exuberant-ctags/5.8             ncurses/6.4
	   ffmpeg/4.4.1                    netcdf-c/4.9.2
	   findutils/4.9.0                 netcdf-cxx4/4.3.1
	lines 37-60
	   autoconf-archive/2023.02.20     libzmq/4.3.5
	   autoconf/2.69                   lizard/1.0
	   automake/1.16.5                 lz4/1.9.4
	   bazel/6.5.0                     lzo/2.10
	   bdftopcf/1.1                    m4/1.4.19
	   berkeley-db/18.1.40             magma/2.7.2-cuda117
	   bison/3.8.2                     magma/2.7.2-cuda121
	   boost/1.83.0                    magma/2.7.2                    (D)
	   bzip2/1.0.8                     makedepend/1.0.8
	   c-blosc/1.21.5                  mbedtls/2.28.2
	   c-blosc2/2.11.1                 mercurial/6.4.5
	   cairo/1.16.0                    meson/1.2.2
	   ccache/4.8.2                    metis/5.1.0
	   cmake/3.27.7                    mgard/2023-03-31
	   curl/8.4.0                      mkfontdir/1.0.7
	   darshan-util/3.4.4              mkfontscale/1.2.2
	   diffutils/3.9                   mpfr/4.2.0                     (D)
	   eccodes/2.25.0                  mpi-serial/2.3.0
	   elfutils/0.189                  nano/7.2
	   emacs/29.1                      nasm/2.15.05
	   expat/2.5.0                     nco/5.1.6
	   exuberant-ctags/5.8             ncurses/6.4
	   ffmpeg/4.4.1                    netcdf-c/4.9.2
	   findutils/4.9.0                 netcdf-cxx4/4.3.1
	lines 37-60
	   autoconf-archive/2023.02.20     libzmq/4.3.5
	   autoconf/2.69                   lizard/1.0
	   automake/1.16.5                 lz4/1.9.4
	   bazel/6.5.0                     lzo/2.10
	   bdftopcf/1.1                    m4/1.4.19
	   berkeley-db/18.1.40             magma/2.7.2-cuda117
	   bison/3.8.2                     magma/2.7.2-cuda121
	   boost/1.83.0                    magma/2.7.2                    (D)
	   bzip2/1.0.8                     makedepend/1.0.8
	   c-blosc/1.21.5                  mbedtls/2.28.2
	   c-blosc2/2.11.1                 mercurial/6.4.5
	   cairo/1.16.0                    meson/1.2.2
	   ccache/4.8.2                    metis/5.1.0
	   cmake/3.27.7                    mgard/2023-03-31
	   curl/8.4.0                      mkfontdir/1.0.7
	   darshan-util/3.4.4              mkfontscale/1.2.2
	   diffutils/3.9                   mpfr/4.2.0                     (D)
	   eccodes/2.25.0                  mpi-serial/2.3.0
	   elfutils/0.189                  nano/7.2
	   emacs/29.1                      nasm/2.15.05
	   expat/2.5.0                     nco/5.1.6
	   exuberant-ctags/5.8             ncurses/6.4
	   ffmpeg/4.4.1                    netcdf-c/4.9.2
	   findutils/4.9.0                 netcdf-cxx4/4.3.1
	   flex/2.6.3                      netcdf-fortran/4.6.1
	lines 37-61
	   autoconf-archive/2023.02.20     libzmq/4.3.5
	   autoconf/2.69                   lizard/1.0
	   automake/1.16.5                 lz4/1.9.4
	   bazel/6.5.0                     lzo/2.10
	   bdftopcf/1.1                    m4/1.4.19
	   berkeley-db/18.1.40             magma/2.7.2-cuda117
	   bison/3.8.2                     magma/2.7.2-cuda121
	   boost/1.83.0                    magma/2.7.2                    (D)
	   bzip2/1.0.8                     makedepend/1.0.8
	   c-blosc/1.21.5                  mbedtls/2.28.2
	   c-blosc2/2.11.1                 mercurial/6.4.5
	   cairo/1.16.0                    meson/1.2.2
	   ccache/4.8.2                    metis/5.1.0
	   cmake/3.27.7                    mgard/2023-03-31
	   curl/8.4.0                      mkfontdir/1.0.7
	   darshan-util/3.4.4              mkfontscale/1.2.2
	   diffutils/3.9                   mpfr/4.2.0                     (D)
	   eccodes/2.25.0                  mpi-serial/2.3.0
	   elfutils/0.189                  nano/7.2
	   emacs/29.1                      nasm/2.15.05
	   expat/2.5.0                     nco/5.1.6
	   exuberant-ctags/5.8             ncurses/6.4
	   ffmpeg/4.4.1                    netcdf-c/4.9.2
	   findutils/4.9.0                 netcdf-cxx4/4.3.1
	   flex/2.6.3                      netcdf-fortran/4.6.1
	   font-util/1.4.0                 netlib-lapack/3.11.0
	lines 37-62
	
	   autoconf-archive/2023.02.20     libzmq/4.3.5
	   autoconf/2.69                   lizard/1.0
	   automake/1.16.5                 lz4/1.9.4
	   bazel/6.5.0                     lzo/2.10
	   bdftopcf/1.1                    m4/1.4.19
	   berkeley-db/18.1.40             magma/2.7.2-cuda117
	   bison/3.8.2                     magma/2.7.2-cuda121
	   boost/1.83.0                    magma/2.7.2                    (D)
	   bzip2/1.0.8                     makedepend/1.0.8
	   c-blosc/1.21.5                  mbedtls/2.28.2
	   c-blosc2/2.11.1                 mercurial/6.4.5
	   cairo/1.16.0                    meson/1.2.2
	   ccache/4.8.2                    metis/5.1.0
	   cmake/3.27.7                    mgard/2023-03-31
	   curl/8.4.0                      mkfontdir/1.0.7
	   darshan-util/3.4.4              mkfontscale/1.2.2
	   diffutils/3.9                   mpfr/4.2.0                     (D)
	   eccodes/2.25.0                  mpi-serial/2.3.0
	   elfutils/0.189                  nano/7.2
	   emacs/29.1                      nasm/2.15.05
	   expat/2.5.0                     nco/5.1.6
	   exuberant-ctags/5.8             ncurses/6.4
	   ffmpeg/4.4.1                    netcdf-c/4.9.2
	   findutils/4.9.0                 netcdf-cxx4/4.3.1
	   flex/2.6.3                      netcdf-fortran/4.6.1
	   font-util/1.4.0                 netlib-lapack/3.11.0
	   fontconfig/2.14.2               nettle/3.9.1
	lines 37-63
	   autoconf-archive/2023.02.20     libzmq/4.3.5
	   autoconf/2.69                   lizard/1.0
	   automake/1.16.5                 lz4/1.9.4
	   bazel/6.5.0                     lzo/2.10
	   bdftopcf/1.1                    m4/1.4.19
	   berkeley-db/18.1.40             magma/2.7.2-cuda117
	   bison/3.8.2                     magma/2.7.2-cuda121
	   boost/1.83.0                    magma/2.7.2                    (D)
	   bzip2/1.0.8                     makedepend/1.0.8
	   c-blosc/1.21.5                  mbedtls/2.28.2
	   c-blosc2/2.11.1                 mercurial/6.4.5
	   cairo/1.16.0                    meson/1.2.2
	   ccache/4.8.2                    metis/5.1.0
	   cmake/3.27.7                    mgard/2023-03-31
	   curl/8.4.0                      mkfontdir/1.0.7
	   darshan-util/3.4.4              mkfontscale/1.2.2
	   diffutils/3.9                   mpfr/4.2.0                     (D)
	   eccodes/2.25.0                  mpi-serial/2.3.0
	   elfutils/0.189                  nano/7.2
	   emacs/29.1                      nasm/2.15.05
	   expat/2.5.0                     nco/5.1.6
	   exuberant-ctags/5.8             ncurses/6.4
	   ffmpeg/4.4.1                    netcdf-c/4.9.2
	   findutils/4.9.0                 netcdf-cxx4/4.3.1
	   flex/2.6.3                      netcdf-fortran/4.6.1
	   font-util/1.4.0                 netlib-lapack/3.11.0
	   fontconfig/2.14.2               nettle/3.9.1
	   fontsproto/2.1.3                nghttp2/1.48.0
	lines 37-64
	   autoconf-archive/2023.02.20     libzmq/4.3.5
	   autoconf/2.69                   lizard/1.0
	   automake/1.16.5                 lz4/1.9.4
	   bazel/6.5.0                     lzo/2.10
	   bdftopcf/1.1                    m4/1.4.19
	   berkeley-db/18.1.40             magma/2.7.2-cuda117
	   bison/3.8.2                     magma/2.7.2-cuda121
	   boost/1.83.0                    magma/2.7.2                    (D)
	   bzip2/1.0.8                     makedepend/1.0.8
	   c-blosc/1.21.5                  mbedtls/2.28.2
	   c-blosc2/2.11.1                 mercurial/6.4.5
	   cairo/1.16.0                    meson/1.2.2
	   ccache/4.8.2                    metis/5.1.0
	   cmake/3.27.7                    mgard/2023-03-31
	   curl/8.4.0                      mkfontdir/1.0.7
	   darshan-util/3.4.4              mkfontscale/1.2.2
	   diffutils/3.9                   mpfr/4.2.0                     (D)
	   eccodes/2.25.0                  mpi-serial/2.3.0
	   elfutils/0.189                  nano/7.2
	   emacs/29.1                      nasm/2.15.05
	   expat/2.5.0                     nco/5.1.6
	   exuberant-ctags/5.8             ncurses/6.4
	   ffmpeg/4.4.1                    netcdf-c/4.9.2
	   findutils/4.9.0                 netcdf-cxx4/4.3.1
	   flex/2.6.3                      netcdf-fortran/4.6.1
	   font-util/1.4.0                 netlib-lapack/3.11.0
	   fontconfig/2.14.2               nettle/3.9.1
	   fontsproto/2.1.3                nghttp2/1.48.0
	lines 37-64
	   autoconf-archive/2023.02.20     libzmq/4.3.5
	   autoconf/2.69                   lizard/1.0
	   automake/1.16.5                 lz4/1.9.4
	   bazel/6.5.0                     lzo/2.10
	   bdftopcf/1.1                    m4/1.4.19
	   berkeley-db/18.1.40             magma/2.7.2-cuda117
	   bison/3.8.2                     magma/2.7.2-cuda121
	   boost/1.83.0                    magma/2.7.2                    (D)
	   bzip2/1.0.8                     makedepend/1.0.8
	   c-blosc/1.21.5                  mbedtls/2.28.2
	   c-blosc2/2.11.1                 mercurial/6.4.5
	   cairo/1.16.0                    meson/1.2.2
	   ccache/4.8.2                    metis/5.1.0
	   cmake/3.27.7                    mgard/2023-03-31
	   curl/8.4.0                      mkfontdir/1.0.7
	   darshan-util/3.4.4              mkfontscale/1.2.2
	   diffutils/3.9                   mpfr/4.2.0                     (D)
	   eccodes/2.25.0                  mpi-serial/2.3.0
	   elfutils/0.189                  nano/7.2
	   emacs/29.1                      nasm/2.15.05
	   expat/2.5.0                     nco/5.1.6
	   exuberant-ctags/5.8             ncurses/6.4
	   ffmpeg/4.4.1                    netcdf-c/4.9.2
	   findutils/4.9.0                 netcdf-cxx4/4.3.1
	   flex/2.6.3                      netcdf-fortran/4.6.1
	   font-util/1.4.0                 netlib-lapack/3.11.0
	   fontconfig/2.14.2               nettle/3.9.1
	   fontsproto/2.1.3                nghttp2/1.48.0
	   freetype/2.11.1                 ninja/1.11.1
	lines 37-65
	   autoconf-archive/2023.02.20     libzmq/4.3.5
	   autoconf/2.69                   lizard/1.0
	   automake/1.16.5                 lz4/1.9.4
	   bazel/6.5.0                     lzo/2.10
	   bdftopcf/1.1                    m4/1.4.19
	   berkeley-db/18.1.40             magma/2.7.2-cuda117
	   bison/3.8.2                     magma/2.7.2-cuda121
	   boost/1.83.0                    magma/2.7.2                    (D)
	   bzip2/1.0.8                     makedepend/1.0.8
	   c-blosc/1.21.5                  mbedtls/2.28.2
	   c-blosc2/2.11.1                 mercurial/6.4.5
	   cairo/1.16.0                    meson/1.2.2
	   ccache/4.8.2                    metis/5.1.0
	   cmake/3.27.7                    mgard/2023-03-31
	   curl/8.4.0                      mkfontdir/1.0.7
	   darshan-util/3.4.4              mkfontscale/1.2.2
	   diffutils/3.9                   mpfr/4.2.0                     (D)
	   eccodes/2.25.0                  mpi-serial/2.3.0
	   elfutils/0.189                  nano/7.2
	   emacs/29.1                      nasm/2.15.05
	   expat/2.5.0                     nco/5.1.6
	   exuberant-ctags/5.8             ncurses/6.4
	   ffmpeg/4.4.1                    netcdf-c/4.9.2
	   findutils/4.9.0                 netcdf-cxx4/4.3.1
	   flex/2.6.3                      netcdf-fortran/4.6.1
	   font-util/1.4.0                 netlib-lapack/3.11.0
	   fontconfig/2.14.2               nettle/3.9.1
	   fontsproto/2.1.3                nghttp2/1.48.0
	   freetype/2.11.1                 ninja/1.11.1
	   fribidi/1.0.12                  nlohmann-json/3.11.2
	   gawk/5.2.2                      npth/1.6
	   gdb/13.1                        oniguruma/6.9.8
	   gdbm/1.23                       openblas/0.3.24-omp
	   gettext/0.22.3                  openblas/0.3.24-pthreads       (D)
	   git/2.42.0                      openjdk/11.0.17_8
	   glib/2.78.0                     openjpeg/2.3.1
	   gmake/4.4.1                     openssh/9.5p1
	   gmp/6.2.1                       opus/1.3.1
	   gnuconfig/2022-09-17            pango/1.50.13
	   gnupg/2.4.3                     papi/6.0.0.1
	   gnutls/3.7.8                    patchelf/0.18.0
	   gobject-introspection/1.76.1    pcre/8.45
	   googletest/1.12.1               pcre2/10.42
	   gperf/3.1                       perl/5.38.0
	   gsl/2.7.1                       pigz/2.7
	   gzip/1.12                       pinentry/1.2.1
	   harfbuzz/7.3.0                  pixman/0.42.2
	   hdf5/1.14.3                     pkgconf/1.9.5
	   hiredis/1.1.0                   proj/9.2.1
	   hpcviewer/2023.07               protobuf/3.21.12
	   htop/3.2.2                      py-certifi/2023.7.22
	   icu4c/67.1                      py-docutils/0.20.1
	   imagemagick/7.1.1-11            py-pip/23.1.2
	   inputproto/2.3.2                py-pygments/2.16.1
	   jq/1.6                          py-setuptools/68.0.0
	   json-glib/1.6.6                 py-wheel/0.41.2
	   kbproto/1.0.7                   python/3.11.6                  (D)
	   krb5/1.20.1                     re2c/2.2
	   lame/3.100                      readline/8.2
	   libaec/1.0.6                    scons/4.5.2
	   libarchive/3.7.1                screen/4.9.1
	   libassuan/2.5.6                 sed/4.9
	   libbsd/0.11.7                   serf/1.3.10
	   libcatalyst/2.0.0-rc4           snappy/1.1.10
	   libedit/3.1-20210216            spectrum-mpi/10.4.0.6-20230210
	   libevent/2.1.12                 speex/1.2.1
	   libfabric/1.19.0                sqlite/3.43.2
	   libffi/3.4.4                    subversion/1.14.2
	   libfontenc/1.1.7                sz/2.1.12.5
	   libgcrypt/1.10.2                tar/1.34
	   libgpg-error/1.47               texinfo/7.0.3
	   libice/1.0.9                    tmux/3.3a
	   libiconv/1.17                   toml11/3.7.1
	   libidn2/2.3.4                   udunits/2.2.28
	   libjpeg-turbo/3.0.0             utf8proc/2.8.0
	   libksba/1.6.4                   util-linux-uuid/2.38.1
	   libmd/1.0.4                     util-macros/1.19.3
	   libmicrohttpd/0.9.50            valgrind/3.20.0
	   libogg/1.3.5                    videoproto/2.3.3
	   libpng/1.6.39                   vim/9.0.0045
	   libpthread-stubs/0.4            which/2.21
	   libsigsegv/2.14                 xcb-proto/1.15.2
	   libsm/1.2.3                     xextproto/7.3.0
	   libsodium/1.0.18                xproto/7.0.31
	   libssh2/1.10.0                  xtrans/1.4.0
	   libtiff/4.5.1                   xz/5.4.1
	   libtool/2.4.7                   yaml-cpp/0.7.0
	   libunistring/1.1                yasm/1.3.0
	   libvorbis/1.3.7                 zfp/0.5.5
	   libvpx/1.10.0                   zfp/1.0.0-cuda117
	   libx11/1.8.4                    zfp/1.0.0-cuda121
	   libxau/1.0.8                    zfp/1.0.0                      (D)
	   libxcb/1.14                     zlib-ng/2.1.4
	   libxcrypt/4.4.35                zstd/1.5.5
	
	---------------------- /sw/summit/spack-envs/summit-plus/modules/site/Core ----------------------
	   DefApps-2023        cuda/11.8.0                    nsight-compute/2023.2.2
	   DefApps-2024        cuda/12.2.0                    nvhpc/22.9              (D)
	   DefApps-spi         gcc/9.3.0-compiler_only        nvhpc/23.9
	   DefApps      (L)    gcc/12.1.0              (D)    xl/16.1.1-13            (L)
	   cuda/11.0.3         hsi/5.0.2.p5
	   cuda/11.7.1  (D)    lsf-tools/2.0
	
	---------------------------------- /sw/summit/modulefiles/core ----------------------------------
	   bazel/7.0.2                        open-ce/1.4.0-py39-0
	   bazel/7.2.1                 (D)    open-ce/1.5.0-py37-0
	   binutils/2.40                      open-ce/1.5.0-py38-0
	   cudaq/0.5.0                        open-ce/1.5.0-py39-0
	   eigen/3.4.0                        open-ce/1.5.2-py37-0
	   extrae/3.6.1                       open-ce/1.5.2-py38-0
	   extrae/3.7.0                       open-ce/1.5.2-py39-0
	   extrae/3.7.1                (D)    open-ce/1.10.0-py39-ibm       (D)
	   fireworks/1.9.5                    open-ce/1.10.0-py311-ibm
	   forge/22.0.0                       openjdk/21.0.3                (D)
	   forge/22.0.2                (D)    perf-reports/20.0.1
	   forge/22.1.0                       ppt/2.4.0-beta
	   forge/22.1.1                       ppt/2.4.0-beta2               (D)
	   gcc/11.4.0                         python/2.7.15-anaconda2-5.3.0
	   gcc/12.2.0                         pytorch/2.3.0-py3.11.8
	   hdf5_perf/1.10.6.gcc               qis/23.3.0.20
	   hdf5_perf/1.10.6.xl         (D)    scalasca/2.5
	   hip-cuda/5.1.0                     scorep/6.0
	   isl/0.24                           scorep/8.3                    (D)
	   job-step-viewer/1.0.3              tensor-rt/7.2.0.13            (D)
	   julia/1.8.5                        tensor-rt/8.0.1.6
	   julia/1.9.0                 (D)    ums/default
	   llvm/16.0.0                        vampir/10.5.0
	   miniforge3/23.11.0-0               vasp/6.2.1
	   miniforge3/24.3.0-0         (D)    vasp/6.4.2
	   mpc/1.2.1                          vasp/6.4.3                    (D)
	   mpfr/4.1.0                         workflows/default
	   open-ce-olcf/1.5.2-py39-0   (D)    xalt/1.2.1                    (D)
	   open-ce-olcf/1.9.1-py39-ibm        xalt/1.3.0
	   open-ce/1.4.0-py37-0               xalt/1.3.1
	   open-ce/1.4.0-py38-0



	  Where:
	   D:  Default Module
	   E:  Experimental
	   L:  Module is loaded

	Use "module spider" to find all possible modules.
	Use "module keyword key1 key2 ..." to search for all possible modules matching
	any of the "keys".

    ..


    [username@mgt3.summit ~]$ ml show xl/16.1.1-13
	-----------------------------------------------------------------------------------------------------------------------------------------
	   /sw/summit/spack-envs/summit-plus/modules/site/Core/xl/16.1.1-13.lua:
	-----------------------------------------------------------------------------------------------------------------------------------------
	family("compiler")
	prepend_path("MODULEPATH","/sw/summit/spack-envs/summit-plus/modules/spack/linux-rhel8-ppc64le/xl/16.1.1-13")
	setenv("OLCF_XL_ROOT","/sw/summit/xl/16.1.1-13")
	setenv("OLCF_XLF_ROOT","/sw/summit/xl/16.1.1-13/xlf/16.1.1")
	setenv("OLCF_XLC_ROOT","/sw/summit/xl/16.1.1-13/xlC/16.1.1")
	setenv("OLCF_XLMASS_ROOT","/sw/summit/xl/16.1.1-13/xlmass/9.1.1")
	setenv("OLCF_XLSMP_ROOT","/sw/summit/xl/16.1.1-13/xlsmp/5.1.1")
	prepend_path("LD_LIBRARY_PATH","/sw/summit/xl/16.1.1-13/lib")
	prepend_path("NLSPATH","/sw/summit/xl/16.1.1-13/msg/en_US/%N")
	prepend_path("PATH","/sw/summit/xl/16.1.1-13/xlf/16.1.1/bin")
	prepend_path("MANPATH","/sw/summit/xl/16.1.1-13/xlf/16.1.1/man/en_US")
	prepend_path("LD_LIBRARY_PATH","/sw/summit/xl/16.1.1-13/xlf/16.1.1/lib")
	prepend_path("NLSPATH","/sw/summit/xl/16.1.1-13/xlf/16.1.1/msg/en_US/%N")
	prepend_path("PATH","/sw/summit/xl/16.1.1-13/xlC/16.1.1/bin")
	prepend_path("MANPATH","/sw/summit/xl/16.1.1-13/xlC/16.1.1/man/en_US")
	prepend_path("LD_LIBRARY_PATH","/sw/summit/xl/16.1.1-13/xlC/16.1.1/lib")
	prepend_path("NLSPATH","/sw/summit/xl/16.1.1-13/xlC/16.1.1/msg/en_US/%N")
	prepend_path("LD_LIBRARY_PATH","/sw/summit/xl/16.1.1-13/xlmass/9.1.1/lib")
	prepend_path("LD_LIBRARY_PATH","/sw/summit/xl/16.1.1-13/xlsmp/5.1.1/lib")
	prepend_path("NLSPATH","/sw/summit/xl/16.1.1-13/msg/en_US/%N")
	help([[xlc version: 16.1.1.13
	xlf version: 16.1.1.13
	xlmass version: 9.1.1
	xlsmp version: 5.1.1
	]])
	whatis("Description: xlc 16.1.1.13, xlf 16.1.1.13, xlmass 9.1.1, xlsmp 5.1.1")


    [username@mgt3.summit ~]$ ml mpi-serial/2.3.0
    [username@mgt3.summit ~]$ ml

	Currently Loaded Modules:
	   1) xl/16.1.1-13   2) DefApps   3) mpi-serial/2.3.0

Triton module hierarchies
-------------------------

Switch to a different compiler with the ``module swap`` command. Any dependent modules should also swap, if both versions exist.  

-  show currently loaded modules with ``ml``

::

    [username@mgt3.summit ~]$ ml reset
    Running "module reset". Resetting modules to system default. The following $MODULEPATH directories have been removed: /etc/scl/modulefiles
    [username@mgt3.summit ~]$ ml

	Currently Loaded Modules:
	  1) xl/16.1.1-13   2) spectrum-mpi/10.4.0.6-20230210   3) DefApps

