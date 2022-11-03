//Access DOM Elements

const firstNameInput = document.getElementById('firstName');
const firstNameError = document.getElementById('firstNameErrorMsg');
const lastNameInput = document.getElementById('lastName');
const lastNameError = document.getElementById('lastNameErrorMsg');
const addressInput = document.getElementById('address');
const addressError = document.getElementById('addressErrorMsg');
const cityInput = document.getElementById('city');
const cityError = document.getElementById('cityErrorMsg');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailErrorMsg');
const submitButton = document.getElementById('order');
const form = document.getElementsByClassName('cart__order__form')[0];

//Display products added on cart
let myCart = JSON.parse(localStorage.getItem(cart));
console.log(myCart);


//Function add error

function addError(input) {
    return 'thin solid ' + (input != '' ? 'green' : 'red');
}
//First Name Form

firstNameInput.addEventListener('blur', (event) => {
    const input = event.target.value;
    firstNameInput.style.border = addError(input);
    input == '' && (firstNameError.innerHTML = firstNameInput.validationMessage);
});

//Last Name Form

lastNameInput.addEventListener('blur', (event) => {
    const input = event.target.value;
    lastNameInput.style.border = addError(input);
    input == '' && (lastNameError.innerHTML = lastNameInput.validationMessage);
});

//Address Form

addressInput.addEventListener('blur', (event) => {
    const input = event.target.value;
    addressInput.style.border = addError(input);
    input == '' && (addressError.innerHTML = addressInput.validationMessage);
}); 

//City Form

cityInput.addEventListener('blur', (event) => {
    const input = event.target.value;
    if (input != '') {
        cityInput.style.border = 'thin solid green';
    } else {
        cityInput.style.border = 'thin solid red';
        cityError.innerHTML = cityInput.validationMessage;
    }
});

//Email Form

emailInput.addEventListener('blur', (event) => {
    const input = event.target.value;
    // emailInput.
    if (input != '') {
        emailInput.style.border = 'thin solid green';
    } else {
        emailInput.style.border = 'thin solid red';
        emailError.innerHTML = emailInput.validationMessage;
    }
});

//Submit Event Listener

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const validate = form.checkValidity();
    form.reportValidity();
    if (validate) {
        //enviar para backend -order

        //reset
        form.reset();
        return;
    }
    emailError.innerHTML = emailInput.validationMessage;
});