import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction, Budget } from '../types';

interface FinanceState {
  transactions: Transaction[];
  budgets: Budget[];
}

const initialState: FinanceState = {
  transactions: [],
  budgets: [],
};


const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(
        (transaction) => transaction.id === action.payload.id
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    setBudget: (state, action: PayloadAction<Budget>) => {
      const index = state.budgets.findIndex(
        (budget) => budget.month === action.payload.month
      );
      if (index !== -1) {
        state.budgets[index] = action.payload;
      } else {
        state.budgets.push(action.payload);
      }
    },
  },
});

export const { addTransaction, deleteTransaction, updateTransaction, setBudget } =
  financeSlice.actions;
export default financeSlice.reducer;