Pytorch-Cuda
========================

This guide shows you how to install CUDA-enabled PyTorch on the Pegasus cluster.
We'll set everything up inside your own personal mamba environment, so you can install the packages 
you need for your project without affecting system-wide software.

**1. Load mambaforge software module**

::
   
    [nra20@pegasus ~]$ module load mambaforge/1.5.8 
    [nra20@pegasus ~]$ source /share/apps/mambaforge/install/etc/profile.d/conda.sh
    [nra20@pegasus ~]$ source /share/apps/mambaforge/install/etc/profile.d/mamba.sh

**2. Create your environment with python 3.10 base**


::
   
    (base) [nra20@pegasus ~]$ mamba create -n mytorchenv numpy scipy matplotlib python=3.10

**3. Activate your new mamba environment**

::
   
    (base) [nra20@pegasus ~]$ mamba activate mytochenv

**4. Pip install torch 2.7.0 with cuda 12.6 to match our system cuda**

::
   
    (mytochenv) [nra20@pegasus ~]$ pip install torch==2.7.0 torchvision torchaudio --index-url https://download.pytorch.org/whl/cu126

**5. Test installation through an interactive job**

::

    (mytorchenv) [nra20@pegasus ~]$ bsub -Is -q gpu_h100 -gpu "num=1" -P <your_projectID> bash
    Job is submitted to <your_projectID> project.
    Job <501631> is submitted to queue <gpu_h100>.
    <<Waiting for dispatch ...>>
    <<Starting on gpu2>>
    (mytorchenv) [nra20@gpu2 ~]$ python -c "import torch; print(torch.__version__); print(torch.cuda.is_available())"
    2.7.0+cu126
    True



Installing additional packages into your environment 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you still require additional packages in your environment, they can be installed with a combination of the commands **mamba install** or **pip install**. Be warned that mixing the two may lead to dependency conflicts.

A list of packages can be searched for at https://anaconda.org/

The below example shows pandas installation using the mamba install command and conda-forge channel. 


::

   (mytorchenv) [nra20@pegasus ~]$ mamba install -c conda-forge pandas
   



Running LSF Jobs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When running LSF jobs with your pytorch mamba environment, please make sure you load the mambaforge software module and activate
your environment within the LSF job script. 

Make sure you submit your job to either the gpu_titan or gpu_h100 queues to access gpus. 

Please see an example below:


Example script for a GPU Job
-------------------------------

``torch_test.job``

--------------

.. code:: bash

    #!/bin/bash
    #BSUB -J myGPUjob         # Job Name
    #BSUB -P myproject        # Project ID
    #BSUB -o %J.out           # Standard out
    #BSUB -e %J.err           # Standard err
    #BSUB -W 1:00             # Wall Time
    #BSUB -q gpu_titan        # gpu queue. Can use gpu_titan or gpu_h100
    #BSUB -gpu "num=1"        # number of gpus to reserve. Can reserve up to 2. 
    #BSUB -n 1
    #BSUB -R "rusage[mem=1280]"
    #BSUB -B
    #BSUB -N
    #BSUB -u myemail@miami.edu
    
    
    module purge
    module load mambaforge/1.5.8
    source /share/apps/mambaforge/install/etc/profile.d/conda.sh
    source /share/apps/mambaforge/install/etc/profile.d/mamba.sh
    mamba activate mytorchenv
    python -c "import torch; print(torch.__version__); print(torch.cuda.is_available())"


Sample output in this case will show cuda is detectable.

::

    [nra20@pegasus gpu_test]$ cat 501973.out
    2.7.0+cu126
    True


