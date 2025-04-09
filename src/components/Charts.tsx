import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { TransactionCategory } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Charts = () => {
  const transactions = useSelector((state: RootState) => state.finance.transactions);

  const categories: TransactionCategory[] = [
    'food',
    'transport',
    'entertainment',
    'shopping',
    'utilities',
    'salary',
    'investment',
    'games',
    'other',
  ];

  const categoryTotals = categories.reduce((acc, category) => {
    const total = transactions
      .filter((t) => t.category === category && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return { ...acc, [category]: total };
  }, {} as Record<TransactionCategory, number>);

  const monthlyData = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleString('default', { month: 'short' });
    if (!acc[month]) {
      acc[month] = { income: 0, expenses: 0 };
    }
    if (transaction.type === 'income') {
      acc[month].income += transaction.amount;
    } else {
      acc[month].expenses += transaction.amount;
    }
    return acc;
  }, {} as Record<string, { income: number; expenses: number }>);

  const pieData = {
    labels: categories.map(
      (category) => category.charAt(0).toUpperCase() + category.slice(1)
    ),
    datasets: [
      {
        data: categories.map((category) => categoryTotals[category]),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF99CC',
          '#F5F3FD',
          '#7CBA3B',
        ],
      },
    ],
  };

  const barData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: 'Income',
        data: Object.values(monthlyData).map((d) => d.income),
        backgroundColor: '#4CAF50',
      },
      {
        label: 'Expenses',
        data: Object.values(monthlyData).map((d) => d.expenses),
        backgroundColor: '#F44336',
      },
    ],
  };

  return (
    <div className="space-y-8 container py-16 px-6">
      <div className="gap-5">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Expense Distribution</h2>
        <Pie data={pieData} options={{ plugins: { legend: { position: 'right' } } }} />
      </div>
      <br />
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Monthly Overview</h2>
        <Bar
          data={barData}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
      </div>
    </div>
  );
};

export default Charts;