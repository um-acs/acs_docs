.. _p-modules:

Pegasus Software Modules
========================

IDSC ACS continually updates applications, compilers, system libraries, etc.
To facilitate this task and to provide a uniform mechanism for accessing
different revisions of software, ACS uses the modules utility. At login,
modules commands set up a basic environment for the default compilers,
tools, and libraries such as:  the ``$PATH``, ``$MANPATH``, and
``$LD_LIBRARY_PATH`` environment variables. There is no need to set them
or update them when updates are made to system and application software.

From Pegasus, users can view currently loaded modules with **module
list** and check available software with **module avail *package***
(omitting the package name will show all available modules):

::
   
    [username@pegasus ~]$ module avail R
    --------------------------------------- /share/Modules/hihg ----------------------------------------
    ROOT/5.34.32  
    
    --------------------------------- /share/mfiles/Compiler/gcc/8.3.0 ---------------------------------
    R/3.6.3  R/4.0.3  R/4.1.0(default)  
    
    ------------------------------------- /share/mfiles/Labs/sccc --------------------------------------
    R/4.1.2  R/4.2.2  ReMixT/0.5.4  
    
    --------------------------------------- /share/rocky/Modules ---------------------------------------
    R/4.1.0(default)  R/4.4.3  

    [username@pegasus ~]$ module load R
    [username@pegasus ~]$ module list
    Currently Loaded Modulefiles:
      1) R/4.1.0(default)


The table below lists commonly used modules commands.


.. list-table:: Pegasus Modules   
   :header-rows: 1
   
   * - Command 
     - Purpose 
   * - ``module avail`` 
     - lists all available modules 
   * - ``module list`` 
     - list modules currently loaded    
   * - ``module purge`` 
     - restores original setting by unloading all modules  
   * - ``module load package`` 
     - loads a module e.g., the python package  
   * - ``module unload package``
     - unloads a module e.g., the python package   
   * - ``module switch old new`` 
     - replaces old module with new module  
   * - ``module display package`` 
     - displays location and library information about a module


See our `Policies <https://acs-docs.readthedocs.io/policies/README.html>`_ page for minimum requirements and more information.
