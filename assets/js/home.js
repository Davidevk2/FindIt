const chooseForm = document.getElementById("optionForm");
const btnReport = document.getElementById("btnReport");
btnReport.setAttribute("disabled", "");


chooseForm.addEventListener("change", () => {
    console.log(chooseForm);
    btnReport.removeAttribute("disabled");
});

btnReport.addEventListener("click", () => {
    let option = document.reportForm.report_option.value;
    let url = "";

    option == "lost_report" ? url = "report_lost.html" : url = "report_found.html";
    window.location.href = url;
    console.log(document.reportForm.report_option.value);

})