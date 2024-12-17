export interface Transaction {
  userId: string;
  transactionId: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

export interface TransactionInput extends Omit<Transaction, 'transactionId'> {} 