.. warning:: 
   Please make sure to save your work frequently in case a shutdown happens.
   
JupyterHub on Triton User Menu
==============================

Triton Jupyterhub Introduction
------------

`JupyterHub <https://jupyterhub.readthedocs.io/en/stable/index.html>`__
provides Jupyter Notebook for multiple users.

Through JupyterHub on Triton, you can request and start a Jupyter
Notebook server on one of Triton's compute nodes (using
`LSF job scheduler <https://acs-docs.readthedocs.io/triton/3-jobs/1-lsf.html>`__ 
behind the scenes). In this way, you can interactively test
your Python or R programs through the Notebook with the supercomputer
resources.

Currently all requested Notebook servers are running in only two compute
nodes. It is recommended to use the Notebook as a testing tool and submit formal jobs via LSF.

Using JupyterHub on Triton
--------------------------

Triton Jupyterhub Login
~~~~~

-  First you need to have access to Triton. Please check the `IDSC ACS Policies <https://acs-docs.readthedocs.io/policies/policies.html#policies>`__
-  Connect with the UM network on campus or via
   `VPN <https://www.it.miami.edu/a-z-listing/virtual-private-network/index.html>`__.
-  Open the Login page https://t2.idsc.miami.edu:8000/hub/login on your
   browser.
-  Log in using your IDSC Account & Password.

Starting your Triton Jupyter Notebook server 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Press the ``Start My Notebook Server`` button to launch the resource
   request page.
-  Choose the memory, number of CPU cores, time you want to run the
   Notebook server and whether or not you want to use a GPU.
-  Press the ``Request`` button to request and start a Notebook server.

Triton Jupyterhub Logout
~~~~~~

When using the JupyterHub, you need to be clear that there are three things you need to turn off:

1. Close Notebook File - After saving, press ``File`` in the menu bar and choose ``Close and Halt``.
2. Stop Notebook Server - Click the ``Control Panel`` button at the top-right corner and press ``Stop My Notebook Server``.
3. Logout from JupyterHub - Click the ``Logout from JupyterHub`` button at the top-right corner.
   
.. warning::
   If you only logout from JupyterHub without stopping the Notebook Server first, 
   the Notebook Server will run until the time you set up when starting it. This could result in unintended increased SU usage. 
   
Using Triton Jupyter Notebook
----------------------

After the notebook server starts, you will see the interface page
showing your home directory.

You can create notebook files, text files and folders, or open terminals
using the ``New`` button at the top-right corner under the menu bar.

Details can be found at the official `Jupyter Notebook User
Documentation <https://jupyter-notebook.readthedocs.io/en/stable/notebook.html>`__.


Triton Global Python Jupyter Kernel
~~~~~~~~~~~~~~~~~~~~~~~~~~~
There is a global python kernel available to all users with many python data science and deep learning packages. 

**(rocketce-1.10-py3.11-cuda11.8)**

List of packages within this kernel:

