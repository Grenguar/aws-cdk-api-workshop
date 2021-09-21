import { create } from '../dynamo-db-connector';
module.exports.create = (event, context, callback) => {
    if (typeof event.body === 'string') {
        const bookItem = JSON.parse(event.body);
        const createBook = create(process.env.table, bookItem);
        const response = {
            statusCode: 200,
            body: JSON.stringify(createBook)
        };
        callback(null, response);
    }
    callback(null, {
        statusCode: 400,
        body: JSON.stringify('Request body is empty!')
    });
};
