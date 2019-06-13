# SVN for CCS

## Subversion Server

User access to Subversion server is managed through CCS LDAP accounts
and local ACLs. Authorized users can access SVN repositories with their
CCS accounts.

**command line access:** ` 
http://web.ccs.miami.edu/repos/REPOSITORYNAME `  
**web access:** http://web.ccs.miami.edu/websvn

  

## Subversion Client

For Windows, we recommend [TortoiseSVN](http://www.tortoisesvn.net).
This Subversion client seamlessly integrates into Windows Explorer. A
right-click provides with the most common Subversion commands.

For Mac, download the latest Subversion client from
[collab.net](http://www.open.collab.net/downloads/community/). Extract
the SVN binary to **/usr/local/bin**. Consider
[SvnX](http://code.google.com/p/svnx/), a good open source front-end for
Subversion. As with all Mac apps, download the dmg file, double click
the file if it does not auto mount, then drag the SvnX application to
your system's Application directory. See this tutorial for help
configuring SvnX: [Getting Started with
SvnX](http://www.switchingtomac.com/tutorials/get-started-with-subversion-using-svnx/).

Most Linux distributions already have the SVN client. If not, run `sudo
yum install subversion` - more information here: [CentOS Subversion
HowTo](http://wiki.centos.org/HowTos/Subversion). Note, this may take a
good ten minutes.

  

## Basic Subversion commands

Include the `-m` flag and a message with SVN commits, adds, and imports.
For more information about Subversion commands, run `svn help` at the
command-line prompt.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Command</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>svn list repo_address</code></td>
<td>List files in a repository.</td>
</tr>
<tr class="even">
<td><code>svn import /path/to/directory repo_address -m 'tree description'</code></td>
<td>Add and commit all content under <code>directory</code> to the specified repo, with comments (<code>-m</code> flag). Run <code>svn checkout</code> after import to create working copies on your machine.</td>
</tr>
<tr class="odd">
<td><code>svn checkout repo_address</code>
<hr />
<code>svn co repo_address</code></td>
<td>Checkout a repository by creating a working copy (snapshot) on your machine. <strong><em>A repository must be checked out to run the below commands.</em></strong></td>
</tr>
<tr class="even">
<td><code>svn add filename_or_directory -m 'description'</code></td>
<td>Add a new file or the contents of a new directory to the current working copy, with comments (<code>-m</code> flag). <strong><em>Commit or check-in after adding files to update the repo.</em></strong></td>
</tr>
<tr class="odd">
<td><code>svn delete filename_or_directory</code></td>
<td>Delete file or directory from the current working copy. <strong><em>Commit or check-in after deleting files to update the repo.</em></strong></td>
</tr>
<tr class="even">
<td><code>svn status optional filenames or directories</code></td>
<td>Review all modified files, or specify multiple file or directory names. Add the <code>--verbose</code> flag to see details.</td>
</tr>
<tr class="odd">
<td><code>svn commit filename_or_directory -m 'explanation'</code>
<hr />
<code>svn ci filename_or_directory -m 'explanation of changes'</code></td>
<td>Commit or check-in changes to a specific file or all files in <code>directory</code>, with comments (<code>-m</code> flag) <strong><em>Review local changes with <code>svn status</code> before committing them.</em></strong></td>
</tr>
<tr class="even">
<td><code>svn commit -m 'explanation'</code>
<hr />
<code>svn ci -m 'explanation of changes'</code></td>
<td>Commit or check-in all changes, with comments (<code>-m</code> flag) <strong><em>Review local changes with <code>svn status</code> before committing them.</em></strong></td>
</tr>
<tr class="odd">
<td><code>svn revert optional filenames or directories</code>
<hr />
<code>svn revert -R .</code></td>
<td>Revert any un-committed changes to the most recent snapshot versions. Revert all un-committed changes with <code>-R .</code> <strong><em>This does not delete files that are not managed by SVN (status <code>?</code>)</em></strong></td>
</tr>
<tr class="even">
<td><code>svn update optional filenames or directories</code>
<hr />
<code>svn up optional filenames or directories</code></td>
<td>Update your working copies with versions from the repository, or specify multiple file names. <strong><em>SVN will attempt to merge any changes.</em></strong></td>
</tr>
<tr class="odd">
<td><code>svn diff optional filenames or directories</code>
<hr />
<code>svn diff revision1:revision2 optional filenames or directories</code></td>
<td>Review differences between your current working copy and the snapshot, or specify revision numbers. Optionally specify multiple file names.</td>
</tr>
</tbody>
</table>

  

### Basic SVN Usage

Once your repository is available, use `svn import` to populate it with
content from a directory on your local machine. Remember to check out
the repository after, to create SVN-managed working copies on your
machine.

    [username@pegasus test]$ svn import test http://web.ccs.miami.edu/repos/mydept/myrepo -m 'adding all content under test'
    Adding         test/file1.test
    Adding         test/file2.test
    Adding         test/file3.test
    Committed revision 41.

To create a working copy (private snapshot) of all files in a repository
on your local computer (in a directory with the repository name) use
`svn checkout`. This initial copy is your snapshot. Subversion will keep
track of changes in your working copy, which are pending with respect to
the repository until committed with `svn commit` (`svn ci`). It is good
practice to review your local changes with `svn status` before
committing them.

    [username@pegasus ~]$ svn checkout http://web.ccs.miami.edu/repos/mydept/myrepo
    A    myrepo/test/file1.test
    A    myrepo/test/file2.test
    A    myrepo/test/file3.test
    Checked out revision 42.
    [username@pegasus ~]$ cd myrepo/test
    [username@pegasus test]$ ls
    file1.test  file2.test  file3.test

  

After editing your working copy of repository files, commit (upload) all
or some changes to the Subversion server with `svn commit` (or `svn
ci`). Take the time to write a decent comment explaining your changes.

    [username@pegasus test]$ svn ci file3.test -m 'updated equation in line 19'
    Sending        file3.test
    Transmitting file data .
    Committed revision 43.

  

Add your own files or directories to your local working copy with `svn
add`. Run `svn ci` after adding, to commit the changes to the
repository. Take the time to write a decent comment explaining your
changes.

    [username@pegasus test]$ svn add file4.test
    A         file4.test
    [username@pegasus test]$ svn commit file4.test -m 'adding a new file'
    Adding         file4.test
    Transmitting file data ..
    Committed revision 44.
    
    [usrname@pegasus test]$ svn add testtree
    A         testtree
    A         testtree/subfile1.test
    A         testtree/subfile2.test
    [username@pegasus test]$ svn ci testtree -m 'committing additional testtree directory'
    Adding         testtree
    Adding         testtree/subfile1.test
    Adding         testtree/subfile2.test
    Transmitting file data ..
    Committed revision 45.

  

Delete files or directories from your local working copy with `svn
delete`. Run `svn ci` after deleting, to commit the changes to the
repository. Take the time to write a decent comment explaining your
changes.

    [username@pegasus test]$ svn delete testtree/subfile2.test
    D         testtree/subfile2.test
    [username@pegasus test]$ svn ci -m 'committing deletion of subfile2.test'
    Deleting       testtree/subfile2.test
    
    Committed revision 46.
    
    [username@pegasus test]$ svn delete testtree
    D         testtree/subfile1.test
    D         testtree
    [username@pegasus test]$ svn ci -m 'committing deletion of directory testtree and contents'
    Deleting       testtree
    
    Committed revision 47.

  

Review modifications made to your local working copy with `svn status`.
Use the `--verbose` flag to show details, including revision and owner
information. Specify files or directories with optional arguments.

    [username@pegasus test]$ svn status
    ?       file4.test
    A       file3.test
    M       file1.test

In this example, `file1.test` has been modified (`M`), `file3.test` has
been added to the working copy (not the repo), and `file4.test` has not
been added to the working copy (`?`). `file2.test` matches the
repository version (all files are shown with `--verbose` flag and no
arguments):

    [username@pegasus test]$ svn status --verbose
                   47      47 username      .
    ?                                        file4.test
    A                                        file3.test
                   47      47 username      file2.test
    M              47      47 username      file1.test

  

Show verbose status for only `file4.test` and `file1.test`:

    [username@pegasus test]$ svn status file1.test file4.test --verbose
    M              47      47 username      file1.test
    ?                                       file34.test

  

Add `file4.test` to the local working copy, then commit the updates and
additions separately:

    [username@pegasus test]$ svn add file4.test
    A         file4.test
    [username@pegasus test]$ svn status
    A       file4.test
    A       file3.test
    M       file1.test
    [username@pegasus test]$ svn ci file1.test -m 'updating file1.test'
    Sending        file1.test
    Transmitting file data .
    Committed revision 48.
    [username@pegasus test]$ svn ci -m 'adding 2 test files'
    Adding         file3.test
    Adding         file4.test
    Transmitting file data ..
    Committed revision 49.

  

Revert any un-committed changes to your local working copy with `svn
revert`. This will return the specified files or directories in the
working copy to the checked-out snapshot. Revert all with `-R .` (this
will not delete any new files with `?` status).

    [username@pegasus test]$ svn status
    ?       file4.test
    M       file2.test
    M       file3.test
    M       file1.test
    [username@pegasus test]$ svn revert file1.test
    Reverted 'file1.test'
    [username@pegasus test]$ svn status
    ?       file4.test
    M       file2.test
    M       file3.test
    [username@pegasus test]$ svn revert -R .
    Reverted 'file2.test'
    Reverted 'file3.test'
    [username@pegasus test]$ svn status
    ?       file4.test

  

Update your local working copy to the current repository version with
`svn update` (`svn up`). SVN will attempt to merge any changes on the
server with **committed** changes to your local working copy. Specify
files with optional arguments.

    [username@pegasus test]$ svn up file2.test
    U    file2.test
    Updated to revision 50.
    [username@pegasus test]$ svn up
    U    file1.test
    U    file3.test
    U    file4.test
    Updated to revision 50.

  

Review differences between two versions with `svn diff`. Without
arguments, this shows the differences between your local working copies
and the snapshot (your most recent retrieval from the repository).
Specify revisions with `-r rev1`:`rev2` and files or directories with
optional arguments. Revision order matters for `svn diff -r` output.

In this example, `file2.test` starts empty. A line has been added to the
local working copy. The differences betwen the local working copy and
the snapshot are shown:

    [username@pegasus test]$ svn diff file2.test
    Index: file2.test
    ===================================================================
    --- file2.test  (revision 50)
    +++ file2.test  (working copy)
    @@ -0,0 +1 @@
    +username added this line to local working copy

  

The local `file2.test` is then committed to the repository, and
differences between revisions are shown. Note that the order of
revisions affects output format (not output content).

    [username@pegasus test]$ svn ci file2.test -m 'updating repo'
    Sending        file2.test
    Transmitting file data .
    Committed revision 51.  
    
    [username@pegasus test]$ svn diff -r 50:51 file2.test
    Index: file2.test
    ===================================================================
    --- file2.test  (revision 50)
    +++ file2.test  (revision 51)
    @@ -0,0 +1 @@
    +username added this line to local working copy
    
    [username@pegasus test]$ svn diff -r 51:50 file2.test
    Index: file2.test
    ===================================================================
    --- file2.test  (revision 51)
    +++ file2.test  (revision 50)
    @@ -1 +0,0 @@
    -username added this line to local working copy
