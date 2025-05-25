"use client";

import { useEffect, useState } from "react";
import '../../styles/income.css';
import '../../styles/home.css';
import { Chart, Line, Pie } from 'react-chartjs-2';
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

const incomeSources = [
  { value: 'salary', label: 'Salary' },
  { value: 'freelance', label: 'Freelance Work' },
  { value: 'gift', label: 'Gifts' },
  { value: 'rental', label: 'Rental Income' },
  { value: 'investment', label: 'Investments' },
  { value: 'other', label: 'Other' },
];

export default function IncomePage() {
  const [incomes, setIncomes] = useState([]);
  const [form, setForm] = useState({
    amount: '',
    source: '',
    customSource: '',
    date: '',
    description: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [goal, setGoal] = useState('');
  const [goalEdit, setGoalEdit] = useState(false);
  const [filter, setFilter] = useState({ period: 'all', source: 'all' });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('table');

  // Fetch incomes on mount
  useEffect(() => {
    fetchIncomes();
    // Optionally, fetch goal from localStorage or API
    setGoal(localStorage.getItem('incomeGoal') || '');
  }, []);

  async function fetchIncomes() {
    try {
      const res = await fetch('/api/income');
      if (!res.ok) {
        const errData = await res.json();
        if (res.status === 401) {
          setError('You must be logged in to view your incomes.');
          setIncomes([]);
          return;
        } else {
          setError(errData.error || 'Failed to fetch incomes.');
          setIncomes([]);
          return;
        }
      }
      const data = await res.json();
      setIncomes(data);
      setError('');
    } catch (err) {
      setError('An unexpected error occurred.');
      setIncomes([]);
    }
  }

  function resetForm() {
    setForm({ amount: '', source: '', customSource: '', date: '', description: '' });
    setEditingId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!form.amount || !form.source || !form.date) {
      setError('Amount, source, and date are required.');
      return;
    }
    const payload = {
      amount: form.amount,
      source: form.source === 'other' ? form.customSource : form.source,
      date: form.date,
      description: form.description,
    };
    if (editingId) {
      await fetch(`/api/income/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch('/api/income', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }
    fetchIncomes();
    resetForm();
  }

  function handleEdit(income) {
    setForm({
      amount: income.amount,
      source: incomeSources.some(s => s.value === income.source) ? income.source : 'other',
      customSource: incomeSources.some(s => s.value === income.source) ? '' : income.source,
      date: income.date.split('T')[0],
      description: income.description || '',
    });
    setEditingId(income.id);
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this income record?')) return;
    await fetch(`/api/income/${id}`, { method: 'DELETE' });
    fetchIncomes();
  }

  function handleGoalSave() {
    localStorage.setItem('incomeGoal', goal);
    setGoalEdit(false);
  }

  // Filtering
  const filteredIncomes = incomes.filter((income) => {
    const dateObj = new Date(income.date);
    const now = new Date();
    let periodMatch = true;
    if (filter.period === 'month') {
      periodMatch =
        dateObj.getMonth() === now.getMonth() &&
        dateObj.getFullYear() === now.getFullYear();
    } else if (filter.period === 'year') {
      periodMatch = dateObj.getFullYear() === now.getFullYear();
    }
    let sourceMatch =
      filter.source === 'all' || income.source === filter.source;
    return periodMatch && sourceMatch;
  });

  // Stats
  const monthlyIncome = incomes
    .filter((income) => {
      const d = new Date(income.date);
      const n = new Date();
      return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
    })
    .reduce((sum, i) => sum + Number(i.amount), 0);
  const yearlyIncome = incomes
    .filter((income) => {
      const d = new Date(income.date);
      const n = new Date();
      return d.getFullYear() === n.getFullYear();
    })
    .reduce((sum, i) => sum + Number(i.amount), 0);
  const sourceMap = {};
  incomes.forEach((i) => {
    sourceMap[i.source] = (sourceMap[i.source] || 0) + Number(i.amount);
  });
  const topSource = Object.entries(sourceMap).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

  // Chart Data
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const monthlyData = Array(12).fill(0);
  incomes.forEach((income) => {
    const d = new Date(income.date);
    if (d.getFullYear() === new Date().getFullYear()) {
      monthlyData[d.getMonth()] += Number(income.amount);
    }
  });
  const lineData = {
    labels: months,
    datasets: [
      {
        label: 'Income Trend',
        data: monthlyData,
        backgroundColor: 'rgba(79, 195, 247, 0.2)',
        borderColor: 'rgba(79, 195, 247, 1)',
        borderWidth: 2,
        tension: 0.1,
        fill: true,
      },
    ],
  };
  const pieData = {
    labels: Object.keys(sourceMap),
    datasets: [
      {
        data: Object.values(sourceMap),
        backgroundColor: [
          'rgba(40, 167, 69, 0.7)',
          'rgba(255, 193, 7, 0.7)',
          'rgba(23, 162, 184, 0.7)',
          'rgba(220, 53, 69, 0.7)',
          'rgba(108, 117, 125, 0.7)',
          'rgba(0, 123, 255, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Goal progress
  const goalValue = parseFloat(goal) || 0;
  const progress = goalValue > 0 ? Math.min((monthlyIncome / goalValue) * 100, 100) : 0;

  // Pie chart options for styling
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { size: 14, family: "'Montserrat', sans-serif" },
          color: '#3f37c9',
          padding: 20,
          boxWidth: 20,
        },
      },
      title: {
        display: true,
        text: 'Income Distribution',
        font: { size: 18, family: "'Montserrat', sans-serif" },
        color: '#4361ee',
        padding: { top: 10, bottom: 30 }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = total ? Math.round((value / total) * 100) : 0;
            return `${label}: Nu. ${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Income Tracker</h1>
      <div className="income-section">
        <div className="income-form">
          <h2 className="form-title">{editingId ? 'Edit Income' : 'Add Income'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                className="form-control"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
                value={form.amount}
                onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label htmlFor="source">Income Source</label>
              <select
                id="source"
                className="form-control"
                required
                value={form.source}
                onChange={e => setForm(f => ({ ...f, source: e.target.value }))}
              >
                <option value="" disabled>Select source</option>
                {incomeSources.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            {form.source === 'other' && (
              <div className="form-group">
                <label htmlFor="customSource">Custom Source</label>
                <input
                  type="text"
                  id="customSource"
                  className="form-control"
                  placeholder="Enter custom income source"
                  required
                  value={form.customSource}
                  onChange={e => setForm(f => ({ ...f, customSource: e.target.value }))}
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                className="form-control"
                required
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description (Optional)</label>
              <textarea
                id="description"
                className="form-control"
                rows={3}
                placeholder="Add any additional details"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="btn btn-block">
              {editingId ? 'Update Income' : 'Add Income'}
            </button>
            {editingId && (
              <button type="button" className="btn btn-block" style={{ background: '#ccc', color: '#222', marginTop: 8 }} onClick={resetForm}>
                Cancel
              </button>
            )}
          </form>
        </div>
        <div className="income-summary">
          <h2 className="summary-title">Income Overview</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>This Month</h3>
              <p>Nu. {monthlyIncome.toFixed(2)}</p>
            </div>
            <div className="stat-card">
              <h3>This Year</h3>
              <p>Nu. {yearlyIncome.toFixed(2)}</p>
            </div>
            <div className="stat-card">
              <h3>Top Source</h3>
              <p>{topSource}</p>
            </div>
          </div>
          <div className="income-goal">
            <div className="goal-header">
              <h3 className="goal-title">Monthly Income Goal</h3>
              {!goalEdit && <button className="btn btn-sm" onClick={() => setGoalEdit(true)}>Edit Goal</button>}
            </div>
            {goalEdit ? (
              <div>
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter monthly goal"
                    min="0"
                    value={goal}
                    onChange={e => setGoal(e.target.value)}
                  />
                </div>
                <button className="btn btn-sm btn-block" onClick={handleGoalSave}>Save Goal</button>
              </div>
            ) : (
              <div id="goalProgress">
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="goal-info">
                  <span id="currentAmount">Nu. {monthlyIncome.toFixed(2)}</span>
                  <span id="goalAmount">Nu. {goalValue.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
          <div className="chart-container">
            <Line data={lineData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
        </div>
      </div>
      <div className="income-history">
        <h2 className="history-title">Income History</h2>
        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="timeFilter">Period:</label>
            <select
              id="timeFilter"
              className="select-filter"
              value={filter.period}
              onChange={e => setFilter(f => ({ ...f, period: e.target.value }))}
            >
              <option value="all">All Time</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="sourceFilter">Source:</label>
            <select
              id="sourceFilter"
              className="select-filter"
              value={filter.source}
              onChange={e => setFilter(f => ({ ...f, source: e.target.value }))}
            >
              <option value="all">All Sources</option>
              {incomeSources.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="tabs">
          <div
            className={`tab${activeTab === 'table' ? ' active' : ''}`}
            onClick={() => setActiveTab('table')}
          >
            Table View
          </div>
          <div
            className={`tab${activeTab === 'chart' ? ' active' : ''}`}
            onClick={() => setActiveTab('chart')}
          >
            Chart View
          </div>
        </div>
        <div className={`tab-content${activeTab === 'table' ? ' active' : ''}`} id="tableTab">
          <table id="incomeTable">
            <thead>
              <tr>
                <th>Date</th>
                <th>Source</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="incomeTableBody">
              {filteredIncomes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="no-data">
                    <i className="fas fa-wallet" style={{ fontSize: '3rem', marginBottom: 15 }}></i>
                    <p>No income records found. Add your first income above!</p>
                  </td>
                </tr>
              ) : (
                filteredIncomes.map((income) => {
                  let badgeClass = 'badge-other';
                  if (income.source === 'salary') badgeClass = 'badge-salary';
                  else if (income.source === 'freelance') badgeClass = 'badge-freelance';
                  else if (income.source === 'gift') badgeClass = 'badge-gift';
                  else if (income.source === 'rental') badgeClass = 'badge-rental';
                  else if (income.source === 'investment') badgeClass = 'badge-investment';
                  return (
                    <tr key={income.id}>
                      <td>{new Date(income.date).toLocaleDateString()}</td>
                      <td><span className={`badge ${badgeClass}`}>{income.source}</span></td>
                      <td>Nu. {Number(income.amount).toFixed(2)}</td>
                      <td>{income.description || '-'}</td>
                      <td className="actions">
                        <button className="btn btn-sm btn-edit" onClick={() => handleEdit(income)}>Edit</button>
                        <button className="btn btn-sm btn-delete" onClick={() => handleDelete(income.id)}>Delete</button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className={`tab-content${activeTab === 'chart' ? ' active' : ''}`} id="chartTab">
          <div className="chart-container">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>
    </div>
  );
} 