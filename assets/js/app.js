(function () {
    "use strict";

    // MENU
    var navbarLinks = document.querySelectorAll('.navbar-collapse a');
    navbarLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            document.querySelector(".navbar-collapse").classList.remove('show');
        });
    });

    // CUSTOM LINK
    var smoothScrollLinks = document.querySelectorAll('.smoothscroll');
    smoothScrollLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            var targetId = this.getAttribute('href').substring(1);
            var targetElement = document.getElementById(targetId);
            var headerHeight = document.querySelector('.navbar').offsetHeight;
            scrollToDiv(targetElement, headerHeight);
        });
    });

    function scrollToDiv(element, navHeight) {
        var offset = element.getBoundingClientRect().top + window.scrollY;
        var totalScroll = offset - navHeight;
        window.scrollTo({
            top: totalScroll,
            behavior: 'smooth'
        });
    }

    // Scroll event
    function isScrollIntoView(elem) {
        var docViewTop = window.scrollY;
        var docViewBottom = docViewTop + window.innerHeight;
        var elemTop = elem.getBoundingClientRect().top + window.scrollY;
        var elemBottom = elemTop + elem.clientHeight * 0.5;

        if (elemBottom <= docViewBottom && elemTop >= docViewTop) {
            elem.classList.add('active');
        } else {
            elem.classList.remove('active');
        }
    }

    var timeline = document.querySelectorAll('#vertical-scrollable-timeline li');
    window.addEventListener('scroll', function () {
        timeline.forEach(function (item) {
            isScrollIntoView(item);
        });

        var mainTimelineContainer = document.getElementById('vertical-scrollable-timeline');
        var mainTimelineContainerBottom = mainTimelineContainer.getBoundingClientRect().bottom - window.innerHeight * 0.5;
        mainTimelineContainer.querySelector('.inner').style.height = mainTimelineContainerBottom + 'px';
    });
})();

// Manage the sections in the landing
var sectionArray = [1, 2, 3, 4, 5];

function handleScroll(index, value) {
    var offsetSection = document.getElementById('section_' + value).offsetTop - 75;
    var docScroll = window.scrollY || document.documentElement.scrollTop;
    var docScroll1 = docScroll + 1;

    if (docScroll1 >= offsetSection) {
        var navLinks = document.querySelectorAll('.navbar-nav .nav-item .nav-link');
        navLinks.forEach(function (link) {
            link.classList.remove('active');
            link.classList.add('inactive');
        });
        navLinks[index].classList.add('active');
        navLinks[index].classList.remove('inactive');
    }
}

function handleClick(index, value) {
    var offsetClick = document.getElementById('section_' + value).offsetTop - 75;
    window.scrollTo({
        top: offsetClick,
        behavior: 'smooth'
    });
}

document.addEventListener('scroll', function () {
    sectionArray.forEach(function (value, index) {
        handleScroll(index, value);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var navLinks = document.querySelectorAll('.navbar-nav .nav-item .nav-link');
    navLinks.forEach(function (link) {
        link.classList.add('inactive');
    });
    navLinks[0].classList.add('active');
    navLinks[0].classList.remove('inactive');

    sectionArray.forEach(function (value, index) {
        var clickScroll = document.querySelectorAll('.click-scroll')[index];
        clickScroll.addEventListener('click', function () {
            handleClick(index, value);
        });
    });
});


// function to change the navbar when we make scrolls
window.onscroll = function () {
    // console.log("El scrol se mueve");
    const  navbar = document.querySelector('.navbar');
    const  scroll = document.documentElement.scrollTop;
    if (scroll > 300 || scroll) {
        navbar.classList.add("is-active");
    } else {
        navbar.classList.remove("is-active");

    }
}

// elements from the contact form
const btnSend = document.getElementById("btnSend");
console.log(btnSend);

// Call the function when the user makes click
btnSend.addEventListener("click", sendMail);
async function sendMail(){
    let date = new Date();

    // Get data from the inputs
    let inputName = document.mailsForm.username.value;
    let inputEmail = document.mailsForm.email.value;
    let inputSubject = document.mailsForm.subject.value;
    let inputMessage = document.mailsForm.message.value;
    console.log(inputName, inputEmail, inputMessage, inputSubject);
    let message = "";
    let messageColor = "";

    // validate the form if is empty or no
    if(inputName != "" && inputEmail != "" && inputSubject != "" && inputMessage != ""){

        let mailData = {
            name : inputName,
            email:inputEmail,
            subject: inputSubject,
            message: inputMessage,
            send_date : date.getFullYear()
        }

        // make the request to the send the mail information to json
        let request = await fetch("http://localhost:3000/mails/", {method: "POST", headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(mailData)});

        let response = await request;
        console.log(request);

        // Show to the user if everythin is ok or there is problems to send
        if (request.ok == true || (request.status == 201 || request.status == 200)) {
            console.log("the email was send successfully");
            message = "the email was send successfully";
            messageColor = "green";
            showInfoMessage(message, messageColor);
            clearData();
            
        } else {
            message = "Error trying to send the email!";
            messageColor = "red";
            showInfoMessage(message, messageColor);
            console.log("Error trying to send the email!");
        }

    }else{
        let message = "Some required  inputs are empty!";
        messageColor = "red";
        showInfoMessage(message, messageColor);
    }

}
