document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("hidden");
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
      card.innerHTML = `<strong>${h.symbol}</strong> (${h.ticker}) — ${h.percent}%`;
      main.appendChild(card);
    });
  });
