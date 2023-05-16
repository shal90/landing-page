/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const header = document.querySelector('.page__header');
const nav = document.querySelector('.navbar__menu');
const navbar = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');

// build the nav

for (const section of sections) {
    navbar.insertAdjacentHTML("beforeend", `<li class='nav-item'><a href='#${section.id}' class="menu__link">${section.dataset.nav}</a></li>`);
    nav.appendChild(navbar);
}

const navLinks = document.querySelectorAll('.nav-item');


// Scroll to anchor ID using scrollTO event

const scrollToSection = (e) => {
    if (e.target.nodeName === "A") {
      e.preventDefault();
        for (section of sections) {
            if (e.target.hash === `#${section.id}`) {
                section.scrollIntoView({
                    behavior: 'smooth'
                });
            } 
        }
    }
};


// Set sections as active

const activeSectionScroll = () => {
    let currentID = []; // storing section in view
    for (section of sections) {
        const bounding = section.getBoundingClientRect();
        if (bounding.top >= 0 && bounding.left >= 0 && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
            currentID.push(section.id);
        }
    } 
    let lastActive = currentID[currentID.length - 1]; //most current section in view
    for (section of sections) {
        if(section.id === lastActive) {
            section.classList.add('your-active-class');
        } else {
            section.classList.remove('your-active-class');
        }
    }

    //set active state on nav links
    if (currentID.length > 0) {
        navLinks.forEach((li) => {
            li.classList.remove("active");
            if (li.firstElementChild.hash === `#${lastActive}`) {
                li.classList.add('active');
            } 
        });
    }
}

//Nav disappear on no scroll for a while

let timerId = "";
const navScroll = () => {
    clearTimeout(timerId);
    header.style.transform = "translateY(0)";
    timerId = setTimeout(() => {
        header.style.transform = "translateY(-100%)";
    }, 6500);
}

//Back to Top button 

const btn = document.getElementById('button');
const backToTop = () => {
    window.scrollY > window.innerHeight 
    ? btn.classList.add('show')
    : btn.classList.remove('show');
}

const scrollUp = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

const scrollEvents = (e) => {
    activeSectionScroll();
    navScroll();
    backToTop();
}

//Event listeners

navbar.addEventListener("click", scrollToSection);
btn.addEventListener("click", scrollUp);
window.addEventListener("scroll", scrollEvents);
