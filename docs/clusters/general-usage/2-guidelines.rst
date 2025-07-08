Important Guidelines
====================

- **Review Policies:**  
  Before running commands, submitting jobs, or using software on **Pegasus** or **Triton**, please review our  
  :ref:`policies` and ensure you understand the rules governing access to IDSC resources.

- **Use ``/scratch`` for Job I/O:**  
  Input and output files must be staged in the ``/scratch`` filesystem, which is optimized for high-throughput I/O.  
  **Avoid using** ``/nethome`` or ``/home`` **for active job execution on** **Pegasus** or **Triton**, as doing so may degrade cluster performance and lead to account restrictions.


-  **Network Access Requirement:**
  - Make sure you connect to the UM network (on campus) or 
  - via `VPN <https://www.it.miami.edu/a-z-listing/virtual-private-network/index.html>`__).


- **Project Membership Requirements:**  
  To use IDSC clusters, you must be associated with a valid project:

  - **Triton Users:**  
    You need to be a member of a `Triton project 
    <https://idsc.miami.edu/project-request>`__ with a resource type of  
    ``triton_faculty``, ``triton_student``, or ``triton_education``.

  - **Pegasus Users:**  
    You need to be a member of a `Pegasus project <https://redcap.miami.edu/surveys/?s=F8MK9NMW9N>`__ with the resource type ``pegasus_project``.

- **Per-Project Access Model:**  
  Access to IDSC resources is managed on a **per-project basis**, facilitating team collaboration and secure data sharing across the University.  
  More details are available on the :ref:`g-projects`

- **Do Not Run Jobs on Login Nodes:**  
  Always use the  
  :ref:`g-scripts` or :ref:`g-queues` to submit jobs.  
  Running intensive tasks on login nodes can disrupt other users and may result in account suspension.
