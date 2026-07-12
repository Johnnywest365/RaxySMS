/* ============================================================
   RAXYSMS - USA NUMBERS
   Part 1/4
   Firebase + Authentication + Wallet + Service Data
============================================================ */

// =========================
// Firebase Imports
// =========================

import { app } from "./firebase.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    addDoc,
    updateDoc,
    collection,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

// =========================
// Global Variables
// =========================

let currentUser = null;
let walletBalance = 0;

let selectedService = null;

let popularServices = [];
let otherServices = [];
let allServices = [];

// =========================
// DOM Elements
// =========================

const searchInput =
    document.getElementById("searchInput");

const popularContainer =
    document.getElementById("popularServices");

const otherContainer =
    document.getElementById("otherServices");

const walletElement =
    document.getElementById("walletBalance");

const logoutBtn =
    document.getElementById("logoutBtn");

const modal =
    document.getElementById("purchaseModal");

const modalService =
    document.getElementById("modalService");

const modalPrice =
    document.getElementById("modalPrice");

const modalBuyBtn =
    document.getElementById("confirmPurchase");

const closeModalBtn =
    document.getElementById("closeModal");

// =========================
// Currency Formatter
// =========================

function formatPrice(amount) {
    return "₦" + Number(amount).toLocaleString();
}

// =========================
// Wallet
// =========================

async function loadWallet() {

    if (!currentUser) return;

    try {

        const ref = doc(db, "users", currentUser.uid);

        const snap = await getDoc(ref);

        if (!snap.exists()) {

            await setDoc(ref, {
                wallet: 0
            });

            walletBalance = 0;

        } else {

            walletBalance =
                snap.data().wallet || 0;
        }

        if (walletElement) {

            walletElement.textContent =
                formatPrice(walletBalance);
        }

    } catch (error) {

        console.error(error);

    }

}

// =========================
// Authentication
// =========================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    currentUser = user;

    await loadWallet();

    renderAll();

});

// =========================
// Logout
// =========================

if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

        await signOut(auth);

        window.location.href = "login.html";

    });

}

// =========================================================
// POPULAR SERVICES
// (Keep this exact order)
// =========================================================

popularServices = [

{
id:"whatsapp",
name:"WhatsApp",
country:"USA",
category:"Popular",
price:3500,
stock:999,
active:true
},

{
id:"telegram",
name:"Telegram",
country:"USA",
category:"Popular",
price:2700,
stock:999,
active:true
},

{
id:"signal",
name:"Signal",
country:"USA",
category:"Popular",
price:1600,
stock:999,
active:true
},

{
id:"viber",
name:"Viber",
country:"USA",
category:"Popular",
price:900,
stock:999,
active:true
},

{
id:"venmo",
name:"Venmo",
country:"USA",
category:"Popular",
price:1600,
stock:999,
active:true
},

{
id:"chime",
name:"Chime",
country:"USA",
category:"Popular",
price:2000,
stock:999,
active:true
}

];

// =========================================================
// OTHER SERVICES
// A-Z
// =========================================================

otherServices = [

{
id:"airbnb",
name:"Airbnb",
country:"USA",
category:"Other",
price:1600,
stock:999,
active:true
},

{
id:"amazon",
name:"Amazon",
country:"USA",
category:"Other",
price:1700,
stock:999,
active:true
},

{
id:"apple",
name:"Apple",
country:"USA",
category:"Other",
price:2000,
stock:999,
active:true
},

{
id:"bankofamerica",
name:"Bank of America",
country:"USA",
category:"Other",
price:2500,
stock:999,
active:true
},

{
id:"binance",
name:"Binance",
country:"USA",
category:"Other",
price:2400,
stock:999,
active:true
},

{
id:"cashapp",
name:"Cash App",
country:"USA",
category:"Other",
price:2500,
stock:999,
active:true
},

{
id:"coinbase",
name:"Coinbase",
country:"USA",
category:"Other",
price:2200,
stock:999,
active:true
},

{
id:"discord",
name:"Discord",
country:"USA",
category:"Other",
price:1400,
stock:999,
active:true
},

{
id:"ebay",
name:"eBay",
country:"USA",
category:"Other",
price:1800,
stock:999,
active:true
},

{
id:"facebook",
name:"Facebook",
country:"USA",
category:"Other",
price:2700,
stock:999,
active:true
},

{
id:"gmail",
name:"Gmail",
country:"USA",
category:"Other",
price:1200,
stock:999,
active:true
},

{
id:"googlevoice",
name:"Google Voice",
country:"USA",
category:"Other",
price:3000,
stock:999,
active:true
},

{
id:"instagram",
name:"Instagram",
country:"USA",
category:"Other",
price:2500,
stock:999,
active:true
},

{
id:"line",
name:"LINE",
country:"USA",
category:"Other",
price:1300,
stock:999,
active:true
},

{
id:"linkedin",
name:"LinkedIn",
country:"USA",
category:"Other",
price:1800,
stock:999,
active:true
},

{
id:"lyft",
name:"Lyft",
country:"USA",
category:"Other",
price:1800,
stock:999,
active:true
},

{
id:"microsoft",
name:"Microsoft",
country:"USA",
category:"Other",
price:1700,
stock:999,
active:true
},

{
id:"netflix",
name:"Netflix",
country:"USA",
category:"Other",
price:2000,
stock:999,
active:true
},

{
id:"nike",
name:"Nike",
country:"USA",
category:"Other",
price:1700,
stock:999,
active:true
}

];

// =========================================================
// OTHER SERVICES (Continued A-Z)
// =========================================================

