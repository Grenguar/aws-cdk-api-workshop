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

4. Creating your first Lambda
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
