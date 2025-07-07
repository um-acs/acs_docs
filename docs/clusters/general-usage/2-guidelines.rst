Important Guidelines
====================

- **Review Policies:**  
  Before running commands, submitting jobs, or using software on **Pegasus** or **Triton**, please review our  
  `usage policies <https://dev-acs-docs.readthedocs.io/policies/policies.html#policies>`__ and ensure you understand the rules governing access to IDSC resources.

- **Use ``/scratch`` for Job I/O:**  
  Input and output files must be staged in the ``/scratch`` filesystem, which is optimized for high-throughput I/O.  
  **Avoid using** ``/nethome`` or ``/home`` **for active job execution on** **Pegasus** or **Triton**, as doing so may degrade cluster performance and lead to account restrictions.

- **Project Membership Requirements:**  
  To use IDSC clusters, you must be associated with a valid project:

  - **Triton Users:**  
    Must belong to a `Triton project <https://idsc.miami.edu/project-request>`__ with a resource type of  
    ``triton_faculty``, ``triton_student``, or ``triton_education``.

  - **Pegasus Users:**  
    Must be part of a `Pegasus project <https://redcap.miami.edu/surveys/?s=F8MK9NMW9N>`__ with the resource type ``pegasus_project``.

- **Per-Project Access Model:**  
  Access to IDSC resources is managed on a **per-project basis**, facilitating team collaboration and secure data sharing across the University.  
  More details are available on the `Projects page <https://dev-acs-docs.readthedocs.io/clusters/general-usage/6-jobs/4-projects.html#projects>`__.

- **Do Not Run Jobs on Login Nodes:**  
  Always use the  

  docs/clusters/general-usage/6-jobs/4-scripts.rst


  `LSF batch scheduler <https://dev-acs-docs.readthedocs.io/clusters/general-usage/6-jobs/4-scripts.html#lsf-scripts>`__  
  or the `interactive queue <https://dev-acs-docs.readthedocs.io/clusters/general-usage/6-jobs/2-queues.html#p-queues>`__ to submit jobs.  
  Running intensive tasks on login nodes can disrupt other users and may result in account suspension.
