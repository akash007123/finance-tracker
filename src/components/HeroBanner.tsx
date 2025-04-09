import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { TrendingUp, Target } from 'lucide-react';

const HeroBanner = () => {
  const transactions = useSelector((state: RootState) => state.finance.transactions);
  const budgets = useSelector((state: RootState) => state.finance.budgets);
  
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentBudget = budgets.find(b => b.month === currentMonth)?.amount || 0;
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const remainingBudget = currentBudget - totalExpenses;
  const percentageUsed = currentBudget ? (totalExpenses / currentBudget) * 100 : 0;

  return (
    <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white overflow-hidden">
      <div className="absolute top-0 right-0 opacity-10">
        <TrendingUp size={180} />
      </div>
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-4">
          <Target size={24} />
          <h2 className="text-2xl font-bold">Monthly Budget Overview</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-indigo-200">Budget</p>
            <p className="text-3xl font-bold">₹{currentBudget.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-indigo-200">Spent</p>
            <p className="text-3xl font-bold">₹{totalExpenses.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-indigo-200">Remaining</p>
            <p className="text-3xl font-bold">₹{remainingBudget.toFixed(2)}</p>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Budget Usage</span>
            <span>{percentageUsed.toFixed(1)}%</span>
          </div>
          <div className="h-2 bg-indigo-200 rounded-full">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `₹{Math.min(percentageUsed, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;