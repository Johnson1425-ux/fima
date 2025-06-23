document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleSidebar");
  const sidebar = document.getElementById("sidebar");
  const main = document.getElementById("main");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    main.classList.toggle("collapsed");
  });

  const popup = document.getElementById("popupForm");
  const addBtn = document.getElementById("addOfficerBtn");
  const closePopup = document.getElementById("closePopup");
  const officerForm = document.getElementById("officerForm");
  const officerList = document.getElementById("officerList");

  let officers = [
    { id: 'EO101', name: 'Mary Balozi', email: 'mary.balozi@example.com', ward: 'Mzumbe' },
    { id: 'EO102', name: 'Tom Mshana', email: 'tom.mshana@example.com', ward: 'Kilakala' },
  ];

  function renderOfficers() {
    officerList.innerHTML = '';
    officers.forEach((officer, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${officer.id}</td>
        <td>${officer.name}</td>
        <td>${officer.email}</td>
        <td>${officer.ward}</td>
        <td>
          <button class="edit" onclick="alert('Edit functionality not implemented')">Edit</button>
          <button class="delete" onclick="deleteOfficer(${index})">Delete</button>
        </td>
      `;
      officerList.appendChild(row);
    });
  }

  window.deleteOfficer = function(index) {
    if (confirm("Are you sure you want to delete this officer?")) {
      officers.splice(index, 1);
      renderOfficers();
    }
  }

  officerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = officerForm.querySelectorAll("input");
    const name = inputs[0].value;
    const email = inputs[1].value;
    const ward = inputs[2].value;

    const newID = `EO${Math.floor(100 + Math.random() * 900)}`;
    officers.push({ id: newID, name, email, ward });

    alert(`Officer registered. ID: ${newID}, Default password: "Password"`);

    officerForm.reset();
    popup.style.display = "none";
    renderOfficers();
  });

  addBtn.addEventListener("click", () => {
    popup.style.display = "flex";
  });

  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
  });

  renderOfficers();
});
