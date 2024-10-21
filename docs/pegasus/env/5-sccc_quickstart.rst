SCCC HPC QuickStart Guide
=========================

The purpose of this document is to provide members of the Sylvester Comprehensive Cancer Center (SCCC) community with the basic tools necessary to access the High-Performance Computing (HPC) resources at the UM Frost Institute for Data Science and Computing (IDSC). This guide is designed as a starting point for users new to Pegasus and is intended to act as a reference to supplement the on boarding training required for all users.

How do I get started?
~~~~~~~~~~~~~~~~~~~~~

After reviewing our `Policies <https://acs-docs.readthedocs.io/policies/policies.html>`__, you will need an `SCCC Project Allocation <https://redcap.miami.edu/surveys/?s=F8MK9NMW9N>`__ with a ``pegasus_project`` resource type.  If you are submitting the request on behalf of your Lab's PI, please include their CaneID in the form's ``Project Description``. 

If you are new to Pegasus, please review our `Onboarding Training Material <https://www.youtube.com/playlist?list=PLldDLMcIa33Z38fwC6e_7YSQZtwJZLSzF>`__.

If you’re new to Linux, please review our `Linux Training Material <https://acs-docs.readthedocs.io/linux>`__.

What are specs of HPC Nodes?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Triton (96 nodes)** ::

    - OS:   CentOS 7.9, ppc64le
    - CPU:  2 x IBM Power9 (40 cores/node, 3840 cores total)
    - RAM:  16 x 16GiB RDIMM DDR4 2666MHz ECC (256GiB/node, 6.4GB/core)
    - GPU:  2 x Nvidia V100-SXM2 (16GB GPU RAM) 
    - NET:  100Gbps Infiniband (IB), 1Gbps Ethernet
    - Disk: 2 x 1.92TB Micron 5100PRO SSD (RAID1, 1080MBps/1040MBps Seq Read/Write, 186K/74K IOPS)

**Pegasus Compute (350 nodes)** ::

    - OS:   CentOS 7.6, x86_64
    - CPU:  16c/node (for a total of 4800 CPU-cores)
    - RAM:  64GiB nodes (4GiB/core, for a total of 22400GiB)
    - RAM:  256GiB nodes (16GiB/core, for a total of 4096GiB)
    - NET:  56Gbps Infiniband, 1 Gbps Ethernet 
    - Disk: Stateless (ramdisk)

**Pegasus SCCC Dedicated Compute (16 nodes)** ::

    - OS:   CentOS 7.9, x86_64 
    - CPU:  2 x Intel Xeon Gold 6338 CPU @ 2.00GHz (64 cores/node, 1024 cores total)
    - RAM:  16 x 32GiB RDIMM DDR4 3200MHz ECC (512GiB/node, 8192GiB RAM total) 
    - Net:  100Gbps Infiniband, 10Gbps Ethernet, 
    - Disk: Samsung PM9A3 960GiB (6500MBps/1500MBps Seq Read/Write, 580K/70K IOPS)  

**Pegasus SCCC Dedicated Big Memory GPU (2 nodes)** ::

    - OS:   CentOS 7.9, x86_64  
    - CPU:  2 x Intel Xeon Gold 6338 CPU @ 2.00GHz (64 cores/node, 128 cores total)
    - RAM:  32 x 128GiB RDIMM DDR4 3200MHz ECC (4096GB/node, 8192GiB RAM total)
    - GPU:  1 x Nvidia A100 (80GB GPU RAM)  
    - Net:  100Gbps Infiniband, 10Gbps Ethernet, 
    - Disk: Samsung PM9A3 960GB NVMe (6500MBps/1500MBps Seq Read/Write, 580K/70K IOPS) 

How do I reset my IDSC password?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Via the `IDSC Password Management <https://idsc.miami.edu/ccs-account>`__ tool.  You will need to be connected to the **University's Secure Network** to access this tool and all SCCC HPC Resources.

How do I access the Secure Network remotely?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Via the `University of Miami's VPN <https://www.it.miami.edu/a-z-listing/virtual-private-network/index.html>`__.

How do I run Nextflow on SCCC HPC resources?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This is working **draft** we will use as part of our **SCCC HPC Onboarding Material**.  It is **not** an optimal example, but rather, one we will build on, like the  `Software Carpentries Tutorials <https://carpentries-incubator.github.io/workflows-nextflow/index.html>`__ provided by the `Nextflow Community <https://www.nextflow.io/blog/2023/learn-nextflow-in-2023.html>`__.

