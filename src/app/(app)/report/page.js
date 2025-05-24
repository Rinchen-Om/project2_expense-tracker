'use client';
import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/report.module.css';
import Chart from 'chart.js/auto';
import '../../styles/home.css';

export default function ReportPage() {
  const trendChartRef = useRef(null);
  const categoryChartRef = useRef(null);
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [summary, setSummary] = useState({ income: 0, expenses: 0, savings: 0 });
  const [transactions, setTransactions] = useState([]);
  const trendChartInstance = useRef(null);
  const categoryChartInstance = useRef(null);

  useEffect(() => {
    generateReport();
    // eslint-disable-next-line
  }, [month]);

  function generateReport() {
    const [year, monthNum] = month.split('-').map(Number);
    const startDate = new Date(year, monthNum - 1, 1);
    const endDate = new Date(year, monthNum, 0);

    const incomeRecords = JSON.parse(localStorage.getItem('incomeRecords')) || [];
    const expenseRecords = JSON.parse(localStorage.getItem('expenseRecords')) || [];

    const filteredIncome = incomeRecords.filter(r => {
      const d = new Date(r.date);
      return d >= startDate && d <= endDate;
    });
    const filteredExpenses = expenseRecords.filter(r => {
      const d = new Date(r.date);
      return d >= startDate && d <= endDate;
    });

    updateSummaryCards(filteredIncome, filteredExpenses);
    updateTrendChart(filteredIncome, filteredExpenses, startDate, endDate);
    updateCategoryChart(filteredExpenses);
    updateTransactionsTable(filteredIncome, filteredExpenses);
  }

  function updateSummaryCards(income, expenses) {
    const totalIncome = income.reduce((sum, r) => sum + r.amount, 0);
    const totalExpenses = expenses.reduce((sum, r) => sum + r.amount, 0);
    const netSavings = totalIncome - totalExpenses;
    setSummary({ income: totalIncome, expenses: totalExpenses, savings: netSavings });
  }

  function updateTrendChart(income, expenses, startDate, endDate) {
    const daysInMonth = endDate.getDate();
    const incomeByDay = Array(daysInMonth).fill(0);
    const expensesByDay = Array(daysInMonth).fill(0);
    const labels = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    income.forEach(record => {
      const day = new Date(record.date).getDate() - 1;
      incomeByDay[day] += record.amount;
    });
    expenses.forEach(record => {
      const day = new Date(record.date).getDate() - 1;
      expensesByDay[day] += record.amount;
    });

    if (trendChartInstance.current) trendChartInstance.current.destroy();
    trendChartInstance.current = new Chart(trendChartRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Income',
            data: incomeByDay,
            backgroundColor: 'rgba(74, 111, 165, 0.7)',
            borderColor: 'rgba(74, 111, 165, 1)',
            borderWidth: 1
          },
          {
            label: 'Expenses',
            data: expensesByDay,
            backgroundColor: 'rgba(239, 93, 93, 0.7)',
            borderColor: 'rgba(239, 93, 93, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => '$' + value
            }
          }
        }
      }
    });
  }

  function updateCategoryChart(expenses) {
    const categories = {
      housing: 0, food: 0, transportation: 0,
      healthcare: 0, leisure: 0, subscriptions: 0, other: 0
    };
    expenses.forEach(record => {
      categories[record.originalCategory || 'other'] += record.amount;
    });
    const labels = [];
    const data = [];
    for (const [category, amount] of Object.entries(categories)) {
      if (amount > 0) {
        labels.push(category.charAt(0).toUpperCase() + category.slice(1));
        data.push(amount);
      }
    }
    if (categoryChartInstance.current) categoryChartInstance.current.destroy();
    categoryChartInstance.current = new Chart(categoryChartRef.current, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: [
            '#ff6b6b', '#4ecdc4', '#45aaf2',
            '#a55eea', '#fd9644', '#a5b1c2'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: context => context.label + ': $' + context.raw.toFixed(2)
            }
          }
        }
      }
    });
  }

  function updateTransactionsTable(income, expenses) {
    const allRecords = [
      ...income.map(r => ({ ...r, type: 'income' })),
      ...expenses.map(r => ({ ...r, type: 'expense' }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));
    setTransactions(allRecords.slice(0, 20));
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Expense Report</h1>
      <div className={styles.reportControls}>
        <div className={styles.controlGroup}>
          <label htmlFor="month">Month:</label>
          <input
            type="month"
            id="month"
            value={month}
            onChange={e => setMonth(e.target.value)}
          />
        </div>
        <button className={styles.btn} onClick={generateReport}>
          <i className="fas fa-sync-alt"></i> Generate
        </button>
      </div>
      <div className={styles.summaryCards}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Total Income</div>
          <div className={styles.cardValue} id="totalIncome">${summary.income.toFixed(2)}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Total Expenses</div>
          <div className={styles.cardValue} id="totalExpenses">${summary.expenses.toFixed(2)}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Net Savings</div>
          <div className={styles.cardValue} id="netSavings">${summary.savings.toFixed(2)}</div>
        </div>
      </div>
      <div className={styles.chartContainer}>
        <div className={styles.chartTitle}>Income vs Expenses</div>
        <canvas ref={trendChartRef}></canvas>
      </div>
      <div className={styles.chartContainer}>
        <div className={styles.chartTitle}>Expense Categories</div>
        <canvas ref={categoryChartRef}></canvas>
      </div>
      <div className={styles.chartContainer}>
        <div className={styles.chartTitle}>Recent Transactions</div>
        <table className={styles.transactionsTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((record, idx) => (
              <tr key={idx}>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>{record.description || '-'}</td>
                <td>{record.type === 'income' ? 'Income' : record.category}</td>
                <td className={record.type === 'income' ? styles.positive : styles.negative}>
                  {record.type === 'income' ? '+' : '-'}${record.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}