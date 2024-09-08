import React, { useEffect, useState } from 'react';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  // Fetch the token from localStorage
  useEffect(() => {
    const fetchToken = () => {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!token) {
        setError('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/expenses', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include', // If using cookies
        });

        if (!response.ok) {
          throw new Error('Failed to fetch expenses.');
        }

        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [token]); // Re-run when the token changes

  if (loading) return <p>Loading expenses...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h2>Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses to display.</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <li key={expense._id}>
              {expense.description}: ${expense.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
