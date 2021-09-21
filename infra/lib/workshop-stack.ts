import { aws_apigateway as apigw, aws_lambda as lambda } from 'aws-cdk-lib';
import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class WorkshopStack extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // The code that defines your stack goes here
    // defines an AWS Lambda resource
    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_10_X, // execution environment
      code: lambda.Code.fromAsset('lambda'), // code loaded from "lambda" directory
      handler: 'hello.handler', // file is "hello", function is "handler"
    });
    // defines an API Gateway REST API resource backed by our "hello" function.
    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: hello,
    });
  }
}
