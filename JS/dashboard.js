document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("main");
    const navLinks = sidebar.querySelectorAll("a");

    toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");
        main.classList.toggle("collapsed");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });

    const activePath = window.location.pathname;
    navLinks.forEach(link => {
        if (link.href.includes(activePath)) {
            link.classList.add("active");
        }
    });
});
