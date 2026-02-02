// Load balance from localStorage or use default





let balance = parseFloat(localStorage.getItem("bankBalance")) || 1000;

const balanceDisplay = document.getElementById("balance-display");
const amountInput = document.getElementById("amount");
const depositBtn = document.getElementById("deposit-btn");
const withdrawBtn = document.getElementById("withdraw-btn");
const errorMessage = document.getElementById("error-message");
const form = document.getElementById("banking-form");

function updateBalance() {``
  balanceDisplay.textContent = `Balance: ${balance}`;
  // Save to localStorage
  localStorage.setItem("bankBalance", balance);
}

// Display the loaded balance on page load
updateBalance();

function showError() {
  errorMessage.style.display = "block";
}

function hideError() {
  errorMessage.style.display = "none";
}

function validateAmount(amount) {
  return amount > 0 && !isNaN(amount);
}

function handleDeposit() {
  const amount = parseFloat(amountInput.value);

  if (validateAmount(amount)) {
    balance += amount;
    updateBalance();
    hideError();
    amountInput.value = "";
  } else {
    showError();
  }
}

withdrawBtn.addEventListener("click", () => {
  const amount = parseFloat(amountInput.value);

  if (!validateAmount(amount)) {
    showError();
  } else if (amount > balance) {
    errorMessage.textContent = "Insufficient funds!";
    showError();
  } else {
    balance -= amount;
    updateBalance();
    hideError();
    amountInput.value = "";
  }
});

// Hide error when user enters valid input
amountInput.addEventListener("input", () => {
  const amount = parseFloat(amountInput.value);
  if (validateAmount(amount)) {
    hideError();
    amountInput.classList.add("valid");
  } else {
    showError();
    amountInput.classList.remove("valid");
  }
});

// Prevent form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
});