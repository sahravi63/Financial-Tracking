import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddExpense from './AddExpense';
import ExpenseList from './ExpenseList';

const MainPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showExpenseList, setShowExpenseList] = useState(true); // Default to true to show the list

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/expenses', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setExpenses(response.data);
      console.log('Fetched expenses:', response.data); // Log fetched expenses
    } catch (error) {
      console.error('Error fetching expenses:', error.response?.data || error.message);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      await axios.post('http://localhost:5000/api/expenses', expenseData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      fetchExpenses(); // Refresh expenses after adding a new one
    } catch (error) {
      console.error('Error adding expense:', error.response?.data || error.message);
    }
  };

  const handleRemoveExpense = async (expenseId) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${expenseId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchExpenses(); // Refresh expenses after removal
    } catch (error) {
      console.error('Error removing expense:', error.response?.data || error.message);
    }
  };

  const toggleExpenseList = () => {
    console.log(`Toggling showExpenseList: ${!showExpenseList}`);
    setShowExpenseList(prevState => !prevState); // Proper state update with callback
  };

  return (
    <div className="main-page">
      <h1>Expense Management</h1>
      <div className="buttons">
        <button onClick={() => setShowAddExpense(prev => !prev)}>
          {showAddExpense ? 'Hide Add Expense' : 'Add Expense'}
        </button>
        <button onClick={toggleExpenseList}>
          {showExpenseList ? 'Hide Expenses' : 'Show Expenses'}
        </button>
      </div>

      {showAddExpense && <AddExpense onAddExpense={handleAddExpense} />}
      {showExpenseList && <ExpenseList expenses={expenses} onRemoveExpense={handleRemoveExpense} />}
    </div>
  );
};

export default MainPage;