::

   Package                       Version
   ----------------------------- ----------------
   absl-py                       1.0.0
   accelerate                    0.26.1
   aiobotocore                   2.3.4
   aiohttp                       3.9.1
   aiohttp-cors                  0.7.0
   aioitertools                  0.11.0
   aiorwlock                     1.3.0
   aiosignal                     1.3.1
   alabaster                     0.7.16
   annotated-types               0.6.0
   anyio                         4.2.0
   argon2-cffi                   23.1.0
   argon2-cffi-bindings          21.2.0
   array-record                  0.2.0
   arrow                         1.3.0
   asgiref                       3.7.2
   asttokens                     2.4.1
   astunparse                    1.6.3
   async-lru                     2.0.4
   attrs                         21.4.0
   av                            10.0.0
   Babel                         2.14.0
   bcrypt                        4.1.2
   beautifulsoup4                4.12.3
   binaryornot                   0.4.4
   bleach                        6.1.0
   blessed                       1.19.1
   blinker                       1.7.0
   blis                          0.7.10
   bokeh                         3.3.3
   boost-histogram               1.4.0
   boto3                         1.21.21
   botocore                      1.24.21
   Brotli                        1.0.9
   cached-property               1.5.2
   cachetools                    5.3.2
   catalogue                     2.0.10
   certifi                       2023.11.17
   cffi                          1.15.1
   chardet                       5.2.0
   charset-normalizer            3.3.2
   click                         8.1.7
   cloudpathlib                  0.16.0
   cloudpickle                   2.2.1
   colorama                      0.4.6
   colorful                      0.5.4
   comm                          0.2.1
   conda-pack                    0.7.1
   confection                    0.1.4
   contourpy                     1.2.0
   cookiecutter                  2.5.0
   coverage                      7.4.0
   cryptography                  41.0.4
   cycler                        0.12.1
   cymem                         2.0.8
   cytoolz                       0.12.2
   dask                          2024.1.0
   dask-cloudprovider            2022.10.0
   dask-ctl                      2022.5.0
   dask-distance                 0.2.0
   dask-drmaa                    0.2.1
   dask-ec2                      0.5.0
   dask-funk                     0.9.1
   dask-gateway                  2024.1.0
   dask-geopandas                0.3.1
   dask-glm                      0.3.2
   dask-groupby                  0.1.2
   dask-histogram                2023.10.0
   dask-image                    2023.8.1
   dask-imread                   0.1.1
   dask-jobqueue                 0.8.2
   dask-kubernetes               2022.1.0
   dask_labextension             7.0.0
   dask_memusage                 1.1
   dask-ml                       2023.3.24
   dask-mongo                    2022.5.0
   dask-mpi                      2022.4.0
   dask-ndfilters                0.1.3
   dask-ndmorph                  0.1.1
   dask-searchcv                 0.2.0
   dask-sphinx-theme             3.0.5
   dask-tensorflow               0.0.2
   dask-xgboost                  0.1.11
   datasets                      2.14.4
   debugpy                       1.8.0
   decorator                     5.1.1
   deepspeed                     0.10.0+f5c834a6e
   defusedxml                    0.7.1
   dill                          0.3.6
   distlib                       0.3.8
   distributed                   2024.1.0
   dm-tree                       0.1.8
   dnspython                     2.5.0
   docutils                      0.15.2
   drmaa                         0.7.9
   emoji                         2.10.0
   entrypoints                   0.4
   etils                         1.0.0
   evaluate                      0.4.1
   exceptiongroup                1.2.0
   executing                     2.0.1
   Farama-Notifications          0.0.4
   fastapi                       0.92.0
   fastjsonschema                2.19.1
   feather-format                0.4.1
   filelock                      3.13.1
   fire                          0.4.0
   flatbuffers                   23.1.21
   fonttools                     4.47.2
   fqdn                          1.5.1
   frozenlist                    1.4.1
   fsspec                        2023.12.2
   future                        0.18.3
   gast                          0.4.0
   geopandas                     0.14.2
   gmpy2                         2.1.2
   google-api-core               2.15.0
   google-auth                   2.26.2
   google-auth-oauthlib          1.0.0
   google-pasta                  0.2.0
   googleapis-common-protos      1.62.0
   googledrivedownloader         0.4
   gpustat                       1.1.1
   grpcio                        1.54.3
   gymnasium                     0.28.1
   h11                           0.14.0
   h2                            4.1.0
   h5py                          3.7.0
   hjson                         3.1.0
   horovod                       0.28.0
   hpack                         4.0.0
   html5lib                      1.1
   httpcore                      1.0.2
   huggingface_hub               0.20.2
   hyperframe                    6.0.1
   idna                          3.6
   imagecodecs                   2023.1.23
   imageio                       2.33.1
   imagesize                     1.4.1
   importlib-metadata            7.0.1
   importlib-resources           5.13.0
   iniconfig                     2.0.0
   ipykernel                     6.29.0
   ipython                       8.20.0
   isodate                       0.6.1
   isoduration                   20.11.0
   jax-jumpy                     1.0.0
   jaxtyping                     0.2.25
   jedi                          0.19.1
   Jinja2                        3.1.3
   jmespath                      1.0.1
   joblib                        1.3.2
   json5                         0.9.14
   jsonpointer                   2.4
   jsonschema                    4.17.3
   jupyter_client                8.6.0
   jupyter_core                  5.7.1
   jupyter-events                0.6.3
   jupyter-lsp                   2.2.2
   jupyter_server                2.10.0
   jupyter_server_proxy          4.1.0
   jupyter_server_terminals      0.5.2
   jupyterlab                    4.0.11
   jupyterlab_pygments           0.3.0
   jupyterlab_server             2.24.0
   keras                         2.13.1
   keras-core                    0.1.7
   Keras-Preprocessing           1.1.2
   keras-tuner                   1.4.6
   keras2onnx                    1.7.0
   kiwisolver                    1.4.5
   kt-legacy                     1.0.5
   kubernetes                    27.2.0
   kubernetes_asyncio            29.0.0
   langcodes                     3.3.0
   lazy_loader                   0.3
   lightning-bolts               0.7.0
   lightning-utilities           0.8.0
   llvmlite                      0.41.1
   locket                        1.0.0
   lz4                           4.3.3
   Markdown                      3.5.2
   markdown-it-py                3.0.0
   MarkupSafe                    2.1.4
   matplotlib                    3.8.2
   matplotlib-inline             0.1.6
   mdurl                         0.1.2
   mistune                       3.0.2
   mpi4py                        3.1.4
   mpmath                        1.3.0
   msgpack                       1.0.7
   multidict                     6.0.4
   multipledispatch              0.6.0
   multiprocess                  0.70.15
   munkres                       1.1.4
   murmurhash                    1.0.10
   namex                         0.0.7
   nbclient                      0.8.0
   nbconvert                     7.14.2
   nbformat                      5.9.2
   nest_asyncio                  1.6.0
   networkx                      2.8.8
   nltk                          3.8.1
   notebook_shim                 0.2.3
   numba                         0.58.1
   numpy                         1.24.3
   numpy-groupies                0.10.2
   nvidia-dali-cuda110           1.28.0
   nvidia-dali-tf-plugin-cuda110 1.28.0
   nvidia-ml-py                  12.535.133
   oauthlib                      3.2.0
   onnx                          1.14.0
   onnxconverter-common          1.14.0
   onnxmltools                   1.12.0
   opencensus                    0.7.13
   opencensus-context            0.1.2
   opt-einsum                    3.3.0
   overrides                     7.6.0
   packaging                     23.2
   pandas                        2.2.0
   pandocfilters                 1.5.0
   paramiko                      3.4.0
   parso                         0.8.3
   partd                         1.4.1
   pathy                         0.10.1
   peft                          0.7.1
   pexpect                       4.8.0
   pickleshare                   0.7.5
   Pillow                        9.4.0
   PIMS                          0.6.1
   pip                           23.3.2
   pkgutil_resolve_name          1.3.10
   platformdirs                  3.11.0
   pluggy                        1.3.0
   pooch                         1.8.0
   preshed                       3.0.9
   prometheus-client             0.19.0
   promise                       2.3
   prompt-toolkit                3.0.42
   protobuf                      4.21.12
   psutil                        5.9.8
   ptyprocess                    0.7.0
   pure-eval                     0.2.2
   py-cpuinfo                    9.0.0
   pyarrow                       12.0.1
   pyarrow-hotfix                0.6
   pyasn1                        0.5.1
   pyasn1-modules                0.3.0
   pycparser                     2.21
   pydantic                      1.10.13
   pydantic_core                 2.14.6
   pydata-sphinx-theme           0.7.2
   Pygments                      2.17.2
   PyJWT                         2.8.0
   pymongo                       4.6.1
   PyNaCl                        1.5.0
   pyOpenSSL                     23.2.0
   pyparsing                     3.1.1
   pyproj                        3.6.1
   pyrsistent                    0.20.0
   PySocks                       1.7.1
   pytest                        7.4.4
   pytest-cov                    4.1.0
   python-dateutil               2.8.2
   python-json-logger            2.0.7
   python-louvain                0.16
   python-slugify                8.0.1
   pytorch-lightning             2.0.9
   pytz                          2023.3.post1
   pyu2f                         0.1.5
   PyWavelets                    1.4.1
   PyYAML                        6.0.1
   pyzmq                         25.1.2
   ray                           2.6.3
   rdflib                        6.1.1
   regex                         2023.12.25
   requests                      2.31.0
   requests-oauthlib             1.3.1
   responses                     0.18.0
   rfc3339-validator             0.1.4
   rfc3986-validator             0.1.1
   rich                          13.7.0
   rsa                           4.9
   s3fs                          0.6.0
   s3transfer                    0.5.2
   safetensors                   0.3.3
   scikit-image                  0.22.0
   scikit-learn                  1.2.2
   scipy                         1.11.1
   Send2Trash                    1.8.2
   sentence-transformers         2.2.2
   sentencepiece                 0.1.97
   setproctitle                  1.2.2
   setuptools                    63.4.2
   shapely                       2.0.2
   shellingham                   1.5.4
   simpervisor                   1.0.0
   six                           1.16.0
   skl2onnx                      1.14.1
   sklearn-pandas                2.1.0
   slicerator                    1.1.0
   smart-open                    6.4.0
   sniffio                       1.3.0
   snowballstemmer               2.2.0
   sortedcontainers              2.4.0
   soupsieve                     2.5
   spacy                         3.7.2
   spacy-legacy                  3.0.12
   spacy-loggers                 1.0.5
   sparse                        0.15.1
   Sphinx                        4.5.0
   sphinx-book-theme             0.2.0
   sphinxcontrib-applehelp       1.0.4
   sphinxcontrib-devhelp         1.0.2
   sphinxcontrib-htmlhelp        2.0.1
   sphinxcontrib-jsmath          1.0.1
   sphinxcontrib-qthelp          1.0.3
   sphinxcontrib-serializinghtml 1.1.5
   srsly                         2.4.8
   stack-data                    0.6.2
   stanza                        1.7.0
   starlette                     0.25.0
   sympy                         1.12
   tabulate                      0.8.10
   tblib                         3.0.0
   tensorboard                   2.13.0
   tensorboard-data-server       0.7.0
   tensorboardX                  2.6.2.2
   tensorflow                    2.13.0
   tensorflow-datasets           4.9.2
   tensorflow-estimator          2.13.0
   tensorflow-hub                0.14.0
   tensorflow-io                 0.33.0
   tensorflow-io-gcs-filesystem  0.33.0
   tensorflow-metadata           1.13.1
   tensorflow-probability        0.20.0
   tensorflow-text               2.13.0
   termcolor                     2.1.1
   terminado                     0.18.0
   text-unidecode                1.3
   tf-model-optimization-nightly 0.7.4.dev0
   tf2onnx                       1.15.0
   thinc                         8.2.2
   threadpoolctl                 3.2.0
   tifffile                      2023.8.12
   tinycss2                      1.2.1
   tokenizers                    0.15.0
   toml                          0.10.2
   tomli                         2.0.1
   toolz                         0.12.0
   torch                         2.0.1
   torch-geometric               2.3.0
   torch-scatter                 2.1.1
   torch-sparse                  0.6.17
   torchdata                     0.6.0+5bbcd77
   torchmetrics                  0.11.4
   torchtext                     0.15.2a0+db6accb
   torchvision                   0.15.2
   tornado                       6.3.3
   tqdm                          4.66.1
   traitlets                     5.14.1
   transformers                  4.37.0
   typeguard                     2.13.3
   typer                         0.9.0
   types-python-dateutil         2.8.19.20240106
   typing_extensions             4.9.0
   typing-utils                  0.1.0
   tzdata                        2023.4
   uri-template                  1.3.0
   urllib3                       1.26.18
   uvicorn                       0.16.0
   virtualenv                    20.21.0
   wasabi                        0.10.1
   wcwidth                       0.2.13
   weasel                        0.3.4
   webcolors                     1.13
   webencodings                  0.5.1
   websocket-client              1.7.0
   Werkzeug                      3.0.1
   wheel                         0.42.0
   wrapt                         1.14.1
   xarray                        2023.7.0
   xgboost                       1.7.6
   xxhash                        3.4.1
   xyzservices                   2023.10.1
   yacs                          0.1.8
   yarl                          1.9.4
   zict                          3.0.0
   zipp                          3.17.0

