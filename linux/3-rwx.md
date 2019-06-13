# File Permissions

File permissions control which users can do what with which files on a
Linux system. Files have three distinct permission sets:  one for the
**user** who owns the file (u), one for the associated **group** (g),
and one for all **other** system users (o). Recall that directories are
types of files in Linux. ***As policy, CCS does not alter user files.***

To view file permissions, list directory contents in long listing format
with `ls -l`. To check directory permissions, add the `-d` flag: `ls
-ld`. Paths can be relative or absolute.

    [username@pegasus ~]$ ls -l /path/to/directory/or/file
    ...
    [username@pegasus ~]$ ls -ld /path/to/directory
    ...

## Understanding File Permission Categories

Permissions are defined by three **categories**:

    u : user (owner)
    g : group
    o : other

Each category has three **permission types**, which are either on or
off:

    r : read
    w : write
    x : execute

For a directory, `x` means users have permission to search the
directory.

  

### File and Directory Permission Examples:

`mydir` contains two files. The owner (u) has read and write (rw)
permissions, members of `ccsuser` (g) have read (r) permissions, and all
other users (o) have read (r) permissions.

    [username@pegasus ~]$ ls -l /nethome/username/mydir
    total 0
    -rw-r--r-- 1 username ccsuser myfile.txt
    -rw-r--r-- 1 username ccsuser myfile2.txt

For the directory `mydir`, the owner (u) has read, write, and browse
(rwx) permissions, members of `ccsuser` have read and browse (rx), and
all other users (o) have read only (r).

    [username@pegasus ~]$ ls -ld /nethome/username/mydir
    drwxr-xr-- 2 username ccsuser /nethome/username/mydir

### Decimal representation

Permissions can also be represented with 3 decimal numbers,
corresponding to the decimal representation of each category's binary
permissions. Decimal representation can be used when changing file
permissions.

`myfile.txt` has the following binary and decimal permissions:

    -rw- r-- r-- 1 username ccsuser myfile.txt
     110 100 100
       6   4   4
    
     -  : this file is not a directory
    rw- : u - username (owner) can read and write
    r-- : g - members of ccsuser can read only
    r-- : o - other users can read only

`mydir` (a directory) has the following permissions:

    drwx r-x --x 2 username ccsuser /nethome/username/mydir
     111 101 100
       7   5   4
    
     d  : this file is a directory
    rwx : u - username (owner) can read, write, and execute 
    r-x : g - members of ccsuser can read and execute 
    --x : o - other users can execute (search directory)

## Changing File Permissions in Linux

Use `chmod` to change the access mode of a file or directory. The basic
syntax is `chmod options file`.

The 3 **options** are: category, operator, and permission (in order).
Options can also be assigned numerically using the decimal value for
each category (note that all three decimal values must be present and
are assigned in category order - u, g, o). Use the `-R` flag with
`chmod` to apply permissions recursively, to all contents of a
directory.

**Categories** for chmod:

    u : user (who owns the file)
    g : group
    o : other
    a : all categories (u, g, and o shortcut)

**Operators** for chmod:

    = : assigns (overwrites) permissions
    + : adds permissions
    - : subtracts permissions

**Permissions** for chmod:

    r : read
    w : write
    x : execute 

### Examples with `chmod`

Assign file owner (u) full permissions (rwx) on `myfile.txt`:

    [username@pegasus mydir]$ chmod u=rwx myfile.txt
    [username@pegasus mydir]$ ls -l myfile.txt
    -rwxr--r-- 1 username ccsuser myfile.txt

Assign full permissions (7) for file owner, read and write (6) for
members of `ccsuser`, and execute only (1) for others:

    [username@pegasus mydir]$ chmod 761 myfile.txt
    [username@pegasus mydir]$ ls -l myfile.txt
    -rwx rw- --x 1 username ccsuser myfile.txt
     111 110 001
       7   6   1

Add for members of ccsuser (g) full permissions (rwx) on `mydir` and all
files under `mydir` (`-R` flag):

    [username@pegasus ~]$ chmod -R g+rwx mydir
    [username@pegasus ~]$ ls -l mydir
    total 0
    -rw-rwxr-- 1 username ccsuser myfile2.txt
    -rwxrwxr-- 1 username ccsuser myfile.txt
    [username@pegasus ~]$ ls -ld mydir
    drwxrwx--x 2 username ccsuser mydir

Remove for members of ccsuser (g) write permission (w) on `mydir` and
all files under `mydir` (`-R` flag):

    [username@pegasus ~]$ chmod -R g-w mydir
    [username@pegasus ~]$ ls -l mydir
    total 0
    -rw-r-xr-- 1 username ccsuser myfile2.txt
    -rwxr-xr-- 1 username ccsuser myfile.txt
    [username@pegasus ~]$ ls -ld mydir
    drwxr-x--x 2 username ccsuser mydir

Add for members of `ccsuser` (g) write permission (w) on `mydir`,
directory only:

    [username@pegasus ~]$ chmod g+w mydir
    [username@pegasus ~]$ ls -ld mydir
    drwxrwx--x 2 username ccsuser mydir
    [username@pegasus ~]$ ls -l mydir
    total 0
    -rw-r-xr-- 1 username ccsuser  myfile2.txt
    -rwxr-xr-- 1 username ccsuser  myfile.txt

## Changing Group Ownership in Linux

Use `chgrp` to change the group ownership of a file or directory. The
basic syntax is `chgrp group file`.

The file owner must be a member of the **group**. By default, `chgrp`
does not traverse symbolic links.  
Use the `-R` flag with `chgrp` to apply the group change recursively, to
all contents of a directory.

### Examples with `chgrp`

Change the group ownership of `mydir` to `mygroup`, directory only:

    [username@pegasus ~]$ chgrp mygroup mydir
    [username@pegasus ~]$ ls -ld mydir
    drwxrwx--x 2 username mygroup mydir
    [username@pegasus ~]$ ls -l mydir
    total 0
    -rw-r-xr-- 1 username ccsuser  myfile2.txt
    -rwxr-xr-- 1 username ccsuser  myfile.txt

Change the group ownership of `mydir` and all files under `mydir` to
`mygroup` (`-R` flag):

    [username@pegasus ~]$ chgrp -R mygroup mydir
    [username@pegasus ~]$ ls -ld mydir
    drwxrwx--x 2 username mygroup mydir
    [username@pegasus ~]$ ls -l mydir
    total 0
    -rw-r-xr-- 1 username mygroup  myfile2.txt
    -rwxr-xr-- 1 username mygroup  myfile.txt
