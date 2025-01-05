import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getTransactionsByUser } from '../utils/dynamodb';

const corsHeaders = {
    'Access-Control-Allow-Origin': 'http://localhost:5173', // Your frontend origin
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Clerk-Signature',
    'Access-Control-Allow-Credentials': 'true',
};

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        // Retrieve the userId from query string parameters
        const userId = event.queryStringParameters?.userId;

        if (!userId) {
            return {
                statusCode: 400,
                headers: corsHeaders,
                body: JSON.stringify({ error: 'userId is required' }),
            };
        }

        // Fetch transactions
        const transactions = await getTransactionsByUser(userId);

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify(transactions),
        };
    } catch (error) {
        console.error('Error fetching transactions:', error);

        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Failed to fetch transactions' }),
        };
    }
};
