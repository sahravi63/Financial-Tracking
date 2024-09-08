import React, { useState, useEffect } from 'react';
import AddExpense from './AddExpense';
import ExpenseList from './ExpenseList';

const MainPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showExpenseList, setShowExpenseList] = useState(true);

  // Fetch expenses when component mounts
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('/api/expenses');  // Adjust the API endpoint as needed
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData),
      });
      if (response.ok) {
        fetchExpenses();  // Refresh expenses after adding a new one
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleRemoveExpense = async (expenseId) => {
    try {
      const response = await fetch(`/api/expenses/${expenseId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchExpenses();  // Refresh expenses after removal
      }
    } catch (error) {
      console.error('Error removing expense:', error);
    }
  };

  return (
    <div className="main-page">
      <h1>Expense Management</h1>
      <div className="buttons">
        <button onClick={() => setShowAddExpense(!showAddExpense)}>
          {showAddExpense ? 'Hide Add Expense' : 'Add Expense'}
        </button>
        <button onClick={() => setShowExpenseList(!showExpenseList)}>
          {showExpenseList ? 'Hide Expenses' : 'Show Expenses'}
        </button>
      </div>
      
      {showAddExpense && <AddExpense onAddExpense={handleAddExpense} />}
      {showExpenseList && <ExpenseList expenses={expenses} onRemoveExpense={handleRemoveExpense} />}
    </div>
  );
};

export default MainPage;
