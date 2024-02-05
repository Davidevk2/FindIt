const date = new Date();

const btnReport = document.getElementById("btnReport");
const noOption = document.getElementById("noOption");
const yesOption = document.getElementById("yesOption");
const divOtherContact = document.getElementById("other-contact");

const spanMessages = document.getElementById("messages");

const modal = document.getElementById("confirm-modal");
const span = document.getElementsByClassName("close")[0];
const btnChange = document.getElementById("btnChange");
const btnSend = document.getElementById("btnSend");

let message, messageColor;


// Check if the radio buttons are checked
noOption.addEventListener("change", () => {
    divOtherContact.style.display = "block";
})
yesOption.addEventListener("change", () => {
    divOtherContact.style.display = "none"
})

// Object tempplate to create a report 
let lost_item = {
    document_type: "",
    missing_date: "",
    owner_name: "",
    owner_document: "",
    details: "",
    userId: "",
    reporter_name: "",
    reporter_contact: {},
    notify_by: "SMS",
    status: "",
    reported_date: ""
}


// validate that the inputs are not empty 
btnReport.addEventListener("click", checkInputsItem);

// create a new  lost item in the db
async function checkInputsItem() {
    let type = document.reportForm.document_type.value;
    let lost_date = document.reportForm.lost_date.value;
    let owner_name = document.reportForm.owner_name.value;
    let owner_number = document.reportForm.owner_document.value;
    let details = document.reportForm.description.value;
    let contact = document.reportForm.contact.value;
    let current_date = date.toUTCString();
    let reporter_name = "";
    let reporter_contact = { email: "", phone: ""};
    let status = "Found";
    let emailInput = document.reportForm.email.value;
    let phoneInput = document.reportForm.phone.value;

    // get the id from the locaStorege
    let reporter_id = localStorage.getItem("user");

    if (contact == "" || contact === "Same") {

        // request to fill the user info (contact)
        let request = await fetch(`http://localhost:3000/users/${reporter_id}`);
        let result = await request.json();

        reporter_name = result.name;
        reporter_contact.email = result.email;
        reporter_contact.phone = result.phone;

    } else {
        // ask by the infoinputs are not empty
        if (emailInput != "" || phoneInput != "") {
            reporter_name = owner_name;
            reporter_contact.email = emailInput;
            reporter_contact.phone = phoneInput;
            console.log(reporter_name, reporter_contact);

        } else {
            message = "You need to fill at least one contact info";
            messageColor = "red";
            showInfoMessage(message, messageColor);
            console.log("both fields are empty!");
        }
    }

    if (type != "" && lost_date != "" && owner_name != "" && owner_number != "") {

        // assing to the object the values from the inputs
        lost_item.document_type = type;
        lost_item.missing_date = lost_date;
        lost_item.owner_name = owner_name;
        lost_item.owner_document = owner_number;
        lost_item.details = details;
        lost_item.userId = reporter_id;
        lost_item.reporter_name = reporter_name;
        lost_item.reporter_contact = reporter_contact;
        lost_item.notify_by = "SMS";
        lost_item.status = status;
        lost_item.reported_date = current_date;

        fillModalConfirm(lost_item);

    } else {
        message = "some fiels are empty!";
        messageColor = "red";
        showInfoMessage(message, messageColor)
        console.log("some fiels are empty!");
    }


}

// Send the information when the user confirmd
btnSend.addEventListener("click", reportLostItem);

async function reportLostItem() {
    closeModal();
    console.log(lost_item);
    // make a request to save the lost item in the database
    let request = fetch("http://localhost:3000/found_items",
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lost_item)
        });

    let result = await request;

    if (result.ok == true || (result.status == 201 || result.status == 200)) {
        let message = "The item was reporte successfully";

        setTimeout(() => {
            showMessages("Great!", message, "success");
            console.log("The item was reporte successfully");
            clearData();
        }, 1000);

    } else {
        showMessages("Ooops!", "Error trying to create the report, try it later..", "error");
        console.log("error trying to create the report !");
    }
}

function fillModalConfirm(data) {
    showModal();
    let modalBody = document.getElementById("modal-body");
    let content = `
        <p>Make sure that the information is correct to publish the item</p>
        <div class="row">
            <div class="form-group col-md-6 col-12">
                <label for="">Document Type:</label>
                <span>${data.document_type}</span>
            </div>
            <div class="form-group col-md-6 col-12">
                <label for="">Missing date:</label>
                <span>${data.missing_date}</span>
            </div>
        </div>
        <div class="row">
         <div class="form-group col-md-6">
                <label for="">Owner name:</label>
                <span>${data.owner_name}</span>
            </div>
            <div class="form-group col-md-6">
                <label for="">Document number:</label>
                <span>${data.owner_document}</span>
            </div>
        </div>
        <div class="row">
            <div class="form-group">
                <label for="">Details:</label>
                <span>${data.details}</span>
            </div>
        </div>
        <p>Contact information</p>
        <div class="row">
            <div class="form-group col-md-6">
                <label for="">Email:</label>
                <span>${data.reporter_contact.email}</span>
            </div>
            <div class="form-group col-md-6">
                <label for="">Phone:</label>
                <span>${data.reporter_contact.phone}</span>
            </div>
        </div>
                
    `
    modalBody.innerHTML = content;

    // abrir modal

}

// modal confirmation 
span.onclick = closeModal;
btnChange.onclick = closeModal;

function showModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";

}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

window.addEventListener("click", closeModal());

// Clean the data  from the form
function clearData() {
    let formulario = document.reportForm;
    formulario.reset();

}