**Sample User Nextflow LSF Configuration**
::

    [pdavila@login4 nextflow]$ cat pedro_pegasus_hpc.config 
    params {
        config_profile_description   = 'UM SCCC pegasus HPC profile.'
        config_profile_contact       = 'pdavila@miami.edu'

        max_memory                   = 384.GB
        max_cpus                     = 64
        max_time                     = 30.m

        lsf_queue_size               = 256
        schema_ignore_params         = 'genomes,lsf_opts,lsf_queue_size'
        validationSchemaIgnoreParams = "genomes,lsf_opts,lsf_queue_size,schema_ignore_params"
    }

    singularity.enabled = true

    aws {
        client {
            anonymous = true
        }
    }

    process {
        clusterOptions = '-P sccc_ceccarelli'
        scratch = '/scratch/projects/sccc_ceccarelli/pdavila'
        resourceLimits = [
            memory: 6.GB,
            cpus: 1,
            time: 30.m
        ]
        queue          = 'sccc2'
        executor       = 'lsf'
        maxRetries     = 3
        errorStrategy  = { task.attempt <= 3 ? 'retry' : 'finish' }
        cache          = 'lenient'
    }

    executor {
        perTaskReserve = true
        perJobMemLimit = false
        queueSize      = params.lsf_queue_size
    }

**Nextflow Submission Script**
::

    [pdavila@login4 nextflow]$ cat pedro_run_nextflow.sh 
    #!/bin/bash
     
    #BSUB -J nf-sarek            # assign a name to job.
    #BSUB -P [YOUR_PROJECT]      # specify the project to use when submitting the job 
    #BSUB -e %J.err              # redirect std error to a specified file
    #BSUB -o %J.out              # redirect std out to a specified file
    #BSUB -W 1:00                # set wall clock run time limit of 1 hour, else queue default will be applied
    #BSUB -q sccc                # specify queue to be used, else 'general' queue will be applied
    #BSUB -n 1                   # specify number of processors. In this job, a single processor is requested
    #BSUB -R "rusage[mem=6144]"  # Request 6GiB per core (6144 MiB = 6 GiB) to match your Nexflow Pegasus Config
    #BSUB -B                     # send mail to specified email when the job is dispatched and begins execution
    #BSUB -u [YOUR_EMAIL]        # send notification to your email
    #BSUB -N                     # send job statistics report through email when job finishes
     
    # The nextflow/24.04.4 module is the latest module, built in miniforge3 conda env.
    module load nextflow/24.04.4
    module load singularity

    export SCRATCH="/scratch/projects/sccc_ceccarelli/pdavila"
    export NXF_SINGULARITY_CACHEDIR="$HOME/SINGULARITY_CACHEDIR"
    export SINGULARITY_CACHEDIR="$HOME/SINGULARITY_CACHEDIR"
     
    mkdir -p $NXF_SINGULARITY_CACHEDIR $SINGULARITY_CACHEDIR
     
    # Run pipeline with test data
    nextflow run nf-core/sarek -r 3.4.4 \
            -profile test,singularity \
            --outdir ./results \
            -c pegasus_hpc.config \
            -resume -bg > run_pipeline.log

**Submit Job to LSF Cluster**
::

    [pdavila@login4 nextflow]$ bsub <pedro_run_nextflow.sh 
    Job <28994646> is submitted to queue <sccc>.

**Check status of running Job**
::

    [pdavila@login4 nextflow]$ bpeek 28994646
    << output from stdout >>
    << output from stderr >>
    --------------------------------------------------------------------------------
    This Conda env provides Nextflow 24.04.4, nc-core/tools 2.14.1, Java 17.0.11,
    Python 3.12, and all their dependencies.
    --------------------------------------------------------------------------------

You can also use use the ``tail -f run_pipeline.log`` command to see the log file as your Job writes to it.
::

    [pdavila@login4 nextflow]$ tail -f run_pipeline.log 
    N E X T F L O W  ~  version 24.04.4
    WARN: It appears you have never run this project before -- Option `-resume` is ignored
    Launching `https://github.com/nf-core/sarek` [berserk_koch] DSL2 - revision: 5cc30494a6 [3.4.4]
    ...
    [a6/256990] Submitted process > NFCORE_SAREK:SAREK:FASTQC (test-test_L1)
    [ed/ef1b85] Submitted process > NFCORE_SAREK:SAREK:FASTQC (test-test_L2)
    [84/f728c7] Submitted process > NFCORE_SAREK:PREPARE_GENOME:BWAMEM1_INDEX (genome.fasta)
    [ca/46b83b] Submitted process > NFCORE_SAREK:PREPARE_INTERVALS:CREATE_INTERVALS_BED (genome.interval_list)
    [18/2d0b64] Submitted process > NFCORE_SAREK:PREPARE_INTERVALS:GATK4_INTERVALLISTTOBED (genome)
    Pulling Singularity image https://depot.galaxyproject.org/singularity/htslib:1.19.1--h81da01d_1 [cache /nethome/pdavila/SINGULARITY_CACHEDIR/depot.galaxyproject.org-singularity-htslib-1.19.1--h81da01d_1.img]
    ...
    Pulling Singularity image https://depot.galaxyproject.org/singularity/multiqc:1.21--pyhdfd78af_0 [cache /nethome/pdavila/SINGULARITY_CACHEDIR/depot.galaxyproject.org-singularity-multiqc-1.21--pyhdfd78af_0.img]
    [88/d69b7a] Submitted process > NFCORE_SAREK:SAREK:MULTIQC
    -[nf-core/sarek] Pipeline completed successfully-

