const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('close-btn');
const openSidebarBtn = document.getElementById('open-sidebar-btn');
const reopenSidebarBtn = document.getElementById('reopen-sidebar-btn');
const mainContent = document.getElementById('main-content');

closeBtn.addEventListener('click', () => {
    sidebar.classList.add('closed');
    mainContent.classList.add('sidebar-closed');
    reopenSidebarBtn.style.display = 'block';
});

openSidebarBtn.addEventListener('click', () => {
    sidebar.classList.remove('closed');
    mainContent.classList.remove('sidebar-closed');
    reopenSidebarBtn.style.display = 'none';
});

reopenSidebarBtn.addEventListener('click', () => {
    sidebar.classList.remove('closed');
    mainContent.classList.remove('sidebar-closed');
    reopenSidebarBtn.style.display = 'none';
});