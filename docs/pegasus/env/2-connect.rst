Connecting to Pegasus 
=====================

| **DNS** : pegasus2.ccs.miami.edu 
| **Access** : `SSH <https://acs-docs.readthedocs.io/services/1-access.html#ssh>`__ over secure UM networks, `x11 <https://acs-docs.readthedocs.io/services/1-access.html#x11>`__ 
| **Credentials** : IDSC Account 


Pegasus Welcome Message
-----------------------

The Pegasus welcome message includes links to Pegasus documentation. 

::
    
    ------------------------------------------------------------------------------
                         Welcome to the Pegasus Supercomputer
               Frost Institute for Data Science & Computing, University of Miami 
    ------------------------------------------------------------------------------
    
                  ** Unauthorized use/access is prohibited. **
    
    If you log on to this computer system, you acknowledge your awareness
    of and concurrence with the University Use Policy. The University will prosecute 
    violators to the full extent of the law.
    
    ACS Usage Policies: https://acs-docs.readthedocs.io/policies 
    ______________________________________________________________________________
    
    Questions and Problem Reports:
    
    -->  hpc@ccs.miami.edu
    
    If you are new to Pegasus and high-performance compute clusters, 
    start with our documentation and user guides.
    
    Documentation  :  https://acs-docs.readthedocs.io/
    Pegasus Cluster:  https://acs-docs.readthedocs.io/pegasus
    ______________________________________________________________________________
    
    Welcome to Pegasus.  Before use, please read these important system notes:
    
    --> Pegasus is currently running the LSF resource manager to 
        schedule all compute resources. 
    
        See "man bsub", our online resources, and the LSF 9.1.1 user guide
        for more detailed information.
        
        https://acs-docs.readthedocs.io/pegasus/jobs
    
    
    --> You may compile software and test commands on login nodes.  
        However, any jobs exceeding 30 minutes of run time or using 
        excessive resources on login nodes will be terminated and 
        the user's account may be suspended.
    
    --> To see which software packages are available, issue command: 
             module avail
    
        To load a module, issue command: 
             module load <module name>
    
        See "module help" or consult ACS Documentation & User Guides:
             https://acs-docs.readthedocs.io/pegasus/soft
    
    --> Pegasus has two parallel file systems available to users: 
             /nethome (permanent, quota'd, not backed-up)
             /scratch (high-speed *purged* storage)
    
        IMPORTANT:  *NO* backups are performed on Pegasus file systems
       
        Files on /scratch are subject to purging after 21 days. No critical data should be kept on /scratch
       
        See ACS Policies for more information
             https://acs-docs.readthedocs.io/policies
    
    
    If you have any questions or concerns, please do not hesitate to reach out to us at hpc@ccs.miami.edu



Transferring files
~~~~~~~~~~~~~~~~~~

`Transferring files to IDSC systems <https://acs-docs.readthedocs.io/services/2-transfer.html>`__
