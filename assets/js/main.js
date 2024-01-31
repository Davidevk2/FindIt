
const chooseForm = document.getElementById("optionForm");
const btnReport = document.getElementById("btnReport");
btnReport.setAttribute("disabled", "");


chooseForm.addEventListener("change", ()=>{
    console.log(chooseForm);
    btnReport.removeAttribute("disabled");  
});

btnReport.addEventListener("click", ()=>{
    let option = document.reportForm.report_option.value;
    let url = "";
    
    option == "lost_report" ? url = "reporter.html" : url = "reporter.html";
    window.location.href = url;
    console.log(document.reportForm.report_option.value);


} )




function logout(){
    localStorage.clear();
    setTimeout(()=>{
        window.location.href = "login.html";
    },2000)
}