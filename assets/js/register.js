const date = new Date();

console.log("We are working !");

const btnSignUp = document.getElementById("btnSingUp");

btnSignUp.onclick = singUpUser;

function singUpUser(){
    let name = document.signupForm.name.value;
    let email = document.signupForm.email.value;
    let phone = document.signupForm.phone.value;
    let password = document.signupForm.pass.value;
    let create_date = getCurrentDate();

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

    let request = fetch("")
    .then(response =>{ return response.json()})
    .then(data =>{ consele.log(data)})
    .catch(error =>{console.log(error);})


    console.log(name, email, phone, password, create_date);
    // console.log(getCurrentDate());

}


// get the current Date  to create user
function getCurrentDate(){
    return date.toUTCString();
}