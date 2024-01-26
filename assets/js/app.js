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

// Click Scroll

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

// Background Color Target

document.addEventListener('DOMContentLoaded', function () {
    var targetElement = document.querySelector('[id*="section_"]');    
    var backgroundChangeElement = document.querySelector('.navbar');

    function handleScroll() {
        var targetRect = targetElement.getBoundingClientRect();
        if (targetRect.top >= 0 && targetRect.bottom <= window.innerHeight) {
            backgroundChangeElement.classList.remove('is-active');
        } else {
            backgroundChangeElement.classList.add('is-active');
        }
    }

    window.addEventListener('scroll', handleScroll);
});
