import { APIGatewayProxyEventV2, Callback, Context } from 'aws-lambda';
import { put } from '../connectors/dynamo-db-connector';

export async function handler (event: APIGatewayProxyEventV2, context: Context, callback: Callback) {
  if (typeof event.body === 'string') {
    const bookItem = JSON.parse(event.body);
    const createBook = await put(process.env.table as string, bookItem);
    const response = {
      statusCode: 200,
      body: JSON.stringify(createBook)
    }
    callback(null, response);
  }
  callback(null, {
    statusCode: 400,
    body: JSON.stringify('Request body is empty!')
  });
}