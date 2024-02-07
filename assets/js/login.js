// get the elements from the html file
const btnLogin = document.getElementById("btnLogin");
const spanMessages = document.getElementById("messages");

// call a function when the user makes click in the button
btnLogin.addEventListener("click", getDataByUser);

async function getDataByUser(){
    let dataEmail = document.loginForm.email.value;
    let dataPass = document.loginForm.password.value;

    let message = "";
    let messageColor = "";

    if(dataEmail != "" && dataPass != ""){
        // make a request to bring all user information
        let request = await fetch("http://localhost:3000/users");
        let result =  await request.json();
        
        let userLogged = result.filter(user =>{
            return (dataEmail ==user.email  || dataEmail == user.phone )  && dataPass == user.password;
        });
        
        if(userLogged.length >= 1 ){

            let logged = userLogged[0].id;
            let userName = userLogged[0].name;
            let role = userLogged[0].role;
            
            // set the user information in the localstorage
            localStorage.setItem("login", "True");
            localStorage.setItem("user", `${logged}`);
            localStorage.setItem("name", `${userName}`);
            localStorage.setItem("role", `${role}`);
            location.href = "./home.html";
           
        }else{
            message = "Email and/or password incorrect!";
            messageColor = "red";
            // call the function that shows the messages
            showInfoMessage(message, messageColor);
        }

    }else{
        message = "Email and/or password are empty";
        messageColor = "red";
        // call the function that shows the messages
        showInfoMessage(message, messageColor);
    }

}

// Show password
const cbxShow = document.getElementById('show');
cbxShow.addEventListener("click", ()=>{
    const  inputPass = document.getElementById('inputPass');
    inputPass.type === "password" ? inputPass.type = "text" : inputPass.type = "password";
});





