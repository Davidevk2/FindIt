
function logout(){
    localStorage.clear();
    setTimeout(()=>{
        window.location.href = "login.html";
    },2000)
}

function checkLogin(){
    console.log("revisamos al sesion");
    let logged = localStorage.getItem("login");
    if(!logged){
       location.href = "login.html";
    }
}

checkLogin();