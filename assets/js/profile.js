const btnUpdate = document.getElementById("btnUpdate");

const lostTable = document.getElementById("lostTable");
const tbodyLost = document.createElement("tbody");
lostTable.appendChild(tbodyLost);

const foundTable = document.getElementById("foundTable");
const tbodyFound = document.createElement("tbody");
foundTable.appendChild(tbodyFound);

window.addEventListener("DOMContentLoaded",getAllData())

async function getAllData(){
    let userId = localStorage.getItem("user");

    let url = `http://localhost:3000/users/${userId}/?_embed=lost_items&_embed=found_items`;

    let request = await fetch(url);
    let response = await request.json();
    
    let lostItems = response.lost_items;
    let foundItems = response.found_items;
    
    fillProfileInfo(response);
    fillTables(lostItems, tbodyLost);
    fillTables(foundItems, tbodyFound);
}

function fillProfileInfo(response){
    let infoProfile = document.querySelectorAll(".info-profile");
    let letter = response.name[0].toUpperCase();
    
    infoProfile[0].innerText = letter;
    infoProfile[1].innerText = response.name + " "+ response.last_name;
    infoProfile[2].innerText = response.email;
    infoProfile[3].innerText = response.last_session;
    infoProfile[4].innerText = response.creation_date;
    
    let inputRequired = document.querySelectorAll(".form-control");
    inputRequired[0].value = response.name;
    inputRequired[1].value = response.last_name;
    inputRequired[2].value = response.identification;
    inputRequired[3].value = response.phone;
    inputRequired[4].value = response.email;
    inputRequired[5].value = response.password;
    inputRequired[6].value = response.city;
}

// Fill the tables 
function fillTables(data, tbTable) {
    if(data.length < 1){
        let row = document.createElement("tr");

        let emptyCell = document.createElement("td");
        emptyCell.setAttribute("colspan", "8");
        emptyCell.classList.add("text-center");
        emptyCell.innerText = "No reports have been created yet!";
        row.appendChild(emptyCell);

        tbTable.appendChild(row);
    }else{

    data.forEach((item, idx) => {
        let row = document.createElement("tr");
        tbTable.appendChild(row);
        
        let cellNumber = document.createElement("td");
        cellNumber.innerText = (1 + idx++);
        row.appendChild(cellNumber);

        let idCell = document.createElement("td");
        idCell.innerText = item.id;
        row.appendChild(idCell);

        let documentCell = document.createElement("td");
        documentCell.innerText = item.document_type;
        row.appendChild(documentCell);

        let dateCell = document.createElement("td");
        dateCell.innerText = item.missing_date;
        row.appendChild(dateCell);

        let reportedCell = document.createElement("td");
        reportedCell.innerText = item.reported_date;
        row.appendChild(reportedCell)

        let statusCell = document.createElement("td");
        statusCell.innerText = item.status;
        row.appendChild(statusCell);

        let options = document.createElement("td");
        options.innerHTML = `<button class="btn btn-sm btn-success" id="update">Update status</button>`;
        row.appendChild(options);

    });

    }
}

btnUpdate.addEventListener("click", updateUser);

async function updateUser(){
    let userId = localStorage.getItem("user");

    let inputIdenti = document.updateForm.identification.value;
    let inputName = document.updateForm.name.value;
    let inputLName = document.updateForm.lastName.value;
    let inputEmail = document.updateForm.email.value;
    let inputPass = document.updateForm.password.value;
    let inputPhone = document.updateForm.phone.value;
    let inputGender =  document.updateForm.gender.value;
    let inputCity   = document.updateForm.city.value;

    if(inputName != "" && inputEmail != "" && inputPass != "" && inputPhone != ""){

        let userInfo = {
            identification: inputIdenti,
            name: inputName,
            last_name: inputLName,
            email: inputEmail,
            password: inputPass,
            phone: inputPhone,
            gender: inputGender,
            city: inputCity,
        }


        console.log(userInfo);

        let request = await fetch(`http://localhost:3000/users/${userId}`, 
            {method : "PATCH", headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify(userInfo)
            })

        let response = await request;
        if (response.ok == true || (response.status == 201 || response.status == 200)) {
            console.log("The user was update successfully");
            showMessages("Great", "the user was updated successfully", "success",true);

            setTimeout(()=>{
                location.href = "";
s            },2000);
        } else {
            message = "Error trying to edit the user!";
            messageColor = "red";
            showInfoMessage(message, messageColor);
            console.log("error trying to create user !");
        }

        console.log(response);
    }else{
        let message = "Some required inputs are empty!"
        showInfoMessage(message, "red");
    }

}


