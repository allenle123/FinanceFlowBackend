import { DynamoDB } from 'aws-sdk';
import { Transaction, TransactionInput } from '../types/transaction';
import { v4 as uuidv4 } from 'uuid';

const dynamodb = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TRANSACTIONS_TABLE!;

export const createTransaction = async (
    transaction: TransactionInput,
): Promise<Transaction> => {
    const newTransaction: Transaction = {
        ...transaction,
        transactionId: uuidv4(),
    };

    await dynamodb
        .put({
            TableName: TABLE_NAME,
            Item: newTransaction,
        })
        .promise();

    return newTransaction;
};

export const getTransactionsByUser = async (
    userId: string,
): Promise<Transaction[]> => {
    console.log(`Querying GET transaction for userId of: ${userId}`);

    const result = await dynamodb
        .query({
            TableName: TABLE_NAME,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId,
            },
        })
        .promise();

    return result.Items as Transaction[];
};

export const deleteTransaction = async (
    userId: string,
    transactionId: string,
): Promise<void> => {
    console.log(`Querying DELETE transaction for userId of: ${userId}`);

    await dynamodb
        .delete({
            TableName: TABLE_NAME,
            Key: {
                userId,
                transactionId,
            },
        })
        .promise();
};

export const updateTransaction = async (
    userId: string,
    transactionId: string,
    updateFields: Partial<Omit<Transaction, 'userId' | 'transactionId'>>,
): Promise<Transaction> => {
    console.log(
        `Querying UPDATE transaction for userId of: ${userId} and transactionId of: ${transactionId}`,
    );

    // Ensure there are fields to update
    if (!Object.keys(updateFields).length) {
        throw new Error('No fields provided to update.');
    }

    const updateExpressionParts: string[] = [];
    const expressionAttributeNames: { [key: string]: string } = {};
    const expressionAttributeValues: { [key: string]: any } = {};

    Object.keys(updateFields).forEach((key) => {
        const attributeKey = `#${key}`;
        const valueKey = `:${key}`;
        updateExpressionParts.push(`${attributeKey} = ${valueKey}`);
        expressionAttributeNames[attributeKey] = key; // Map reserved keywords
        expressionAttributeValues[valueKey] =
            updateFields[key as keyof typeof updateFields];
    });

    const params = {
        TableName: TABLE_NAME,
        Key: { userId, transactionId },
        UpdateExpression: `SET ${updateExpressionParts.join(', ')}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW', // Return the updated item
    };

    try {
        const result = await dynamodb.update(params).promise();

        if (!result.Attributes) {
            throw new Error('Transaction not found or update failed.');
        }

        return result.Attributes as Transaction;
    } catch (error) {
        console.error('Error updating transaction in DynamoDB:', error);
        throw new Error('Failed to update transaction');
    }
};
