/******w*************
    
    Project 3 Javascript
    Name: Colin Ordonez
    Date: 4/24/2022
    Description: This script adds function to the sign up form 
    			 and it validates all input fields.

********************/
/*
 * Handles the submit event of the subscription form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e){
    hideErrors();

    if (formHasErrors()) {
        e.preventDefault();
        return false;
    }

    return true
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e){
    // Confirm that the user wants to reset the form.
    if ( confirm('Clear order?') ){
        // Ensure all error fields are hidden
        hideErrors();
        
        // Set focus to the first text field on the page
        document.getElementById("fullName").focus();
        
        // When using onReset="resetForm()" in markup, returning true will
        // allow the form to reset
        return true;
    }

    // Prevents the form from resetting
    e.preventDefault();
    
    // When using onReset="resetForm()" in markup,
    // returning false would prevent
    // the form from resetting
    return false;   
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors(){
    let errorFlag = false;

    // Names for each field for validation.
    let inputs = ["fullName", "address", "phoneNumber", "email"];

    // RegEx for email and phone number fields
    let emailFormat
        = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let phoneNumberFormat
        = new RegExp(/^\d{10}$/);

    for (let i = 0; i < inputs.length; i++) {
        let input = document.getElementById(inputs[i]);

        // Checking for empty fields.
        if (input.value == null || (input.value).trim() == "") {
            document.getElementById(inputs[i] + "_error").style.display
                = "block";

            if (!errorFlag) {
                input.select();
                input.focus();
            }

            errorFlag = true;
        }

        // Checking phone number length.
        if (inputs[i] == "phoneNumber") {
            if (!phoneNumberFormat.test(input.value)) {
                document.getElementById(inputs[i] + "Format_error").style.display
                    = "block";

                if (!errorFlag) {
                    input.select();
                    input.focus();
                }

                errorFlag = true;
            }
        }

        // Checking email format.
        if (inputs[i] == "email") {
            if (!emailFormat.test(input.value)) {
                document.getElementById(inputs[i] + "Format_error").style.display
                = "block";

                if (!errorFlag) {
                input.select();
                input.focus();
                }

                errorFlag = true;
            }
        }
    }

    return errorFlag;
}

/*
 * Hides all of the error elements.
 */
function hideErrors(){
    // Get an array of error elements
    let error = document.getElementsByClassName("formError");

    // Loop through each element in the error array
    for ( let i = 0; i < error.length; i++ ){
        // Hide the error element by setting it's display style to "none"
        error[i].style.display = "none";
    }
}

/*
 * Handles the load event of the document.
 */
function load(){
    hideErrors();

    // Event Listeners
    document.getElementById("subscriptionForm")
        .addEventListener("submit", validate);
    document.getElementById("clear")
        .addEventListener("click", resetForm);
}

// Document loaded event listener
document.addEventListener("DOMContentLoaded", load);