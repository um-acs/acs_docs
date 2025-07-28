Amazon Web Services CLI on Pegasus
==================================

Note, IDSC does not administer or manage AWS services.  

In order to access your AWS services from the Pegasus cluster: 

- **load the cluster's aws-cli module** 
- configure aws with your IAM user account credentials (one-time) 
   - aws user credentials file : **~/.aws/credentials**
   - aws user configurations file : **~/.aws/config** 
- **check your aws configurations** 

::

  [username@login4 ~]$ module load aws-cli
  [username@login4 ~]$ aws configure 
  ..
  [username@login4 ~]$ aws configure list
      Name                    Value             Type    Location
      ----                    -----             ----    --------
   profile                <not set>             None    None
	access_key     ****************44OL shared-credentials-file
	secret_key     ****************unuw shared-credentials-file
    region                us-east-1              env    ['AWS_REGION', 'AWS_DEFAULT_REGION']



Getting Started 
------------------------
 
- Amazon s3 "Getting started" guide : https://aws.amazon.com/s3/getting-started/
- User guide : https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html
- Pricing : https://aws.amazon.com/s3/pricing/

Amazon s3 is “safe, secure Object storage” with web access, pay-as-you-go subscription

AWS s3 "IAM" User Accounts :  https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html

(needed to access AWS web services through the CLI from Pegasus)



AWS CLI, User Overview
~~~~~~~~~~~~~~~~~~~~~~~~~

Note that your AWS IAM web login & password are different from your access key credentials.  For help with your IAM web login account, contact your AWS Administrator. 

1. Get your AWS IAM access keys (from AWS web or your AWS Administrator) 
2. Configure your AWS access from Pegasus 
3. Access & use your AWS s3 instance  


Getting your AWS IAM access keys (from the web) 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Your AWS Administrator may have already provided you with IAM access keys for your Amazon instance.  If you need to generate new access keys, log into the AWS web interface.  Generating new keys will inactivate any old keys. 

``https://Your_AWS_instance_ID.signin.aws.amazon.com/console`` OR https://console.aws.amazon.com/ and enter your instance ID or alias manually. 

Reminder, your AWS IAM web login & password are different from your access key credentials.  For help with your IAM web login account, contact your AWS Administrator.

1. Log into your AWS Management Console, with your IAM web login & password 
    a. If you forgot your IAM web login, contact the AWS administrator that provided you with your IAM user name. 
    b. ”IAM users, only your administrator can reset your password.” 
    c. More on IAM account logins : https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_sign-in.html
2. From your IAM account drop-down menu, choose “My security credentials” 
    a. If needed, update your password
3. Under the “Access keys” heading, create & download your access key credentials `credentials.csv`
    a. ‘credentials.csv’ contains both your Access Key & your Secret Access Key 
    b. “If you lose or forget your secret key, you cannot retrieve it. Instead, create a new access key and make the old key inactive.” 
    c. More about access keys : http://docs.aws.amazon.com/console/iam/self-accesskeys


Configuring your AWS access (cli) 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Have your IAM access key credentials, from ‘credentials.csv’ (from AWS web or your AWS Administrator).  

AWS CLI quickstart : https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-config

1. On the Pegasus cluster, 
    a. Load the cluster “aws-cli” module
    b. (optional) Check the module’s default settings 
2. Run the command “aws configure” 
3. Enter your AWS IAM credentials (from ‘credentials.csv’) 
    a. These settings will save to your home directory 
    b. More about aws configuration files : https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html


Examples, ::

  [username@login4 ~]$ module load aws-cli
  [username@login4 ~]$ which aws
  /share/apps/c7/aws-cli/bin/aws

  [username@login4 ~]$ module show aws-cli
  ..
  # Set environment variables
  setenv          AWS_DEFAULT_REGION "us-east-1"

---> The default retry mode for AWS CLI version 2 is “standard” 

These module settings will override user “aws configure” settings.  You can override module settings by using aws command-line options.




Using AWS s3 buckets from the cli 
--------------------------------------------------------

1. Create a bucket 
    a. bucket names must be globally unique (e.g. two different AWS users can not have the same bucket name)
    b. bucket names cannot contain spaces 
    c. More on bucket naming requirements : https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-s3-bucket-naming-requirements.html
2. List your s3 bucket contents 
    a. buckets are collections of objects 
    b. “objects” behave like files 
    c. “objects/” (with a trailing slash) behave like folders 
3. Download objects from AWS s3 buckets with cp
    a. specify directories, or use current local  
    b. use the '--recursive' flag to download all objects 
