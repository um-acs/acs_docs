# Interacting with Files

## Make directories with `mkdir`:

This command creates new, empty directories.

    [username@pegasus ~]$ mkdir testdir2
    [username@pegasus ~]$ ls
    example_file1  example_file2  testdir1  testdir2

Multiple directories can be created at the same time, as can directory
hierarchies:

    [username@pegasus ~]$ mkdir firstdir seconddir
    [username@pegasus ~]$ ls
    example_file1  example_file2  firstdir  secondir  testdir1  testdir2
    
    [username@pegasus ~]$ mkdir -pv level1/level2/level3
    mkdir: created directory `level1'
    mkdir: created directory `level1/level2'
    mkdir: created directory `level1/level2/level3'
    [username@pegasus ~]$ ls
    example_file1  example_file2  firstdir  level1  seconddir  testdir1  testdir2
    [username@pegasus ~]$ ls level1
    level2

The flags on this `mkdir -pv` command:

  - `-p` make parent directories as needed
  - `-v` print a message for each created directory

If a directory already exists, `mkdir` will output an error message:

    [username@pegasus ~]$ mkdir testdir1
    mkdir: cannot create directory `testdir1': File exists

  

## Remove directories with `rmdir`:

Directories must be empty for `rmdir` to remove them.

    [username@pegasus ~]$ rmdir firstdir seconddir
    [username@pegasus ~]$ ls
    example_file1  example_file2  level1  testdir1  testdir2
    
    [username@pegasus ~]$ rmdir testdir1 level1
    rmdir: failed to remove `testdir1': Directory not empty
    rmdir: failed to remove `level1': Directory not empty
    [username@pegasus ~]$ ls testdir1 level1
    level1:
    level2
    
    testdir1:
    testdir1_file1

The individual directories in the above example are empty. The top level
of the hierarchy in the above example is not empty, neither is
`testdir1`. To remove directories that are not empty, see `rm`.

  

## Remove files and directories with `rm`:

***There is no 'recycle bin' on Pegasus.*** Removing files with `rm` is
permanent and cannot be undone.

    [username@pegasus ~]$ rm -v example_file3
    removed `example_file3'
    [username@pegasus ~]$ ls
    example_file1  example_file2  level1  testdir1  testdir2

The flag on this `rm -v` command:

  - `-v` print a message for each removed file or directory

Because directories are types of files in Linux, `rm` can be used with
the recursive flag to remove directories. Recall that `rm` in Linux is
***permanent and cannot be undone***. Without the recursive flag, `rm`
on a directory will produce an error as shown below.

    [username@pegasus ~]$ rm level1
    rm: cannot remove `level1': Is a directory
    [username@pegasus ~]$ rm -rv level1
    removed directory: `level1/level2/level3'
    removed directory: `level1/level2'
    removed directory: `level1'

The flags on this `rm -rv` command:

  - `-r` remove directories and their contents recursively
  - `-v` print a message for each removed file or directory

  

## View file contents with `cat`:

`cat` reads file contents into standard output, typically the display.
This is best used for small text files.

    [username@pegasus ~]$ cat example_file1
    This is example_file1.
    It contains two lines of text.
    [username@pegasus ~]$ cat -nE example_file1
         1    This is example_file1.$
         2  It contains two lines of text.$

Flags used in this command for `cat`:

  - `-n` number all output lines
  - `-E` display $ at the end of each line

Other useful flags:

  - `-b` number non-empty output lines

When **no file is given**, `cat` reads standard input (typically from
the keyboard) then outputs contents (typically the display). Press
`CTRL-D` (Windows) or `Command-D` (Mac) to return to the prompt.

    [username@pegasus ~]$ cat
    No file was given- cat reads standard input from the keyboard and will output this to the display.                              
    No file was given- cat reads standard input from the keyboard and will output this to the display.
    CTRL-D or Command-D
    [username@pegasus ~]$ 

This feature can be used to create files.

  

## Create files with `cat` and redirection:

**Redirection** operators in Linux send output from one source as input
to another. `>` redirects standard output (typically the display) to a
file. Combine `cat` with `>` to create a new file and add content
immediately.

    [username@pegasus ~]$ cat > example_file3
    This is example_file3.
    These lines are typed directly into the file.
    Press CTRL-D (Windows) or Command-D (Mac) to return to the prompt.
    CTRL-D or Command-D
    [username@pegasus ~]$ cat example_file3
    This is example_file3.
    These lines are typed directly into the file.
    Press CTRL-D (Windows) or Command-D (Mac) to return to the prompt.

Note that the `>` operator *overwrites* file contents. To *append*, use
the append operator: `>>`

    [username@pegasus ~]$ cat >> example_file3
    This is an appended line.
    CTRL-D or Command-D
    [username@pegasus ~]$ cat example_file3
    This is example_file3.
    These lines are typed directly into the file.
    Press CTRL-D (Windows) or Command-D (Mac) to return to the prompt.
    This is an appended line.

Linux output redirection operators:

  - `>` overwrite standard output a file
  - `>>` append standard output to a file

  

## View file contents with `head` and `tail`:

For longer text files, use `head` and `tail` to restrict output. By
default, both output 10 lines - `head` the first 10, `tail` the last 10.
This can be modified with numerical flags.

    [username@pegasus ~]$ head example_file2
    This is example_file2.  It contains 20 lines.  
    This is the 2nd line.
    This is the 3rd line.
    This is the 4th line.
    This is the 5th line.
    This is the 6th line.
    This is the 7th line.
    This is the 8th line.
    This is the 9th line.
    This is the 10th line.
    [username@pegasus ~]$ head -3 example_file2
    This is example_file2.  It contains 20 lines.  
    This is the 2nd line.
    This is the 3rd line.
    
    [username@pegasus ~]$ tail -4 example_file2
    This is the 17th line.
    This is the 18th line.
    This is the 19th line.
    This is the 20th line, also the last.

  

## Rename and Move with `mv`:

Moving and renaming in Linux uses the same command, thus files can be
renamed as they are moved. In this example, the file `example_file1` is
first renamed using `mv` and then moved to a subdirectory (without
renaming).

    [username@pegasus ~]$ mv example_file1 example_file0
    [username@pegasus ~]$ ls
    example_file0  example_file2  testdir1  testdir2
    [username@pegasus ~]$ mv example_file0 testdir1/
    [username@pegasus ~]$ ls testdir1
    example_file0  testdir1_file1

In this example, the file `example_file0` is moved and renamed at the
same time.

    [username@pegasus ~]$ mv -vn testdir1/example_file0 example_file1
    `testdir1/example_file0' -> `example_file1'
    [username@pegasus ~]$ ls
    example_file1  example_file2  testdir1  testdir2

