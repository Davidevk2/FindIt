const btnLogin = document.getElementById("btnLogin");
const spanMessages = document.getElementById("messages");

btnLogin.addEventListener("click", getDataByUser);

async function getDataByUser(){
    let dataEmail = document.loginForm.email.value;
    let dataPass = document.loginForm.password.value;

    let message = "";
    let messageColor = "";

    if(dataEmail != "" && dataPass != ""){

        let request = await fetch("http://localhost:3000/users");
        let result =  await request.json();
        
        let userLogged = result.filter(user =>{
            return (dataEmail ==user.email  || dataEmail == user.phone )  && dataPass == user.password;
        });
        
        if(userLogged.length >= 1 ){

            let logged = userLogged[0].id;
            let role = userLogged[0].role;
            
            localStorage.setItem("login", "True");
            localStorage.setItem("user", `${logged}`);
            localStorage.setItem("role", `${role}`);
            location.href = "./home.html";
           

        }else{
            message = "Email and/or password incorrect!";
            messageColor = "red";
            showInfoMessage(message, messageColor);
            // console.log("Email or password incorrects!");
        }

    }else{
        message = "Email and/or password are empty";
        messageColor = "red";
        showInfoMessage(message, messageColor);
    }

}

// Show password
const cbxShow = document.getElementById('show');
cbxShow.addEventListener("click", ()=>{
    const  inputPass = document.getElementById('inputPass');
    inputPass.type === "password" ? inputPass.type = "text" : inputPass.type = "password";
});


function showInfoMessage(message, color){
    let  inputs = document.querySelectorAll(".form-control");
     
    inputs.forEach((input)=>{
        input.classList.add("is-invalid");
        input.style.border = "1px solid red";
    });

    spanMessages.classList.toggle("hidden");
    spanMessages.style.color = color;
    spanMessages.innerText = message;

    setTimeout(()=>{
        spanMessages.classList.toggle("hidden");
        spanMessages.innerText = "";

        inputs.forEach((input) => {
            input.classList.remove("is-invalid");
            input.style.border = "1px solid #6A6A6D";
        });

    },5000);

}



