Python Virtual Environments on Pegasus
======================================

Users can create their own Python virtual environments to maintain
different module versions for different projects. ``Virtualenv`` is
available on Pegasus for Python 2.7.3. By default, ``virtualenv`` does
not include packages that are installed globally. To give a virtual
environment access to the global site packages, use the
``--system-site-packages`` flag.

Creating Virtual Environments
-----------------------------

These example directories do not need to be named exactly as shown.

**Create a project folder, cd to the new folder (optional), and create a
``virtualenv``:**

::

    [username@pegasus ~]$ mkdir ~/python2
    [username@pegasus ~]$ cd ~/python2
    [username@pegasus python2]$ virtualenv ~/python2/test1
    PYTHONHOME is set.  You *must* activate the virtualenv before using it
    New python executable in test1/bin/python
    Installing setuptools, pip...done.

**Create a ``virtualenv`` with access to global packages:**

::

    [username@pegasus python2]$ virtualenv --system-site-packages test2

Activating Virtual Environments
-------------------------------

Activate the virtual environment with the ``source`` command and
relative or absolute :literal:`path/to/env``/bin/activate`. The
environment name will precede the prompt.

::

    [username@pegasus ~]$ source ~/python2/test1/bin/activate
    (test1)[username@pegasus ~]$ which python
    ~/python2/test1/bin/python

Installing Python modules in Virtual Environments
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Once the virtual environment is active, install Python modules normally
with PIP, easy_install, or setup.py. Any package installed normally will
be placed into that virtual environment folder and isolated from the
global Python installation. Note that using ``--user`` or
``--prefix=...`` flags during module installation will place modules in
those specified directories, **NOT** your currently active Python
virtual environment.

::

    (test1)[username@pegasus ~]$ pip install munkres

Deactivating Virtual Environments
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    (test1)[username@pegasus ~]$ deactivate
    [username@pegasus ~]$ 

Comparing two Python Virtual Environments
-----------------------------------------

PIP can be used to save a list of all packages and versions in the
current environment (use ``freeze``). Compare using ``sdiff`` to see
which packages are different.

**List the current environment, deactivate, then list the global Python
environment:**

::

    (test1)[username@pegasus ~]$ pip freeze > test1.txt
    (test1)[username@pegasus ~]$ deactivate
    [username@pegasus ~]$ pip freeze > p2.txt

**Compare the two outputs using ``sdiff``:**

::

    [username@pegasus ~]$ sdiff p2.txt test1.txt
    ...
    matplotlib==1.2.1                                             <
    misopy==0.5.0                                                 | munkres==1.0.7
    ...
    [username@pegasus ~]$ 

As seen above, the test1 environment has ``munkres`` installed (and no
other global Python packages).

Recreating Python Virtual Environments
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To recreate a Python virtual environment, use the ``r`` flag and the the
saved list:

::

    (test2)[username@pegasus ~]$ pip install -r test1.txt
    Installing collected packages: munkres
      Running setup.py install for munkres
    ...
    Successfully installed munkres
    Cleaning up...
    (test2)[username@pegasus ~]$ 

Python virtual environment wrapper
----------------------------------

Users can install ``virtualenvwrapper`` in their own home directories to
facilitate working with Python virtual environments. Once installed and
configured, ``virtualenvwrapper`` can be used to create new virtual
environments and to switch between your virtual environments (switching
will deactivate the current environment). ``Virtualenvwrapper`` reads
existing environments located in the ``WORKON_HOME`` directory.

Install a local copy of ``virtualenv`` with ``--user``:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Recall that ``--user`` installs Python 2.7 modules in
``~/.local/lib/python2.7/site-packages`` To specify a different
location, use ``--prefix=$HOME/local/python2mods`` (or another path).

::

    [username@pegasus ~]$ pip install --user virtualenvwrapper
    or
    [username@pegasus ~]$ easy_install --user --always-copy virtualenvwrapper

Set virtual environment home directory and source:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

``WORKON_HOME`` should be the parent directory of your existing Python
virtual environments (or another directory of your choosing). New Python
virtual environments created with ``virtualenv`` will be stored
according to this path. Set source to ``virtualenvwrapper.sh`` in the
same location specified during installation.

::

    [username@pegasus ~]$ export WORKON_HOME=$HOME/python2
    [username@pegasus ~]$ source ~/.local/bin/virtualenvwrapper.sh

Create a virtual environment using ``virtualenvwrapper``:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This will also activate the newly-created virtual environment.

::

    [username@pegasus ~]$ mkvirtualenv test3
    PYTHONHOME is set.  You *must* activate the virtualenv before using it
    New python executable in test3/bin/python
    Installing setuptools, pip...done.
    (test3)[username@pegasus ~]$ 

Activate or switch to a virtual environment:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    (test3)[username@pegasus ~]$ workon test1
    (test1)[username@pegasus ~]$ 

Deactivate the virtual environment:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    (test1)[username@pegasus ~]$ deactivate
    [username@pegasus ~]$
