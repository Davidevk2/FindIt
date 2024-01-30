console.log("it works!");

const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", getDataByUser);

async function getDataByUser(){
    let dataEmail = document.loginForm.email.value;
    let dataPass = document.loginForm.password.value;

    if(dataEmail != "" && dataPass != ""){
        console.log("Email:",dataEmail,"Pass",dataPass);

        let request = await fetch("http://localhost:3000/users");
        let result =  await request.json();
        
        let userLogged = result.filter(user =>{
            return (dataEmail ==user.email  || dataEmail == user.phone )  && dataPass == user.password;
        });
        
        if(userLogged.length >= 1 ){
            console.log(userLogged);

            localStorage.setItem("loginnn", "True");

            setTimeout(()=>{
                window.location.href = "home.html";
            }, 1500);

        }else{
            console.log("Email or password incorrects!");
        }

    }else{
        console.log("email or password are empty");
    }

}

// Show password
const cbxShow = document.getElementById('show');
cbxShow.addEventListener("click", ()=>{
    const  inputPass = document.getElementById('inputPass');
    inputPass.type === "password" ? inputPass.type = "text" : inputPass.type = "password";
});


    // function login(){
    //     localStorage.setItem("login", "True");
    //     window.location.href = "home.html";
    // }

