# Navigating the Linux Shell

The shell is command-line interface (CLI), a type of user interface that
interprets **commands** typed at a prompt. The default shell on Pegasus
is Bash.

Users send commands to the shell, which runs them and outputs results.
Commands can include options (or **flags**) to modify output and
**arguments** to specify command targets. In Bash, command history can
be accessed from the prompt with up and down arrow keys - use this to
repeat a previously issued command.

Below are some useful Linux shell commands with explanations and
examples. Recall that Linux is *case-sensitive*-- "name" is distinct
from "NAME" and other capital and lower-case combinations ("Name",
"nAMe", etc.). To cancel a process and return to the prompt in Linux,
press `CTRL-C` in Windows or `Command-C` in Mac.

## View your current shell with `echo`:

The `echo` command displays a line of text. In Linux, `$` denotes a
**variable**. The `$SHELL` environment variable contains your current
shell. To view the contents of this variable, send it to the `echo`
command. Variables will be interpreted by the command even when inside
lines of text, as shown below.

    [username@pegasus ~]$ echo $SHELL
    /bin/bash
    [username@pegasus ~]$ echo "My shell is $SHELL"
    My shell is /bin/bash

  

## View all environment variables with `env`:

To view all your environment variables, use the `env` command. To view
this list alphanumerically, use `env | sort`.

    [username@pegasus ~]$ env
    MODULE_VERSION_STACK=3.2.10
    LC_PAPER=en_US.utf8
    HOSTNAME=login4
    SHELL=/bin/bash
    ...
    [username@pegasus ~]$ env | sort
    ...

  

## View your current directory with `pwd`:

**Directories** in Linux are similar to folders in other operating
systems. Your home directory is the default location after login. The
shortcut for home in Bash is the tilde (`~`), shown below just before
the prompt (`$`). `pwd` outputs the **absolute path**, the unique
location starting from the topmost, or root, directory (`/`).

    [username@pegasus ~]$ pwd
    /nethome/username

  

## View the contents of a directory with `ls`:

Entering the `ls` command without arguments (as shown below) lists the
contents of the current directory. *If this is your first connection to
Pegasus, your home directory may be empty.* Directories can be
distinguished from files by the leading `d` in file permissions.

    [username@pegasus ~]$ ls 
    example_file1  example_file2  testdir1

To view the contents of a specific directory, send the path as an
argument to `ls`. In this example the current directory is home, which
contains `testdir1`. As shown in the output, `testdir1` contains one
file: `testdir1_file1`

    [username@pegasus ~]$ ls testdir1
    testdir1_file1

  

Note that you can press the `TAB` key on your keyboard to auto-complete
names. If there are multiple matches, a list of options will be shown.
Type the next letter and press TAB again until tab-complete finishes.

Command details and flag information can be found in the **Linux manual
pages**, accessible via the command line:

    [username@pegasus ~]$ man topic or command

Press `SPACE` to see the next set of lines. To scroll, use the arrow
keys or `Page Up` and `Page Down`. To exit, type `q`.

  

`ls` can be run with options, or flags, to customise output. For
example, view more detailed information such as file permissions using
the `-lh` flags.

    [username@pegasus ~]$ ls -lh
    total 0
    -rw-r--r-- 1 username ccsuser  54  example_file1
    -rw-r--r-- 1 username ccsuser 476  example_file2
    drwxr-xr-x 2 username ccsuser 512  testdir1
    ...

The flags on this `ls -lh` command:

  - `-l` long list format (includes permissions, owner, and more)
  - `-h` human readable filesize format (useful for larger file sizes)

Other useful `ls` flags:

  - `-a` include hidden files \*
  - `-d` list properties of a directory itself, not the contents
  - `-1` (**number 1**) one result per line
  - `-R` recursively list subdirectory contents
  - `-S` sort by file size
  - `-X` sort alphanumerically by extension
  - `-m` comma-separated list

\* Hidden files include the **.** and **..** directories, which
represent the current and parent (respectively). These can be used as
shortcuts in relative paths:

    [username@pegasus testdir1]$ ls -a
    .  ..  testdir1_file1
    [username@pegasus testdir1]$ ls ..
    example_file1  example_file2  testdir1

  

## Navigate to directories with `cd`:

This command changes your current directory to the path specified, which
can be **absolute**, starting with `/`, or **relative**, starting from
the current directory.

    [username@pegasus ~]$ cd testdir1
    [username@pegasus testdir1]$

Some useful `cd` commands:

  - `cd` or `cd ~` move to user's home directory
  - `cd ..` move to parent directory
  - `cd -` move to previous working directory

  

## View directory contents with `tree`:

Pegasus has the `tree` package installed, which recursively outputs a
depth-indented list of contents. This may be more helpful than `ls` for
nested directories.

    [username@pegasus ~]$ tree -vC
    .
    |-- example_file1
    |-- example_file2
    |-- testdir1
        `-- testdir1_file1
    
    1 directory, 3 files

The flags on this `tree -vC` command:

  - `-v` sort alphanumerically by type
  - `-C` colorise output

Other useful `tree` flags:

  - `-a` include hidden files
  - `-d` list directories only
  - `-r` sort reverse alphanumerically
  - `-L number` descend only *number* levels deep

## Check command availability and location with `which`:

The `which` command returns the full path of any shell commands
registered in the current environment by searching locations in the
`$PATH` environment variable. Use `which` to check command and software
availability and location.

    [username@pegasus ~]$ which bash
    /bin/bash
    [username@pegasus ~]$ which vim
    /usr/bin/vim
    [username@pegasus ~]$ which python
    /share/opt/python/2.7.3/bin/python
