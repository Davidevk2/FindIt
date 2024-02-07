
// show Alerts or Errors with sweetalert!
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
    let inputs = document.querySelectorAll(".form-required");
    let spanMessages = document.getElementById("messages");

    inputs.forEach((input) => {
        if (input.value == "") {
            input.classList.add("is-invalid");
            input.style.border = "1px solid red";
        }
    });

    spanMessages.classList.toggle("hidden");
    spanMessages.style.color = color;
    spanMessages.style.border = `1px solid ${color}`;
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

// clean the data from the form
function clearData() {
    let form = document.getElementsByTagName("form");
    form[0].reset();
}  

// change the nav when  we move the scroll
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

// get the current Date  to create user
function getCurrentDate() {
    return date.toUTCString();
}
