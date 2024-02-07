// get the elements from the HTML file
const chooseForm = document.getElementById("optionForm");
const btnReport = document.getElementById("btnReport");
btnReport.setAttribute("disabled", "");

// listen an evento when the form change
chooseForm.addEventListener("change", () => {
    btnReport.removeAttribute("disabled");
});

// redirect to one or another page when makes click
btnReport.addEventListener("click", () => {
    let option = document.reportForm.report_option.value;
    let url = "";

    option == "lost_report" ? url = "report_lost.html" : url = "report_found.html";
    window.location.href = url;
    console.log(document.reportForm.report_option.value);

})