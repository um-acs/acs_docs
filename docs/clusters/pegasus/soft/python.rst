Python on Pegasus
=================

Users are free to compile and install Python modules in their own home
directories on Pegasus. Most Python modules can be installed with the
``--user`` flag using PIP, easy_install, or the setup.py file provided
by the package. If you need a specific version of a Python module, we
suggest using PIP with a direct link or downloading, extracting, and
installing using setup.py. If you need to maintain multiple versions,
see Python Virtual Environments (below).

The ``--user`` flag will install Python 2.7 modules here:  
``~/.local/lib/python2.7/site-packages`` Note the default location
``~/.local`` is a hidden directory. If the Python module includes
executable programs, they will usually be installed into
``~/.local/bin``.

To specify a different location, use
``--prefix=$HOME/local/python2mods`` (or another path). The above prefix
flag example will install Python 2.7 modules here:  
``~/local/python2mods/lib/python2.7/site-packages``

Loading and Switching Python Modules
------------------------------------

Confirm Python is loaded:

::

    [username@pegasus ~]$ module list
    Currently Loaded Modulefiles:
      1) perl/5.18.1             3) gcc/4.4.7(default)
      2) python/2.7.3(default)   4) share-rpms65

Switch Python modules:

::

    [username@pegasus ~]$ module switch python/3.3.1
    $ module list
    Currently Loaded Modulefiles:
      1) perl/5.18.1          3) share-rpms65
      2) gcc/4.4.7(default)   4) python/3.3.1

Installing Python Modules with Package Managers
-----------------------------------------------

Install using PIP with ``--user``:

::

    [username@pegasus ~]$ pip install --user munkres
    or install a specific version:
    [username@pegasus ~]$ pip install --user munkres==1.0.7

Install using easy_install with ``--user``:

::

    [username@pegasus ~]$ easy_install --user munkres

Installing Downloaded Python Modules
------------------------------------

Install using PIP with ``--user``:

::

    [username@pegasus ~]$ pip install --user https://pypi.python.org/packages/source/m/munkres/munkres-1.0.7.tar.gz
    Downloading/unpacking https://pypi.python.org/packages/source/m/munkres/munkres-1.0.7.tar.gz
      Downloading munkres-1.0.7.tar.gz
      Running setup.py egg_info for package from https://pypi.python.org/packages/source/m/munkres/munkres-1.0.7.tar.gz
        
    Cleaning up...

Install using setup.py with ``--user``:

::

    [username@pegasus ~]$ wget https://pypi.python.org/packages/source/m/munkres/munkres-1.0.7.tar.gz --no-check-certificate
    [username@pegasus ~]$ tar xvzf munkres-1.0.7.tar.gz
    [username@pegasus ~]$ cd munkres-1.0.7
    [username@pegasus munkres-1.0.7]$ python setup.py --user install

Checking Module Versions
~~~~~~~~~~~~~~~~~~~~~~~~

Launch Python and confirm module installation:

::

    [username@pegasus ~]$ python
    ...
    >>> import munkres
    >>> print munkres.__version__
    1.0.7
    >>> CTRL-D (to exit Python)
