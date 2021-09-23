import { aws_apigateway as apigw, aws_lambda as lambda, aws_dynamodb as ddb, StackProps, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {RetentionDays} from "aws-cdk-lib/aws-logs";

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const dynamoTable = new ddb.Table(this, 'BookTable', {
      tableName: 'BookStorage',
      readCapacity: 1,
      writeCapacity: 1,
      partitionKey: {
        name: 'id',
        type: ddb.AttributeType.STRING,
      },
    })

    const createBookFunction = new lambda.Function(this, 'CreateHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('../code'),
      handler: 'create.handler',
      environment: {
        table: dynamoTable.tableName
      },
      logRetention: RetentionDays.ONE_WEEK
    });

    const getBookFunction = new lambda.Function(this, 'GetHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('../code'),
      handler: 'get.handler',
      environment: {
        table: dynamoTable.tableName
      }
    });

    const createBookIntegration = new apigw.LambdaIntegration(createBookFunction);
    const getBookIntegration = new apigw.LambdaIntegration(getBookFunction);

    dynamoTable.grant(createBookFunction, 'dynamodb:CreateItem', 'dynamodb:PutItem')
    dynamoTable.grant(getBookFunction, 'dynamodb:GetItem');

    const api = new apigw.RestApi(this, `BookAPI`, {
      restApiName: `book-rest-api`,
    });

    const mainPath = api.root.addResource('books');
    mainPath.addMethod('POST', createBookIntegration)
    mainPath.addResource('{id}').addMethod('GET', getBookIntegration)
  }
}
