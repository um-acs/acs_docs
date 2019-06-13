# Linux Guides  

## Introduction to Linux on Pegasus 

Pegasus is currently running the CentOS 6.5 operating system, a
distribution of Linux. Linux is a UNIX-like kernel, though in this
document it will generally refer to the entire CentOS distribution. The
three basic components of UNIX-like operating systems are the
**kernel**, **shell**, and **system programs**. The kernel handles
resource management and program execution. The shell interprets user
commands typed at a prompt. System programs implement most operating
system functionalities such as user environments and schedulers.

Everything in Linux is either a **file** (a collection of data) or a
**process** (an executing program). Directories in Linux are types of
files.

In the below examples, `username` represents your CCS Account.

[Navigating the Linux Shell](1-nav.md)

[Interacting with Files on Pegasus](2-files.md)

[File Permissions in Linux](3-rwx.md) 

[Access Control Lists -- ACL](4-acl.md) 


---

## Linux FAQs

**How can I check my shell?**

`$ echo $SHELL` or `$ echo $0`

**How can I view my environment variables?**

`$ env` or `$ env | sort`

**How can I check command/software availability and location?**

`$ which executable`, for example `$ which vim`

**How can I get help with commands/software?**

Use the Linux manual pages: `$ man executable`, for example `$ man vim`