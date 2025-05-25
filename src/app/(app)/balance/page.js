'use client';
import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import '../../styles/home.css';
import '../../styles/balance.css';

export default function BalancePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [balanceData, setBalanceData] = useState({
    currentBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchBalanceData = async () => {
      try {
        // Fetch data from your API endpoints
        const [incomeRes, expenseRes] = await Promise.all([
          fetch('/api/income'),
          fetch('/api/expense'),
        ]);

        if (!incomeRes.ok || !expenseRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [incomeData, expenseData] = await Promise.all([
          incomeRes.json(),
          expenseRes.json()
        ]);

        const totalIncome = incomeData.total || incomeData.reduce((sum, item) => sum + Number(item.amount), 0);
        const totalExpense = expenseData.total || expenseData.reduce((sum, item) => sum + Number(item.amount), 0);
        const currentBalance = totalIncome - totalExpense;

        setBalanceData({
          currentBalance,
          totalIncome,
          totalExpense,
          loading: false,
          error: null
        });

        // Initialize chart
        initChart(incomeData, expenseData);
      } catch (error) {
        setBalanceData(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      }
    };

    fetchBalanceData();

    // Check for dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const initChart = (incomeData, expenseData) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Process data for chart
    const monthlyData = Array(12).fill(0).map((_, monthIndex) => {
      const monthIncome = Array.isArray(incomeData) 
        ? incomeData
          .filter(item => new Date(item.date).getMonth() === monthIndex)
          .reduce((sum, item) => sum + Number(item.amount), 0)
        : 0;
      
      const monthExpense = Array.isArray(expenseData)
        ? expenseData
          .filter(item => new Date(item.date).getMonth() === monthIndex)
          .reduce((sum, item) => sum + Number(item.amount), 0)
        : 0;

      return monthIncome - monthExpense;
    });

    // Calculate cumulative balance
    let cumulativeBalance = 0;
    const cumulativeBalances = monthlyData.map(balance => {
      cumulativeBalance += balance;
      return cumulativeBalance;
    });

    const ctx = document.getElementById('balanceChart')?.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: monthNames,
        datasets: [{
          label: 'Balance Trend',
          data: cumulativeBalances,
          borderColor: '#6f42c1',
          backgroundColor: 'rgba(111, 66, 193, 0.1)',
          fill: true,
          tension: 0.3,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => `Balance: Nu. ${context.raw.toFixed(2)}`
            }
          }
        },
        scales: {
          x: { grid: { display: false } },
          y: {
            grid: { color: 'rgba(0, 0, 0, 0.05)' },
            ticks: {
              callback: (value) => 'Nu. ' + value
            }
          }
        }
      }
    });
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle('dark-mode', newMode);
    localStorage.setItem('darkMode', newMode ? 'enabled' : 'disabled');
  };

  if (balanceData.loading) return <div className="loading">Loading...</div>;
  if (balanceData.error) return <div className="error">Error: {balanceData.error}</div>;

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Navigation would typically be in a layout component */}
      
      <div className="balance-header">
        <h1>Balance Overview</h1>
        <div className={`balance-amount ${
          balanceData.currentBalance > 0 ? 'positive' : 
          balanceData.currentBalance < 0 ? 'negative' : ''
        }`}>
          Nu. {balanceData.currentBalance.toFixed(2)}
        </div>
        <p>Your current financial balance</p>
      </div>

      <div className="card">
        <h2>Summary</h2>
        <div className="summary-cards">
          <div className="summary-card income-card">
            <div>Total Income</div>
            <div className="summary-value income">
              Nu. {balanceData.totalIncome.toFixed(2)}
            </div>
          </div>
          <div className="summary-card expense-card">
            <div>Total Expenses</div>
            <div className="summary-value expense">
              Nu. {balanceData.totalExpense.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

  
      {/* Footer would typically be in a layout component */}
    </div>
  );
}
