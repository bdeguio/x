const sidebar = document.getElementById("sidebar");
const main = document.getElementById("main");
const pageTitle = document.getElementById("pageTitle");
const settingsModal = document.getElementById("settingsModal");
const themeToggle = document.getElementById("themeToggle");

// Open sidebar
document.getElementById("menuToggle").addEventListener("click", () => {
  sidebar.classList.add("show");
});

// Close sidebar
document.getElementById("closeSidebar").addEventListener("click", () => {
  sidebar.classList.remove("show");
});

// Load holdings when handle is clicked
document.querySelectorAll(".handle").forEach(handle => {
  handle.addEventListener("click", () => {
    const username = handle.dataset.handle;
    pageTitle.textContent = username;
    loadHoldings(`${username}.csv`);
    sidebar.classList.remove("show");
  });
});

// Load holdings from CSV
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

// Initial load
pageTitle.textContent = "yourhandle";
loadHoldings("yourhandle.csv");

// Open settings modal
document.getElementById("openSettings").addEventListener("click", () => {
  settingsModal.classList.remove("hidden");
  settingsModal.classList.add("show");
});

// Close modal when clicking outside content
settingsModal.addEventListener("click", (e) => {
  if (e.target === settingsModal) {
    settingsModal.classList.remove("show");
    setTimeout(() => {
      settingsModal.classList.add("hidden");
    }, 300); // match your CSS transition duration
  }
});

// Dark mode toggle
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", themeToggle.checked);
});
