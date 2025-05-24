"use client";

import { useEffect, useState } from "react";
import '../../styles/dashboard.css';
import '../../styles/home.css';
import dynamic from 'next/dynamic';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const Bar = dynamic(() => import('react-chartjs-2').then(mod => mod.Bar), { ssr: false });
const Doughnut = dynamic(() => import('react-chartjs-2').then(mod => mod.Doughnut), { ssr: false });

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function DashboardPage() {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [incomeRes, expenseRes] = await Promise.all([
        fetch('/api/income'),
        fetch('/api/expense'),
      ]);
      const [income, expense] = await Promise.all([
        incomeRes.json(),
        expenseRes.json(),
      ]);
      setIncomeData(income);
      setExpenseData(expense);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Calculate stats
  const totalIncome = incomeData.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalExpense = expenseData.reduce((sum, item) => sum + Number(item.amount), 0);
  const currentBalance = totalIncome - totalExpense;
  const monthlySavings = totalIncome * 0.2;

  // Group by month
  const monthlyIncome = Array(12).fill(0);
  const monthlyExpense = Array(12).fill(0);
  incomeData.forEach(item => {
    const date = new Date(item.date || item.datetime || new Date());
    monthlyIncome[date.getMonth()] += Number(item.amount);
  });
  expenseData.forEach(item => {
    const date = new Date(item.date || new Date());
    monthlyExpense[date.getMonth()] += Number(item.amount);
  });

  // Group expenses by category
  const categoryMap = {};
  expenseData.forEach(item => {
    const category = item.category || 'Uncategorized';
    if (!categoryMap[category]) categoryMap[category] = 0;
    categoryMap[category] += Number(item.amount);
  });
  // Sort categories by amount, top 6
  const sortedCategories = Object.entries(categoryMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  // Chart data
  const barData = {
    labels: monthNames,
    datasets: [
      {
        label: 'Income',
        data: monthlyIncome,
        backgroundColor: '#4bb543',
        borderRadius: 4,
      },
      {
        label: 'Expenses',
        data: monthlyExpense,
        backgroundColor: '#d9534f',
        borderRadius: 4,
      },
    ],
  };

  const doughnutData = {
    labels: sortedCategories.map(item => item[0]),
    datasets: [
      {
        data: sortedCategories.map(item => item[1]),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Helper: get icon for category
  function getCategoryIcon(category) {
    const icons = {
      'Housing': 'home',
      'Food': 'utensils',
      'Transport': 'gas-pump',
      'Entertainment': 'film',
      'Shopping': 'shopping-bag',
      'Health': 'heartbeat',
      'Education': 'book',
      'Utilities': 'lightbulb',
      'Travel': 'plane',
      'Gifts': 'gift',
      'Insurance': 'shield-alt',
      'Investment': 'chart-line',
      'Mobile & Internet': 'wifi',
      'Subscriptions': 'tv',
      'Gifts & Donations': 'gift',
      'Savings': 'coins',
      'Cloths': 'tshirt',
      'Grocieries': 'shopping-basket',
      'Stationaries': 'pen',
      'Rent': 'building',
      'other': 'shopping-cart',
      'Uncategorized': 'question',
      'Income': 'money-bill-wave',
    };
    return icons[category] || 'shopping-cart';
  }

  // Expense Breakdown: calculate percentages
  const totalExpenses = totalExpense || 1; // avoid division by zero
  const expenseBreakdown = sortedCategories.map(([category, amount]) => ({
    category,
    amount,
    percent: Math.round((amount / totalExpenses) * 100),
    icon: getCategoryIcon(category),
  }));

  // Recent Transactions: combine and sort
  const recentTransactions = [
    ...incomeData.map(item => ({
      type: 'income',
      date: item.date || item.datetime || new Date(),
      category: 'Income',
      description: item.source || 'Income',
      amount: Number(item.amount),
      icon: getCategoryIcon('Income'),
    })),
    ...expenseData.map(item => ({
      type: 'expense',
      date: item.date || new Date(),
      category: item.category || 'Expense',
      description: item.note || item.name || 'Expense',
      amount: Number(item.amount),
      icon: getCategoryIcon(item.category),
    })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);

  return (
    <main className="container">
      <div className="dashboard-header" style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:30}}>
        <h1 className="dashboard-title">Financial Dashboard</h1>
        <div className="date-filter">
          <select id="timePeriod" disabled>
            <option value="month">This Month</option>
          </select>
          <button className="btn btn-primary" disabled><i className="fas fa-filter"></i> Apply</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Total Income</span>
            <div className="card-icon income">
              <i className="fas fa-money-bill-wave"></i>
            </div>
          </div>
          <div className="card-value">Nu. {totalIncome.toFixed(2)}</div>
          <div className="card-change positive">+0% from last month</div>
        </div>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Total Expenses</span>
            <div className="card-icon expense">
              <i className="fas fa-shopping-cart"></i>
            </div>
          </div>
          <div className="card-value">Nu. {totalExpense.toFixed(2)}</div>
          <div className="card-change negative">-0% from last month</div>
        </div>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Current Balance</span>
            <div className="card-icon balance">
              <i className="fas fa-piggy-bank"></i>
            </div>
          </div>
          <div className="card-value">Nu. {currentBalance.toFixed(2)}</div>
          <div className="card-change positive">+0% from last month</div>
        </div>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Monthly Savings</span>
            <div className="card-icon savings">
              <i className="fas fa-coins"></i>
            </div>
          </div>
          <div className="card-value">Nu. {monthlySavings.toFixed(2)}</div>
          <div className="card-change positive">+0% from last month</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-container">
        <div className="chart-card">
          <h3 className="chart-title">Income vs Expenses</h3>
          <div className="chart-container" style={{height:300}}>
            {!loading && <Bar data={barData} options={{responsive:true, plugins:{legend:{position:'top'}}}} />}
          </div>
        </div>
        <div className="chart-card">
          <h3 className="chart-title">Spending by Category</h3>
          <div className="chart-container" style={{height:300}}>
            {!loading && sortedCategories.length > 0 ? (
              <Doughnut data={doughnutData} options={{responsive:true, plugins:{legend:{position:'right'}}}} />
            ) : (
              <div className="no-data">No data for chart</div>
            )}
          </div>
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className="expense-breakdown">
        <h2 className="section-title">Expense Breakdown</h2>
        <div className="categories-grid">
          {expenseBreakdown.map((cat, idx) => (
            <div className="category-item" key={cat.category}>
              <div className="category-icon" style={{backgroundColor: doughnutData.datasets[0].backgroundColor[idx % doughnutData.datasets[0].backgroundColor.length]}}>
                <i className={`fas fa-${cat.icon}`}></i>
              </div>
              <div className="category-info">
                <div className="category-name">{cat.category}</div>
                <div className="category-amount">Nu. {cat.amount.toFixed(2)} ({cat.percent}%)</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="recent-transactions">
        <h2 className="section-title">Recent Transactions</h2>
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((tx, idx) => {
              const date = new Date(tx.date);
              const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
              return (
                <tr key={idx}>
                  <td>{formattedDate}</td>
                  <td>
                    <div className="transaction-category">
                      <div className="transaction-icon">
                        <i className={`fas fa-${tx.icon}`}></i>
                      </div>
                      <span>{tx.category}</span>
                    </div>
                  </td>
                  <td>{tx.description}</td>
                  <td className={`transaction-amount ${tx.type}`}>{tx.type === 'income' ? '+' : '-'}Nu. {tx.amount.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
} 