Creating Your Triton Jupyter Python Kernel
~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  $ ``ssh <caneid>@t2.idsc.miami.edu`` to login to Triton
-  $ ``ml miniforge3/24.3.0-0``
-  $ ``conda create -n <your environment> -c conda-forge python=<version> ipykernel <package1> <package2> ...`` 
-  $ ``conda activate <your environment>``
-  (your environment)$
   ``ipython kernel install --user --name <kernel name> --display-name "<the displayed name for the kernel>"``

Here is an example:

(Please press ``y`` on your keyboard when you see ``Proceed ([y]/n)?``)

**NOTE** It is highly recommended to install ipykernel during the environment creation step as to avoid dependency conflicts. 
::

    $ ml miniforge3/24.3.0-0
    $ conda create -n my_py -c conda-forge python ipykernel
    $ conda activate my_py
    (my_py)$ ipython kernel install --user --name my_py_kernel --display-name "My Python kernel"

Later on, you can still install new packages to the kernel using ``conda install <package>`` after activating the environment.

.. note::
   If the package could not be found, you can search `Anaconda
   Cloud <https://anaconda.org/>`__ and **choose Platform** ``linux-ppc64le``
   
   If Anaconda Cloud does not have the package neither, you could try ``pip install``

.. warning:: 
   Issues may arise when using pip and conda together.
   Only after conda has been used to install as many packages
   as possible should pip be used to install any remaining software. If
   modifications are needed to the environment, it is best to create a new
   environment rather than running conda after pip.

After a package is installed, you can use it in your notebook by running ``import <package name>`` in a cell.


Creating Your Triton Jupyter R Kernel
~~~~~~~~~~~~~~~~~~~~~~~~~~~
::

    $ ml miniforge3/24.3.0-0
    $ conda create -n myRenv -c conda-forge r-base r-irkernel
    $ conda activate myRenv 
    $ conda install -c conda-forge jupyter_client
    $ R
    > IRkernel::installspec(name='my_r_kernel', displayname='My R Kernel')


Removing Personal Kernels from Triton Jupyterhub
~~~~~~~~~~~~~~~~~~~~~~~~~~~
You can view a list of all your kernels at the following path:

``/home/<your_caneid>/.local/share/jupyter/kernels``

From this directory you can delete kernels using Linux **rm kernel_name** command. 


Switching to JupyterLab on Triton
-----------------------

After the Jupyter Notebook server starts, you can switch to JupyterLab by changing the url from ``.../tree`` to ``.../lab``. If you want to stop the server from JupyterLab, choose ``File`` >> ``Hub Control Panel`` in the menu bar, then press ``Stop My Notebook Server`` button in the panel.
