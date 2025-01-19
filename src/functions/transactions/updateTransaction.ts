import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { updateTransaction } from '../../utils/dynamodb';
import { corsHeaders } from '../../utils/headers';

export const handler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    try {
        const { userId, transactionId, ...updateFields } = JSON.parse(
            event.body || '',
        );

        // Ensure `userId` and `transactionId` are provided
        if (!userId || !transactionId) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: 'userId and transactionId are required.',
                }),
                headers: corsHeaders,
            };
        }

        const updatedTransaction = await updateTransaction(
            userId,
            transactionId,
            updateFields,
        );

        return {
            statusCode: 200,
            body: JSON.stringify(updatedTransaction),
            headers: corsHeaders,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to update transaction' }),
            headers: corsHeaders,
        };
    }
};
