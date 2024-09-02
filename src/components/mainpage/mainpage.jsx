import React, { useState } from 'react';
import axios from 'axios';

const MainPage = () => {
  const [expense, setExpense] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [bill, setBill] = useState("");
  const [message, setMessage] = useState("");

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
    } catch (error) {
      console.error('Error saving data:', error);
      setMessage("Failed to save data.");
    }
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
    </div>
  );
};

export default MainPage;
