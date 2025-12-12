// ===== menu mobile =====
const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  // Chiudi menu quando clicchi un link (mobile)
  nav.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.matches("a.nav-link")) {
      // Se clicchi "News ▾" mentre il menu è aperto, lo gestisce il dropdown
      if (target.classList.contains("nav-dropdown-toggle") && nav.classList.contains("open")) {
        return;
      }
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });

  // Chiudi menu se clicchi fuori (mobile)
  document.addEventListener("click", (e) => {
    if (!nav.classList.contains("open")) return;
    const clickedInside = nav.contains(e.target) || menuButton.contains(e.target);
    if (!clickedInside) {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

// ===== dropdown "News" su mobile =====
// Richiede che in HTML tu abbia:
// <div class="nav-dropdown"> ... <a class="nav-link nav-dropdown-toggle">News ▾</a> ... </div>
// e nel CSS: .nav-dropdown.open .nav-dropdown-menu { display:block; } (ti avevo dato il blocco)
document.querySelectorAll(".nav-dropdown-toggle").forEach((toggle) => {
  toggle.addEventListener("click", (e) => {
    if (nav && nav.classList.contains("open")) {
      e.preventDefault(); // evita andare su news.html al primo tap
      const wrap = toggle.closest(".nav-dropdown");
      if (wrap) {
        wrap.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(wrap.classList.contains("open")));
      }
    }
  });
});

// ===== anno corrente nel footer =====
const yearSpan = document.getElementById("yearSpan");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ===== submit finto per il form tesseramento =====
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
