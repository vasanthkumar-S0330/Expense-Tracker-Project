document.addEventListener("DOMContentLoaded", function () {
    console.log("Delete.js loaded successfully!");

    const apiUrl = "http://192.168.1.6:8081/expenses";
    const userId = localStorage.getItem("userId");
    
    const reportTableBody = document.getElementById("report-table-body");
    const deleteAllButton = document.getElementById("delete all");
    const deleteSelectedButton = document.getElementById("delete");

    // Function to fetch and display the report
    function fetchReport() {
        fetch(`${apiUrl}/user/${userId}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    displayReport(data);
                } else {
                    console.error("Error: Data is not an array.");
                }
            })
            .catch(error => console.error("Error fetching report:", error));
    }

    // Function to display report data in the table
    function displayReport(data) {
        reportTableBody.innerHTML = ""; // Clear previous data

        data.forEach(expense => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><input type="checkbox" data-expense-id="${expense.id}"></td>                
                <td>${expense.date}</td>
                <td>${expense.name}</td>
                <td>₹${expense.amount.toFixed(2)}</td>
                <td>${expense.type}</td>
            `;
            reportTableBody.appendChild(row);
        });
    }

   // Function to delete all expenses for the user
// Function to delete all expenses for the user
function deleteAllExpenses() {
    // Ask for confirmation before deleting
    const confirmDelete = confirm("Are you sure you want to delete all expenses?");
    
    if (!confirmDelete) {
        return; // If user selects "No", exit the function
    }

    // Select all checkboxes
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    allCheckboxes.forEach(checkbox => checkbox.checked = true);

    // Delay for better user experience (optional)
    setTimeout(() => {
        fetch(`${apiUrl}/deleteAll/${userId}`, {
            method: "DELETE",
        })
        .then(response => {
            if (response.ok) {
                alert("All expenses deleted successfully.");
                fetchReport(); // Refresh table after deletion
            } else {
                alert("Error deleting expenses.");
            }
        })
        .catch(error => console.error("Error:", error));
    }, 500); // 0.5-second delay to show checkboxes being selected
}


    // Function to delete selected expenses
    function deleteSelectedExpenses() {
        const selectedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        if (selectedCheckboxes.length === 0) {
            alert("No expenses selected.");
            return;
        }

        selectedCheckboxes.forEach(checkbox => {
            const expenseId = checkbox.dataset.expenseId;
            fetch(`${apiUrl}/${expenseId}`, {
                method: "DELETE",
            })
            .then(response => {
                if (response.ok) {
                    checkbox.closest("tr").remove(); // Remove row from table
                } else {
                    alert("Error deleting expense.");
                }
            })
            .catch(error => console.error("Error:", error));
        });

        alert("Selected expenses deleted.");
    }

    // Event Listeners for delete buttons
    deleteAllButton.addEventListener("click", deleteAllExpenses);
    deleteSelectedButton.addEventListener("click", deleteSelectedExpenses);

    // Fetch initial report data
    fetchReport();
});


function goBack() {
    window.location.href = "expense.html";
}