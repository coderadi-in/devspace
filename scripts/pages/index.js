// ==================================================
// ELEMENT REFERENCE
// ==================================================

const loader = document.querySelector(".loader");

const businessInput = document.getElementById('business');
const expectationInput = document.getElementById('expectation');
const budgetInput = document.getElementById('budget');
const deliveryInput = document.getElementById('delivery');
const designInput = document.getElementById('design');
const contactInput = document.getElementById('contact');

const submitBtn = document.getElementById('submitBtn');
const submitAnimation = document.querySelector('.loader-view');
const submitBtnText = document.querySelector('#submitBtn span');

// ==================================================
// IMPORTS
// ==================================================

import { startSectionObserver, sendToastNotification } from '../utility.js';

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

// * FUNCTION TO VALIDATE ALL INPUTS
function validateInputs() {
    if (businessInput.value.trim() == '') {
        sendToastNotification("Please provide valid business.", "error", "var(--color-state-red)");
        businessInput.classList.add('faulty');
        return false;
    }
    
    if (expectationInput.value.trim() == '') {
        sendToastNotification("Please provide your expectation.", "error", "var(--color-state-red)");
        expectationInput.classList.add('faulty');
        return false;
    }
    
    if (contactInput.value.trim() == '') {
        sendToastNotification("Please provide your contact info.", "error", "var(--color-state-red)");
        contactInput.classList.add('faulty');
        return false;
    }

    return true;
}

// * FUNCTION TO SUBMIT FORM
async function submitForm() {
    // VALIDATE FORM
    if (!validateInputs()) { return; }

    // DISABLE SUBMIT BTN
    submitBtnText.style.display = 'none';
    submitAnimation.style.display = 'block';
    submitBtn.disabled = true;

    // FORM STATE
    const formURL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSevf1sFPc3Rp5Ewv3AZZnaidtxGksUsDJZpnqPrixrWPV1rPg/formResponse'
    const formData = new FormData();

    // FORM DATA
    formData.append('entry.1074827820', businessInput.value.trim());
    formData.append('entry.2034062219', expectationInput.value.trim());
    formData.append('entry.2100617009', budgetInput.value.trim());
    formData.append('entry.642167255', deliveryInput.value.trim());
    formData.append('entry.297744228', designInput.value.trim());
    formData.append('entry.162709703', contactInput.value.trim());

    // SUBMISSION LOGIC
    try {
        await fetch(formURL, {
            method: "POST",
            body: formData,
            mode: "no-cors"
        });

        businessInput.value = '';
        businessInput.classList.remove('faulty');
        expectationInput.value = '';
        expectationInput.classList.remove('faulty');
        contactInput.value = '';
        contactInput.classList.remove('faulty');

        sendToastNotification("Your request has been submitted.", "check_circle", "var(--color-state-green)");
    } 
    catch {
        sendToastNotification("Something went wrong while submitting form!", "error", "var(--color-state-red)");
    }
    finally {
        // ENABLE SUBMIT BTN
        submitBtnText.style.display = 'inline';
        submitAnimation.style.display = 'none';
        submitBtn.disabled = false;
    }
}

// ==================================================
// EVENT LISTENERS
// ==================================================

// & INITIAL DISPLAY SETTINGS
// document.addEventListener("DOMContentLoaded", hideLoader);

// & EVENT LISTENER FOR SUBMIT-BTN CLICK
submitBtn.addEventListener('click', submitForm);