.. warning:: 
   Please make sure to save your work frequently in case a shutdown happens.
   
JupyterHub on Pegasus User Menu
===============================

Introduction
------------

`JupyterHub <https://jupyterhub.readthedocs.io/en/stable/index.html>`__
provides Jupyter Notebook for multiple users.

Through JupyterHub on Pegasus, you can request and start a Jupyter
Notebook server on one of Pegasus's compute nodes. In this way, you can interactively test
your Python or R programs through the Notebook with the supercomputer
resources.

Currently all requested Notebook servers are running in only two compute
nodes. It is recommended to use the Notebook as a testing tool and submit formal jobs via LSF.

Using JupyterHub on Pegasus
---------------------------

Login
~~~~~

-  First you need to have access to Pegasus. Please check the `IDSC ACS Policies <https://acs-docs.readthedocs.io/policies/policies.html#policies>`__
-  Connect with the UM network on campus or via
   `VPN <https://www.it.miami.edu/a-z-listing/virtual-private-network/index.html>`__.
-  Open the Login page https://pegasusdev.ccs.miami.edu:8000 on your
   browser.
-  Log in using your UM CaneID and Pegasus password.

Starting your Jupyter Notebook server
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Press the ``Start My Notebook Server`` button to launch the resource
   request page.
-  Choose the memory, number of CPU cores, time you want to run the
   Notebook server and your associated project.
-  (Optional) Choose a GPU queue only if you wish to utilize the node's GPU. By default, 1 GPU is allocated per session. 
-  Press the ``Request`` button to request and start a Notebook server. This will take roughly 15 seconds. 

Switching between JupyterLab & JupyterHub
-----------------------

After the Jupyter Notebook server starts, you can switch to JupyterLab by changing the url from ``.../tree`` to ``.../lab``. If you want to stop the server from JupyterLab, choose ``File`` >> ``Hub Control Panel`` in the menu bar, then press ``Stop My Notebook Server`` button in the panel.

Logout
~~~~~~

When using the JupyterHub, you need to be clear that there are three things you need to turn off:

1. Close Notebook File - After saving, press ``File`` in the menu bar and choose ``Close and Halt``.
2. Stop Notebook Server - Click the ``Control Panel`` button at the top-right corner and press ``Stop My Notebook Server``.
3. Logout from JupyterHub - Click the ``Logout from JupyterHub`` button at the top-right corner.
   
.. warning::
   If you only logout from JupyterHub without stopping the Notebook Server first, 
   the Notebook Server will run until the time you set up when starting it. This could result in unintended increased SU usage. 
   
Using Jupyter Notebook
----------------------

After the notebook server starts, you will see the interface page
showing your home directory.

You can create notebook files, text files and folders, or open terminals
using the ``New`` button at the top-right corner under the menu bar.

Details can be found at the official `Jupyter Notebook User
Documentation <https://jupyter-notebook.readthedocs.io/en/stable/notebook.html>`__.

Global Deep-Learning Python Kernel
~~~~~~~~~~~~~~~~~~~~~~~~~~~
Pytorch2.0.1-cuda (open-ce)