**View your Results**
:: 

    [pdavila@login4 nextflow]$ tree results/
    results/
    ├── csv
    │   ├── markduplicates.csv
    │   ├── markduplicates_no_table.csv
    │   ├── recalibrated.csv
    │   └── variantcalled.csv
    ├── multiqc
    │   ├── multiqc_data
    │   │   ├── gatk_base_recalibrator.txt
    │   │   ├── mosdepth_cov_dist.txt
    │   │   ├── mosdepth_cumcov_dist.txt
    │   │   ├── mosdepth_perchrom.txt
    │   │   ├── multiqc_bcftools_stats.txt
    │   │   ├── multiqc_citations.txt
    │   │   ├── multiqc_data.json
    │   │   ├── multiqc_fastqc.txt
    │   │   ├── multiqc_general_stats.txt
    │   │   ├── multiqc.log
    │   │   ├── multiqc_picard_dups.txt
    │   │   ├── multiqc_samtools_stats.txt
    │   │   ├── multiqc_software_versions.txt
    │   │   ├── multiqc_sources.txt
    │   │   ├── picard_histogram_1.txt
    │   │   ├── picard_histogram_2.txt
    │   │   ├── picard_histogram.txt
    │   │   ├── vcftools_tstv_by_count.txt
    │   │   └── vcftools_tstv_by_qual.txt
    │   ├── multiqc_plots
    │   └── multiqc_report.html
    ├── pipeline_info
    │   ├── execution_report_2024-10-14_16-17-26.html
    │   ├── execution_timeline_2024-10-14_16-17-26.html
    │   ├── execution_trace_2024-10-14_16-17-26.txt
    │   ├── manifest_2024-10-14_16-17-26.bco.json
    │   ├── nf_core_sarek_software_mqc_versions.yml
    │   ├── params_2024-10-14_16-17-52.json
    │   └── pipeline_dag_2024-10-14_16-17-26.html
    ├── preprocessing
    │   ├── markduplicates
    │   │   └── test
    │   │       ├── test.md.cram
    │   │       └── test.md.cram.crai
    │   ├── recalibrated
    │   │   └── test
    │   │       ├── test.recal.cram
    │   │       └── test.recal.cram.crai
    │   └── recal_table
    │       └── test
    │           └── test.recal.table
    ├── reference
    ├── reports
    │   ├── bcftools
    │   │   └── strelka
    │   │       └── test
    │   │           └── test.strelka.variants.bcftools_stats.txt
    │   ├── fastqc
    │   │   ├── test-test_L1
    │   │   │   ├── test-test_L1_1_fastqc.html
    │   │   │   ├── test-test_L1_1_fastqc.zip
    │   │   │   ├── test-test_L1_2_fastqc.html
    │   │   │   └── test-test_L1_2_fastqc.zip
    │   │   └── test-test_L2
    │   │       ├── test-test_L2_1_fastqc.html
    │   │       ├── test-test_L2_1_fastqc.zip
    │   │       ├── test-test_L2_2_fastqc.html
    │   │       └── test-test_L2_2_fastqc.zip
    │   ├── markduplicates
    │   │   └── test
    │   │       └── test.md.cram.metrics
    │   ├── mosdepth
    │   │   └── test
    │   │       ├── test.md.mosdepth.global.dist.txt
    │   │       ├── test.md.mosdepth.region.dist.txt
    │   │       ├── test.md.mosdepth.summary.txt
    │   │       ├── test.md.regions.bed.gz
    │   │       ├── test.md.regions.bed.gz.csi
    │   │       ├── test.recal.mosdepth.global.dist.txt
    │   │       ├── test.recal.mosdepth.region.dist.txt
    │   │       ├── test.recal.mosdepth.summary.txt
    │   │       ├── test.recal.regions.bed.gz
    │   │       └── test.recal.regions.bed.gz.csi
    │   ├── samtools
    │   │   └── test
    │   │       ├── test.md.cram.stats
    │   │       └── test.recal.cram.stats
    │   └── vcftools
    │       └── strelka
    │           └── test
    │               ├── test.strelka.variants.FILTER.summary
    │               ├── test.strelka.variants.TsTv.count
    │               └── test.strelka.variants.TsTv.qual
    └── variant_calling
        └── strelka
            └── test
                ├── test.strelka.genome.vcf.gz
                ├── test.strelka.genome.vcf.gz.tbi
                ├── test.strelka.variants.vcf.gz
                └── test.strelka.variants.vcf.gz.tbi
