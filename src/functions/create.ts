import { APIGatewayProxyEventV2, Callback, Context } from 'aws-lambda';
import { create } from '../connectors/dynamo-db-connector';

export async function handler (event: APIGatewayProxyEventV2, context: Context, callback: Callback) {
  if (typeof event.body === 'string') {
    const bookItem = JSON.parse(event.body);
    const createBook = await create(process.env.table as string, bookItem);
    const response = {
      statusCode: 201,
    }
    callback(null, response);
  }
  callback(null, {
    statusCode: 400,
    body: JSON.stringify('Request body is empty!')
  });
}