document.addEventListener("DOMContentLoaded", () => {
  const farmTableBody = document.getElementById("farmTableBody");
    const toggleBtn = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("main");

    toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");
        main.classList.toggle("collapsed");
    });

  const farms = [
    {
      id: "FARM001",
      farmer: "John Doe",
      location: "Kibaha",
      ward: "Mlandizi",
      crop: "Maize",
      size: 3,
      status: "Verified"
    },
    {
      id: "FARM002",
      farmer: "Jane Mussa",
      location: "Bagamoyo",
      ward: "Dunda",
      crop: "Rice",
      size: 4,
      status: "Verified"
    },
    {
      id: "FARM003",
      farmer: "Ali Ramadhan",
      location: "Chalinze",
      ward: "Msoga",
      crop: "Cassava",
      size: 2,
      status: "Verified"
    }
  ];

  farms.forEach(farm => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${farm.id}</td>
      <td>${farm.farmer}</td>
      <td>${farm.location}</td>
      <td>${farm.ward}</td>
      <td>${farm.crop}</td>
      <td>${farm.size}</td>
      <td>${farm.status}</td>
    `;
    farmTableBody.appendChild(row);
  });
});
