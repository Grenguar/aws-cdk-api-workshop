import {APIGatewayProxyEventV2, Callback, Context} from "aws-lambda";
import {get} from "../connectors/dynamo-db-connector";

export async function handler(event: APIGatewayProxyEventV2, context: Context, callback: Callback) {
  try {
    if (event.pathParameters && typeof event.pathParameters.id === 'string') {
      const createBook = await get(process.env.table as string, event.pathParameters.id);
      const response = {
        statusCode: 200,
        body: JSON.stringify(createBook)
      }
      callback(null, response);
    }
  } catch (e) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify('Cannot get the book')
    });
  }
}