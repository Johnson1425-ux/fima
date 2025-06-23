document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("cropTrendsChart").getContext("2d");
    const toggleBtn = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("main");

    toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");
        main.classList.toggle("collapsed");
    });

  const cropTrendsChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Maize",
          data: [500, 600, 750, 800, 670, 900],
          borderColor: "#28a745",
          fill: false
        },
        {
          label: "Beans",
          data: [400, 450, 490, 510, 530, 550],
          borderColor: "#007bff",
          fill: false
        },
        {
          label: "Rice",
          data: [300, 350, 370, 400, 420, 460],
          borderColor: "#ffc107",
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top"
        },
        title: {
          display: true,
          text: "Crop Production Trends (kg)"
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Production (kg)"
          }
        },
        x: {
          title: {
            display: true,
            text: "Month"
          }
        }
      }
    }
  });
});
