Pytorch-Cuda
========================

This guide shows you how to install CUDA-enabled PyTorch on the Pegasus cluster.
We'll set everything up inside your own personal mamba environment, so you can install the packages 
you need for your project without affecting system-wide software.

**1. Load mambaforge software module**

::
   
    [nra20@pegasus ~]$ module load mambaforge

**2. Create your environment with python 3.10 base**


::
   
    [nra20@pegasus ~]$ mamba create -n mytorchenv numpy scipy matplotlib python=3.10

**3. Activate your new mamba environment**

::
   
    [nra20@pegasus ~]$ mamba activate mytochenv

**4. Pip install toch cuda 12.1 version**

::
   
    (mytochenv) [nra20@pegasus ~]$ pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

**5. Test installation through an interactive job**

::

    (mytorchenv) [nra20@pegasus ~]$ bsub -Is -q gpu_h100 -gpu "num=1" -P <your_projectID> bash
    Job is submitted to <your_projectID> project.
    Job <501631> is submitted to queue <gpu_h100>.
    <<Waiting for dispatch ...>>
    <<Starting on gpu2>>
    (mytorchenv) [nra20@gpu2 ~]$ python -c "import torch; print(torch.__version__); print(torch.cuda.is_available())"
    2.5.1+cu121
    True




