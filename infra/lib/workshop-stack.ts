import { aws_apigateway as apigw, aws_lambda as lambda, aws_dynamodb as ddb } from 'aws-cdk-lib';
import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class WorkshopStack extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

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
      code: lambda.Code.fromAsset('../code/functions'),
      handler: 'create.handler',
      environment: {
        table: dynamoTable.tableName
      }
    });

    const createBookIntegration = new apigw.LambdaIntegration(createBookFunction);

    dynamoTable.grant(createBookFunction, 'dynamodb:CreateItem')

    const api = new apigw.RestApi(this, `BookAPI`, {
      restApiName: `book-rest-api`,
    });

    api.root.addMethod('POST', createBookIntegration)
  }
}
