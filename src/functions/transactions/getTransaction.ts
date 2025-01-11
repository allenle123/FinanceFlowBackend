import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getTransactionsByUser } from '../../utils/dynamodb';
import { corsHeaders } from '../../utils/headers';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  if (event.httpMethod === 'OPTIONS') {
    return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({}),
    };
}
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
            isBase64Encoded: false,
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
