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
    
    let inputRequired = document.querySelectorAll(".form-required");
    inputRequired[0].value = response.name;
    inputRequired[1].value = response.phone;
    inputRequired[2].value = response.email;
    inputRequired[3].value = response.password;

    
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