4. Upload files to an AWS s3 bucket with cp
    a. specify AWS bucket paths 
    b. use the '--recursive' flag to upload all objects 
5. Delete objects from AWS s3 buckets with rm
    a. list & test with '--dryrun' flag 
    b. then remove with rm 
6. Sync between your local directory and an AWS s3 bucket with sync
    a. recursive 
    b. copies changes & new files only 
    c. doesn’t delete missing files 

| More on using s3 : https://docs.aws.amazon.com/cli/latest/userguide/cli-services-s3.html
| AWS s3 command examples : https://docs.aws.amazon.com/cli/latest/userguide/cli-services-s3-commands.html
| AWS s3 CLI reference : https://docs.aws.amazon.com/cli/latest/reference/s3/


Create (make) an AWS s3 bucket ::

    [username@login4 ~]$ aws s3 mb s3://idsc-acs-test-bucket2
    make_bucket: idsc-acs-test-bucket2

List all user owned AWS s3 buckets :: 

    [username@login4 ~]$ aws s3 ls
    2021-09-01 11:57:25 idsc-acs-test-bucket
    2021-09-01 13:11:39 idsc-acs-test-bucket2

List AWS s3 bucket contents :: 

    [username@login4 ~]$ aws s3 ls s3://idsc-acs-test-bucket
                               PRE testfolder/
    2021-09-01 12:02:29        160 aws_bucket_test.txt

List AWS s3 “folder” (object/) contents (include trailing slash) ::

    [username@login4 awstests]$ aws s3 ls s3://idsc-acs-test-bucket/testfolder/
    2021-09-01 16:04:19         20 testfile1.test
    2021-09-01 16:04:19         20 testfile2.test
    2021-09-01 16:04:19         20 testfile3.test

Download an object from an AWS s3 bucket (to your current local directory) ::

    [username@login4 ~]$ aws s3 cp s3://idsc-acs-test-bucket/aws_bucket_test.txt .
    download: s3://idsc-acs-test-bucket/aws_bucket_test.txt to ./aws_bucket_test.txt

Download an object from an AWS s3 bucket (to a specified local directory) ::

    [username@login4 ~]$ aws s3 cp s3://idsc-acs-test-bucket/aws_bucket_test.txt ~/aws-downloads/.
    download: s3://idsc-acs-test-bucket/aws_bucket_test.txt to /nethome/username/aws-downloads/aws_bucket_test.txt

    Download all objects from an AWS “folder” (to your current local directory, recursive):: 

    [username@login4 awstests]$ aws s3 cp s3://idsc-acs-test-bucket/testfolder testfolder --recursive
    download: s3://idsc-acs-test-bucket/testfolder/testfile1.test to testfolder/testfile1.test
    download: s3://idsc-acs-test-bucket/testfolder/testfile2.test to testfolder/testfile2.test
    download: s3://idsc-acs-test-bucket/testfolder/testfile5.test to testfolder/testfile3.test

Upload a file to an AWS s3 bucket ::

    [username@login4 ~]$ aws s3 cp aws_bucket_cli_upload_test.txt s3://idsc-acs-test-bucket/
    upload: ./aws_bucket_cli_upload_test.txt to s3://idsc-acs-test-bucket/aws_bucket_cli_upload_test.txt

    [username@login4 ~]$ aws s3 ls s3://idsc-acs-test-bucket
    2021-09-01 12:41:47         94 aws_bucket_cli_upload_test.txt
    2021-09-01 12:02:29        160 aws_bucket_test.txt


Upload multiple files to an AWS s3 bucket (recursive) :: 

    [username@login4 ~]$ aws s3 cp . s3://idsc-acs-test-bucket/ --recursive
    upload: ./another_test.txt to s3://idsc-acs-test-bucket/another_test
    upload: ./testimage2.jpg to s3://idsc-acs-test-bucket/testimage2.jpg
    upload: ./testimage.jpg to s3://idsc-acs-test-bucket/testimage.jpg
    upload: ./aws_bucket_cli_upload_test.txt to s3://idsc-acs-test-bucket/aws_bucket_cli_upload_test.txt
    upload: ./aws_bucket_test.txt to s3://idsc-acs-test-bucket/aws_bucket_test.txt

