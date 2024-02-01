const date = new Date();

const btnReport = document.getElementById("btnReport");
const noOption = document.getElementById("noOption");   
const yesOption = document.getElementById("yesOption");
const divOtherContact = document.getElementById("other-contact");

noOption.addEventListener("change", ()=>{
    divOtherContact.style.display = "block";
})
yesOption.addEventListener("change", () => {
    divOtherContact.style.display = "none"
})


btnReport.addEventListener("click", reportLostItem);

async function reportLostItem(){
    let type = document.reportForm.document_type.value;
    let lost_date = document.reportForm.lost_date.value;
    let owner_name = document.reportForm.owner_name.value;
    let owner_number = document.reportForm.owner_document.value;
    let details = document.reportForm.description.value;
    let contact = document.reportForm.contact.value;
    let current_date = date.toUTCString();
    let reporter_name = "";
    let reporter_contact = { email: null, phone: null};
    let status = "Lost";
    let emailInput = document.reportForm.email.value;
    let phoneInput = document.reportForm.phone.value;

    // get the id from the locaStorege
    let reporter_id = localStorage.getItem("user");

    if(contact == "" || contact === "Same"){
        // reporter_id =;

        // request to fill the user info (contact)
        let request = await fetch(`http://localhost:3000/users/${reporter_id}`);
        let result = await request.json();

        reporter_name = result.name;
        reporter_contact.email = result.email;
        reporter_contact.phone = result.phone;

        console.log(reporter_name, reporter_contact);
        

    }else{
        // ask the info by inputs
        if(emailInput != "" || phoneInput !=""){
            reporter_name = owner_name;
            reporter_contact.email = emailInput;
            reporter_contact.phone = phoneInput;
            console.log(reporter_name,reporter_contact);

        }else{
            console.log("both fiels are empty!");
        }
    }


    if(type != "" && lost_date != "" && owner_name != "" && owner_number != ""){
        // asing to the object the values
        let lost_item = {
            document_type: type,
            missing_date: lost_date,
            owner_name: owner_name,
            details: details,
            reporter_id: reporter_id,
            reporter_name: reporter_name,
            reporter_contact: reporter_contact,
            notify_by: "String",
            status: status,
            report_date: current_date
        }
        console.log(lost_item);

        // make a request to save the lost item in the database
        let request = fetch("http://localhost:3000/lost_items",
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(lost_item)
            });

        let result = await request;

        if (result.ok == true || (result.status == 201 || result.status == 200)) {
            console.log("The item was reporte successfully");
            clearData();
        } else {
            console.log("error trying to create the report !");
        }


    }else{
        console.log("some fiels are empty!");
    }


}

// Clean the data  from the form
function clearData(){
    let formulario  = document.reportForm;

    formulario.reset();
  
}

