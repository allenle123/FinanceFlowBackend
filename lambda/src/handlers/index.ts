import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { handler as createHandler } from './createTransaction';
import { handler as getHandler } from './getTransaction';
import { handler as deleteHandler } from './deleteTransaction';
import { handler as updateTransaction } from './updateTransaction';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  switch (event.httpMethod) {
    case 'GET':
      return getHandler(event);
    case 'POST':
      return createHandler(event);
    case 'DELETE':
      return deleteHandler(event);
    case 'PUT':
      return updateTransaction(event);
    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method not allowed' }),
      };
  }
}; 