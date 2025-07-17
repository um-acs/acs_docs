Perl on Pegasus
===============

Users are free to compile and install Perl modules in their own home
directories. Most Perl modules can be installed into a local library
with **CPAN** and **cpanminus**. If you need a specific version, we
suggest specifying the version or downloading, extracting, and
installing using Makefile.PL.

Configuring a Local Library
---------------------------

Local libraries can be configured during initial CPAN configuration and
by editing shell configuration files after installing the ``local::lib``
module. By default, ``local::lib`` installs here: ``~/perl5``.

Configure with CPAN:
~~~~~~~~~~~~~~~~~~~~

During initial CPAN configuration, answer ``yes`` to automatic
configuration, ``local::lib`` to approach, and ``yes`` to append
locations to your shell profile (Bash). Quit CPAN and source your shell
configuration before running ``cpan`` again.

::

    [username@pegasus ~]$ cpan
    ...
    Would you like to configure as much as possible automatically? [yes] yes
    ...
    Warning: You do not have write permission for Perl library directories.
    ...
    What approach do you want?  (Choose 'local::lib', 'sudo' or 'manual')
     [local::lib] local::lib
    ...
    local::lib is installed. You must now add the following environment variables
    to your shell configuration files (or registry, if you are on Windows) and
    then restart your command line shell and CPAN before installing modules:

    PATH="/nethome/username/perl5/bin${PATH+:}${PATH}"; export PATH;
    PERL5LIB="/nethome/username/perl5/lib/perl5${PERL5LIB+:}${PERL5LIB}"; export PERL5LIB;
    PERL_LOCAL_LIB_ROOT="/nethome/username/perl5${PERL_LOCAL_LIB_ROOT+:}${PERL_LOCAL_LIB_ROOT}"; export PERL_LOCAL_LIB_ROOT;
    PERL_MB_OPT="--install_base \"/nethome/username/perl5\""; export PERL_MB_OPT;
    PERL_MM_OPT="INSTALL_BASE=/nethome/username/perl5"; export PERL_MM_OPT;

    Would you like me to append that to /nethome/username/.bashrc now? [yes] yes
    ...
    cpan[1]> quit
    ...
    *** Remember to restart your shell before running cpan again ***
    [username@pegasus ~]$ source ~/.bashrc

Configure after ``local::lib`` module installation:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If CPAN has already been configured, ensure ``local::lib`` is installed
and the necessary environment variables have been added to your shell
configuration files. Source your shell configuration before running
``cpan`` again.

::

    [username@pegasus ~]$ cpan local::lib
    Loading internal null logger. Install Log::Log4perl for logging messages
    ...
    local::lib is up to date (2.000018).
    [username@pegasus ~]$ echo 'eval "$(perl -I$HOME/perl5/lib/perl5 -Mlocal::lib)"' >> perl -~/.bashrc
    [username@pegasus ~]$ source ~/.bashrc
    ...

Update CPAN:
~~~~~~~~~~~~

Update CPAN, if necessary. This can be done from the Pegasus prompt or
the CPAN prompt.

::

    [username@pegasus ~]$ cpan CPAN
    or
    cpan[1]> install CPAN
    ...
    Appending installation info to /nethome/username/perl5/lib/perl5/x86_64-linux-thread-multi/perllocal.pod
      ANDK/CPAN-2.10.tar.gz
      /usr/bin/make install  -- OK

    cpan[2]> reload cpan

Confirm local library location:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Look for ``~/perl5/...`` directories in ``$PATH`` and ``@INC``.

::

    [username@pegasus ~]$ echo $PATH
    /share/opt/perl/5.18.1/bin:/nethome/username/perl5/bin:/share/lsf/9.1/linux2.6-glibc2.3-x86_64/etc:...
    [username@pegasus ~]$ perl -e 'print "@INC"'
    /nethome/username/perl5/lib/perl5/5.18.1/x86_64-linux-thread-multi /nethome/username/perl5/lib/perl5/5.18.1 ...

Installing Perl Modules
^^^^^^^^^^^^^^^^^^^^^^^

Once a local library has been installed and configured, CPAN modules
will install to the local directory (default ``~/perl5``). The format
for installing Perl modules with CPAN or cpanminus is
``Module``::``Name``.

Install with CPAN:
~~~~~~~~~~~~~~~~~~

Install from the Pegasus prompt or the CPAN prompt. Run ``cpan -h`` or
``perldoc cpan`` for more options.

::

    [username@pegasus ~]$ cpan App::cpanminus
    Loading internal null logger. Install Log::Log4perl for logging messages
    Reading '/nethome/username/.cpan/Metadata'
    ...
    or
    [username@pegasus ~]$ cpan
    cpan[1]> install App::cpanminus
    Reading '/nethome/username/.cpan/Metadata'
    ...

To install a specific module version with ``cpan``, provide the full
distribution path.

::

    [username@pegasus ~]$ cpan MIYAGAWA/App-cpanminus-1.7040.tar.gz

Install with cpanminus:
~~~~~~~~~~~~~~~~~~~~~~~

cpanminus is a CPAN module installation tool that will use your local
library, if configured. Install from the Pegasus prompt with
``cpanm Module``::``Name``. Run ``cpanm -h`` or ``perldoc cpanm`` for
more options.

::

    [username@pegasus ~]$ cpanm IO::All
    --> Working on IO::All
    Fetching http://www.cpan.org/authors/id/I/IN/INGY/IO-All-0.86.tar.gz ... OK
    Configuring IO-All-0.86 ... OK
    Building and testing IO-All-0.86 ... OK
    Successfully installed IO-All-0.86
    1 distribution installed

To install a specific module version with ``cpanm``, provide either the
full distribution path, the URL, or the path to a local tarball.

::

    [username@pegasus ~]$ cpanm MIYAGAWA/App-cpanminus-1.7040.tar.gz
    or
    [username@pegasus ~]$ cpanm http://search.cpan.org/CPAN/authors/id/M/MI/MIYAGAWA/App-cpanminus-1.7040.tar.gz
    or
    [username@pegasus ~]$ cpanm ~/App-cpanminus-1.7040.tar.gz

Deactivating Local Library Environment Variables
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To remove all directories added to search paths by ``local::lib`` in the
current shell’s environment, use the ``--deactivate-all`` flag. Note
that environment variables will be re-enabled in any sub-shells when
using ``.bashrc`` to initialize local::lib.

::

    [username@pegasus ~]$ eval $(perl -Mlocal::lib=--deactivate-all)
    [username@pegasus ~]$ echo $PATH
    /share/opt/perl/5.18.1/bin:...
    [username@pegasus ~]$ perl -e 'print "@INC"'
    /share/opt/perl/5.18.1/lib/site_perl/5.18.1/x86_64-linux-thread-multi ...

Source your shell configuration to re-enable the local library:

::

    [username@pegasus ~]$ source ~/.bashrc
    ...
    [username@pegasus ~]$ echo $PATH
    /nethome/username/perl5/bin:/share/lsf/9.1/linux2.6-glibc2.3-x86_64/etc:...
    [username@pegasus ~]$ perl -e 'print "@INC"'
    /nethome/username/perl5/lib/perl5/5.18.1/x86_64-linux-thread-multi /nethome/username/perl5/lib/perl5/5.18.1 /nethome/username/perl5/lib/perl5/x86_64-linux-thread-multi /nethome/username/perl5/lib/perl5 ...
