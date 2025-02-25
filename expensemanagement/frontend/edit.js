document.getElementById("logoutBtn").addEventListener("click", function () {
  // Clear session storage (if using it for authentication)
  sessionStorage.clear();

  // Redirect to index.html
  window.location.href = "index.html";
});