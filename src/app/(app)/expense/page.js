"use client";

import { useEffect, useState } from "react";
import '../../styles/expense.css';
import '../../styles/home.css';
import dynamic from 'next/dynamic';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Line = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), { ssr: false });
const Pie = dynamic(() => import('react-chartjs-2').then(mod => mod.Pie), { ssr: false });

const expenseCategories = [
  { value: 'Food', label: 'Food' },
  { value: 'Transport', label: 'Transport' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Utilities', label: 'Utilities' },
  { value: 'Rent', label: 'Rent' },
  { value: 'Education', label: 'Education' },
  { value: 'Shopping', label: 'Shopping' },
  { value: 'Health', label: 'Health' },
  { value: 'Insurance', label: 'Insurance' },
  { value: 'Investment', label: 'Investment' },
  { value: 'Mobile & Internet', label: 'Mobile & Internet' },
  { value: 'Subscriptions', label: 'Subscriptions' },
  { value: 'Gifts & Donations', label: 'Gifts & Donations' },
  { value: 'Travel', label: 'Travel' },
  { value: 'Savings', label: 'Savings' },
  { value: 'Cloths', label: 'Cloths' },
  { value: 'Grocieries', label: 'Grocieries' },
  { value: 'Stationaries', label: 'Stationaries' },
  { value: 'other', label: 'Other' },
];

export default function ExpensePage() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    amount: '',
    category: '',
    customCategory: '',
    date: '',
    description: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState({ period: 'all', category: 'all' });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch expenses on mount
  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses() {
    const res = await fetch('/api/expense');
    const data = await res.json();
    setExpenses(data);
  }

  function resetForm() {
    setForm({ amount: '', category: '', customCategory: '', date: '', description: '' });
    setEditingId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!form.amount || !form.category || !form.date) {
      setError('Amount, category, and date are required.');
      return;
    }
    const payload = {
      amount: form.amount,
      category: form.category === 'other' ? form.customCategory : form.category,
      date: form.date,
      description: form.description,
    };
    if (editingId) {
      await fetch(`/api/expense/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch('/api/expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }
    fetchExpenses();
    resetForm();
  }

  function handleEdit(expense) {
    setForm({
      amount: expense.amount,
      category: expenseCategories.some(c => c.value === expense.category) ? expense.category : 'other',
      customCategory: expenseCategories.some(c => c.value === expense.category) ? '' : expense.category,
      date: expense.date.split('T')[0],
      description: expense.note || '',
    });
    setEditingId(expense.id);
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this expense record?')) return;
    await fetch(`/api/expense/${id}`, { method: 'DELETE' });
    fetchExpenses();
  }

  // Filtering and Search
  const filteredExpenses = expenses.filter((expense) => {
    const dateObj = new Date(expense.date);
    const now = new Date();
    let periodMatch = true;
    if (filter.period === 'month') {
      periodMatch =
        dateObj.getMonth() === now.getMonth() &&
        dateObj.getFullYear() === now.getFullYear();
    } else if (filter.period === 'year') {
      periodMatch = dateObj.getFullYear() === now.getFullYear();
    }
    let categoryMatch =
      filter.category === 'all' || expense.category === filter.category;
    let searchMatch = true;
    if (searchQuery) {
      searchMatch = 
        expense.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.note?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.amount.toString().includes(searchQuery);
    }
    return periodMatch && categoryMatch && searchMatch;
  });

  // Stats
  const monthlyExpense = expenses
    .filter((expense) => {
      const d = new Date(expense.date);
      const n = new Date();
      return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
    })
    .reduce((sum, e) => sum + Number(e.amount), 0);
  const yearlyExpense = expenses
    .filter((expense) => {
      const d = new Date(expense.date);
      const n = new Date();
      return d.getFullYear() === n.getFullYear();
    })
    .reduce((sum, e) => sum + Number(e.amount), 0);
  const categoryMap = {};
  expenses.forEach((e) => {
    categoryMap[e.category] = (categoryMap[e.category] || 0) + Number(e.amount);
  });
  const topCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

  // Chart Data
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const monthlyData = Array(12).fill(0);
  expenses.forEach((expense) => {
    const d = new Date(expense.date);
    if (d.getFullYear() === new Date().getFullYear()) {
      monthlyData[d.getMonth()] += Number(expense.amount);
    }
  });
  const lineData = {
    labels: months,
    datasets: [
      {
        label: 'Expense Trend',
        data: monthlyData,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        tension: 0.1,
        fill: true,
      },
    ],
  };
  const pieData = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        data: Object.values(categoryMap),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(199, 199, 199, 0.7)',
          'rgba(83, 102, 255, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(199, 199, 199, 0.7)',
          'rgba(83, 102, 255, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
        ],
      },
    ],
  };

  return (
    <div className="container">
      <h1 className="page-title">Expense Tracker</h1>

      <div className="expense-section">
        <div className="expense-form">
          <h2 className="form-title">{editingId ? 'Edit Expense' : 'Add Expense'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="expenseAmount">Amount</label>
              <input
                type="number"
                id="expenseAmount"
                className="form-control"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="expenseCategory">Category</label>
              <select
                id="expenseCategory"
                className="form-control"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
              >
                <option value="" disabled>Select category</option>
                {expenseCategories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            {form.category === 'other' && (
              <div className="form-group" id="customCategoryGroup">
                <label htmlFor="customCategory">Custom Category</label>
                <input
                  type="text"
                  id="customCategory"
                  className="form-control"
                  value={form.customCategory}
                  onChange={(e) => setForm({ ...form, customCategory: e.target.value })}
                  placeholder="Enter custom category"
                  required
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="expenseDate">Date</label>
              <input
                type="date"
                id="expenseDate"
                className="form-control"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="expenseDescription">Description (Optional)</label>
              <textarea
                id="expenseDescription"
                className="form-control"
                rows="3"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Add any additional details"
              />
            </div>
            {error && <div className="error">{error}</div>}
            <button type="submit" className="btn btn-block">
              {editingId ? 'Update' : 'Add'} Expense
            </button>
            {editingId && (
              <button type="button" className="btn btn-block" onClick={resetForm}>
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="expense-summary">
          <h2 className="summary-title">Expense Overview</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>This Month</h3>
              <p>Nu. {monthlyExpense.toFixed(2)}</p>
            </div>
            <div className="stat-card">
              <h3>This Year</h3>
              <p>Nu. {yearlyExpense.toFixed(2)}</p>
            </div>
            <div className="stat-card">
              <h3>Top Category</h3>
              <p>{topCategory}</p>
            </div>
          </div>

          <div className="chart-container">
            <Line data={lineData} options={{ responsive: true }} />
          </div>
        </div>
      </div>

      <div className="expense-history">
        <h2 className="history-title">Expense History</h2>
        
        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="expenseTimeFilter">Period:</label>
            <select
              id="expenseTimeFilter"
              className="select-filter"
              value={filter.period}
              onChange={(e) => setFilter({ ...filter, period: e.target.value })}
            >
              <option value="all">All Time</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="expenseCategoryFilter">Category:</label>
            <select
              id="expenseCategoryFilter"
              className="select-filter"
              value={filter.category}
              onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            >
              <option value="all">All Categories</option>
              {expenseCategories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <div className="search-bar">
            <input
              type="text"
              id="expenseSearch"
              placeholder="Search expenses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="tabs">
          <div
            className={`tab ${activeTab === 'table' ? 'active' : ''}`}
            onClick={() => setActiveTab('table')}
          >
            Table View
          </div>
          <div
            className={`tab ${activeTab === 'chart' ? 'active' : ''}`}
            onClick={() => setActiveTab('chart')}
          >
            Chart View
          </div>
        </div>

        {activeTab === 'table' ? (
          <div className="tab-content active" id="tableTab">
            {filteredExpenses.length > 0 ? (
              <table id="expenseTable">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="expenseTableBody">
                  {filteredExpenses.map((expense) => (
                    <tr key={expense.id}>
                      <td>{new Date(expense.date).toLocaleDateString()}</td>
                      <td>{expense.category}</td>
                      <td>Nu. {Number(expense.amount).toFixed(2)}</td>
                      <td>{expense.note}</td>
                      <td className="actions">
                        <button
                          className="btn btn-sm btn-edit"
                          onClick={() => handleEdit(expense)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-delete"
                          onClick={() => handleDelete(expense.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-data">
                <p>No expense records found. Add your first expense above!</p>
              </div>
            )}
          </div>
        ) : (
          <div className="tab-content" id="chartTab">
            <div className="chart-container">
              {Object.keys(categoryMap).length > 0 ? (
                <Pie data={pieData} options={{ responsive: true }} />
              ) : (
                <div className="no-data">No data for chart</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 