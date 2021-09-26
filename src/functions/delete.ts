import {APIGatewayProxyEventV2, Callback, Context} from "aws-lambda";
import { deleteItem } from "../connectors/dynamo-db-connector";

export async function handler(event: APIGatewayProxyEventV2, context: Context, callback: Callback) {
    if (event.pathParameters && typeof event.pathParameters.id === 'string') {
        await deleteItem(process.env.table as string, event.pathParameters.id);
        const response = {
            statusCode: 200,
        }
        callback(null, response);
    }
}