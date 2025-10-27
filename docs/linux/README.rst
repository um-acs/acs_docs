.. _linux:


Linux Guides
============

Introduction to Linux
--------------------------------

Linux is a UNIX-like operating system, composed of three fundamental components:

- Kernel : Manages hardware resources and handles process execution, memory, device drivers, and system calls.
- Shell : A command-line interface that interprets user input and communicates with the kernel.
- System Programs : Provide essential functionalities such as user environments, file and process management, networking tools, and scheduling services.

In Linux, everything is treated as either a file or a process:

- A file is any collection of data, including directories, device nodes, and configuration files.
- A process is an executing instance of a program.

Directories themselves are implemented as a special type of file that contains mappings of filenames to index node references.

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
