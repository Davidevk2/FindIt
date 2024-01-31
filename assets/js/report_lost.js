console.log("works !");
const date = new Date();

const btnReport = document.getElementById("btnReport");

btnReport.addEventListener("click", reportLostItem);

async function reportLostItem(){
    let type = document.reportForm.document_type.value;
    let lost_date = document.reportForm.lost_date.value;
    let owner_name = document.reportForm.owner_name.value;
    let owner_number = document.reportForm.owner_document.value;
    let details = document.reportForm.description.value;
    let contact = document.reportForm.contact.value;
    let report_date = date.toUTCString();


    if(type != "" && lost_date != "" && owner_name != "" && owner_number != ""){
         
        let lost_item = {
            document_type: type,
            missing_date: lost_date,
            owner_name: owner_name,
            details: details,
            reporter_id: "String",
            reporter_name: "String",
            reporter_contact: "String",
            notify_by: "String",
            status: "String",
            report_date: "String"
        }

        let request = fetch("http://localhost:3000/lost_items",
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(lost_item)
            });

        let result = await request;

        if (result.ok == true || (result.status == 201 || result.status == 200)) {
            console.log("The item was created successfully");
        } else {
            console.log("error trying to create the report !");
        }

        console.log(type, lost_date, owner_name, owner_number, details, contact, report_date);

    }else{
        console.log("some fiels are empty!");
    }


}

function clearData(){
    let formulario  = document.reportForm;

    formulario.reset();
  
}

