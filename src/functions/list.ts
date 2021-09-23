import {APIGatewayProxyEventV2, Callback, Context} from "aws-lambda";
import {get, list} from "../connectors/dynamo-db-connector";

export async function handler (event: APIGatewayProxyEventV2, context: Context, callback: Callback) {
    const books = await list(process.env.table as string);
    const response = {
        statusCode: 200,
        body: JSON.stringify(books)
    }
    callback(null, response);
}