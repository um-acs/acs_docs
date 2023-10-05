.. _ssh:

========================================
Connecting to Advanced Computing Systems 
========================================

Access to ACS Systems is via SSH, or Secure Shell, a network protocol that allows
remote access through an encrypted connection. 

From a computer running Windows
===============================

You can connect using a terminal emulator like PuTTY
(`www.putty.org <http://www.putty.org>`__), or OpenSSH (`https://www.openssh.com <https://www.openssh.com>`__. 
Although both PuTTY and OpenSSH can be can be downloaded and installed free of charge,
we recommend PuTTY as it allows you to name and save your connections.

When you have installed PuTTY, you can run it, and use it to 
log onto the IDSC servers with the appropriate account credentials.  
For instance, in order to connect to Pegasus, you need to specify on
(the dialog box that shows up when you run PuTTY) the 
host name as *pegasus.ccs.miami.edu*, the port number as *22*, the connection 
type as *SSH* and make other 
selections as is shown in the figure below::

.. figure:: assets/putty_1.png
   :alt: PuTTY in Windows

   PuTTY on Windows

From a computer running Mac or Linux
====================================

Connect with the Terminal program, included with the Operating Systems.

Log into IDSC servers with the approprite acount credentials.  Pegasus example::

    bash-4.1$ ssh username@pegasus.ccs.miami.edu
    username@pegasus.ccs.miami.edu’s password:

or SSH without account credentials to be prompted::

    bash-4.1$ ssh pegasus.ccs.miami.edu
    login as: username
    username@pegasus.ccs.miami.edu's password:

To use SSH key pairs to authenticate, see the CentOS wiki:
http://wiki.centos.org/HowTos/Network/SecuringSSH



.. _x11: 

Forwarding the display with x11
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To use graphical programs over SSH, the graphical display must be
forwarded securely. This typically requires running an X Window System
server and adding the ``-X`` option when connecting via SSH.

Download an X Window System server
----------------------------------

-  For Windows, Xming with the default installation options : http://sourceforge.net/projects/xming/files/latest/download
-  For Mac, XQuartz (OSX 10.8+) : http://www.xquartz.org/ 

_OS X versions 10.5 through 10.7 include X11 and do not require XQuartz._ 



Connect with X11 forwarding
---------------------------

Launch the appropriate X Window server **before** connecting to IDSC servers via SSH.


**Windows: Configure PuTTY for X11 display forwarding**

In PuTTY Configuration,

-  scroll to the **Connection** category and expand it
-  scroll to the **SSH** sub-category and expand it
-  click on the **X11** sub-category

On the X11 Options Panel,

-  check "Enable X11 forwarding"
-  enter "``localhost:0``" in the "X display location" text field

.. figure:: assets/putty_2.png
   :alt: PuTTY X11

   PuTTY X11


**Mac: Connect with X11 flag**

Using either the Mac Terminal or the xterm window, connect using the
``-X`` flag:

::

    bash-4.1$ ssh -X username@pegasus.ccs.miami.edu

Launch a graphical application
------------------------------

Use ``&`` after the command to run the application in the background,
allowing continued use of the terminal.

::

    [username@pegasus ~]$ firefox &


.. _vpn: 


Connecting to IDSC Systems from offsite
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Triton, Pegasus, and other IDSC resources are only available from within the
University’s secure campus networks (wired or SecureCanes wireless). To
access IDSC resources while offsite, open a VPN connection first. IDSC does not
administer VPN accounts.

University of Miami VPN:
https://my.it.miami.edu/wda/a-z/virtual-private-network/

Send access range requests (for Vendor VPN applications) to : `IDSC ACS <mailto:hpc@ccs.miami.edu>`_  
