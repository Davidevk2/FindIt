
function logout(){
    localStorage.clear();
    setTimeout(()=>{
        window.location.href = "login.html";
    },2000)
}

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

checkLogin();