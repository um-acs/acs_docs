Inspecting and Verifying Images
=================================

Apptainer images can be inspected before running them. Inspection helps users
check image metadata, labels, environment variables, run commands, definition
files, and help text.

Verification is different from inspection. Verification checks whether a signed
image still matches its cryptographic signature.

.. important::

   Image verification is not the same as checking whether software inside the
   container is safe, correct, or appropriate for your workflow. Verification
   only confirms that a signed image has not changed since it was signed.

Inspect an Image
----------------

Use ``inspect`` to view general information about an image.

::

   apptainer inspect image.sif

Example:

::

   apptainer inspect alpine_latest.sif

Useful inspect options include:

::

   apptainer inspect --labels image.sif
   apptainer inspect --environment image.sif
   apptainer inspect --runscript image.sif
   apptainer inspect --deffile image.sif

Use ``inspect`` when you want to understand what is inside an image before
running it.

.. warning::

   Do not run unknown or untrusted containers without checking them first.
   Inspect the image, review the source, and avoid running containers that come
   from unclear or untrusted locations.

View Container Help
-------------------

If the image includes a ``%help`` section, view it with:

::

   apptainer run-help image.sif

Verify an Image
---------------

If an image has been signed, it can be verified.

::

   apptainer verify image.sif

Example:

::

   apptainer verify alpine_latest.sif

Verification only works when the image has a valid signature. If the image is
unsigned, verification may fail even if the image can still run.

Sign an Image
-------------

Users can sign their own images before sharing them.

Create a new signing key:

::

   apptainer key newpair

List available keys:

::

   apptainer key list

Sign an image:

::

   apptainer sign image.sif

Verify the signed image:

::

   apptainer verify image.sif

.. note::

   Signing is most useful when the people who receive the image can also access
   the correct public key. If you are sharing signed images with collaborators,
   make sure they know which key should be used to verify the image.

List SIF Objects
----------------

A ``.sif`` file contains internal objects, such as metadata, filesystem data,
and signatures. To list these objects:

::

   apptainer sif list image.sif

Most users do not need this command, but it can be useful when debugging image
metadata or signatures.

Fingerprints Header
-------------------

Advanced users can use the ``Fingerprints:`` header in a definition file to
require a signed bootstrap image during build. If the bootstrap image is not
signed by the required key, the build fails.

This is mainly useful for trusted and reproducible workflows where the base
image must be verified before building a new image.

When to Inspect or Verify
-------------------------

Use ``inspect`` when:

* You want to check labels, environment variables, help text, or run commands.
* You want to understand an image before running it.
* You are debugging a container image.

Use ``verify`` when:

* The image comes from a trusted source that signs containers.
* You need to confirm that the image has not been modified.
* You are sharing containers for reproducible workflows.

For regular testing, ``inspect`` is usually the first command to try. For
trusted signed images, use ``verify``.


Quick Command Summary
---------------------

====================================      ==============================================
Command                                   Purpose
====================================      ==============================================
``apptainer inspect image.sif``           View general image metadata
``apptainer inspect --labels``            View image labels
``apptainer inspect --environment``       View runtime environment variables
``apptainer inspect --runscript``         View the default run command
``apptainer inspect --deffile``           View the definition file, if available
``apptainer run-help image.sif``          View help text from the image
``apptainer verify image.sif``            Verify a signed image
``apptainer sign image.sif``              Sign an image
``apptainer sif list image.sif``          List internal SIF objects
====================================      ==============================================
