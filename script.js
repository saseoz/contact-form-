
const contactForm = document.querySelector("#contact-form");
const firstName = document.querySelector("#name");
const lastName = document.querySelector("#last-name");
const email = document.querySelector("#email");
const radioBtns = document.getElementsByName("radio-group");
const message = document.querySelector("#message");
const checkBox = document.querySelector("#checkbox");
const modal = document.querySelector(".modal");

radioBtns.forEach(radioBtn => {
    radioBtn.addEventListener("click", (event) => {
        radioBtns.forEach(btn => {
            btn.parentElement.style.backgroundColor = "";
            btn.parentElement.style.borderColor = "";
        });

        event.target.parentElement.style.backgroundColor = "hsl(148, 38%, 91%)";
        event.target.parentElement.style.borderColor = "hsl(169, 82%, 27%)";

    });
});

contactForm.addEventListener("submit", (e) => {

    const isValid = inputValidation();

    if (isValid === false) {
        e.preventDefault();
    } else {
        modal.classList.remove("hidden");
        e.preventDefault();
        setTimeout(() => {
            contactForm.submit();
        }, 5000);    
    }
});

function inputValidation() {
    const firstNameValue = firstName.value.trim();
    const lastNameValue =lastName.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();
    const checkBoxChecked = checkBox.checked;

    let isValid = true;

    if (firstNameValue === "") {
        checkInvalid(firstName, "This field is required");
        isValid = false;
    } else {
        checkValid(firstName);
    }

    if (lastNameValue === "") {
        checkInvalid(lastName, "This field is required");
        isValid = false;
    } else {
        checkValid(lastName);
    }
    
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (emailValue === "") {
        checkInvalid(email, "This field is required, Please enter a valid email address");
        isValid = false;
    } else if (!pattern.test(emailValue)) {
        checkInvalid(email, "This field is required, Please enter a valid email address");
        isValid = false;
    } else {
        checkValid(email);
    }

    if (messageValue === "") {
        checkInvalid(message, "This field is required");
        isValid = false;
    } else {
        checkValid(message);
    }

    const errorMessageCheckBox = checkBox.parentElement.nextElementSibling;
    if (!checkBoxChecked) {    
        errorMessageCheckBox.innerText = "To submit this form, please consent to being contacted";
        isValid = false;
    } else {
        errorMessageCheckBox.innerText = "";
    }

    const errorRadio = document.querySelector(".error-radio")
    const selectedRadio = document.querySelector('input[name="radio-group"]:checked');
    if (!selectedRadio) {
        errorRadio.innerText = "Please select a query type";
        isValid = false;
    } else {
        errorRadio.innerText = "";
    }
    
    return isValid;
}

function checkInvalid(input, message) {
    const errorMessage = input.nextElementSibling;

    errorMessage.innerText = message;
    input.style.borderColor = "red";
}

function checkValid(input) {
    const errorMessage = input.nextElementSibling;

    errorMessage.innerText = "";
    input.style.borderColor = "";
}



