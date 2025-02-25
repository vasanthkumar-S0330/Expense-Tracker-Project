
function goBack() {
    window.location.href = "expense.html"; 
}


document.addEventListener("DOMContentLoaded", function () {
    console.log("Report page loaded successfully!");

    const apiUrl = "http://192.168.1.6:8081/expenses";
    const userId = localStorage.getItem("userId");

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

    function displayReport(data) {
        const reportTableBody = document.getElementById("report-table-body");
        reportTableBody.innerHTML = ""; // Clear previous data

        data.forEach(expense => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${expense.date}</td>                
                <td>${expense.name}</td>
                <td>₹${expense.amount.toFixed(2)}</td>
                <td>${expense.type}</td>
            `;
            reportTableBody.appendChild(row);
        });
    }

    document.getElementById("generate-report").addEventListener("click", function () {
        const fromDate = new Date(document.getElementById("from-date").value);
        const toDate = new Date(document.getElementById("to-date").value);

        fetch(`${apiUrl}/user/${userId}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const filteredData = data.filter(expense => {
                        const expenseDate = new Date(expense.date);
                        return expenseDate >= fromDate && expenseDate <= toDate;
                    });
                    displayReport(filteredData);
                } else {
                    console.error("Error: Data is not an array.");
                }
            })
            .catch(error => console.error("Error filtering report:", error));
    });

    // Fetch initial report data
    fetchReport();
});


document
  .getElementById("export-excel")
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
        a.download = "export-excel.csv"; // Filename for download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => console.error("Error generating report:", error));
  });

  

  document.getElementById("export-excel").addEventListener("click", function (event) {
    event.preventDefault(); // Prevents default behavior

    const tableBody = document.getElementById("report-table-body");
    let csvContent = "data:text/csv;charset=utf-8,Date,Item Name,Amount,Type\n"; // CSV Header

    // Loop through the displayed table rows and extract data
    tableBody.querySelectorAll("tr").forEach(row => {
        let rowData = [];
        row.querySelectorAll("td").forEach(cell => {
            rowData.push(cell.textContent.trim());
        });
        csvContent += rowData.join(",") + "\n";
    });

    // Create a Blob and download the CSV
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "expense_report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});


document.getElementById("export-pdf").addEventListener("click", function (event) {
    event.preventDefault(); // Prevents default behavior

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Title of the Report
    doc.setFontSize(16);
    doc.text("Expense Report", 14, 15);

    // Extract table data
    const tableBody = [];
    document.querySelectorAll("#report-table-body tr").forEach(row => {
      const rowData = [];
      row.querySelectorAll("td").forEach(cell => {
        rowData.push(cell.textContent.trim());
      });
      tableBody.push(rowData);
    });

    // Add table to PDF
    doc.autoTable({
      head: [["Date", "Item Name", "Amount", "Type"]], // Table Header
      body: tableBody,
      startY: 25, // Table start position
      theme: "striped",
    });

    // Download PDF
    doc.save("expense_report.pdf");
  });






  function displayReport(data) {
    const reportTableBody = document.getElementById("report-table-body");
    reportTableBody.innerHTML = ""; // Clear previous data

    data.forEach(expense => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${expense.date}</td>                
            <td>${expense.name}</td>
            <td>₹${expense.amount.toFixed(2)}</td>
            <td>${expense.type}</td>
        `;
        reportTableBody.appendChild(row);
    });
}



  document.addEventListener("DOMContentLoaded", function () {
    const resetButton = document.getElementById("reset-dates");
    if (!resetButton) {
        console.error("Reset button not found!");
        return;
    }

    resetButton.addEventListener("click", function () {
        // Clear the date fields
        document.getElementById("from-date").value = "";
        document.getElementById("to-date").value = "";

        // Define API URL and get user ID
        const apiUrl = "http://192.168.1.6:8081/expenses";
        const userId = localStorage.getItem("userId");

        if (!userId) {
            console.error("User ID not found in localStorage");
            return;
        }

        // Fetch and display all expenses (unfiltered)
        fetch(`${apiUrl}/user/${userId}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    displayReport(data); // Show all expenses
                } else {
                    console.error("Error: Data is not an array.");
                }
            })
            .catch(error => console.error("Error fetching report:", error));
    });
});



document.getElementById("home").addEventListener("click", function () {
    window.location.href = "report.html"; // Redirects to report.html
});












