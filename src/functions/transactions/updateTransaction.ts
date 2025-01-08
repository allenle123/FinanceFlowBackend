import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { updateTransaction } from '../../utils/dynamodb';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { userId, transactionId, ...updateFields } = JSON.parse(event.body || '');

    // Ensure `userId` and `transactionId` are provided
    if (!userId || !transactionId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'userId and transactionId are required.' }),
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:5174', // or '*'
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Credentials': 'true' // If you're using credentials
      },
      };
    }

    const updatedTransaction = await updateTransaction(userId, transactionId, updateFields);

    return {
      statusCode: 200,
      body: JSON.stringify(updatedTransaction),
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
      body: JSON.stringify({ error: 'Failed to update transaction' }),
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5174', // or '*'
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true' // If you're using credentials
    },
    };
  }
};
