===========================
Data Storage and Management
===========================

We offer two types of storage: GPFS (“General Parallel File System”) and CES (“cost-effective storage”)

* GPFS is attached to the high speed network and is suitable for supporting computation.
* CES is a slower-access, less expensive option that is suitable for data that are not in active use. 
It is not attached to computational resources.

GPFS storage
============

* Each project may utilize up to 2T of GPFS scratch space. Scratch space is intended only for data 
in active use. Scratch space is subject to purging when necessary for continued operation.
* Scratch space is charged only for actual utilization.
* Projects may also request allocation of dedicated GPFS storage.
* Dedicated space is charged for total allocation and not by utilization.

CES storage
===========

* Projects may also request 10T of CES storage.
* The Principal Investigator (PI) of the project must contact hpc@ccs.miami.edu for access to CES Storage.
* Usage above 10T requires review by the allocations committee.
* Fee for 10T of CES project storage is charged annually. ($200)
* CES storage is restricted to SFTP access through apex.idsc.miami.edu.

You can access your CES storage using any SFTP client.  We recommend FileZilla.  
Please see Using Filezilla use case in URL below.

  https://acs-docs.readthedocs.io/data/file_transfer.html

Please note that CES storage is currently **only** accessible through apex.idsc.miami.edu.  It is not 
accessible through any other IDSC server.  You will also only have access to your lab's directory.  
If you do not know the directory or have any other questions or concerns please contact hpc@ccs.miami.edu.
