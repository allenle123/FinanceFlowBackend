import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createTransaction } from '../utils/dynamodb';
import { TransactionInput } from '../types/transaction';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const transaction: TransactionInput = JSON.parse(event.body || '');
    const newTransaction = await createTransaction(transaction);

    return {
      statusCode: 201,
      body: JSON.stringify(newTransaction),
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
      body: JSON.stringify({ error: 'Failed to create transaction' }),
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5174', // or '*'
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true' // If you're using credentials
    },
    };
  }
};
