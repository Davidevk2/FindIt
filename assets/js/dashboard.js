const canvasGender = document.getElementById("chartGender");
const canvasLost = document.getElementById("chartLost");
const canvasFound = document.getElementById("chartFound");
const cavasThings = document.getElementById("chartThings");

const spanUsers = document.getElementById("countUser");
const spanAdmins = document.getElementById("countAdmins");
const spanLost = document.getElementById("countLost");
const spanFound = document.getElementById("countFound");
const spanThings = document.getElementById("countThings");

// make a request to get all data

async function loadAllData(){
    let urlUsers = "http://localhost:3000/users";
    let urlLost = "http://localhost:3000/lost_items";
    let urlFound = "http://localhost:3000/found_items";
    let urlThings = "http://localhost:3000/lost_things";
    let urlMails= "http://localhost:3000/mails";

    // request to the users endpoint
    let requestUsers = await fetch(urlUsers);
    let dataUsers = await requestUsers.json();
    createUserStadistics(dataUsers);
    // request to the lost_items endpoint
    let requestLost = await fetch(urlLost);
    let dataLost = await requestLost.json();
    createLostStadistics(dataLost);
    // request to the found_items endpoint
    let requestFound = await fetch(urlFound);
    let dataFound = await requestFound.json();
    createFoundStadistics(dataFound);

    let requestThings = await fetch(urlThings);
    let dattThings = await requestThings.json();
    createThingStadistics(dattThings);

    // request to the mails endPoint
    let requestEmails = await fetch(urlMails);
    let dataMails = await requestEmails.json();
    listAllMails(dataMails);
}

loadAllData();

function createUserStadistics(dataUsers){
    // console.log(dataUsers);
    let totalItems = dataUsers.length < 10 ? "0" + dataUsers.length : "0" + dataUsers.length;

    let genders = ["Male", "Female", "Other"];
    let resultsGenders = [];

    genders.forEach((element) => {
        let iterator = 0;
        let amount = dataUsers.map(item => {
            if (element == item.gender) {
                iterator++;
            }
            return iterator;
        })
        resultsGenders.push(iterator);
    })

    
    let amount = dataUsers.filter(item => {
        return item.role == "Admin";
    })

    let totalAdmins = amount.length < 10 ? "0" + amount.length : amount.length;
    spanAdmins.innerText = totalAdmins;
    // console.log(totalAdmins);

    spanUsers.innerText = totalItems;
    createChart(canvasGender, "doughnut", genders, "# number of users by gender", resultsGenders);
}

// function to crete lost stadistics
function createLostStadistics(dataLost) {
    // console.log(dataLost);

    let totalItems = dataLost.length < 10 ? "0" + dataLost.length : "0" + dataLost.length;

    let types_documents = ["cc", "ti", "pasaporte", "lconducion", "carnet","otro"];
    let results = [];

    types_documents.forEach((element) => {
        let iterator = 0;
        let amount = dataLost.map(item => {
            if (element == item.document_type) {
                iterator++;
            }
            return iterator;
        })
        results.push(iterator);
    })

    spanLost.innerText = totalItems;

    // create chart
    createChart(canvasLost, "line", types_documents, "# of lost by document type", results);
}

// function to create found stadistics
function createFoundStadistics(dataFound) {
    // console.log(dataFound);

    let totalItems = dataFound.length < 10 ? "0" + dataFound.length : "0" + dataFound.length ;

    let types_documents = ["cc", "ti", "pasaporte", "lconducion", "carnet", "otro"];
    let results = []

    types_documents.forEach((element) => {
        let iterator = 0;
        let amount = dataFound.map(item => {
            if (element == item.document_type) {
                iterator++;
            }
            return iterator;
        })
        results.push(iterator);
    })
    spanFound.innerText = totalItems;

    createChart(canvasFound, "bar", types_documents, "# of found by document type", results);
}

// function to create and list all emails
function listAllMails(dataMails){
    let tableMails = document.getElementById("tblMails");
    const tbody = document.createElement("tbody");
        tableMails.appendChild(tbody);

    dataMails.forEach(mail =>{
        let row = document.createElement("tr");
        let Content = `
                <td>
                    <input type="checkbox" name="" id="">
                </td>
                <td>
                    <!-- <span><i class="bi-bookmark"></i></span> -->
                    <span><i class="bi-star"></i></span>
                </td>
                <td>${mail.name}</td>
                <td colspan="2"><b>${mail.subject}</b>
                    <!-- <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, et.</span> -->
                </td>
                <td>${mail.send_date}</td>
        `;
        row.innerHTML = Content;
        tbody.appendChild(row);
    })

}

function createThingStadistics(dataThings) {
    // console.log(dataFound);

    let totalItems = dataThings.length < 10 ? "0" + dataThings.length :  dataThings.length;

    let things = ["keys", "wallets", "bags"];
    let results = []

    things.forEach((element) => {
        let iterator = 0;
        let amount = dataThings.map(item => {
            if (element == item.element) {
                iterator++;
            }
            return iterator;
        })
        results.push(iterator);
    })
    spanThings.innerText = totalItems;

    createChart(cavasThings, "pie", things, "# of founds by object type", results);
}


// function to create charts with chart js
function createChart(element, typeChar, labelsData, title, data){

    new Chart(element, {
        type: typeChar, //line, bar,radar, doughnut, pie
        data: {
            labels: labelsData,
            datasets: [{
                barPercentage: 0.5,
                label: title,
                data: data,
                backgroundColor: ['#36A2EB',
                    '#FF6384',
                    '#4BC0C0',
                    '#FF9F40',
                    '#9966FF',
                    '#FFCD56',
                    '#C9CBCF'],
                // borderColor: ['rgb(255, 99, 132)',
                //     'rgb(255, 159, 64)',
                //     'rgb(255, 205, 86)',
                //     'rgb(75, 192, 192)',
                //     'rgb(0, 123, 255)',
                //     'rgb(153, 102, 255)',
                //     'rgb(201, 203, 207)'],
                borderWidth: 1
            }],
            // label: ["Medellin", "Bogota", "Cali", "Armenia", "Nariño"]
        },

        options: {
            // indexAxis: 'y',  //Axis x or y
            responsive: true,
            text: 'Most something',
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}