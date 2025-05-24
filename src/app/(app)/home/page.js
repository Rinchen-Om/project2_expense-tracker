"use client";

import { useEffect, useState } from 'react';
import '../../styles/home.css';

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const [incomeRes, expenseRes] = await Promise.all([
        fetch('/api/income'),
        fetch('/api/expense'),
      ]);
      const [incomeData, expenseData] = await Promise.all([
        incomeRes.json(),
        expenseRes.json(),
      ]);
      const incomeTotal = incomeData.reduce((sum, item) => sum + Number(item.amount), 0);
      const expenseTotal = expenseData.reduce((sum, item) => sum + Number(item.amount), 0);
      setTotalIncome(incomeTotal);
      setTotalExpense(expenseTotal);
      setCurrentBalance(incomeTotal - expenseTotal);
      // Optionally, combine transactions for recent transactions table
      const combined = [
        ...incomeData.map(item => ({
          ...item,
          type: 'income',
          category: item.source || 'Income',
          description: item.description || item.source || 'Income',
          categoryIcon: 'money-bill-wave',
        })),
        ...expenseData.map(item => ({
          ...item,
          type: 'expense',
          category: item.category || 'Expense',
          description: item.note || item.description || 'Expense',
          categoryIcon: 'shopping-cart',
        })),
      ].sort((a, b) => new Date(b.date) - new Date(a.date));
      setTransactions(combined);
    }
    fetchData();
  }, []);

  const formatCurrency = (amount) => {
    return 'Nu. ' + Math.abs(amount).toFixed(2);
  };

  const displayedTransactions = showAllTransactions ? transactions : transactions.slice(0, 5);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Welcome to Your Personal Expense Tracker</h1>
          <p>Take control of your finances with our powerful yet simple expense tracking tool. Monitor your spending, set budgets, and achieve your financial goals.</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container">
        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="card">
            <div className="card-header">
              <span className="card-title">Total Income</span>
              <div className="card-icon income">
                <i className="fas fa-money-bill-wave"></i>
              </div>
            </div>
            <div className="card-value">{formatCurrency(totalIncome)}</div>
            <div className="card-change positive">+0% from last month</div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <span className="card-title">Total Expenses</span>
              <div className="card-icon expense">
                <i className="fas fa-shopping-cart"></i>
              </div>
            </div>
            <div className="card-value">{formatCurrency(totalExpense)}</div>
            <div className="card-change negative">-0% from last month</div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <span className="card-title">Current Balance</span>
              <div className="card-icon balance">
                <i className="fas fa-piggy-bank"></i>
              </div>
            </div>
            <div className="card-value">{formatCurrency(currentBalance)}</div>
            <div className="card-change positive">+0% from last month</div>
          </div>
        </div>

        {/* Recent Transactions */}
        <h2 className="section-title">Recent Transactions</h2>
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>
                  <div className="transaction-category">
                    <div className="category-icon">
                      <i className={`fas fa-${transaction.categoryIcon}`}></i>
                    </div>
                    {transaction.category}
                  </div>
                </td>
                <td>{transaction.description}</td>
                <td className={`transaction-amount ${transaction.type}`}>
                  {formatCurrency(transaction.amount)}
                </td>
                <td>
                  <div className="transaction-actions">
                    <button className="action-btn edit">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="action-btn delete">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {transactions.length > 5 && (
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            {!showAllTransactions ? (
              <button className="btn btn-primary" onClick={() => setShowAllTransactions(true)}>
                See More
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => setShowAllTransactions(false)}>
                See Less
              </button>
            )}
          </div>
        )}

        {/* About/Info Section */}
        <AboutSection />
      </main>
    </>
  );
}

function AboutSection() {
  return (
    <>
      <section className="about-hero">
        <div className="about-container">
          <h1>Track Smarter, <span>Spend Better</span></h1>
          <p>Your ultimate financial companion for effortless budgeting and expense tracking.</p>
        </div>
      </section>
      <section className="about-mission-vision">
        <div className="about-container about-flex">
          <div className="about-card">
            <h2>Our Mission</h2>
            <p>To empower individuals and businesses with intuitive financial tools that simplify budgeting, reduce unnecessary spending, and promote financial freedom.</p>
          </div>
          <div className="about-card">
            <h2>Our Vision</h2>
            <p>To become the most trusted expense management platform worldwide, helping millions achieve their financial goals with ease.</p>
          </div>
        </div>
      </section>
      <section className="about-features">
        <div className="about-container">
          <h2>Why Choose Expense Tracker?</h2>
          <div className="about-features-grid">
            <div className="about-feature-card">
              <div className="icon">📊</div>
              <h3>Smart Tracking</h3>
              <p>Automatically categorize expenses and analyze spending habits.</p>
            </div>
            <div className="about-feature-card">
              <div className="icon">📱</div>
              <h3>Seamless & Secure</h3>
              <p>Bank-level encryption keeps your data safe across all devices.</p>
            </div>
            <div className="about-feature-card">
              <div className="icon">📈</div>
              <h3>Powerful Insights</h3>
              <p>Interactive charts and reports for better financial decisions.</p>
            </div>
            <div className="about-feature-card">
              <div className="icon">🌍</div>
              <h3>Multi-Currency</h3>
              <p>Manage expenses in any currency—perfect for travelers.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 