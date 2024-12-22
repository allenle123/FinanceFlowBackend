export interface Transaction {
  userId: string;
  transactionId: string;
  amount: number;
  description?: string;
  date: string;
}

export interface TransactionInput extends Omit<Transaction, 'transactionId'> { } 