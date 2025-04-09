export type TransactionType = 'income' | 'expense';

export type TransactionCategory =
  | 'food'
  | 'transport'
  | 'entertainment'
  | 'shopping'
  | 'utilities'
  | 'salary'
  | 'investment'
  | 'games'
  | 'other';

export interface Transaction {
  id: string;
  type: TransactionType;
  category: TransactionCategory;
  amount: number;
  description: string;
  date: string;
}

export interface Budget {
  amount: number;
  month: string;
}