const date = new Date();

console.log("We are working !");

const btnSignUp = document.getElementById("btnSingUp");
const checkBoxTerm = document.getElementById("cbxTerms");
// if(!checkBoxTerm.checked){
//     btnSignUp.setAttribute("disabled");
// }

btnSignUp.onclick = singUpUser;

async function singUpUser(){
    let name = document.signupForm.name.value;
    let email = document.signupForm.email.value;
    let phone = document.signupForm.phone.value;
    let password = document.signupForm.pass.value;
    let create_date = getCurrentDate();
    let terms  = document.signupForm.terms.value;

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
    
        let request = fetch("http://localhost:3000/users",
            {method: "POST",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(userInfo)    
            });
    
            let result = await request;
    
            if (result.ok == true || (result.status == 201 || result.status == 200)){
                console.log("The user was created successfully");
                 
                let loggin = "true";
                // clearData();
                // redirection  the user to the home part
                localStorage.setItem("login", loggin);
                window.location.href = "home.html";
            }else{
                console.log("error trying to create user !");
            }
    
        }else{
            console.log("some fields are empty!!");
        }

    }else{
        console.log("Accept terms and conditions!");
    }


}


// get the current Date  to create user
function getCurrentDate(){
    return date.toUTCString();
}

// clearData();

// async function test(){
//     // let  request =  fetch("http://localhost:3000/users")
//     // console.log(await request);
//     // console.log(request);
// }
// test();