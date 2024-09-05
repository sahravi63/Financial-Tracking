import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ExpenseList from './ExpenseList';
import AddExpense from './AddExpense';

const MainPage = () => {
  const [expense, setExpense] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [bill, setBill] = useState("");
  const [message, setMessage] = useState("");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch expenses from the backend when the component mounts
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/financial-data');
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/financial-data', {
        expense,
        creditCard,
        bill,
      });
      setMessage("Data saved successfully!");
      setExpense("");
      setCreditCard("");
      setBill("");

      // Optionally fetch the updated list of expenses
      const response = await axios.get('http://localhost:5000/financial-data');
      setExpenses(response.data);
    } catch (error) {
      console.error('Error saving data:', error);
      setMessage("Failed to save data.");
    }
  };

  const handleAddExpense = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  return (
    <div className="mainPage">
      <h1>Manage Your Financial Data</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Expense:</label>
          <input
            type="text"
            value={expense}
            onChange={(e) => setExpense(e.target.value)}
            placeholder="Enter expense"
          />
        </div>
        <div>
          <label>Credit Card Record:</label>
          <input
            type="text"
            value={creditCard}
            onChange={(e) => setCreditCard(e.target.value)}
            placeholder="Enter credit card record"
          />
        </div>
        <div>
          <label>Bill to Pay:</label>
          <input
            type="text"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            placeholder="Enter bill to pay"
          />
        </div>
        <button type="submit">Save</button>
      </form>
      {message && <p>{message}</p>}

      {/* Render the links to other expense management pages */}
      <div className="expense-links">
        <Link to="/expenses">View Expenses</Link>
        <Link to="/add-expense">Add Expense</Link>
      </div>

      {/* Render AddExpense and ExpenseList components */}
      <AddExpense onAdd={handleAddExpense} />
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default MainPage;
