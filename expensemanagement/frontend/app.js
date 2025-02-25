// document.addEventListener("DOMContentLoaded", function () {
  const API_BASE_URL = "http://192.168.1.6:8081/expenses"; // Replace with your actual API URL
  // const userId = "user123"; // Replace with actual logged-in user ID
  
  const userName = document.getElementById("username") 
  const expenseForm = document.getElementById("expense-form");
  const expenseTableBody = document.getElementById("expense-table-body");
  const totalIncomeElement = document.getElementById("total-income");
  const totalExpensesElement = document.getElementById("total-expenses");
  const balanceElement = document.getElementById("balance");
  const userId = localStorage.getItem("userId"); // Change this dynamically based on logged-in user
  const apiUrl = "http://192.168.1.6:8081/expenses";
 
  if (userId) {
    userName.textContent = userId; // Display userId (or fetch the username if available)
  } else {
    userName.textContent = "User"; // Default placeholder if userId is not found
  }

  window.onload = function () {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
      window.location.href = "index.html"; // Redirect if not logged in
    }
  };
// Fetch summary (Total Income, Total Expenses, Balance)
function fetchfetchExpenses() {
  fetch(`${API_BASE_URL}/user/${userId}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById("total-income").textContent = `₹${data.totalIncome.toFixed(2)}`;
      document.getElementById("total-expenses").textContent = `₹${data.totalExpenses.toFixed(2)}`;
      document.getElementById("balance").textContent = `₹${data.balance.toFixed(2)}`;
    })
    .catch(error => console.error("Error fetching summary:", error));
}

document.addEventListener("DOMContentLoaded", () => {
  fetchExpenses(); // Automatically fetch expenses when the page loads
  fetchSummary();
});


document.getElementById("delete-expense").addEventListener("click", function () {
  window.location.href = "delete.html"; // Redirects to delete.html
});



// Fetch and display expenses
function fetchExpenses() {
  fetch(`${API_BASE_URL}/user/${userId}`)
    .then(response => response.json())
    .then(expenses => {
      const tableBody = document.getElementById("expense-table-body");
      tableBody.innerHTML = ""; // Clear previous data
      expenses.forEach(expense => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${expense.date}</td>
          <td>${expense.name}</td>
          <td>₹${expense.amount.toFixed(2)}</td>
          <td>${expense.type}</td>
          <td>
            <button onclick="editExpense('${expense.id}', '${expense.name}', '${expense.amount}', '${expense.type}', '${expense.date}')">Edit</button>
            <button onclick="deleteExpense('${expense.id}')">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error("Error fetching expenses:", error));
}

function fetchSummary() {
  fetch(`${API_BASE_URL}/summary/${userId}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById("total-income").textContent = `₹${data.totalIncome.toFixed(2)}`;
      document.getElementById("total-expenses").textContent = `₹${data.totalExpenses.toFixed(2)}`;
      document.getElementById("balance").textContent = `₹${data.balance.toFixed(2)}`;

      // Get the balance card element
      const balanceCard = document.getElementById("balance-card");

      // Change card color based on balance amount
      if (data.balance >= 0) {
        balanceCard.style.backgroundColor = "green"; // Positive balance - Green
        balanceCard.style.color = "white";
      } else {
        balanceCard.style.backgroundColor = "red"; // Negative balance - Red
        balanceCard.style.color = "white";
      }
    })
    .catch(error => console.error("Error fetching summary:", error));
}


// Add or Update an expense
function addExpense(event) {
  event.preventDefault();

  const expenseId = document.getElementById("expense-id").value;
  const expense = {
    userId: userId,
    date: document.getElementById("date").value,
    name: document.getElementById("expense-name").value,
    amount: parseFloat(document.getElementById("expense-amount").value),
    type: document.querySelector('input[name="expense-type"]:checked').value
  };

  const requestUrl = expenseId ? `${API_BASE_URL}/${expenseId}` : `${API_BASE_URL}/add`;
  const requestMethod = expenseId ? "PUT" : "POST";

  fetch(requestUrl, {
    method: requestMethod,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense)
  })
    .then(response => response.json())
    .then(() => {
      document.getElementById("expense-form").reset();
      document.getElementById("expense-id").value = ""; // Clear hidden field
      fetchSummary();
      fetchExpenses();
    })
    .catch(error => console.error("Error saving expense:", error));
}

// Edit an expense (pre-fill form)
function editExpense(expenseId, name, amount, type, date) {
  document.getElementById("expense-id").value = expenseId;
  document.getElementById("date").value = date;
  document.getElementById("expense-name").value = name;
  document.getElementById("expense-amount").value = amount;
  document.querySelector(`input[name="expense-type"][value="${type}"]`).checked = true;
}



document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menu-button");
  const menuDropdown = document.getElementById("menu-dropdown");

  menuButton.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevents event bubbling
    menuDropdown.classList.toggle("show");
  });

  document.addEventListener("click", function (event) {
    if (
      !menuButton.contains(event.target) &&
      !menuDropdown.contains(event.target)
    ) {
      menuDropdown.classList.remove("show");
    }
  });

  const logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", function () {
    console.log("rdtyfyufu");
    window.location.href = "http://192.168.1.6:5500/"; // Redirect to login page
  });
});

function logout() {
  // Clear session storage or local storage if needed
  localStorage.removeItem("token"); // If using authentication tokens
  localStorage.removeItem("userId"); // Clears stored user data
  localStorage.removeItem("isAuthenticated");
  sessionStorage.clear();

  // Redirect to the desired page
  window.location.href = "http://192.168.1.6:5500/";
}

// creating retort

