// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCizkQLkKhxlQSRZ7J378jLDVlqPdadu78",
  authDomain: "music-bingo-login.firebaseapp.com",
  projectId: "music-bingo-login",
  storageBucket: "music-bingo-login.firebasestorage.app",
  messagingSenderId: "814220049067",
  appId: "1:814220049067:web:b7a771786e67e9bfa055ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Elements
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const logoutBtn = document.getElementById("logout-btn");

// Signup
if (signupBtn) {
    signupBtn.addEventListener("click", () => {
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Sign up successful!");
            window.location.href = "dashboard.html";
        })
        .catch(error => {
            alert(error.message);
        });
    });
}

// Login
if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Login successful!");
            window.location.href = "dashboard.html";
        })
        .catch(error => {
            alert(error.message);
        });
    });
}

// Logout
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        signOut(auth).then(() => {
            alert("Logged out!");
            window.location.href = "login.html";
        });
    });
}

