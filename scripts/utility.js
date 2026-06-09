// ==================================================
// ELEMENT REFERENCE
// ==================================================

const toastContainer = document.querySelector('.toast-container');
const links = document.querySelectorAll('.link, .ulink');
const headerMenu = document.querySelector('.menu-btn');
const sections = document.querySelectorAll(".section");
const navBar = document.querySelector('.nav');

// ==================================================
// FUNCTIONS
// ==================================================

// * FUNCTION TO ADD CLICK ANIMATION IN A LINK WHEN CLICKED
export function updateClickAnimation(link) {
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
export function toggleClass(className, selector) {
    document.querySelectorAll(selector).forEach((elem) => {
        elem.classList.toggle(className);
    });
}

// * FUNCTION TO CREATE A TOAST NOTIFICATION
export function sendToastNotification(message, iconContent, accent) {
    // CREATE NOTIFICATION WRAP
    const notificationRow = document.createElement('div');
    notificationRow.classList.add('notification-row', 'row', 'gap-12', 'p-16', 'rounded-12', accent);
    // notificationRow.style.border = `1px solid ${accent}`;
    
    // CREATE & APPEND NOTIFICATION ICON
    const notificationIcon = document.createElement('span');
    notificationIcon.classList.add('symbol');
    notificationIcon.setAttribute('aria-label', 'Notification Icon');
    notificationIcon.style.color = accent;
    notificationIcon.textContent = iconContent;

    // CREATE & APPEND NOTIFICATION TEXT
    const notificationText = document.createElement('span');
    notificationText.classList.add('text');
    notificationText.setAttribute('aria-label', 'Notification Text');
    notificationText.textContent = message;

    // APPEND NOTIFICATION IN CONTAINER
    notificationRow.appendChild(notificationIcon);
    notificationRow.appendChild(notificationText);
    toastContainer.appendChild(notificationRow);

    // NOTIFY ON THE SCREEN
    setTimeout(() => {
        notificationRow.classList.add('show');
    }, 100);
    setTimeout(() => {
        notificationRow.classList.remove('show');
    }, 3100);
    setTimeout(() => {
        toastContainer.removeChild(notificationRow);
    }, 3700);
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