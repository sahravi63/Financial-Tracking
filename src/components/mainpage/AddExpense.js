// components/AddExpense.js
import React, { useState } from 'react';

const AddExpense = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expense = { description, amount: parseFloat(amount) };

    // Send POST request to the backend API
    const response = await fetch('/api/expenses/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense),
    });

    const data = await response.json();
    if (response.ok) {
      onAdd(data.expense);
      setDescription('');
      setAmount('');
    } else {
      console.error(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Expense description"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpense;
