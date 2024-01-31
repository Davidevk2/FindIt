
function logout(){
    localStorage.clear();
    setTimeout(()=>{
        window.location.href = "login.html";
    },2000)
}