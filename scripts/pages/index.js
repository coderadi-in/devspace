// ==================================================
// ELEMENT REFERENCE
// ==================================================

const loader = document.querySelector(".loader");

// ==================================================
// IMPORTS
// ==================================================

import { startSectionObserver } from '../utility.js';

// ==================================================
// FUNCTIONS
// ==================================================

// * FUNCTION TO HIDE THE LOADER AFTER 5 SECONDS
function hideLoader() {
    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        loader.style.pointerEvents = "none";
        startSectionObserver();
    }, 5000);
}

// ==================================================
// EVENT LISTENERS
// ==================================================

document.addEventListener("DOMContentLoaded", hideLoader);