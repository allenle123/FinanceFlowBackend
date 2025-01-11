import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { deleteTransaction } from '../../utils/dynamodb';
import { corsHeaders } from '../../utils/headers';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const userId = event.queryStringParameters?.userId;
    const transactionId = event.queryStringParameters?.transactionId;

    if (!userId || !transactionId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'userId and transactionId are required' }),
        headers: corsHeaders,
      };
    }

    await deleteTransaction(userId, transactionId);

    return {
      statusCode: 204,
      body: '',
      headers: corsHeaders,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to delete transaction' }),
      headers: corsHeaders,
    };
  }
};
