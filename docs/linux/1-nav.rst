Navigating the Linux Shell
==========================

This guide provides an introduction to essential Linux shell commands for navigating 
and interacting with the filesystem, especially within a typical cluster login 
environment. The shell is provides a **command-line interface (CLI)** that allows users to 
communicate with the system by typing **commands**. On Triton/Pegasus, the default shell is Bash.

Users input commands into the shell, which executes them and displays the output. 
Commands may include **options** (also called **flags**) to modify behavior, 
and **arguments** to specify targets or inputs. 
To scroll through previously entered commands, use the **up/down arrow keys**.

Below is a collection of commonly used Linux shell commands, 
along with detailed explanations and examples. 
Remember that Linux is **case-sensitive**—"name" is different from "NAME", "Name", 
"nAMe", and so on. To stop a running process and return to the prompt, press ``CTRL-C`` (on Windows) or ``Command-C`` (on macOS).

Check Your Current Shell with ``echo``
--------------------------------------

The ``echo`` command displays text or variable values in the terminal. 
In Linux, **variables** are referenced using a leading dollar sign (``$``). 
For instance, the variable ``$SHELL`` stores the path to your default shell. 
To view it, you can pass the variable to ``echo``. 
Variables can also be embedded within strings, as shown below.

::

    [username@pegasus ~]$ echo $SHELL
    /bin/bash
    [username@pegasus ~]$ echo "My shell is $SHELL"
    My shell is /bin/bash

List All Environment Variables with ``env``
-------------------------------------------

To view a complete list of your environment variables, use the ``env`` command. 
To organize the output in alphabetical order, combine it with ``sort`` as shown.
The pipe (``|``) command is used to connect multiple commands in sequence, 
passing the output of one as the input to the next.

::

    [username@pegasus ~]$ env
    MODULE_VERSION_STACK=3.2.10
    LC_PAPER=en_US.utf8
    HOSTNAME=login4
    SHELL=/bin/bash
    ...
    [username@pegasus ~]$ env | sort
    ...

Check Your Current Directory with ``pwd``
-----------------------------------------

Linux uses **directories**, which are equivalent to folders in other operating systems. 
When you log in, you are placed in your **home directory** by default. 
The tilde (``~``) symbol is a shorthand for this location. 
The ``pwd`` (print working directory) command outputs the **absolute path** of your 
current location in the filesystem, beginning at the root directory (``/``).

::

    [username@pegasus ~]$ pwd
    /nethome/username

List Directory Contents with ``ls``
-----------------------------------

Running the ``ls`` command without any arguments displays 
the contents of your current directory. 
*Note: if this is your first login, your home directory may appear empty.* 
Items that begin with a ``d`` in their permissions are directories.

::

    [username@pegasus ~]$ ls
    example_file1  example_file2  testdir1

To inspect a specific directory, provide its path as an argument to ``ls``. 
In the example below, ``testdir1`` is located in the home directory 
and contains one file: ``testdir1_file1``.

::

    [username@pegasus ~]$ ls testdir1
    testdir1_file1

You can press the ``TAB`` key while typing a name to automatically complete it. 
If multiple possibilities exist, a list will appear. 
Continue typing more characters and press TAB again until completion succeeds.

You can learn more about command flags and usage by accessing the **Linux manual pages** using:

::

    [username@pegasus ~]$ man topic or command

Use the arrow keys, ``Page Up``, or ``Page Down`` to scroll. 
Press ``SPACE`` to view additional content, and type ``q`` to quit.

To display more detailed file information, use ``ls`` with flags like ``-lh``:

::

    [username@pegasus ~]$ ls -lh
    total 0
    -rw-r--r-- 1 username ccsuser  54  example_file1
    -rw-r--r-- 1 username ccsuser 476  example_file2
    drwxr-xr-x 2 username ccsuser 512  testdir1
    ...

Explanation of ``ls -lh`` flags:

-  ``-l``: Long listing format (includes size, owner, permissions, etc.)
-  ``-h``: Human-readable file sizes (e.g., 1K, 234M, 2G)

Other useful ``ls`` options include:

-  ``-a``: Include hidden files (starting with ``.``)
-  ``-d``: Show directory details instead of listing contents
-  ``-1`` (**number 1**): Output one entry per line
-  ``-R``: Recursively display subdirectory contents
-  ``-S``: Sort files by size
-  ``-X``: Sort files alphabetically by extension
-  ``-m``: Display output as a comma-separated list

\* Hidden files include ``.`` (current directory) and ``..`` (parent directory). 
These shortcuts are useful in relative paths:

::

    [username@pegasus testdir1]$ ls -a
    .  ..  testdir1_file1
    [username@pegasus testdir1]$ ls ..
    example_file1  example_file2  testdir1

Move Between Directories with ``cd``
------------------------------------

Use the ``cd`` (change directory) command to navigate the filesystem. 
The provided path can be **absolute** (starting with ``/``) 
or **relative** to your current location.

::

    [username@pegasus ~]$ cd testdir1
    [username@pegasus testdir1]$

Some useful ``cd`` patterns:

-  ``cd`` or ``cd ~``: Return to your home directory
-  ``cd ..``: Move up to the parent directory
-  ``cd -``: Return to the previous directory and display it

Visualize Directory Structure with ``tree``
-------------------------------------------

Pegasus includes the ``tree`` utility, which shows a recursive, 
indented listing of files and directories. 
This can be more informative than ``ls``, 
especially for visualizing nested directories.

::

    [username@pegasus ~]$ tree -vC
    .
    |-- example_file1
    |-- example_file2
    |-- testdir1
        `-- testdir1_file1

    1 directory, 3 files

Explanation of ``tree -vC`` flags:

-  ``-v``: Sort contents alphanumerically by type
-  ``-C``: Enable colored output for better visibility

Other helpful ``tree`` flags include:

-  ``-a``: Display hidden files
-  ``-d``: Show directories only
-  ``-r``: Reverse the sorting order
-  ``-L number``: Limit the depth of displayed directory levels

Locate Commands with ``which``
------------------------------

The ``which`` command shows the full path of a command executable 
by searching directories listed in your ``$PATH`` environment variable. 
Use ``which`` to verify if a command is installed and to find its location.

::

    [username@pegasus ~]$ which bash
    /bin/bash
    [username@pegasus ~]$ which vim
    /usr/bin/vim
    [username@pegasus ~]$ which python
    /share/opt/python/2.7.3/bin/python
