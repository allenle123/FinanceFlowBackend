import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createTransaction } from '../../utils/dynamodb';
import { TransactionInput } from '../../types/transaction';
import { corsHeaders } from '../../utils/headers';

export const handler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    try {
        const transaction: TransactionInput = JSON.parse(event.body || '');
        const newTransaction = await createTransaction(transaction);

        return {
            statusCode: 201,
            body: JSON.stringify(newTransaction),
            headers: corsHeaders,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to create transaction' }),
            headers: corsHeaders,
        };
    }
};
