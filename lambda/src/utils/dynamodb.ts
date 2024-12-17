import { DynamoDB } from 'aws-sdk';
import { Transaction, TransactionInput } from '../types/transaction';
import { v4 as uuidv4 } from 'uuid';

const dynamodb = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TRANSACTIONS_TABLE!;

export const createTransaction = async (transaction: TransactionInput): Promise<Transaction> => {
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

export const getTransactionsByUser = async (userId: string): Promise<Transaction[]> => {
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

export const deleteTransaction = async (userId: string, transactionId: string): Promise<void> => {
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