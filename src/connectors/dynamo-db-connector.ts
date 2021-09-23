import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Book } from '../models/book';
const uuid = require('uuid');
const dynamo = new DocumentClient();

export async function put(table: string, book: Book) {
  const params = {
    TableName: table,
    Item: {
      id: uuid.v4(),
      ...book
    }
  }
  const dbResponse = await dynamo.put(params).promise();
  return params.Item;
}

export async function get(table: string, key: DocumentClient.Key) {
  const params = {
    TableName: table,
    Key: key,
  };

  const dbResponse = await dynamo.get(params).promise();
  return dbResponse.Item;
}