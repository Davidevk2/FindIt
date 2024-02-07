// redirect to login when the user log out the page
function logout() {
    localStorage.clear();
    setTimeout(() => {
        window.location.href = "login.html";
    }, 500)
}

// Check if there is an acitve sesion 
function checkLogin() {
    let logged = localStorage.getItem("login");
    if (!logged) {
        location.href = "login.html";
    } else {
        setProfileIcon();
    }
}

// Set the letter in the nav when there is an active sesion
function setProfileIcon() {
    let divProfile = document.querySelectorAll(".navbar-icon");
    let name = localStorage.getItem("name");
    let letter = name[0].toUpperCase();

    divProfile[0].innerText = letter;
    divProfile[1].innerText = letter;

}

checkLogin();