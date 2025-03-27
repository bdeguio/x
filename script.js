// Toggle sidebar open/close
const sidebar = document.getElementById("sidebar");

document.getElementById("menuToggle").addEventListener("click", () => {
  sidebar.classList.add("show");
});

document.getElementById("closeSidebar").addEventListener("click", () => {
  sidebar.classList.remove("show");
});

// Read CSV and display holdings
fetch("holdings.csv")
  .then(res => res.text())
  .then(text => {
    const rows = text.trim().split("\n").slice(1); // skip header
    const holdings = rows.map(row => {
      const [symbol, ticker, percent] = row.split(",");
      return { symbol, ticker, percent };
    });

    const main = document.getElementById("main");
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
