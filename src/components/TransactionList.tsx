import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { deleteTransaction, updateTransaction, } from "../store/financeSlice";
import { Transaction, TransactionCategory } from "../types";
import { Trash2, Filter, Pencil, Save } from "lucide-react";

const TransactionList = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state: RootState) => state.finance.transactions);

  const [categoryFilter, setCategoryFilter] = useState<TransactionCategory | "all">("all");
  const [dateFilter, setDateFilter] = useState("");

  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Transaction>>({});

 

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesCategory = categoryFilter === "all" || transaction.category === categoryFilter;
    const matchesDate = !dateFilter || transaction.date === dateFilter;
    return matchesCategory && matchesDate;
  });

  const categories: TransactionCategory[] = [
    "food", "transport", "entertainment", "shopping",
    "utilities", "salary", "investment", "games", "other",
  ];

  const handleEdit = (transaction: Transaction) => {
    setEditId(transaction.id);
    setEditData({ ...transaction });
  };

  const handleSave = () => {
    dispatch(updateTransaction(editData as Transaction));
    setEditId(null);
    setEditData({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-500" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as TransactionCategory | "all")}
              className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredTransactions.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No transactions found</p>
        ) : (
          filteredTransactions.map((transaction) => {
            const isEditing = transaction.id === editId;
            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  {isEditing ? (
                    <>
                      <input
                        value={editData.description || ""}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        className="w-full border p-1 rounded mb-1"
                      />
                      <input
                        type="number"
                        value={editData.amount || 0}
                        onChange={(e) =>
                          setEditData({ ...editData, amount: parseFloat(e.target.value) })
                        }
                        className="w-full border p-1 rounded mb-1"
                      />
                      <select
                        value={editData.category || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, category: e.target.value as TransactionCategory })
                        }
                        className="w-full border p-1 rounded"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-500">
                        {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)} •{" "}
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <span
                    className={`font-semibold ₹${
                      transaction.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}₹
                    {transaction.amount.toFixed(2)}
                  </span>

                  {isEditing ? (
                    <button
                      onClick={handleSave}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Save size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(transaction)}
                      className="text-gray-400 hover:text-yellow-500 transition-colors"
                    >
                      <Pencil size={20} />
                    </button>
                  )}

                  <button
                    onClick={() => dispatch(deleteTransaction(transaction.id))}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TransactionList;
