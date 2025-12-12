// menu mobile
const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

// anno corrente nel footer
const yearSpan = document.getElementById("yearSpan");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// submit finto per il form tesseramento
const joinForm = document.getElementById("joinForm");
const joinStatus = document.getElementById("joinStatus");

if (joinForm && joinStatus) {
  joinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(joinForm);

    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();

    joinStatus.textContent = "";
    joinStatus.className = "form-status";

    if (!name || !email) {
      joinStatus.textContent = "Compila almeno nome e email.";
      joinStatus.classList.add("error");
      return;
    }

    // Qui potresti collegare un vero backend / Google Form
    joinStatus.textContent =
      "Richiesta inviata (demo). Collega questo form a un servizio reale per ricevere le richieste.";
    joinStatus.classList.add("success");
    joinForm.reset();
  });
}
