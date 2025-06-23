document.addEventListener("DOMContentLoaded", function () {
      const toggleBtn = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("main");

    toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");
        main.classList.toggle("collapsed");
    });
  const ctx = document.getElementById("productionChart").getContext("2d");

  const productionChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Maize", "Rice", "Beans", "Cassava", "Sorghum"],
      datasets: [
        {
          label: "Average Yield per Farm (Bags)",
          data: [35, 42, 27, 50, 22],
          backgroundColor: [
            "#6b8e69",
            "#8fbc8f",
            "#a9cfa9",
            "#5a7c5a",
            "#3e5940"
          ],
          borderRadius: 5
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
        title: {
          display: true,
          text: "Crop Production Trends in the Ward"
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 10
          }
        }
      }
    }
  });
});
