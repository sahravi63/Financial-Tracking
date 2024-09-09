import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [editAmount, setEditAmount] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/expenses');
        setExpenses(response.data);
      } catch (error) {
        alert('Failed to fetch expenses');
      }
    };

    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      setExpenses(expenses.filter(expense => expense._id !== id));
    } catch (error) {
      alert('Failed to delete expense');
    }
  };

  const handleEdit = (expense) => {
    setEditing(expense._id);
    setEditDescription(expense.description);
    setEditAmount(expense.amount);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/expenses/${id}`, {
        description: editDescription,
        amount: editAmount,
      });
      setExpenses(expenses.map(expense => 
        expense._id === id ? { ...expense, description: editDescription, amount: editAmount } : expense
      ));
      setEditing(null);
      setEditDescription('');
      setEditAmount('');
    } catch (error) {
      alert('Failed to update expense');
    }
  };

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            {editing === expense._id ? (
              <div>
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <input
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                />
                <button onClick={() => handleUpdate(expense._id)}>Save</button>
                <button onClick={() => setEditing(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                {expense.description}: ${expense.amount}
                <button onClick={() => handleEdit(expense)}>Edit</button>
                <button onClick={() => handleDelete(expense._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
