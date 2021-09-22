import { APIGatewayProxyEventV2, Callback, Context } from 'aws-lambda';
import { create } from '../dynamo-db-connector';

const uuid = require('uuid');

exports.handler = async function (event: APIGatewayProxyEventV2, context: Context, callback: Callback) {
  if (typeof event.body === 'string') {
    const bookItem = JSON.parse(event.body);
    const createBook = await create(process.env.table as string, bookItem);
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