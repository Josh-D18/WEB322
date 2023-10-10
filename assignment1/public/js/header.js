function showLogoutLink() {
    const usernameElement = document.querySelector('.username');
    usernameElement.textContent = 'Logout';
}

function hideLogoutLink() {
    const usernameElement = document.querySelector('.username');
    usernameElement.textContent = 'Your Username';
}
