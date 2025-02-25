



// // Get form elements
// const loginForm = document.getElementById("loginForm");
// const signupForm = document.getElementById("signupForm");
// const showSignup = document.getElementById("showSignup");
// const showLogin = document.getElementById("showLogin");

// // Show Signup Form
// showSignup.addEventListener("click", () => {
//   loginForm.classList.add("hidden");
//   signupForm.classList.remove("hidden");
// });

// // Show Login Form
// showLogin.addEventListener("click", () => {
//   signupForm.classList.add("hidden");
//   loginForm.classList.remove("hidden");
// });

// // Handle Login
// async function handleLogin(event) {
//   event.preventDefault(); // Prevent default form submission
//   const url = "http://192.168.1.6:8080/users/login"; // Replace with your backend login endpoint

//   // Get input values
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;

//   const data = {
//     username,
//     password,
//   };

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(`Login failed: ${errorData.message || response.statusText}`);
//     }

//     const responseData = await response.json();

//     if (responseData.status === "success") {
//       Swal.fire({
//         title: "Success!",
//         text: "Login Successful!",
//         icon: "success",
//         timer: 1500, // Auto-close after 1.5 seconds
//         showConfirmButton: false
//       }).then(() => {
//         localStorage.setItem('userId', username);
//         setTimeout(()=>{
//           localStorage.setItem("isAuthenticated","true");
//           window.location.href = "/expense.html";
//         },1000)
     
//       });
//     } else {
//       Swal.fire({
//         title: "Error!",
//         text: "User does not exist",
//         icon: "error",
//       });
//     }
//     console.log(responseData); // Handle token, redirect, or other actions
//   } catch (error) {
//     console.error("Error:", error);
//     Swal.fire({
//       title: "Login Failed!",
//       text: error.message || "Please try again.",
//       icon: "error",
//     });
//   }
// }

// // Handle Signup
// async function handleSignup(event) {
//   event.preventDefault(); // Prevent default form submission
//   const url = "http://192.168.1.6:8080/users/signup"; // Replace with your backend signup endpoint

//   // Get input values
//   const username = signupForm.querySelector('input[name="username"]').value;
//   const email = signupForm.querySelector('input[name="email"]').value;
//   const password = signupForm.querySelector('input[name="password"]').value;

//   const data = {
//     username,
//     email,
//     password,
//   };

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(`Signup failed: ${errorData.message || response.statusText}`);
//     }

//     const responseData = await response.json();
//     Swal.fire({
//       title: "Success!",
//       text: "Signup Successful! You can now log in.",
//       icon: "success",
//       timer: 2000, // Auto-close after 2 seconds
//       showConfirmButton: false
//     }).then(() => {
//       signupForm.classList.add("hidden");
//       loginForm.classList.remove("hidden");
//     });

//     console.log(responseData);
//   } catch (error) {
//     console.error("Error:", error);
//     Swal.fire({
//       title: "Signup Failed!",
//       text: error.message || "Please try again.",
//       icon: "error",
//     });
//   }
// }

// // Attach form submit event listeners
// loginForm.addEventListener("submit", handleLogin);
// signupForm.addEventListener("submit", handleSignup);



// Get form elements
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

// Show Signup Form
showSignup.addEventListener("click", () => {
  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
});

// Show Login Form
showLogin.addEventListener("click", () => {
  signupForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});

// Backend API base URL
const API_URL = "http://192.168.1.6:8080/auth"; // Update if backend URL changes

// Handle Login
async function handleLogin(event) {
  event.preventDefault();
  const url = `${API_URL}/login`;

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const data = {
    username,
    password,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await response.text();

    if (responseData.includes("successful")) {
      Swal.fire({
        title: "Success!",
        text: "Login Successful!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userId", username);
        window.location.href = "/expense.html";
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Invalid username or password!",
        icon: "error",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      title: "Login Failed!",
      text: "Something went wrong. Please try again.",
      icon: "error",
    });
  }
}

// Handle Signup
async function handleSignup(event) {
  event.preventDefault();
  const url = `${API_URL}/signup`;

  const username = signupForm.querySelector('input[name="username"]').value;
  const email = signupForm.querySelector('input[name="email"]').value;
  const password = signupForm.querySelector('input[name="password"]').value;

  const data = {
    username,
    email,
    password,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await response.text();

    if (responseData.includes("successful")) {
      Swal.fire({
        title: "Success!",
        text: "Signup Successful! You can now log in.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        signupForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Signup failed. Username might already exist.",
        icon: "error",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      title: "Signup Failed!",
      text: "Something went wrong. Please try again.",
      icon: "error",
    });
  }
}

// Attach form submit event listeners
loginForm.addEventListener("submit", handleLogin);
signupForm.addEventListener("submit", handleSignup);
