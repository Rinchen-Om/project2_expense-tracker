'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Chart from 'chart.js/auto';
import styles from '../../styles/budget.module.css';
import '../../styles/home.css';

export default function BudgetPlanner() {
  const [budgetData, setBudgetData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState('');
  const budgetChartRef = useRef(null);
  const spendingChartRef = useRef(null);
  const budgetChartInstance = useRef(null);
  const spendingChartInstance = useRef(null);

  const calculateVariance = (planned, actual) => {
    return planned - actual;
  };

  const calculateProgress = (planned, actual) => {
    return planned > 0 ? Math.min((actual / planned) * 100, 100) : 0;
  };

  const getProgressColor = (progress) => {
    return progress < 75 ? '#2ecc71' : progress < 100 ? '#f39c12' : '#e74c3c';
  };

  const updateCharts = useCallback(() => {
    if (!budgetChartRef.current || !spendingChartRef.current) return;

    const categories = [];
    const plannedData = [];
    const actualData = [];

    budgetData.forEach(item => {
      if (item.category && (item.planned > 0 || item.actual > 0)) {
        categories.push(item.category);
        plannedData.push(item.planned);
        actualData.push(item.actual);
      }
    });

    // Update or create pie chart (budget allocation)
    if (budgetChartInstance.current) {
      budgetChartInstance.current.destroy();
    }

    budgetChartInstance.current = new Chart(budgetChartRef.current, {
      type: 'pie',
      data: {
        labels: categories,
        datasets: [{
          data: plannedData,
          backgroundColor: [
            '#3498db', '#2ecc71', '#e74c3c', '#f39c12',
            '#9b59b6', '#1abc9c', '#d35400', '#34495e'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    });

    // Update or create bar chart (spending comparison)
    if (spendingChartInstance.current) {
      spendingChartInstance.current.destroy();
    }

    spendingChartInstance.current = new Chart(spendingChartRef.current, {
      type: 'bar',
      data: {
        labels: categories,
        datasets: [
          {
            label: 'Planned',
            data: plannedData,
            backgroundColor: '#3498db'
          },
          {
            label: 'Actual',
            data: actualData,
            backgroundColor: '#2ecc71'
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, [budgetData]);

  const calculateSummary = () => {
    const totalBudget = budgetData.reduce((sum, item) => sum + (item.planned || 0), 0);
    const totalSpent = budgetData.reduce((sum, item) => sum + (item.actual || 0), 0);
    const remaining = totalBudget - totalSpent;

    return {
      totalBudget: totalBudget.toFixed(2),
      totalSpent: totalSpent.toFixed(2),
      remaining: remaining.toFixed(2)
    };
  };

  const loadBudget = useCallback((month) => {
    const allBudgets = JSON.parse(localStorage.getItem('budgetData')) || {};
    const data = allBudgets[month] || [];
    
    if (data.length > 0) {
      setBudgetData(data);
    } else {
      // Default categories if no data exists
      setBudgetData([
        { category: 'Housing', planned: 0, actual: 0 },
        { category: 'Food', planned: 0, actual: 0 },
        { category: 'Transportation', planned: 0, actual: 0 }
      ]);
    }
  }, []);

  const saveBudget = () => {
    if (!currentMonth) {
      alert('Please select a month first');
      return;
    }

    const allBudgets = JSON.parse(localStorage.getItem('budgetData')) || {};
    allBudgets[currentMonth] = budgetData;
    localStorage.setItem('budgetData', JSON.stringify(allBudgets));
    
    alert(`Budget for ${currentMonth} saved!`);
  };

  const addBudgetRow = () => {
    setBudgetData([...budgetData, { category: '', planned: 0, actual: 0 }]);
  };

  const deleteRow = (index) => {
    const newData = [...budgetData];
    newData.splice(index, 1);
    setBudgetData(newData);
  };

  const updateRow = (index, field, value) => {
    const newData = [...budgetData];
    newData[index][field] = value;
    setBudgetData(newData);
  };

  const handleMonthChange = (e) => {
    setCurrentMonth(e.target.value);
  };

  const handleLoadBudget = () => {
    if (!currentMonth) {
      alert('Please select a month first');
      return;
    }
    loadBudget(currentMonth);
  };

  useEffect(() => {
    // Initialize with current month
    const now = new Date();
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    setCurrentMonth(month);
    loadBudget(month);

    return () => {
      // Clean up charts on unmount
      if (budgetChartInstance.current) {
        budgetChartInstance.current.destroy();
      }
      if (spendingChartInstance.current) {
        spendingChartInstance.current.destroy();
      }
    };
  }, [loadBudget]);

  useEffect(() => {
    if (budgetChartRef.current && spendingChartRef.current) {
      updateCharts();
    }
  }, [budgetData, updateCharts]);

  const summary = calculateSummary();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Monthly Budget Planner</h2>
        
        <div className={styles.monthSelector}>
          <input 
            type="month" 
            value={currentMonth}
            onChange={handleMonthChange}
            className={styles.input}
          />
          <button className={styles.button} onClick={handleLoadBudget}>Load Budget</button>
          <button className={styles.button} onClick={saveBudget}>Save Budget</button>
        </div>
        
        <div className={styles.summaryCards}>
          <div className={styles.summaryCard}>
            <h3>Total Budget</h3>
            <div className={styles.summaryValue}>Nu.{summary.totalBudget}</div>
          </div>
          <div className={styles.summaryCard}>
            <h3>Total Spent</h3>
            <div className={styles.summaryValue}>Nu.{summary.totalSpent}</div>
          </div>
          <div className={styles.summaryCard}>
            <h3>Remaining</h3>
            <div className={styles.summaryValue}>Nu.{summary.remaining}</div>
          </div>
        </div>

        <div className={styles.chartsContainer}>
          <div className={styles.chartWrapper}>
            <h3>Budget Allocation</h3>
            <canvas ref={budgetChartRef}></canvas>
          </div>
          <div className={styles.chartWrapper}>
            <h3>Spending Comparison</h3>
            <canvas ref={spendingChartRef}></canvas>
          </div>
        </div>
        
        <div className={styles.tableContainer}>
          <button className={styles.addButton} onClick={addBudgetRow}>
            Add Category
          </button>
          
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Category</th>
                <th>Planned Budget</th>
                <th>Actual Spent</th>
                <th>Variance</th>
                <th>Progress</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {budgetData.map((row, index) => {
                const variance = calculateVariance(row.planned, row.actual);
                const progress = calculateProgress(row.planned, row.actual);
                const progressColor = getProgressColor(progress);

                return (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={row.category}
                        onChange={(e) => updateRow(index, 'category', e.target.value)}
                        className={styles.input}
                        placeholder="Category name"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={row.planned}
                        onChange={(e) => updateRow(index, 'planned', parseFloat(e.target.value) || 0)}
                        className={styles.input}
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={row.actual}
                        onChange={(e) => updateRow(index, 'actual', parseFloat(e.target.value) || 0)}
                        className={styles.input}
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className={variance < 0 ? styles.negative : styles.positive}>
                      Nu.{variance.toFixed(2)}
                    </td>
                    <td>
                      <div className={styles.progressBar}>
                        <div 
                          className={styles.progressFill}
                          style={{ 
                            width: `${progress}%`,
                            backgroundColor: progressColor
                          }}
                        ></div>
                        <span>{progress.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td>
                      <button 
                        className={styles.deleteButton}
                        onClick={() => deleteRow(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}