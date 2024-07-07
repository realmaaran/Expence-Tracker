document.addEventListener('DOMContentLoaded', () => {
  const transactionForm = document.getElementById('transaction-form');
  const incomeList = document.getElementById('income-list');
  const expenseList = document.getElementById('expense-list');
  const totalIncomeEl = document.getElementById('total-income');
  const totalExpensesEl = document.getElementById('total-expenses');
  const balanceEl = document.getElementById('balance');

  let incomes = [];
  let expenses = [];

  transactionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const description = document.getElementById('description').value;
      const amount = parseFloat(document.getElementById('amount').value);
      const type = document.getElementById('type').value;
      if (description && amount) {
          const transaction = { description, amount };
          if (type === 'income') {
              incomes.push(transaction);
              addToList(incomeList, transaction, 'income');
          } else {
              expenses.push(transaction);
              addToList(expenseList, transaction, 'expense');
          }
          updateAnalytics();
          transactionForm.reset();
      }
  });

  function addToList(list, item, type) {
      const li = document.createElement('li');
      li.textContent = `${item.description}: ₹${item.amount.toFixed(2)}`;
      li.classList.add(type);
      list.appendChild(li);
  }

  function updateAnalytics() {
      const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
      const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
      const balance = totalIncome - totalExpenses;

      totalIncomeEl.textContent = `₹${totalIncome.toFixed(2)}`;
      totalExpensesEl.textContent = `₹${totalExpenses.toFixed(2)}`;
      balanceEl.textContent = `₹${balance.toFixed(2)}`;
  }
});
