# aws-cdk-api-workshop

This is the guide for creating your first CDK app with AWS Lambda behind the API Gateway.

## Steps

### Environment Configuration

1. First, get your AWS user credentials.

2. Setup your CLI tools:

   - Install AWS CLI (mac OS - `brew install awscli`; [linux](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html), [win](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html))
   - When AWS CLI installed:  
     `aws configure`
   - Install NodeJS tools ([any OS](https://nodejs.org/en/))
   - `npm install -g aws-cdk`

3. Generate sample app (can be skipped):
   - `cdk init app --language typescript`