::

      # packages in environment at /share/apps/jupyterhub/recent/global_env:
      #
      # Name                    Version                   Build  Channel
      _libgcc_mutex             0.1                 conda_forge    conda-forge
      _openmp_mutex             4.5                       2_gnu    conda-forge
      _pytorch_select           2.0                      cuda_2    https://ftp.osuosl.org/pub/open-ce/1.9.3
      _tensorflow_select        2.0                      cuda_2    https://ftp.osuosl.org/pub/open-ce/1.9.3
      absl-py                   1.0.0            py39h1d4ebfa_0    https://ftp.osuosl.org/pub/open-ce/1.9.3
      aiohappyeyeballs          2.5.0              pyhd8ed1ab_0    conda-forge
      aiohttp                   3.11.13          py39h9399b63_0    conda-forge
      aiosignal                 1.3.2              pyhd8ed1ab_0    conda-forge
      asttokens                 3.0.0              pyhd8ed1ab_1    conda-forge
      astunparse                1.6.3              pyhd8ed1ab_3    conda-forge
      async-timeout             5.0.1              pyhd8ed1ab_1    conda-forge
      attrs                     25.1.0             pyh71513ae_0    conda-forge
      av                        10.0.0           py39h2df6d49_2    https://ftp.osuosl.org/pub/open-ce/1.9.3
      blas                      1.0                    openblas    https://ftp.osuosl.org/pub/open-ce/1.9.3
      blinker                   1.9.0              pyhff2d567_0    conda-forge
      brotli-python             1.1.0            py39hf88036b_2    conda-forge
      bzip2                     1.0.8                h4bc722e_7    conda-forge
      c-ares                    1.34.4               hb9d3cd8_0    conda-forge
      ca-certificates           2025.1.31            hbd8a1cb_1    conda-forge
      cached-property           1.5.2                hd8ed1ab_1    conda-forge
      cached_property           1.5.2              pyha770c72_1    conda-forge
      cachetools                5.5.2              pyhd8ed1ab_0    conda-forge
      certifi                   2025.1.31          pyhd8ed1ab_0    conda-forge
      cffi                      1.15.1           py39h7a31438_5    conda-forge
      charset-normalizer        3.4.1              pyhd8ed1ab_0    conda-forge
      click                     8.1.8              pyh707e725_0    conda-forge
      colorama                  0.4.6              pyhd8ed1ab_1    conda-forge
      comm                      0.2.2              pyhd8ed1ab_1    conda-forge
      cryptography              44.0.2           py39h7170ec2_0    conda-forge
      cudatoolkit               11.8.0               ha6a4a67_2    https://ftp.osuosl.org/pub/open-ce/1.9.3
      cudnn                     8.8.1_11.8           h1b8caa4_2    https://ftp.osuosl.org/pub/open-ce/1.9.3
      dataclasses               0.8                pyhc8e2a94_3    conda-forge
      debugpy                   1.8.13           py39hf88036b_0    conda-forge
      decorator                 5.2.1              pyhd8ed1ab_0    conda-forge
      exceptiongroup            1.2.2              pyhd8ed1ab_1    conda-forge
      executing                 2.1.0              pyhd8ed1ab_1    conda-forge
      ffmpeg                    4.2.2                  opence_0    https://ftp.osuosl.org/pub/open-ce/1.9.3
      filelock                  3.17.0             pyhd8ed1ab_0    conda-forge
      flatbuffers               2.0.8                hcb278e6_1    conda-forge
      freetype                  2.12.1               h267a509_2    conda-forge
      frozenlist                1.5.0            py39h9399b63_1    conda-forge
      fsspec                    2025.3.2           pyhd8ed1ab_0    conda-forge
      gast                      0.4.0              pyh9f0ad1d_0    conda-forge
      gmp                       6.3.0                hac33072_2    conda-forge
      gmpy2                     2.1.5            py39h7196dd7_3    conda-forge
      google-auth               2.38.0             pyhd8ed1ab_0    conda-forge
      google-auth-oauthlib      0.5.3              pyhd8ed1ab_0    conda-forge
      google-pasta              0.2.0              pyhd8ed1ab_2    conda-forge
      grpc-cpp                  1.41.0          h8dd7e0c_pb4.21.12_6    https://ftp.osuosl.org/pub/open-ce/1.9.3
      grpcio                    1.53.0           py39h7bdb9a1_0    https://ftp.osuosl.org/pub/open-ce/1.9.3
      h2                        4.2.0              pyhd8ed1ab_0    conda-forge
      h5py                      3.7.0           nompi_py39h817c9c5_102    conda-forge
      hdf5                      1.12.2          nompi_h4df4325_101    conda-forge
      hpack                     4.1.0              pyhd8ed1ab_0    conda-forge
      huggingface_hub           0.30.2             pyhd8ed1ab_0    conda-forge
      hyperframe                6.1.0              pyhd8ed1ab_0    conda-forge
      idna                      3.10               pyhd8ed1ab_1    conda-forge
      importlib-metadata        8.6.1              pyha770c72_0    conda-forge
      importlib_metadata        8.6.1                hd8ed1ab_0    conda-forge
      ipykernel                 6.29.5             pyh3099207_0    conda-forge
      ipython                   8.18.1             pyh707e725_3    conda-forge
      jax                       0.4.7           cuda11.8_py39_2    https://ftp.osuosl.org/pub/open-ce/1.9.3
      jaxlib                    0.4.7           cuda11.8_py39_pb4.21.12_4    https://ftp.osuosl.org/pub/open-ce/1.9.3
      jedi                      0.19.2             pyhd8ed1ab_1    conda-forge
      jinja2                    3.1.6              pyhd8ed1ab_0    conda-forge
      joblib                    1.4.2              pyhd8ed1ab_1    conda-forge
      jpeg                      9e                   h0b41bf4_3    conda-forge
      jupyter_client            8.6.3              pyhd8ed1ab_1    conda-forge
      jupyter_core              5.7.2              pyh31011fe_1    conda-forge
      keras                     2.12.0           py39h213ae99_3    https://ftp.osuosl.org/pub/open-ce/1.9.3
      keras-preprocessing       1.1.2              pyhd8ed1ab_1    conda-forge
      keyutils                  1.6.1                h166bdaf_0    conda-forge
      krb5                      1.21.3               h659f571_0    conda-forge
      lame                      3.100             h166bdaf_1003    conda-forge
      lcms2                     2.15                 hfd0df8a_0    conda-forge
      ld_impl_linux-64          2.43                 h712a8e2_4    conda-forge
      lerc                      4.0.0                h27087fc_0    conda-forge
      leveldb                   1.23                 h9ae9fd2_2    conda-forge
      libabseil                 20230125.0      cxx17_h6871fb8_1    https://ftp.osuosl.org/pub/open-ce/1.9.3
      libaec                    1.1.3                h59595ed_0    conda-forge
      libblas                   3.9.0           17_linux64_openblas    conda-forge
      libcblas                  3.9.0           17_linux64_openblas    conda-forge
      libclang                  14.0.6          default_h7634d5b_1    conda-forge
      libclang13                14.0.6          default_h9986a30_1    conda-forge
      libcurl                   8.8.0                hca28451_1    conda-forge
      libdeflate                1.17                 h0b41bf4_0    conda-forge
      libedit                   3.1.20250104    pl5321h7949ede_0    conda-forge
      libev                     4.33                 hd590300_2    conda-forge
      libffi                    3.4.6                h2dba641_0    conda-forge
      libgcc                    14.2.0               h767d61c_2    conda-forge
      libgcc-ng                 14.2.0               h69a702a_2    conda-forge
      libgfortran               14.2.0               h69a702a_2    conda-forge
      libgfortran-ng            14.2.0               h69a702a_2    conda-forge
      libgfortran5              14.2.0               hf1ad2bd_2    conda-forge
      libgomp                   14.2.0               h767d61c_2    conda-forge
      liblapack                 3.9.0           17_linux64_openblas    conda-forge
      libllvm14                 14.0.6               hcd5def8_4    conda-forge
      liblzma                   5.6.4                hb9d3cd8_0    conda-forge
      liblzma-devel             5.6.4                hb9d3cd8_0    conda-forge
      libnghttp2                1.58.0               h47da74e_1    conda-forge
      libnsl                    2.0.1                hd590300_0    conda-forge
      libopenblas               0.3.23               h639084d_2    https://ftp.osuosl.org/pub/open-ce/1.9.3
      libopus                   1.3.1                h7f98852_1    conda-forge
      libpng                    1.6.43               h2797004_0    conda-forge
      libprotobuf               3.21.12              h6d6a479_0    https://ftp.osuosl.org/pub/open-ce/1.9.3
      libsodium                 1.0.20               h4ab18f5_0    conda-forge
      libsqlite                 3.46.0               hde9e2c9_0    conda-forge
      libssh2                   1.11.0               h0841786_0    conda-forge
      libstdcxx                 14.2.0               h8f9b012_2    conda-forge
      libstdcxx-ng              14.2.0               h4852527_2    conda-forge
      libtiff                   4.5.0                h6adf6a1_2    conda-forge
      libuuid                   2.38.1               h0b41bf4_0    conda-forge
      libvpx                    1.13.1               h59595ed_0    conda-forge
      libwebp-base              1.5.0                h851e524_0    conda-forge
      libxcb                    1.13              h7f98852_1004    conda-forge
      libxcrypt                 4.4.36               hd590300_1    conda-forge
      libzlib                   1.2.13               h4ab18f5_6    conda-forge
      llvm-openmp               14.0.6               he6537cd_0    https://ftp.osuosl.org/pub/open-ce/1.9.3
      lmdb                      0.9.31               hd590300_1    conda-forge
      markdown                  3.3.7              pyhd8ed1ab_0    conda-forge
      markupsafe                3.0.2            py39h9399b63_1    conda-forge
      matplotlib-inline         0.1.7              pyhd8ed1ab_1    conda-forge
      ml_dtypes                 0.1.0            py39he45b6fd_0    https://ftp.osuosl.org/pub/open-ce/1.9.3
      mpc                       1.3.1                h24ddda3_1    conda-forge
      mpfr                      4.2.1                h90cbb55_3    conda-forge
      mpmath                    1.3.0              pyhd8ed1ab_1    conda-forge
      multidict                 6.1.0            py39h9399b63_2    conda-forge
      nccl                      2.17.1               cuda11.8_2    https://ftp.osuosl.org/pub/open-ce/1.9.3
      ncurses                   6.5                  h2d0b736_3    conda-forge
      nest-asyncio              1.6.0              pyhd8ed1ab_1    conda-forge
      networkx                  2.8.8              pyhd8ed1ab_0    conda-forge
      numactl                   2.0.16               h6515646_1    https://ftp.osuosl.org/pub/open-ce/1.9.3
      numpy                     1.23.5           py39h3d75532_0    conda-forge
      oauthlib                  3.2.2              pyhd8ed1ab_1    conda-forge
      openjpeg                  2.5.0                hfec8fc6_2    conda-forge
      openssl                   3.5.0                h7b32b05_0    conda-forge
      opt_einsum                3.3.0              pyhc1e730c_2    conda-forge
      packaging                 24.2               pyhd8ed1ab_2    conda-forge
      pandas                    2.2.3            py39h3b40f6f_1    conda-forge
      parso                     0.8.4              pyhd8ed1ab_1    conda-forge
      pexpect                   4.9.0              pyhd8ed1ab_1    conda-forge
      pickleshare               0.7.5           pyhd8ed1ab_1004    conda-forge
      pillow                    9.4.0            py39h2320bf1_1    conda-forge
      pip                       25.0.1             pyh8b19718_0    conda-forge
      platformdirs              4.3.6              pyhd8ed1ab_1    conda-forge
      pooch                     1.8.2              pyhd8ed1ab_1    conda-forge
      prompt-toolkit            3.0.50             pyha770c72_0    conda-forge
      propcache                 0.2.1            py39h9399b63_1    conda-forge
      protobuf                  4.21.12          py39h913e608_1    https://ftp.osuosl.org/pub/open-ce/1.9.3
      psutil                    7.0.0            py39h8cd3c5a_0    conda-forge
      pthread-stubs             0.4               hb9d3cd8_1002    conda-forge
      ptyprocess                0.7.0              pyhd8ed1ab_1    conda-forge
      pure_eval                 0.2.3              pyhd8ed1ab_1    conda-forge
      pyasn1                    0.6.1              pyhd8ed1ab_2    conda-forge
      pyasn1-modules            0.4.1              pyhd8ed1ab_1    conda-forge
      pycparser                 2.22               pyh29332c3_1    conda-forge
      pygments                  2.19.1             pyhd8ed1ab_0    conda-forge
      pyjwt                     2.10.1             pyhd8ed1ab_0    conda-forge
      pyopenssl                 25.0.0             pyhd8ed1ab_0    conda-forge
      pysocks                   1.7.1              pyha55dd90_7    conda-forge
      python                    3.9.19          h0755675_0_cpython    conda-forge
      python-clang              14.0.6          default_hccd1708_1    conda-forge
      python-dateutil           2.9.0.post0        pyhff2d567_1    conda-forge
      python-flatbuffers        2.0                pyhd8ed1ab_0    conda-forge
      python-tzdata             2025.1             pyhd8ed1ab_0    conda-forge
      python_abi                3.9                      5_cp39    conda-forge
      pytorch                   2.0.1           cuda11.8_py39_1    https://ftp.osuosl.org/pub/open-ce/1.9.3
      pytorch-base              2.0.1           cuda11.8_py39_pb4.21.12_1    https://ftp.osuosl.org/pub/open-ce/1.9.3
      pytz                      2024.1             pyhd8ed1ab_0    conda-forge
      pyu2f                     0.1.5              pyhd8ed1ab_1    conda-forge
      pyyaml                    6.0.2            py39h9399b63_2    conda-forge
      pyzmq                     26.2.1           py39h4e4fb57_0    conda-forge
      re2                       2023.03.02           h8c504da_0    conda-forge
      readline                  8.2                  h8c095d6_2    conda-forge
      regex                     2024.11.6        py39h8cd3c5a_0    conda-forge
      requests                  2.31.0             pyhd8ed1ab_0    conda-forge
      requests-oauthlib         2.0.0              pyhd8ed1ab_1    conda-forge
      rsa                       4.9                pyhd8ed1ab_1    conda-forge
      sacremoses                0.0.53             pyhd8ed1ab_0    conda-forge
      scikit-learn              1.6.1            py39h4b7350c_0    conda-forge
      scipy                     1.10.1           py39h6183b62_3    conda-forge
      sentencepiece             0.1.97          ha1f17c0_py39_pb4.21.12_2    https://ftp.osuosl.org/pub/open-ce/1.9.3
      setuptools                65.6.3             pyhd8ed1ab_0    conda-forge
      six                       1.16.0             pyhd8ed1ab_1    conda-forge
      snappy                    1.2.1                h8bd8927_1    conda-forge
      sqlite                    3.46.0               h6d4b2fc_0    conda-forge
      stack_data                0.6.3              pyhd8ed1ab_1    conda-forge
      sympy                     1.13.3          pypyh2585a3b_103    conda-forge
      tabulate                  0.8.10             pyhd8ed1ab_0    conda-forge
      tensorboard               2.12.2          pyh9ef2c89_pb4.21.12_1    https://ftp.osuosl.org/pub/open-ce/1.9.3
      tensorboard-data-server   0.7.0              pyhe15f6da_1    https://ftp.osuosl.org/pub/open-ce/1.9.3
      tensorboard-plugin-wit    1.6.0              pyh9f0ad1d_0    conda-forge
      tensorflow                2.12.0          cuda11.8_py39_1    https://ftp.osuosl.org/pub/open-ce/1.9.3
      tensorflow-base           2.12.0          cuda11.8_py39_pb4.21.12_4    https://ftp.osuosl.org/pub/open-ce/1.9.3
      tensorflow-estimator      2.12.0             pyh30d0574_1    https://ftp.osuosl.org/pub/open-ce/1.9.3
      tensorflow-io-gcs-filesystem 0.32.0                   pypi_0    pypi
      termcolor                 1.1.0              pyhd8ed1ab_3    conda-forge
      threadpoolctl             3.5.0              pyhc1e730c_0    conda-forge
      tk                        8.6.13          noxft_h4845f30_101    conda-forge
      tokenizers                0.12.1           py39h4d2953e_1    conda-forge
      torchdata                 0.6.0                    py39_2    https://ftp.osuosl.org/pub/open-ce/1.9.3
      torchtext-base            0.15.2          cuda11.8_py39_1    https://ftp.osuosl.org/pub/open-ce/1.9.3
      torchvision-base          0.15.2          cuda11.8_py39_1    https://ftp.osuosl.org/pub/open-ce/1.9.3
      tornado                   6.4.2            py39h8cd3c5a_0    conda-forge
      tqdm                      4.67.1             pyhd8ed1ab_1    conda-forge
      traitlets                 5.14.3             pyhd8ed1ab_1    conda-forge
      transformers              4.19.4             pyhd8ed1ab_0    conda-forge
      typing-extensions         4.12.2               hd8ed1ab_1    conda-forge
      typing_extensions         4.12.2             pyha770c72_1    conda-forge
      tzdata                    2025a                h78e105d_0    conda-forge
      urllib3                   2.3.0              pyhd8ed1ab_0    conda-forge
      wcwidth                   0.2.13             pyhd8ed1ab_1    conda-forge
      werkzeug                  2.3.8              pyhd8ed1ab_0    conda-forge
      wheel                     0.45.1             pyhd8ed1ab_1    conda-forge
      wrapt                     1.14.1           py39hb9d737c_1    conda-forge
      xorg-libxau               1.0.12               hb9d3cd8_0    conda-forge
      xorg-libxdmcp             1.1.5                hb9d3cd8_0    conda-forge
      xz                        5.6.4                hbcc6ac9_0    conda-forge
      xz-gpl-tools              5.6.4                hbcc6ac9_0    conda-forge
      xz-tools                  5.6.4                hb9d3cd8_0    conda-forge
      yaml                      0.2.5                h7f98852_2    conda-forge
      yarl                      1.18.3           py39h9399b63_1    conda-forge
      zeromq                    4.3.5                h3b0a872_7    conda-forge
      zipp                      3.21.0             pyhd8ed1ab_1    conda-forge
      zlib                      1.2.13               h4ab18f5_6    conda-forge
      zstandard                 0.23.0           py39h08a7858_1    conda-forge
      zstd                      1.5.6                ha6fb4c9_0    conda-forge



