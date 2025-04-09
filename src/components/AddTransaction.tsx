import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../store/financeSlice";
import { Transaction, TransactionType, TransactionCategory } from "../types";
import { PlusCircle } from "lucide-react";

const AddTransaction = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "expense" as TransactionType,
    category: "food" as TransactionCategory,
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const categories: TransactionCategory[] = [
    "food",
    "transport",
    "entertainment",
    "shopping",
    "utilities",
    "salary",
    "investment",
    "games",
    "other",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const transaction: Transaction = {
      id: crypto.randomUUID(),
      ...formData,
      amount: parseFloat(formData.amount),
    };

     // 🔹 Get existing cookie data
  const existingCookie = document.cookie
  .split('; ')
  .find((row) => row.startsWith('transactions='));

const existingTransactions = existingCookie
  ? JSON.parse(decodeURIComponent(existingCookie.split('=')[1]))
  : [];

// 🔹 Add new transaction
const updatedTransactions = [...existingTransactions, transaction];

// 🔹 Save back to cookie
document.cookie = `transactions=${encodeURIComponent(
  JSON.stringify(updatedTransactions)
)}; path=/; max-age=${60 * 60 * 24 * 7}`; // expires in 7 days


    // 🔹 Save to sessionStorage
    const existingData = JSON.parse(
      sessionStorage.getItem("transactions") || "[]"
    );
    sessionStorage.setItem(
      "transactions",
      JSON.stringify([...existingData, transaction])
    );

    dispatch(addTransaction(transaction));
    setFormData({
      type: "expense",
      category: "food",
      amount: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
    setIsOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <PlusCircle size={20} />
          <span>Add Transaction</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as TransactionType,
                  })
                }
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as TransactionCategory,
                  })
                }
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Add Transaction
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddTransaction;
