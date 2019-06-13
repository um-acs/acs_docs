# Pegasus Cluster Software Installation

Pegasus users are free to compile and install software in their own home
directories, by following the software's source code or local
installation instructions.

Source code software installations ("compilations") can only be
performed ***in your local directories***. Users of Pegasus are not
administrators of the cluster, and therefore cannot install software
with the `sudo` command (or with package managers like `yum` /
`apt-get`). If the software publisher does not provide compilation
instructions, look for non-standard location installation instructions.

In general, local software installation involves:

1.  confirming pre-requisite software & library availability, versions
2.  ***downloading and extracting files***
3.  ***configuring the installation prefix to a local directory***
    (compile only)
4.  ***compiling the software*** (compile only)
5.  updating PATH and creating symbolic links (optional)

Confirm that your software's pre-requisites are met, either in your
local environment or on Pegasus as a module. You will need to load any
Pegasus modules that are pre-requisites and install locally any other
pre-requisites.

We suggest keeping downloaded source files separate from compiled files
(and any downloaded binary files).

CCS does not install user software. Request cluster software
installations or updates via the [Software
Request](https://portal.ccs.miami.edu/portal/resources/soft/new) form.

## Downloading and extracting files

If necessary, create software directories under your home directory:

    [username@pegasus ~]$ mkdir ~/local ~/src

We suggest keeping your compiled software separate from any downloaded
files. Consider keeping downloaded binaries (pre-compiled software)
separate from source files if you will be installing many different
programs. These directories do not need to be named exactly as shown
above.

  

### Navigate to the `src` directory and download files:

Some programs require configuration and compilation (like autoconf).
Other programs are pre-compiled and simply need to be extracted (like
Firefox). Read and follow all instructions provided for each program.

    [username@pegasus ~]$ cd ~/src
    [username@pegasus src]$ wget http://ftp.gnu.org/gnu/autoconf/autoconf-2.69.tar.gz
    [username@pegasus src]$ wget http://ftp.mozilla.org/pub/mozilla.org/firefox/releases/36.0/linux-x86_64/en-GB/firefox-36.0.tar.bz2

Pre-compiled software can be extracted and immediately moved into your
local software directory. We suggest maintaining subdirectories with
application names and version numbers, as shown below.

  

### Extract downloaded contents:

For pre-compiled software, extract and move contents to your local
software directory. For software that must be configured and compiled,
extract and move contents to your source files directory.

Extraction flags:

  - tar.gz `xvzf` e**X**tract, **V**erbose, filter through g**Z**ip,
    using **F**ile
  - tar.bz2 `xvjf` ...filter through bzip2 (**j**)

  

### Extract pre-compiled software and move to local software directory:

    [username@pegasus src]$ tar xvjf firefox-36.0.tar.bz2
    [username@pegasus src]$ mv firefox-36.0 $HOME/local/firefox/36

The newly-extracted Firefox executable should now be located in
`~/local/firefox/36/firefox` Pre-compiled binaries, skip to ***Updating
PATH and creating symbolic links***.

  

### Extract source code and `cd` to new directory:

    [username@pegasus src]$ tar xvzf autoconf-2.69.tar.gz
    [username@pegasus src]$ cd autoconf-2.69
    [username@pegasus autoconf-2.69]$ 

Source code, proceed to ***Configuring installation and compiling
software***.

  

## Configuring installation and compiling software

We suggest using subdirectories with application names and version
numbers, as shown below. There may be other configuration settings
specific to your software.

### Configure with local directory prefix (absolute path):

Configuration files may also be located in the `bin` (binary) directory,
usually `software`/bin

    [username@pegasus autoconf-2.69]$ ./configure --prefix=$HOME/local/autoconf/2.69

### Make and install the software:

    [username@pegasus autoconf-2.69]$ make
    [username@pegasus autoconf-2.69]$ make install
    ...

If there are dependencies or conflicts, investigate the error output and
try to resolve each error individually (install missing dependencies,
check for specific flags suggested by software authors, check your local
variables).

  

## Updating PATH

`PATH` directories are searched in order. To ensure your compiled or
downloaded software is found and used first, prepend the software
executable location (usually in `software`/bin or `software`
directories) to your `PATH` environment variable. Remember to add
`:$PATH` to preserve existing environment variables.

  

### Prepend software location to your `PATH` environment variable:

    [username@pegasus ~]$ export PATH=$HOME/local/autoconf/2.69/bin:$PATH

### Confirm by checking `which` software:

    [username@pegasus ~]$ which autoconf
    ~/local/autoconf/2.69/bin/autoconf

### Check software version:

Version flags may be software-dependent. Some common flags include
`--version`, `-v`, and `-V`.

    [username@pegasus ~]$ autoconf --version
    autoconf (GNU Autoconf) 2.69
    ...

### Creating symbolic links

To maintain multiple different versions of a program, use soft symbolic
links to differentiate between the installation locations. Make sure the
link and the directory names are distinct (example below). If local
software has been kept in subdirectories with application names and
version numbers, symlinks are not likely to conflict with other files or
directories.

  

### Create a distinctly-named symlink:

This symbolic link should point to the local software executable. The
first argument is the local software executable location
(`~/local/firefox/36/firefox`). The second argument is the symlink name
and location (`~/local/firefox36`).

    [username@pegasus ~]$ ln -s ~/local/firefox/36/firefox ~/local/firefox36

### Append the local location to your `PATH` environment variable:

Remember to add `:$PATH` to preserve existing environment variables.

    [username@pegasus ~]$ export PATH=$PATH:$HOME/local

### Confirm both cluster copy and recently installed software:

The cluster copy of Firefox is `firefox`. The recently installed local
copy is `firefox36` from the symbolic links created above.

    [username@pegasus ~]$ which firefox
    /usr/bin/firefox
    [username@pegasus ~]$ firefox --version
    Mozilla Firefox 17.0.10
    
    [username@pegasus ~]$ which firefox36
    ~/local/firefox36
    [username@pegasus ~]$ firefox36 --version
    Mozilla Firefox 36.0

Reminder - to launch Firefox, connect to Pegasus via SSH with X11
forwarding enabled.

  

## Persistent `PATH`

To persist additions to your PATH variable, edit the appropriate profile
configuration file in your home directory. For Bash on Pegasus, this is
`.bash_profile`.

  

### Update `PATH` in shell configuration (bash):

Use `echo` and the append redirect (`>>`) to update `PATH` in
`.bash_profile`.

    [username@pegasus ~]$ echo 'export PATH=$HOME/local/autoconf/2.69/bin:$PATH' >> ~/.bash_profile
    [username@pegasus ~]$ echo 'export PATH=$PATH:$HOME/local' >> ~/.bash_profile

*both in one command (note the newline special character **`\n`**
directly in between the commands:*

    [username@pegasus ~]$ echo -e 'export PATH=$HOME/local/autoconf/2.69/bin:$PATH\nexport PATH=$PATH:$HOME/local' >> ~/.bash_profile

*or edit the file directly:*

    [username@pegasus ~]$ vi ~/.bash_profile
    ...
    PATH=$PATH:$HOME/bin
    PATH=$HOME/local/autoconf/2.69/bin:$PATH
    PATH=$PATH:$HOME/local
    ...

### Reload shell configurations (Bash) and check `PATH`:

Look for the recently added path locations and their order.

    [username@pegasus ~]$ source ~/.bash_profile
    [username@pegasus ~]$ echo $PATH
    /nethome/username/local/autoconf/2.69/bin:/share/opt/python/2.7.3/bin: ... :/share/sys65/root/sbin:/nethome/username/bin:/nethome/username/local
