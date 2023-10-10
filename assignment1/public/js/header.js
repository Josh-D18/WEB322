let timeoutId; 

function showLogoutLink() {
    const usernameElement = document.querySelector('.username');
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
        usernameElement.classList.add("link");
        usernameElement.textContent = 'Logout';
    }, 300); 
}

function hideLogoutLink() {
    const usernameElement = document.querySelector('.username');
    clearTimeout(timeoutId); // Clear any existing timeout

    const cookieString = document.cookie;
    const decodedCookieString = decodeURIComponent(cookieString);

    const startIndex = decodedCookieString.indexOf('{');
    const jsonString = decodedCookieString.substring(startIndex);
    
    const data = JSON.parse(jsonString);
    
    const username = data.username;

    timeoutId = setTimeout(() => {
        usernameElement.classList.remove("link");
        usernameElement.textContent = username;
    }, 300); 
}

const signout = () => {
    const usernameElement = document.querySelector('.username');
    const text = usernameElement.textContent;

    if (text === 'Logout') {
        document.cookie = `${"loggedInUser"}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        location.reload();
    }
}

const usernameElement = document.querySelector('.username');

usernameElement.addEventListener('mouseenter', () => {
    showLogoutLink();
});

usernameElement.addEventListener('mouseleave', () => {
    hideLogoutLink();
});

usernameElement.addEventListener('click', () => {
    signout();
});