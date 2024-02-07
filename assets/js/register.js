//create a const for the Date object
const date = new Date();
// get the elements from the HTML file
const btnSignUp = document.getElementById("btnSingUp");
const checkBoxTerm = document.getElementById("cbxTerms");
const spanMessages = document.getElementById("messages");

btnSignUp.onclick = singUpUser;

async function singUpUser(){
    let name = document.signupForm.name.value;
    let email = document.signupForm.email.value;
    let phone = document.signupForm.phone.value;
    let password = document.signupForm.pass.value;
    let create_date = getCurrentDate();
    let terms  = document.signupForm.terms.value;

    let message = "";
    let messageColor = "";

    if(checkBoxTerm.checked){
        if(name != "" && email !="" && phone != "" && password != ""){
    
        let userInfo = {
            identification :"", 
            name: name, 
            last_name: "",
            email: email,
            password: password,
            phone: phone,
            gender: "", 
            city: "",
            role: "User",
            last_session: "",
            creation_date: create_date,
        }
        console.log("we have", name, email, phone, password, create_date);
    
        let request = await fetch("http://localhost:3000/users",
            {method: "POST",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(userInfo)    
            });
            
            let response = await request;
            let data = await response.json();
            if (request.ok == true || (request.status == 201 || request.status == 200)){
                console.log("The user was created successfully");
      
                let loggin = "true";
                let logged = data.id;
                // clearData();
                localStorage.setItem("login", loggin);
                localStorage.setItem("user", logged);
                window.location.href = "home.html";
            }else{
                message = "Error trying to create the user!";
                messageColor = "red";
                showInfoMessage(message, messageColor);
                console.log("error trying to create user !");   
            }
    
        }else{
            message = "Some fields are empty!!";
            messageColor = "red";
            showInfoMessage(message, messageColor);
            console.log("some fields are empty!!");
        }

    }else{
        message = "Accept terms and conditions!!";
        messageColor = "red";
        showInfoMessage(message, messageColor);
        console.log("Accept terms and conditions!");
    }


}


// // get the current Date  to create user
// function getCurrentDate(){
//     return date.toUTCString();
// }

// // Show messages when the required inputs are empty
// function showInfoMessage(message, color) {
//     let inputs = document.querySelectorAll(".form-control");

//     inputs.forEach((input) => {
//         if(input.value == ""){
//             input.classList.add("is-invalid");
//             input.style.border = "1px solid red";

//         }
//     });

//     spanMessages.classList.toggle("hidden");
//     spanMessages.style.color = color;
//     spanMessages.innerText = message;

//     setTimeout(() => {
//         spanMessages.classList.toggle("hidden");
//         spanMessages.innerText = "";

//         inputs.forEach((input) => {
//             input.classList.remove("is-invalid");
//             input.style.border = "1px solid #6A6A6D";
//         });

//     }, 5000);

// }
