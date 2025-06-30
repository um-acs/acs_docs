.. _p-para:

Parallel Computing
==================

We recommend using Intel MPI unless you have a specific reason for using
other implementations of MPI such as OpenMPI. We recommend Intel MPI over 
other implementations because it results in better scaling and 
performance.

.. note:: Only **one** MPI module should be loaded at a time.

Sample parallel programs:
-------------------------

C++ source code and compilation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

``mpi_example1.cpp``

--------------

.. code:: cpp

    //=================================================================
    // C++ example: MPI Example 1
    //=================================================================
    #include <iostream>
    #include <mpi.h> 
    using namespace std;
    int main(int argc, char** argv){
      int iproc;
      MPI_Comm icomm;
      int nproc;
      int i;
      MPI_Init(&argc,&argv);
      icomm = MPI_COMM_WORLD;
      MPI_Comm_rank(icomm,&iproc);
      MPI_Comm_size(icomm,&nproc);
      for ( i = 0; i <= nproc - 1; i++ ){
        MPI_Barrier(icomm);
        if ( i == iproc ){
          cout << "Rank " << iproc << " out of " << nproc << endl;
        }
      }
      MPI_Finalize();
      return 0;
    }

::

    [username@pegasus ~]$ mpicxx -o mpi_example1.x mpi_example1.cpp

.. _c-program-and-compilation-1:

C source code and compilation:
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                          

``mpi_example1.c``

--------------

.. code:: c

    //=================================================================
    // C example: MPI Example 1
    //=================================================================
    #include <stdio.h>
    #include "mpi.h" 
    int main(int argc, char** argv){
    int iproc;
    int icomm;
    int nproc;
    int i;
    MPI_Init(&argc,&argv);
    icomm = MPI_COMM_WORLD;
    MPI_Comm_rank(icomm,&iproc);
    MPI_Comm_size(icomm,&nproc);
    for ( i = 0; i <= nproc - 1; i++ ){
      MPI_Barrier(icomm);
      if ( i == iproc ){
        printf("%s %d %s %d \n","Rank",iproc,"out of",nproc);
      }
    }
    MPI_Finalize();
    return 0;
    }

::

    [username@pegasus ~]$ mpicc -o mpi_example1.x mpi_example1.c

Fortran 90 source code and compilation:
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                   

``mpi_example1.f90``

--------------

.. code:: fortran

    !=====================================================
    ! Fortran 90 example: MPI test
    !=====================================================
    program mpiexample1
    implicit none
    include 'mpif.h'
    integer(4) :: ierr
    integer(4) :: iproc
    integer(4) :: nproc
    integer(4) :: icomm
    integer(4) :: i
    call MPI_INIT(ierr)
    icomm = MPI_COMM_WORLD
    call MPI_COMM_SIZE(icomm,nproc,ierr)
    call MPI_COMM_RANK(icomm,iproc,ierr)
    do i = 0, nproc-1
      call MPI_BARRIER(icomm,ierr)
      if ( iproc == i ) then
        write (6,*) "Rank",iproc,"out of",nproc
      end if
    end do
    call MPI_FINALIZE(ierr)
    if ( iproc == 0 ) write(6,*)'End of program.'
      stop
    end program mpiexample1

::

    [username@pegasus ~]$ mpif90 -o mpi_example1.x mpi_example1.f90

Fortran 77 source code and compilation:
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                   

``mpi_example1.f``

--------------

.. code:: fortran

    c=====================================================
    c Fortran 77 example: MPI Example 1
    c=====================================================
    program mpitest
    implicit none
    include 'mpif.h'
    integer(4) :: ierr
    integer(4) :: iproc
    integer(4) :: nproc
    integer(4) :: icomm
    integer(4) :: i
    call MPI_INIT(ierr)
    icomm = MPI_COMM_WORLD
    call MPI_COMM_SIZE(icomm,nproc,ierr)
    call MPI_COMM_RANK(icomm,iproc,ierr)
    do i = 0, nproc-1
      call MPI_BARRIER(icomm,ierr)
      if ( iproc == i ) then
        write (6,*) "Rank",iproc,"out of",nproc
      end if
    end do
    call MPI_FINALIZE(ierr)
    if ( iproc == 0 ) write(6,*)'End of program.'
      stop
    end

::

    [username@pegasus ~]$ mpif77 -o mpi_example1.x mpi_example1.f

The LSF script to run parallel jobs
-----------------------------------

This batch script mpi_example1.job instructs LSF to reserve
computational resources for your job. Change the ``-P`` flag argument to
your project before running.

``mpi_example1.job``

--------------

.. code:: bash

    #!/bin/sh
    #BSUB -n 32
    #BSUB -J test
    #BSUB -o test.out
    #BSUB -e test.err
    #BSUB -R "span[ptile=16]"
    #BSUB -q normal
    #BSUB -P hpc
    mpirun.lsf ./mpi_example1.x

Submit this scriptfile using ``bsub``. For job script information, see
`Scheduling Jobs on Pegasus <https://acs-docs.readthedocs.io/pegasus/jobs/1-lsf.html#p-jobs>`__.

::

    [username@pegasus ~]$ bsub -q normal < mpi_example1.job
    Job <6021006> is submitted to queue <normal>.
    ...
