IDSC ACS Terms and Conditions
=============================

Use of IDSC systems means that you agree to all `University of Miami Acceptable Use Policies <http://it.miami.edu/about-umit/policies-and-procedures/>`_, in addition to the following, 
that are set specifically by IDSC:

- No PHI or PII may be stored on the systems
- IDSC is not responsible for any data loss or data compromise
- IDSC will make a best effort to recover lost data but assumes no responsibility for any data
- IDSC will gather aggregate usage and access statistics for research purposes
- IDSC will perform unscheduled audits to ensure compliance with IDSC and UM acceptable use policies

Secure Storage
--------------

All of your data is hosted in the NAP of the Americas Terremark facility in downtown Miami. The NAP is a Category 5 Hurricane proof facility that hosts all critical infrastructure for the University of Miami. Along with being a Category 5 Hurricane proof facility, the NAP is also guarded 24/7 with multi-layer security consistent with a secure facility.

Your data is encrypted at four levels using our vault secure data processing facility:

#. **Data at rest**. At rest data is kept on encrypted partition which must be mounted by individual users requiring command line access
#. **Data in motion**. All data in motion is encrypted using FIPS 140-2 compliant SSL. This encryption is called automatically by using https protocols.
#. **Application layer access**. All applications must utilize multi-factor authentication (currently Yubikey hardware key) for access to data.
#. **PHI data**. All PHI data must be handled by authorized IDSC personnel and is NOT directly available from your secure server. All uploads and downloads are handed by authorized IDSC personnel only.
#. **Deleted data**. All deleted data is securely removed from the system.

Along with these security precautions, we also conduct regular security tests and audits in accordance with PCI and HIPAA standards. IDSC welcomes any external audits and will make every effort to comply with industry standards or we will reject the project.