The flag on this `mv -vn` command:

  - `-v` explain what is being done
  - `-n` do not overwrite and existing file

Note that when `mv` is used with directories, it is recursive by
default.

    [username@pegasus ~]$ mv -v testdir1 testdir2/testdir1
    `testdir1' -> `testdir2/testdir1'
    [username@pegasus ~]$ ls -R testdir2
    testdir2:
    testdir1
    
    testdir2/testdir1:
    testdir1_file1

The file inside `tesdir1` moved along with the directory.

  

## Copy with `cp`:

File and directory copies can be renamed as they are copied. In this
example, `example_file1` is copied to `example_file0`.

    [username@pegasus ~]$ cp example_file1 example_file0
    [username@pegasus ~]$ cat example_file0
    This is example_file1.
    It contains two lines of text.

The contents of the copied file are the same as the original.

`cp` is not recursive by default. To copy directories, use the recursive
flag `-R`.

    [username@pegasus ~]$ cp -Rv testdir2 testdir2copy
    `testdir2' -> `testdir2copy'
    `testdir2/testdir1' -> `testdir2copy/testdir1'
    `testdir2/testdir1/testdir1_file1' -> `testdir2copy/testdir1/testdir1_file1'
    [username@pegasus ~]$ ls
    example_file0  example_file1  example_file2  testdir2  testdir2copy

The flags on this `cp -Rv` command:

  - `-R` copy directories recursively
  - `-v` for verbose, explain what is being done

Other useful flags:

  - `-u` (update) copy only when source is newer, or destination is
    missing
  - `-n` do not overwrite an existing file
  - `-p` preserve attributes (mode, ownership, and timestamps)

  

## Edit files with `vi`:

`vi` is a modal text editor available on Pegasus and most Linux systems.
It can be launched with the command `vi` (plain) or `vim`
(syntax-highlighted based on file extension). `vi` has two main modes:
**Insert** and **Command**.

  - **Command mode:**  searching, navigating, saving, exiting, etc.
  - **Insert mode:**  inserting text, pasting from clipboard, etc.

`vi` launches in Command mode by default. To enter Insert mode, type `i`
on the keyboard. Return to Command mode by pressing `ESC` on the
keyboard. To exit and save changes, type `:x` (exit with save) or `:wq`
(write and quit) on the keyboard while in Command mode (from Insert
mode, type `ESC` before each sequence).

In the example below, the arrow keys are used to navigate to the end of
the first line. `i` is pressed to enter Insert mode and the file name on
line 1 is changed. Then `ESC:x` is entered to change to Command mode and
exit saving changes.

    [username@pegasus ~]$ vi example_file0
    ...
    This is example_file0.
    It contains two lines of text.
    ~  
    ~ 
    ~ 
    ~ 
    "example_file0" 2L, 54C    
    :x
    [username@pegasus ~]$ cat example_file0
    This is example_file0.
    It contains two lines of text.

Some `vi` tutorials and commands:

  - <https://www.ccsf.edu/Pub/Fac/vi.html>
  - <http://www.cs.colostate.edu/helpdocs/vi.html>

  

## View file contents by page with `more` and `less`:

Pager applications provide scroll and search functionalities, useful for
larger files. Sets of lines are shown based on terminal height. In both
`more` and `less`, `SPACE` shows the next set of lines and `q` quits.
`more` cannot scroll backwards. In `less`, navigate with the arrow keys
or `Page Up` and `Page Down`, and search with `?` (similar to `man`
pages).

    [username@pegasus testdir1]$ less testdir1_file1
    ...
    This is tesdir1_file1.  It contains 42 lines.  
    02
    03
    04
    05
    06
    07
    : SPACE or Page Down
    36
    37
    38
    39
    40
    41
    42
    (END)  q
    [username@pegasus testdir1]$