Upload multiple files to an AWS s3 bucket, with filters (examples by file extension) :: 

    # upload (copy to AWS) ONLY files with ‘.txt’ extension 

    [username@login4 ~]$ aws s3 cp . s3://idsc-acs-test-bucket/ --recursive --exclude "*" --include "*.txt"
    upload: ./aws_bucket_test.txt to s3://idsc-acs-test-bucket/aws_bucket_test.txt
    upload: ./aws_bucket_cli_upload_test.txt to s3://idsc-acs-test-bucket/aws_bucket_cli_upload_test.txt

    # upload ONLY files with ‘.jpg’ extension 

    [username@login4 ~]$ aws s3 cp . s3://idsc-acs-test-bucket/ --recursive --exclude "*" --include "*.jpg"
    upload: ./testimage.jpg to s3://idsc-acs-test-bucket/testimage.jpg
    upload: ./testimage2.jpg to s3://idsc-acs-test-bucket/testimage2.jpg

    # upload all files EXCEPT those with ‘.txt’ extension 

    [username@login4 ~]$ aws s3 cp . s3://idsc-acs-test-bucket/ --recursive --exclude "*.txt"
    upload: ./testimage.jpg to s3://idsc-acs-test-bucket/testimage.jpg
    upload: ./testimage2.jpg to s3://idsc-acs-test-bucket/testimage2.jpg
    upload: ./another_test to s3://idsc-acs-test-bucket/another_test

    # list local directory contents 
    
    [username@login4 ~]$ ls -lah
    ..
    -rw-r--r--  1 username hpc   0 Sep 10 13:15 another_test
    -rw-r--r--  1 username hpc  94 Sep 10 13:15 aws_bucket_cli_upload_test.txt
    -rw-r--r--  1 username hpc 160 Sep 10 13:15 aws_bucket_test.txt
    -rw-r--r--  1 username hpc  87 Sep 10 13:32 testimage2.jpg
    -rw-r--r--  1 username hpc 16K Sep 10 13:33 testimage.jpg

Delete an object from an AWS s3 bucket (list, test with dryrun, then remove) :: 

    [username@login4 ~]$ aws s3 ls s3://idsc-acs-test-bucket --human-readable
    2021-09-01 13:31:31    4.4 GiB BIG_FILE.iso
    2021-09-01 13:29:26    0 Bytes another_test
    2021-09-01 13:03:40    0 Bytes another_test.txt
    2021-09-01 13:29:26   94 Bytes aws_bucket_cli_upload_test.txt
    2021-09-01 13:29:26  160 Bytes aws_bucket_test.txt
    2021-09-01 13:29:26   16.0 KiB testimage.jpg
    2021-09-01 13:29:26   87 Bytes testimage2.jpg 

    [username@login4 ~]$ aws s3 rm --dryrun s3://idsc-acs-test-bucket/BIG_FILE.iso 
    (dryrun) delete: s3://idsc-acs-test-bucket/BIG_FILE.iso

    [username@login4 ~]$ aws s3 rm s3://idsc-acs-test-bucket/BIG_FILE.iso
    delete: s3://idsc-acs-test-bucket/BIG_FILE.iso


Sync local directory “testfolder” with AWS s3 object “testfolder/” (creates if doesn’t exist) :: 

    [username@login4 ~]$ aws s3 sync testfolder s3://idsc-acs-test-bucket/testfolder
    upload: testfolder/testfile1.test to s3://idsc-acs-test-bucket/testfolder/testfile1.test
    upload: testfolder/testfile2.test to s3://idsc-acs-test-bucket/testfolder/testfile2.test
    upload: testfolder/testfile3.test to s3://idsc-acs-test-bucket/testfolder/testfile3.test

Add another file, sync again, then list aws s3 “testfolder/” contents :: 

    [username@login4 ~]$ echo "this is my new test file" > testfolder/testfileNEW.test
    [username@login4 ~]$ aws s3 sync testfolder s3://idsc-acs-test-bucket/testfolder
    upload: testfolder/testfileNEW.test to s3://idsc-acs-test-bucket/testfolder/testfileNEW.test

    [username@login4 ~]$ aws s3 ls s3://idsc-acs-test-bucket/testfolder/
    2021-09-01 17:16:10         20 testfile1.test
    2021-09-01 16:04:19         20 testfile2.test
    2021-09-01 16:04:19         20 testfile3.test
    2021-09-01 17:16:10         25 testfileNEW.test

Get help with AWS s3 commands ::

	aws s3 help 
	aws s3 ls help 
	aws s3 cp help 




AWS s3 Include and Exclude filters
--------------------------------------

The following pattern symbols are supported 

- ``*`` Matches everything 
- ``?`` Matches any single character 
- ``[sequence]`` Matches any character in ``sequence`` 
- ``[!sequence]`` Matches any character not in ``sequence`` 

Filters that appear later in the command take precedence.  Put ``--exclude`` filters first, then add ``--include`` filters after to re-include specifics.  See command examples above.  

More on filters : https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/index.html#use-of-exclude-and-include-filters

