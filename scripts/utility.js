// ==================================================
// ELEMENT REFERENCE
// ==================================================

const links = document.querySelectorAll('.link, .ulink');
const headerMenu = document.querySelector('.menu-btn');
const sections = document.querySelectorAll(".section");
const navBar = document.querySelector('.nav');

// ==================================================
// FUNCTIONS
// ==================================================

// * FUNCTION TO ADD CLICK ANIMATION IN A LINK WHEN CLICKED
function updateClickAnimation(link) {
    link.classList.add('anim-clicked');
    setTimeout(() => {
        link.classList.remove('anim-clicked');
    }, 500);
}

// * FUNCTION TO CREATE AN INTERSECTION OBSERVER
export function startSectionObserver() {
    if (sections.length === 0) { return; }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });
    
    sections.forEach(section => observer.observe(section));
}

// * FUNCTION TO TOGGLE CLASSLIST OF ALL ELEMENTS WITH PROVIDED SELECTOR
function toggleClass(className, selector) {
    document.querySelectorAll(selector).forEach((elem) => {
        elem.classList.toggle(className);
    });
}

// ==================================================
// EVENT LISTENERS
// ==================================================

// & EVENT LISTENER FOR LINK CLICK
links.forEach((link) => {
    link.addEventListener('click', () => {
        updateClickAnimation(link);
    })
})

// & EVENT LISTENER FOR MENU-BTN CLICK
headerMenu.addEventListener('click', () => { toggleClass('active', '.menu-toggled') });

// & EVENT LISTENER FOR BODY CLICK TO CLOSE NAVBAR
document.body.addEventListener('click', (e) => {
    if (navBar.classList.contains('active') && !e.target.closest('.nav') && !e.target.closest('.menu-btn')) {
        toggleClass('active', '.menu-toggled');
    }
});