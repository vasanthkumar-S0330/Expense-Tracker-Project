const budgetInput = document.getElementById('budget');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseCategorySelect = document.getElementById('expense-category');
const addExpenseButton = document.getElementById('add-expense');
const expenseList = document.getElementById('expense-list');
const expenseChart = document.getElementById('expense-chart').getContext('2d');

let budget = 0;
let expenses = [];

// Add expense
addExpenseButton.addEventListener('click', () => {
  const name = expenseNameInput.value;
  const amount = parseFloat(expenseAmountInput.value);
  const category = expenseCategorySelect.value;

  if (name && amount && category) {
    expenses.push({ name, amount, category });
    renderExpenses();
    updateChart();
  }
});

// Render expenses
function renderExpenses() {
  expenseList.innerHTML = '<h2>Expense List</h2>';
  expenses.forEach((expense, index) => {
    const div = document.createElement('div');
    div.className = 'expense-item';
    div.innerHTML = `
      <span>${expense.name} (${expense.category})</span>
      <span>$${expense.amount.toFixed(2)}</span>
    `;
    expenseList.appendChild(div);
  });
}

// Update chart
function updateChart() {
  const categories = {};
  expenses.forEach(expense => {
    categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
  });

  new Chart(expenseChart, {
    type: 'pie',
    data: {
      labels: Object.keys(categories),
      datasets: [{
        data: Object.values(categories),
        backgroundColor: ['#4CAF50', '#FFC107', '#2196F3', '#FF5722'],
      }],
    },
  });
}