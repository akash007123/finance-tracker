import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Wallet } from 'lucide-react';

const Header = () => {
  const transactions = useSelector((state: RootState) => state.finance.transactions);
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const currentTime = currentDate.toLocaleTimeString();

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          <div className="flex items-center space-x-3">
            <Wallet size={36} className="text-white" />
            <h1 className="text-3xl font-bold">Finance Tracker</h1>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
            <div>
              <p className="text-sm text-indigo-200">Income</p>
              <p className="text-lg font-semibold">₹{totalIncome.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-indigo-200">Expenses</p>
              <p className="text-lg font-semibold">₹{totalExpenses.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-indigo-200">Balance</p>
              <p className="text-lg font-semibold">₹{balance.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-5 text-indigo-200">
          <p>{currentMonth}</p>
          <p>{currentTime}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
