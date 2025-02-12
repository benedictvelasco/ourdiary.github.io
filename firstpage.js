const correctPassword = "221105"; 
let attempts = 0;

const randomMessages = [
  "MALI BUBBYYY",
  "WRONG AGAIN PO",
  "TRY MO UNG ANNI...HIHI MAALIII",
  "HALA SIGE PINDOT",
  "KAYA MO YAN ! !", 
  "MALAPIT NA MAUBOS ATTEMPTS MO\n(WALA NA AKONG MAISIP NA WORD)"
];

function addNumber(num) {
  let inputField = document.getElementById("text");
  if (inputField.value.length < 6) {
    inputField.value += num;
  }
}

function backspace() {
  let inputField = document.getElementById("text");
  inputField.value = inputField.value.slice(0, -1);
}

function clearText() {
  document.getElementById("text").value = "";
}

function getRandomPosition() {
  let x = Math.random() * (window.innerWidth - 200); // Avoids overflowing the screen width
  let y = Math.random() * (window.innerHeight - 50); // Avoids overflowing the screen height
  return { x, y };
}

function removeAllMessages() {
  document.querySelectorAll(".floating-message").forEach(msg => msg.remove());
}

function checkPassword() {
  let inputField = document.getElementById("text").value.trim();
  let statusMessage = document.getElementById("status-message");
  let redirectMessage = document.getElementById("redirect-message");

  if (inputField === correctPassword) {
    statusMessage.innerText = "YAYY TAMA !!";
    statusMessage.style.color = "green";

    attempts = 0; // Reset attempts after success

    removeAllMessages(); // Removes all wrong messages

    setTimeout(() => {
      window.location.href = "secondpage.html";
    }, 1000);
    
  } else {
    attempts++; // Increment attempts on wrong password

    let floatingMessage = document.createElement("div");
    floatingMessage.classList.add("floating-message");

    let randomIndex = Math.floor(Math.random() * randomMessages.length);
    floatingMessage.innerText = attempts >= 3 ? randomMessages[randomIndex] : "OOPS MALI HIHI";

    let { x, y } = getRandomPosition();
    floatingMessage.style.left = `${x}px`;
    floatingMessage.style.top = `${y}px`;

    document.body.appendChild(floatingMessage);

    redirectMessage.innerText = ""; 
    clearText(); 
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn");
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("locationText");
  const closeModal = document.querySelector(".close");

  // Add click event to each button
  buttons.forEach(button => {
      button.addEventListener("click", function () {
          const locationName = this.parentElement.querySelector("h3").textContent;
          modalText.textContent = `${locationName}`;
          modal.style.display = "block"; // Show modal
      });
  });

  // Close modal when clicking the close button
  closeModal.addEventListener("click", function () {
      modal.style.display = "none";
  });

  // Close modal when clicking outside the modal content
  window.addEventListener("click", function (event) {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  });
});
