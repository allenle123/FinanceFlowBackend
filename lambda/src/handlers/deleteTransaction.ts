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
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:5174', // or '*'
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Credentials': 'true' // If you're using credentials
      },
      };
    }

    await deleteTransaction(userId, transactionId);

    return {
      statusCode: 204,
      body: '',
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5174', // or '*'
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true' // If you're using credentials
    },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to delete transaction' }),
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5174', // or '*'
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true' // If you're using credentials
    },
    };
  }
};
