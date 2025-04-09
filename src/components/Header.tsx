import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Wallet } from 'lucide-react';

const Header = () => {
  const transactions = useSelector((state: RootState) => state.finance.transactions);
  const currentMonth = new Date().toLocaleString('default', {day: 'numeric', month: 'long', year: 'numeric' });
  const currentTime = new Date().toLocaleTimeString();
  
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <header className="bg-indigo-600 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Wallet size={32} />
            <h1 className="text-2xl font-bold">Finance Tracker</h1>
          </div>
          <div className="flex space-x-6">
            <div>
              <p className="text-sm text-indigo-200">Income</p>
              <p className="font-semibold">₹{totalIncome.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-indigo-200">Expenses</p>
              <p className="font-semibold">₹{totalExpenses.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-indigo-200">Balance</p>
              <p className="font-semibold">₹{(totalIncome - totalExpenses).toFixed(2)}</p>
            </div>
          </div>
        </div>
        {/* <p className="mt-2 text-indigo-200">{currentMonth}{currentTime}</p> */}

        <div className="flex gap-10">
        <p className="mt-2 text-indigo-200">{currentMonth}</p>
        <p className="mt-2 text-indigo-200">{currentTime}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;