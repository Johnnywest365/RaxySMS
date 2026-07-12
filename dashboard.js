/* ==========================================
   RAXYSMS DASHBOARD
   PART 1/5
========================================== */

import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

/* ==========================================
   DOM ELEMENTS
========================================== */

const userName = document.getElementById("userName");
const walletBalance = document.getElementById("walletBalance");
const profileImage = document.getElementById("profileImage");

const addFundsBtn = document.getElementById("addFundsBtn");
const historyBtn = document.getElementById("historyBtn");
const supportBtn = document.getElementById("supportBtn");

const usaBtn = document.getElementById("usaBtn");
const countriesBtn = document.getElementById("countriesBtn");

const refreshBtn = document.getElementById("refreshBtn");

const activationTable = document.getElementById("activationTable");

const accountsBtn = document.getElementById("accountsBtn");
const historyBottomBtn = document.getElementById("historyBottomBtn");
const apiBtn = document.getElementById("apiBtn");
const logoutBtn = document.getElementById("logoutBtn");

/* ==========================================
   GLOBAL VARIABLES
========================================== */

let currentUser = null;
let wallet = 0;

/* ==========================================
   AUTH CHECK
========================================== */

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    currentUser = user;

    await loadUser();

});

/* ==========================================
   LOAD USER DATA
========================================== */

async function loadUser() {

    try {

        const userRef = doc(db, "users", currentUser.uid);

        const snap = await getDoc(userRef);

        if (!snap.exists()) {

            alert("User profile not found in Firestore.");
            return;

        }

        const data = snap.data();

        userName.textContent =
            data.name ||
            currentUser.displayName ||
            currentUser.email ||
            "User";

        wallet = Number(data.wallet || 0);

        walletBalance.textContent =
            "₦" + wallet.toLocaleString();

        if (data.photoURL) {
            profileImage.src = data.photoURL;
        }

    } catch (error) {

        console.error("Dashboard Error:", error);

        alert(error.message);

    }

}
