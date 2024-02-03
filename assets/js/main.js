
function logout(){
    localStorage.clear();
    setTimeout(()=>{
        window.location.href = "login.html";
    },500)
}

// Check if there is sesion 
function checkLogin(){
        let logged = localStorage.getItem("login");
    if(!logged){
       location.href = "login.html";
    }
}

// show Alerts or Errors!
function showMessages(titulo, text, icon) {
    Swal.fire({
        title: titulo,
        text: text,
        icon: icon, //success, error, warning, info, question
        width: "50%",
        backdrop: true,
        toast: false,
        //position: "top-end"
    })
}


// Show messages when the required inputs are empty
function showInfoMessage(message, color) {
    let inputs = document.querySelectorAll(".form-control");

    inputs.forEach((input) => {
        if (input.value == "") {
            input.classList.add("is-invalid");
            input.style.border = "1px solid red";

        }
    });

    spanMessages.classList.toggle("hidden");
    spanMessages.style.color = color;
    spanMessages.innerText = message;

    setTimeout(() => {
        spanMessages.classList.toggle("hidden");
        spanMessages.innerText = "";

        inputs.forEach((input) => {
            input.classList.remove("is-invalid");
            input.style.border = "1px solid #6A6A6D";
        });

    }, 5000);

}

// Control the scroll
window.onscroll = function () {
    // console.log("El scrol se mueve");
    const  navbar = document.querySelector('.navbar');
    const  scroll = document.documentElement.scrollTop;
    if (scroll > 300 || scroll) {
        navbar.classList.add("is-active");
    } else {
        navbar.classList.remove("is-active");
        
    }
}

checkLogin();