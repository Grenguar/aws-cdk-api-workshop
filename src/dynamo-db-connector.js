import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import * as uuid from 'uuid';
const dynamo = new DocumentClient();
export async function create(table, book) {
    const params = {
        TableName: table,
        Item: {
            id: uuid.v1(),
            ...book
        }
    };
    const dbResponse = await dynamo.put(params).promise();
    return params.Item;
}
export async function get(table, key) {
    const params = {
        TableName: table,
        Key: key,
    };
    const dbResponse = await dynamo.get(params).promise();
    return dbResponse.Item;
}
