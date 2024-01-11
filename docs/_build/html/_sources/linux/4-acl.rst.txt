Access Control Lists – ACL
==========================

**Access Control Lists** (ACL) are available the on Pegasus and Triton 
file systems.They allow file owners to grant permissions to specific users and
groups. When combining standard Linux permissions and ACL permissions,
**effective permissions** are the intersection (or overlap) of the two.
``cp`` (copy) and ``mv`` (move/rename) will include any ACLs associated
with files and directories.

Getting ACL information
-----------------------

ACL permissions start the same as the standard Linux permissions shown
by ``ls -l`` output.

Get ACL information with ``getfacl``:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    [username@login4 ~]$ getfacl mydir
    # file: mydir
    # owner: username
    # group: mygroup
    user::rwx
    group::rw-
    other::--x

Initial ACL permissions on ``mydir`` match the standard permissions
shown by ``ls -ld``:

::

    [username@login4 ~]$ ls -ld mydir
    drwxrw---x 2 username mygroup mydir

Setting ACL information
-----------------------

Once an ACL has been set for a file or directory, a ``+`` symbol will
show at the end of standard Linux permissions.

Set ACL with ``setfacl -m`` (modify):
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Set for user ``mycollaborator`` permissions rwx on ``mydir``, directory
only:

::

    [username@login4 ~]$ setfacl -m user:mycollaborator:rwx mydir

This will set an ACL for only the directory, not any files in the
directory.

::

    [username@login4 ~]$ ls -ld mydir
    drwxrw---x+ 2 username mygroup mydir
    [username@login4 ~]$ getfacl mydir
    # file: mydir
    # owner: username
    # group: mygroup
    user::rwx
    user:mycollaborator:rwx
    group::rw-
    mask::rwx
    other::r--

Note the ``+`` symbol at the end of standard permissions, which
indicates an ACL has been set. Also note the line
``user:mycollaborator:rwx`` in the ``getfacl mydir`` output.

Files within ``mydir`` remain unchanged (no ACL has been set).
``getfacl`` on these files returns standard Linux permissions:

::

    [username@login4 ~]$ ls -l mydir
    total 0
    -rwxrw-r-- 1 username mygroup myfile2.txt
    -rwxrw-r-- 1 username mygroup myfile.txt
    [username@login4 ~]$ getfacl mydir/myfile.txt
    # file: mydir/myfile.txt
    # owner: username
    # group: mygroup
    user::rwx
    group::rw-
    other::r--

Set for user ``mycollaborator`` permissions rwX on ``mydir``,
recursively (all contents):

::

    [username@login4 ~]$ setfacl -Rm user:mycollaborator:rwX mydir

This will set an ACL for the directory and all files in the directory.
Permissions for ``setfacl``:

-  ``r`` read
-  ``w`` write
-  ``X`` (capital) execute/search only if the file is a directory, or
   already has execute permission

.. raw:: html

   <!-- end list -->

::

    [username@login4 ~]$ ls -l mydir
    total 0
    -rwxrw-r--+ 1 username mygroup myfile2.txt
    -rwxrw-r--+ 1 username mygroup myfile.txt

Note the ``+`` symbol after file permissions, indicating an ACL has been
set. ``getfacl`` on these files returns ACL permissions:

::

    [username@login4 ~]$ getfacl mydir/myfile.txt
    # file: mydir/myfile.txt
    # owner: username
    # group: mygroup
    user::rwx
    user:mycollaborator:rwx
    group::rw-
    mask::rwx
    other::r--

Note the line ``user:mycollaborator:rwx`` for ``myfile.txt``.

Recall that when combining standard Linux permissions and ACL
permissions, effective permissions are the intersection of the two. If
user (u) permissions are changed to rw-, the effective permissions for
user:mycollaborator are rw- (the intersection of rwx and rw- is
``rw-``).

::

    [username@login4 ~]$ chmod u=rw mydir/myfile.txt
    [username@login4 ~]$ getfacl mydir/myfile.txt
    # file: myfile.txt
    # owner: username
    # group: mygroup
    user::rw-
    user:mycollaborator:rwx
    group::rw-
    mask::rwx
    other::r--

Note the line ``user::rw-``, indicating users do not have permission to
execute this file.

Removing ACL information
------------------------

Use ``setfacl`` to remove ACL permissions with flags ``-x`` (individual
ACL permissions) or ``-b`` (all ACL rules).

Remove ACL permissions with ``setfacl -x``:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This flag can remove all permissions, but does not remove the ACL.

Remove permissions for user ``mycollaborator`` on ``mydir``, directory
only:

::

    [username@login4 ~]$ setfacl -x user:mycollaborator mydir
    [username@login4 ~]$ getfacl mydir
    # file: mydir
    # owner: username
    # group: mygroup
    user::rwx
    group::rw-
    mask::rwx
    other::--x
    [username@login4 ~]$ ls -ld mydir
    drwxrwx--x+ 2 username mygroup mydir

Note ``user:mycollaborator:rwx`` has been removed, but ``mask::rwx``
remains in the ``getfacl`` output. In ``ls -ld`` output, the ``+``
symbol remains because the ACL has not been removed.

Remove all ACL rules with ``setfacl -b``:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This flag removes the entire ACL, leaving permissions governed only by
standard Linux file permissions.

Remove all ACL rules for ``mydir``, directory only:

::

    [username@login4 ~]$ setfacl -b mydir
    [username@login4 ~]$ ls -ld mydir
    drwxrwx--x 2 username mygroup mydir
    [username@login4 ~]$ getfacl mydir
    # file: mydir
    # owner: username
    # group: mygroup
    user::rwx
    group::rwx
    other::--x

Note the ``+`` symbol is gone from ``ls -ld`` output, indicating only
standard Linux permissions apply (no ACL). The ``mask`` line is gone
from ``getfacl`` output.

Remove all ACL rules for ``mydir``, recursively (all contents):

::

    [username@login4 ~]$ setfacl -Rb mydir
    [username@login4 ~]$ ls -l mydir
    total 0
    -rwxrwxr-- 1 username mygroup myfile2.txt
    -rwxrwxr-- 1 username mygroup myfile.txt

Note the ``+`` symbols are gone for the contents of ``mydir``,
indicating only standard Linux permissions apply (no ACLs).

For more information, reference the manual pages for getfacl and
setfacl:  ``man getfacl`` and ``man setfacl``.
