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
        })
        .then(response => { return response.json() })
        .then(data => { console.log(data) })
        .catch(error => { console.log(error); })

    }else{
        console.log("some fields are empty!!");
    }


}


// get the current Date  to create user
function getCurrentDate(){
    return date.toUTCString();
}

async function test(){
    // let  request =  fetch("http://localhost:3000/users")
    // console.log(await request);

    
    
    // console.log(request);

}

test();