# Sample use of SAM and CodeDeploy

Easier for help starter to understand how it's work

Consist of 2 main things which is
- Hook
    - BeforeAllowTraffic
    - AfterAllowTraffic
- SAM
    - package
    - deploy

## How to use it

1. After clone this repository go to directory of SAM and run command 
```sam package --template-file template.yml --output-template-file package.yml  --s3-bucket <<your bucketname>> --s3-prefix <<your prefix name (folder/path)```
in this step SAM will upload data to store in your S3 bucket and generate file name ```package.yml`` that include all necessary things like CodeURI 
2. then deploy it (Normally after step 1 it will provide deploy command in your CLI if not use this) ```sam deploy --template-file <<location of package.yml >> --stack-name <<any name for your stack>> --capabilities CAPABILITY_IAM```
3. that's it!

## Update Lambda Function
- If we have any change in our Lambda Function (myDateTimeFunction.js) just repeat above steps
- When you update lambda function to new version you will see in CodeDeploy Console that it will ```Linear10PercentEvery1Minute``` to new version of lambda since we have that configuration