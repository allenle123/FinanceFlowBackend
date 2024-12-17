import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getTransactionsByUser } from '../utils/dynamodb';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const userId = event.queryStringParameters?.userId;

    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'userId is required' }),
      };
    }

    const transactions = await getTransactionsByUser(userId);

    return {
      statusCode: 200,
      body: JSON.stringify(transactions),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch transactions' }),
    };
  }
}; 