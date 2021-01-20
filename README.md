# aws-cdk-api-workshop

This is the guide for creating your first CDK app with AWS Lambda behind the API Gateway.

If you want to follow with the empty CDK project, you will need to go to branch - `1-init-cdk-app`. There are other branches related to lambda and api.

## Steps

### Environment Configuration

- First, get your AWS user credentials.

### Setup Environment

- Install AWS CLI (mac OS - `brew install awscli`; [linux](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html), [win](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html))
- When AWS CLI installed:  
  `aws configure`
- Install NodeJS tools ([any OS](https://nodejs.org/en/))
- `npm install -g aws-cdk`

### Generate sample app (can be skipped)

- `cdk init app --language typescript`

### First AWS Lambda

- We need this code:

```js
exports.handler = async function (event) {
  console.log("request:", JSON.stringify(event, undefined, 2));
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `Hello, CDK! You've hit ${event.path}\n`,
  };
};
```

- Place it to root on the same level with `bin` and `lib` into file
  `lambda/hello.js`
- Install: `npm install @aws-cdk/aws-lambda`
- Add this code to `lib/workshop-stack.ts`:

```js
const hello = new lambda.Function(this, "HelloHandler", {
  runtime: lambda.Runtime.NODEJS_10_X, // execution environment
  code: lambda.Code.fromAsset("lambda"), // code loaded from "lambda" directory
  handler: "hello.handler", // file is "hello", function is "handler"
});
```

- do `cdk diff`
- do `cdk synth`
- do `cdk bootstrap` (**IMPORTANT!!!**)
- do `cdk deploy`
- Login to AWS console. Check CloudFormation, Lambda

### API endpoint with API Gateway

- `npm install @aws-cdk/aws-apigateway`
- add code to lib/workshop-stack.ts:

```js
new apigw.LambdaRestApi(this, "Endpoint", {
  handler: hello,
});
```

- do `cdk diff`
- do `cdk synth`
- do `cdk deploy`

After last command, you will get

```bash
Outputs:
WorkshopStack.Endpoint<bla-bla> = https://<bla-bla-bla>.execute-api.<region>.amazonaws.com/prod/
```

### The End

Congratulations! We deployed API Endpoint with the logic written with AWS Lambda.

## Important Note!

**Do not forget to remove the cloudformation template.**

`cdk destroy`

This is a good habit to be sure that resources are deleted.

The workshop was inpired by this [website](https://cdkworkshop.com/15-prerequisites.html). The code is [here](https://github.com/aws-samples/aws-cdk-intro-workshop). Thank you a lot!
