Linux Guides
============

Introduction to Linux
---------------------

Pegasus and Triton both run the CentOS 7.6 and RHEL 7.6 operating systems, 
respectively. Both of these operating systems are distributions of Linux,
a UNIX-like operating system. The three basic components of UNIX-like 
operating systems are the **kernel**, **shell**, and **system programs**. 
The kernel handles resource management and program execution. The shell 
interprets user commands typed at a prompt. System programs implement most 
operating system functionalities such as user environments and schedulers.

Everything in Linux is either a **file** (a collection of data) or a
**process** (an executing program). Directories in Linux are types of
files.

In the examples below, ``username`` represents your access account. 


.. toctree::
   :maxdepth: 2
   :glob: 

   Navigating the Linux Shell <1-nav>
   Interacting with Files <2-files>
   File Permissions in Linux <3-rwx>
   Access Control Lists – ACL <4-acl>

--------------

Linux FAQs
----------

**How can I check my shell?**

``$ echo $SHELL`` or ``$ echo $0``

**How can I view my environment variables?**

``$ env`` or ``$ env | sort``

**How can I check command/software availability and location?**

``$ which executable``, for example ``$ which vim``

**How can I get help with commands/software?**

Use the Linux manual pages: ``$ man executable``, for example
``$ man vim``