Global R Kernel
~~~~~~~~~~~~~~~~~~~~~~~~~~~
Global R/4.3.3

::


         alphavantager                anytime                askpass 
             backports                   base              base64enc 
                   bit                  bit64                   blob 
                 broom                  bslib                 cachem 
                 callr                  caret             cellranger 
             checkmate                  class                    cli 
                 clipr                  clock              codetools 
            colorspace             commonmark               compiler 
            conflicted                  cpp11                 crayon 
             crosstalk                   curl             data.table 
              datasets                    DBI                 dbplyr 
               diagram                 digest                  dplyr 
                dtplyr                  e1071               ellipsis 
              evaluate                  fansi                 farver 
               fastmap            fontawesome                forcats 
               foreach               forecast               fracdiff 
                    fs                  furrr                 future 
          future.apply                 gargle               generics 
               ggforce                ggplot2                 ggraph 
               ggrepel                globals                   glue 
           googledrive          googlesheets4                  gower 
              graphics           graphlayouts              grDevices 
                  grid              gridExtra                 gtable 
               hardhat                  haven                  highr 
                   hms              htmltools            htmlwidgets 
                httpuv                   httr                    ids 
                igraph                  ipred              IRdisplay 
              IRkernel                isoband              iterators 
             jquerylib               jsonlite             KernSmooth 
                 knitr               labeling                  later 
               lattice                   lava               lazyeval 
                   lgr              lifecycle                listenv 
                lmtest              lubridate               magrittr 
                  MASS                 Matrix                memoise 
               methods                   mgcv                   mime 
               mlbench                   mlr3           mlr3measures 
              mlr3misc           ModelMetrics                 modelr 
               munsell                   nlme                   nnet 
              numDeriv                openssl                   padr 
        palmerpenguins                paradox               parallel 
            parallelly                 pbdZMQ   PerformanceAnalytics 
                pillar              pkgconfig                 plotly 
                  plyr               polyclip            prettyunits 
                  pROC               processx                prodlim 
              progress              progressr               promises 
                 proxy                  PRROC                     ps 
                 purrr               quadprog                 Quandl 
              quantmod                     R6                   ragg 
              rappdirs           RColorBrewer                   Rcpp 
         RcppArmadillo              RcppEigen               RcppRoll 
                 readr                 readxl                recipes 
               rematch               rematch2                   repr 
                reprex               reshape2                 riingo 
                 rlang              rmarkdown                  rpart 
               rsample             rstudioapi                  rvest 
                  sass                 scales                selectr 
                 shape                  shiny                 slider 
           sourcetools                splines                SQUAREM 
                 stats                 stats4                stringi 
               stringr               survival                    sys 
           systemfonts                  tcltk            textshaping 
                tibble              tidygraph              tidyquant 
                 tidyr             tidyselect              tidyverse 
            timechange               timeDate                 timetk 
               tinytex                  tools                tseries 
            tsfeatures                    TTR                 tweenr 
                  tzdb                   urca                   utf8 
                 utils                   uuid                  vctrs 
               viridis            viridisLite                  vroom 
                  warp                  withr                   xfun 
               xgboost                   xml2                 xtable 
                   xts                   yaml                    zoo 


   

