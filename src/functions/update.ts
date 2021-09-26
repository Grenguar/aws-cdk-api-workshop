import {APIGatewayProxyEventV2, Callback, Context} from "aws-lambda";
import { update } from "../connectors/dynamo-db-connector";

export async function handler (event: APIGatewayProxyEventV2, context: Context, callback: Callback) {
    if (typeof event.body === 'string' && event.pathParameters && typeof event.pathParameters.id === 'string') {
        const bookItem = JSON.parse(event.body);
        await update(process.env.table as string, event.pathParameters.id, bookItem);
        const response = {
            statusCode: 200,
        }
        callback(null, response);
    }
    callback(null, {
        statusCode: 400,
        body: JSON.stringify('Request body is empty!')
    });
}