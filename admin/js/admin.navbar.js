let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function () {
    sidebar.classList.toggle("active");
    if (sidebar.classList.contains("active"))
        sidebarBtn.classList.replace("ri-menu-fill", "ri-menu-4-fill");
    else sidebarBtn.classList.replace("ri-menu-4-fill", "ri-menu-fill");
};

window.addEventListener("DOMContentLoaded", () => {
    let userId = sessionStorage.getItem("userId");
    if (!userId || userId == "") {
        window.location.href = "B42_WEB_003_Web-Wizards/admin/auth/Adminlogin.html";
        return;
    }

    async function fetchUser() {
        let res = await fetch(`https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json`);
        let user = await res.json();
        document.getElementById("admin_name").innerHTML = user.name.slice(0, 1).toUpperCase() + user.name.slice(1);
    }
    fetchUser();

    document.getElementById("log_out").addEventListener("click", () => {
        sessionStorage.clear();
        window.location.href = "B42_WEB_003_Web-Wizards/admin/auth/Adminlogin.html";
    });
})