Creating Your Python Kernel
~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  $ ``ssh <caneid>@pegasus.ccs.miami.edu`` to login to Pegasus
-  $ ``module load mambaforge``
-  $ ``mamba create -n <your environment> ipykernel python=<version> <package1> <package2> ...`` 
-  $ ``mamba activate <your environment>``
-  (your environment)$
   ``ipython kernel install --user --name <kernel name> --display-name "<the displayed name for the kernel>"``

Here is an example:

(Please press ``y`` on your keyboard when you see ``Proceed ([y]/n)?``)

::

    $ module load mambaforge
    $ conda create -n myenv python numpy scipy ipykernel
    $ conda activate myenv
    (myenv)$ conda install ipykernel
    (myenv)$ ipython kernel install --user --name my_user_py_kernel --display-name "My Python Kernel"

Later on, you can still install new packages to the kernel using ``conda install <package>`` after activating the environment.


.. note::
   If the package could not be found, you can search `Anaconda
   Cloud <https://anaconda.org/>`__ and **choose Platform** ``x64_64``
   
   If Anaconda Cloud does not have the package neither, you could try ``pip install``

.. warning:: 
   Issues may arise when using pip and conda together.
   Only after conda has been used to install as many packages
   as possible should pip be used to install any remaining software. If
   modifications are needed to the environment, it is best to create a new
   environment rather than running conda after pip.

After a package is installed, you can use it in your notebook by running ``import <package name>`` in a cell.

Creating your R Kernels
~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

   $ mamba create -n myRenv -c conda-forge r-base r-irkernel
   $ mamba activate myRenv
   $ mamba install -c conda-forge jupyter_client
   $ R
   > IRkernel::installspec(name='my_r_kernel', displayname='My R Kernel')

Later on, you can still install new packages to the kernel using ``conda install <package>`` or install.packages() in R after activating the environment.

Removing Personal Kernels
~~~~~~~~~~~~~~~~~~~~~~~~~~~
You can view a list of all your kernels at the following path:

``/nethome/<your_caneid>/.local/share/jupyter/kernels``

From this directory you can delete kernels using Linux **rm -rf <kernel_name>** command. 


Using Pre-installed Kernels
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Several kernels have been pre-installed on Pegasus. You can use them to test your code if you do not need
additional packages. On the Notebook Dashboard page, you can create a
new notebook file (.ipynb) with a selected kernel by clicking on the
``New`` button at the top-right corner under the menu bar. On the
Notebook Editor page, you can change kernel by clicking ``Kernel`` in
the menubar and choosing ``Change kernel``.

