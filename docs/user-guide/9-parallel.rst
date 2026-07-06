.. _g-para:

Parallel Computing
==================

Loading the Appropriate MPI Module
----------------------------------

The choice of MPI (Message Passing Interface) implementation depends on the 
hardware architecture of the cluster. Each cluster has a different recommended 
MPI module to ensure optimal performance and compatibility.

- **Pegasus** (x86 architecture):  
  Pegasus is based on an x86 architecture.  
  We recommend using **Intel MPI**, as it offers better scalability and 
  performance on x86 systems.

  To load Intel MPI on Pegasus:

  .. code:: bash

     module load intel/mpi_2023.13.1

- **Triton** (IBM POWER9 architecture):  
  Triton is built on IBM POWER9 architecture, which is not supported by Intel MPI.  
  Instead, use **Spectrum MPI**, which is optimized for POWER-based systems.

  To load Spectrum MPI on Triton:

  .. code:: bash

     module load spectrum-mpi


.. note:: Only **one** MPI module should be loaded at a time. Loading multiple MPI modules can lead to conflicts and unexpected behavior.


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

Submit this scriptfile using ``bsub``. For more job script related information, check out the :ref:`g-jobs` section.

::

    [username@pegasus ~]$ bsub -q normal < mpi_example1.job
    Job <6021006> is submitted to queue <normal>.
    ...
