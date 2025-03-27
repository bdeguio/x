const sidebar = document.getElementById("sidebar");
const main = document.getElementById("main");

document.getElementById("menuToggle").addEventListener("click", () => {
  sidebar.classList.add("show");
});

document.getElementById("closeSidebar").addEventListener("click", () => {
  sidebar.classList.remove("show");
});

// Attach event listeners to handle elements
document.querySelectorAll(".handle").forEach(handle => {
  handle.addEventListener("click", () => {
    const username = handle.dataset.handle;
    document.getElementById("pageTitle").textContent = username;
    loadHoldings(`${username}.csv`);
    sidebar.classList.remove("show"); // close after selection
  });
});

// Load holdings from CSV and render
function loadHoldings(csvFile) {
  fetch(csvFile)
    .then(res => res.text())
    .then(text => {
      const rows = text.trim().split("\n").slice(1);
      const holdings = rows.map(row => {
        const [symbol, ticker, percent] = row.split(",");
        return { symbol, ticker, percent };
      });

      main.innerHTML = ""; // Clear previous cards

      holdings.forEach(h => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <div class="holding-row">
            <div class="ticker">${h.ticker}</div>
            <div class="name">${h.symbol}</div>
            <div class="percent">${h.percent}%</div>
          </div>
        `;

        main.appendChild(card);
      });
    });
}

// Load yourhandle by default
document.getElementById("pageTitle").textContent = "yourhandle";
loadHoldings("yourhandle.csv");

// Modal toggle
const settingsModal = document.getElementById("settingsModal");
document.getElementById("openSettings").addEventListener("click", () => {
  settingsModal.classList.remove("hidden");
});

settingsModal.addEventListener("click", (e) => {
  if (e.target === settingsModal) {
    settingsModal.classList.add("hidden");
  }
});

// Dark mode toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", themeToggle.checked);
});
