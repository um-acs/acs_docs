Advanced Image Security
=======================

The main inspection page covers basic ``inspect``, ``verify``, ``sign``, and
``sif list`` commands. This page preserves the deeper security concepts from the
older documentation.

Build-time Verification with Fingerprints
-----------------------------------------

If a bootstrap image is in SIF format, Apptainer can verify it during build. By
default, a failed verification may warn but still allow the build to continue.

To require that a bootstrap image is signed by specific keys, use the
``Fingerprints:`` header in the definition file when supported by the bootstrap
source.

Conceptual example:

.. code:: bash

   Bootstrap: library
   From: alpine:latest
   Fingerprints: ABCDEF1234567890ABCDEF1234567890ABCDEF12

If the bootstrap image is not signed by the listed fingerprint, the build fails.

Fingerprint Notes
-----------------

* ``Fingerprints:`` is useful when the bootstrap source provides a SIF image.
* It is mainly used for enforcing trust in a signed base image.
* It has no effect when the bootstrap image is not in SIF format.
* Keep fingerprints documented so collaborators know which signing keys are
  trusted.

Creating Local Signing Keys
---------------------------

Create a local signing key:

::

   apptainer key newpair

List local keys:

::

   apptainer key list

The key list includes fields such as user, creation date, fingerprint, and key
length.

Signing an Image
----------------

Sign an image before sharing it:

::

   apptainer sign image.sif

Verify the signed image:

::

   apptainer verify image.sif

Verification checks whether the image has been modified after signing and
whether the signature can be matched to an available public key.

SIF Object IDs and Groups
-------------------------

A SIF image contains internal objects such as definition data, JSON metadata,
filesystem data, and signatures.

List SIF objects:

::

   apptainer sif list image.sif

Most users do not need object-level signing. It can be useful for debugging
metadata or signatures.

Object-level Verify Example
---------------------------

Advanced users can verify a specific SIF object by ID:

::

   apptainer verify --sif-id 2 image.sif

Use object-level verification only when you understand which SIF object you are
checking.

Security Practice
-----------------

* Prefer images from trusted sources.
* Inspect images before running them.
* Verify signed images when signatures are available.
* Sign images that will be shared with collaborators.
* Keep definition files in version control for reproducibility.
* Avoid storing secrets, tokens, or passwords inside definition files or images.