document
  .getElementById("report-button")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevents default behavior (useful if inside a form)

    const userId = localStorage.getItem("userId");
    const reportUrl = `http://192.168.1.6:8081/expenses/report/${userId}`;

    fetch(reportUrl)
      .then((response) => response.blob()) // Convert response to a Blob
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "expenses_report.csv"; // Filename for download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => console.error("Error generating report:", error));
  });

function validateAmount(input) {
  const minAmount = 1;
  const maxAmount = 100000;
  const errorElement = document.getElementById("amount-error");

  if (input.value < minAmount || input.value > maxAmount) {
    errorElement.style.display = "block";
    input.setCustomValidity("Amount must be between ₹1 and ₹100,000.");
  } else {
    errorElement.style.display = "none";
    input.setCustomValidity(""); // Clear validation message
  }
}


function logout() {
  localStorage.removeItem("username"); // Clear the username
  localStorage.removeItem("userId"); // Clear other user data
  localStorage.removeItem("isAuthenticated");
  sessionStorage.clear();
  window.location.href = "http://192.168.1.6:5500/"; // Redirect to login page
}
function ExpenseReport() {
  
  window.location.href = "http://192.168.1.6:5500/report.html"; 
}




// // Delete an expense
// function deleteExpense(expenseId) {
//   if (confirm("Are you sure you want to delete this expense?")) {
//     fetch(`http://192.168.1.6:8081/expenses/${expenseId}`, { method: "DELETE" })
    
//       .then(() => fetchExpenses()) // Refresh list
//       .catch(error => console.error("Error deleting expense:", error));
//   }
// }
// Delete an expense
function deleteExpense(expenseId) {
  if (confirm("Are you sure you want to delete this expense?")) {
    fetch(`http://192.168.1.6:8081/expenses/${expenseId}`, { method: "DELETE" })
      .then(response => {
        if (response.ok) {
          alert("Expense deleted successfully!");
          fetchExpenses() // Automatically refresh the page
        } else {
          alert("Error deleting expense.");
        }
      })
      .catch(error => console.error("Error deleting expense:", error));
  }
}

















 
 




 











function editExpense(id, name, amount, type, date) {
  // Populate modal fields
  document.getElementById("edit-id").value = id;
  document.getElementById("edit-name").value = name;
  document.getElementById("edit-amount").value = amount;
  document.getElementById("edit-date").value = date;

  // Check the correct radio button
  document.getElementById("edit-income").checked = (type === "income");
  document.getElementById("edit-expense").checked = (type === "expense");

  // Show modal
  document.getElementById("editModal").style.display = "flex";
}

// Close modal function
function closeEditModal() {
  console.log("close")
  document.getElementById("editModal").style.display = "none";
}

// Handle update form submission
document.getElementById("edit-expense-form").addEventListener("submit", function (event) {
  event.preventDefault();

  console.log("enter the edit function")

  const id = document.getElementById("edit-id").value; // Get expense ID
  const apiUrl = `http://localhost:8081/expenses/${id}`; // API URL for updating

  const updatedExpense = {
      id: id, // Ensure ID is included
      name: document.getElementById("edit-name").value,
      amount: parseFloat(document.getElementById("edit-amount").value),
      type: document.querySelector('input[name="edit-expense-type"]:checked').value,
      date: document.getElementById("edit-date").value
  };

  fetch(apiUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedExpense)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error("Failed to update expense.");
      }
      return response.json();
  })
  .then(data => {
      alert("Expense updated successfully!");
      console.log("say hi")

      // Close modal after update
      closeEditModal();

      console.log("data",data)

      // Update the row in the table dynamically
      updateTableRow(id, data);

      // Refresh the balance amount
      updateBalance();
  })
  .catch(error => {
      console.error("Error updating expense:", error);
      alert("Error updating expense.");
  });
});


function EditExpense(event){
  event.preventDefault();

  console.log("enter the edit function")

  const id = document.getElementById("edit-id").value; // Get expense ID
  const apiUrl = `http://localhost:8081/expenses/${id}`; // API URL for updating

  const updatedExpense = {
      id: id, // Ensure ID is included
      name: document.getElementById("edit-name").value,
      amount: parseFloat(document.getElementById("edit-amount").value),
      type: document.querySelector('input[name="edit-expense-type"]:checked').value,
      date: document.getElementById("edit-date").value
  };

  fetch(apiUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedExpense)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error("Failed to update expense.");
      }
      return response.json();
  })
  .then(updatedData => {
      alert("Expense updated successfully!");
      console.log(updatedData)
      // Close modal after update
      closeEditModal();

      // Update the row in the table dynamically
      updateTableRow(id, updatedData);

      // Refresh the balance amount
      updateBalance();
  })
  .catch(error => {
      console.error("Error updating expense:", error);
      alert("Error updating expense.");
  });
}

// Function to update the table row dynamically
function updateTableRow(id, updatedData) {
    const row = document.querySelector(`tr[data-id='${id}']`);
    if (row) {
        row.cells[1].innerText = updatedData.date;
        row.cells[2].innerText = updatedData.name;
        row.cells[3].innerText = `₹${updatedData.amount.toFixed(2)}`;
        row.cells[4].innerText = updatedData.type;
    } else {
      fetchExpenses()
    }
}

// Function to update balance dynamically
function updateBalance() {
    fetch(`http://localhost:8081/expenses/balance`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("balance-amount").innerText = `₹${data.balance.toFixed(2)}`;
    })
    .catch(error => console.error("Error fetching balance:", error));
}





function redirectToEdit() {
  window.location.href = "edit.html"; // Redirect to the profile edit page
}
