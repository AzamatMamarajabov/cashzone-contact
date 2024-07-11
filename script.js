const scriptURL = 'https://script.google.com/macros/s/AKfycbwD3Pj5erSOdl9cjFR9BCkUIKQL10iuPfhWYKSHPSRatRyHs6SryNnO3vStJ_3puZ9Q/exec';
const form = document.getElementById('submit-to-google-sheet');

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            console.log('Success!', response);
            sendTelegram(); // Call your function to send to Telegram after Google Sheet submission
        })
        .catch(error => console.error('Error!', error.message));
});

// Telegram bot configuration
let telegram_bot_id = "7370398929:AAFaj5AgaCeuFxyfvTJct5Uwmr_Qv0R2-g0";
let chat_id = 6526885714;

let u_name, phone, price;
let message;

// Function to prepare message
function ready() {
    u_name = document.getElementById("name").value.trim();
    phone = document.getElementById("phone").value.trim();
    price = document.getElementById("price").value.trim();
    
    message = "\nIsm: " + u_name + "\nTelefon raqam: " + phone + "\nInvestitsiya: " + price;
}

// Function to send message to Telegram
function sendTelegram() {
    ready();

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('Telegram message sent successfully.');
            // Optionally, you can redirect to another page after submission
            window.location.href = 'index.html';
        }
    };
    xhr.send(JSON.stringify({
        "chat_id": chat_id,
        "text": message
    }));

    // Clear form fields and disable submit button after submission
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("price").value = "";
    document.getElementById("submitButton").setAttribute("disabled", "disabled");

    return false;
}

// Function to check form validity
function checkForm() {
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let price = document.getElementById("price").value.trim();

    let nameRegex = /^[a-zA-Z]+$/;

    if (name.length >= 3 && name.length <= 20 && name.match(nameRegex) &&
        phone !== "" && phone.length >= 9 && phone.length <= 13 &&
        price !== "") {
        document.getElementById("submitButton").removeAttribute("disabled");
    } else {
        document.getElementById("submitButton").setAttribute("disabled", "disabled");
    }
}

// Event listeners for form inputs
document.getElementById("name").addEventListener("input", checkForm);
document.getElementById("phone").addEventListener("input", checkForm);
document.getElementById("price").addEventListener("input", checkForm);