otherServices.push(

{
id:"okx",
name:"OKX",
country:"USA",
category:"Other",
price:2200,
stock:999,
active:true
},

{
id:"paypal",
name:"PayPal",
country:"USA",
category:"Other",
price:2600,
stock:999,
active:true
},

{
id:"paxful",
name:"Paxful",
country:"USA",
category:"Other",
price:2400,
stock:999,
active:true
},

{
id:"pinterest",
name:"Pinterest",
country:"USA",
category:"Other",
price:1700,
stock:999,
active:true
},

{
id:"reddit",
name:"Reddit",
country:"USA",
category:"Other",
price:1700,
stock:999,
active:true
},

{
id:"revolut",
name:"Revolut",
country:"USA",
category:"Other",
price:2600,
stock:999,
active:true
},

{
id:"roblox",
name:"Roblox",
country:"USA",
category:"Other",
price:1500,
stock:999,
active:true
},

{
id:"skype",
name:"Skype",
country:"USA",
category:"Other",
price:1200,
stock:999,
active:true
},

{
id:"snapchat",
name:"Snapchat",
country:"USA",
category:"Other",
price:2100,
stock:999,
active:true
},

{
id:"steam",
name:"Steam",
country:"USA",
category:"Other",
price:1800,
stock:999,
active:true
},

{
id:"tiktok",
name:"TikTok",
country:"USA",
category:"Other",
price:2400,
stock:999,
active:true
},

{
id:"tinder",
name:"Tinder",
country:"USA",
category:"Other",
price:1800,
stock:999,
active:true
},

{
id:"uber",
name:"Uber",
country:"USA",
category:"Other",
price:2000,
stock:999,
active:true
},

{
id:"wechat",
name:"WeChat",
country:"USA",
category:"Other",
price:1400,
stock:999,
active:true
},

{
id:"wechatbusiness",
name:"WeChat Business",
country:"USA",
category:"Other",
price:1800,
stock:999,
active:true
},

{
id:"wise",
name:"Wise",
country:"USA",
category:"Other",
price:2600,
stock:999,
active:true
},

{
id:"x",
name:"X (Twitter)",
country:"USA",
category:"Other",
price:1900,
stock:999,
active:true
},

{
id:"yahoo",
name:"Yahoo",
country:"USA",
category:"Other",
price:1300,
stock:999,
active:true
}

);

// =========================================================
// Merge & Sort Services
// =========================================================

otherServices.sort((a, b) => a.name.localeCompare(b.name));

allServices = [
    ...popularServices,
    ...otherServices
];

// =========================================================
// Service Card
// =========================================================

function createServiceCard(service) {

    return `
        <div class="service-card">

            <div class="service-left">

                <h3>${service.name}</h3>

                <small>${service.country}</small>

            </div>

            <div class="service-right">

                <span class="price">
                    ${formatPrice(service.price)}
                </span>

                <button
                    class="buy-btn"
                    data-id="${service.id}">
                    Buy
                </button>

            </div>

        </div>
    `;

}

// =========================================================
// Render Popular
// =========================================================

function renderPopular(list = popularServices) {

    if (!popularContainer) return;

    popularContainer.innerHTML =
        list.map(createServiceCard).join("");

}

// =========================================================
// Render Other
// =========================================================

function renderOthers(list = otherServices) {

    if (!otherContainer) return;

    otherContainer.innerHTML =
        list.map(createServiceCard).join("");

}

// =========================================================
// Render Everything
// =========================================================

function renderAll() {

    renderPopular();

    renderOthers();

    bindBuyButtons();

}

// =========================================================
// Live Search
// =========================================================

if (searchInput) {

    searchInput.addEventListener("input", (e) => {

        const keyword = e.target.value
            .trim()
            .toLowerCase();

        if (keyword === "") {

            renderPopular();
            renderOthers();

            return;
        }

        const popularResults = popularServices.filter(service =>
            service.name.toLowerCase().includes(keyword)
        );

        const otherResults = otherServices.filter(service =>
            service.name.toLowerCase().includes(keyword)
        );

        renderPopular(popularResults);
        renderOthers(otherResults);

    });

}

// =========================================================
// Bind Buy Buttons
// =========================================================

function bindBuyButtons() {

    const buttons = document.querySelectorAll(".buy-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const id = button.dataset.id;

            selectedService = allServices.find(service =>
                service.id === id
            );

            if (!selectedService) return;

            openPurchaseModal(selectedService);

        });

    });

}

// =========================================================
// Open Purchase Modal
// =========================================================

function openPurchaseModal(service) {

    if (!modal) return;

    if (modalService) {
        modalService.textContent = service.name;
    }

    if (modalPrice) {
        modalPrice.textContent = formatPrice(service.price);
    }

    modal.classList.add("show");

}

// =========================================================
// Close Purchase Modal
// =========================================================

function closePurchaseModal() {

    if (!modal) return;

    modal.classList.remove("show");

    selectedService = null;

}

if (closeModalBtn) {

    closeModalBtn.addEventListener("click", () => {

        closePurchaseModal();

    });

}

window.addEventListener("click", (event) => {

    if (event.target === modal) {

        closePurchaseModal();

    }

});

// =========================================================
// Wallet Balance Check
// =========================================================

function hasEnoughBalance(service) {

    return walletBalance >= service.price;

}

// =========================================================
// Purchase Validation
// =========================================================

async function beginPurchase() {

    if (!selectedService) {

        alert("Please select a service.");

        return;

    }

    if (!selectedService.active) {

        alert("This service is currently unavailable.");

        return;

    }

    if (!hasEnoughBalance(selectedService)) {

        alert("Insufficient wallet balance.");

        return;

    }

    await completePurchase();

}

if (modalBuyBtn) {

    modalBuyBtn.addEventListener("click", beginPurchase);

}
