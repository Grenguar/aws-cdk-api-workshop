# aws-cdk-api-workshop

This is the guide for creating your first CDK app with AWS Lambda behind the API Gateway. The API connected to Dynamo DB table for storing and retrieving books. The Lambdas have granular permissions for the table.

There is an article about this project on [dev.to](https://dev.to/grenguar/how-to-build-serverless-api-with-database-using-aws-cdk-4i2d). If you enjoy it, like it and share. This will help others to know more about CDK.

Book Exampe:
```json
{
    "title": "Simulacra and Simulation",
    "author": "Jean Baudrillard",
    "yearPublished": "0-472-06521-1",
    "isbn": "0-676-97376-0"
}
```

## Steps

### Environment Configuration

- First, get your AWS user credentials.

### Setup Environment

- Install AWS CLI (mac OS - `brew install awscli`; [linux](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html), [win](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html))
- When AWS CLI installed:  
  `aws configure`
- Install NodeJS tools ([any OS](https://nodejs.org/en/))
- `npm install -g aws-cdk`
- in the root - `npm i && npm run build` - one will get the code folder needed for infra
- after that `cd infra && npm i && npx cdk deploy` 

### Structure

- `<root>/infra` has the CDK app for deploying the stack
- `<root>/src/functions` has needed handlers for lambdas

## Important Note!

**Do not forget to remove the stack.**

`cdk destroy`

This is a good habit to be sure that resources are deleted. It will help to avoid unexpected AWS costs. Check also that CloudFormation stack was deleted in the console.
