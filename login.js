 // ======================================
// RaxySMS Login
// ======================================

import {
    auth
} from "./firebase.js";


import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";



const form = document.getElementById("loginForm");

const button = document.getElementById("loginBtn");



form.addEventListener("submit", async (e) => {


    e.preventDefault();



    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;



    button.disabled = true;

    button.textContent = "Logging in...";



    try {


        await signInWithEmailAndPassword(

            auth,

            email,

            password

        );



        alert("Login successful!");



        window.location.href = "dashboard.html";



    }


    catch(error){


        alert(error.message);


    }



    button.disabled = false;

    button.textContent = "Login";


});
