import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { deleteTransaction } from '../utils/dynamodb';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const userId = event.queryStringParameters?.userId;
    const transactionId = event.queryStringParameters?.transactionId;

    if (!userId || !transactionId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'userId and transactionId are required' }),
      };
    }

    await deleteTransaction(userId, transactionId);

    return {
      statusCode: 204,
      body: '',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to delete transaction' }),
    };
  }
}; 