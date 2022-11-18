//--------------Display products added on cart------------------
let myCart = JSON.parse(localStorage.getItem('cart'));
console.log(myCart);


let buyItems = [];
let cartSection = document.getElementById('cart__items');
for (let product in myCart) {
  let productArticle = document.createElement('a');
  productArticle.classList.add('cart__item');
  productArticle.setAttribute('data-identifier', `${myCart[product].identifier}`);
  
  buyItems.push(myCart[product].productId);
  
  productArticle.innerHTML =
    `<div class="cart__item__img">
    <img src="${myCart[product].productImg}" alt="${myCart[product].imgAlt}">
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
    <h2>${myCart[product].productName}</h2>
    <p>${myCart[product].itemColors}</p>
    <p>${myCart[product].price}</p>
    </div>
    <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
    <p>Quantity : ${myCart[product].quantityItems}</p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${myCart[product].quantityItems}">
    </div>
    <div class="cart__item__content__settings__delete">
    <p class="deleteItem">Delete</p>
    </div>
    </div>
    </div>`

  cartSection.appendChild(productArticle);
}


//-------------------Update Cart---------------------------


function updateCart() {
  let myCart = JSON.parse(localStorage.getItem('cart'))
  let qtyTotal = 0;
  let totalPrice = 0;
  for (i = 0; i < myCart.length; i++) {
    qtyTotal += Number(myCart[i].quantityItems);
    totalPrice += myCart[i].price * myCart[i].quantityItems;
  }
  document.getElementById('totalPrice').innerHTML = totalPrice;
  document.getElementById('totalQuantity').innerHTML = qtyTotal;
};

updateCart();


//---------------Delete products------------------

function deleteItemCart() {

  let deleteBtn = document.getElementsByClassName('deleteItem');

  for (let i = 0; i < deleteBtn.length; i++) {
    let deleteItem = deleteBtn[i];
    deleteItem.addEventListener('click', function (event) {
      itemSelected = event.target;
      let productIdentifier = itemSelected.closest('.cart__item').getAttribute('data-identifier');
      itemSelected.closest('.cart__item').remove();
      let productDeleted = myCart.find(cart => cart.identifier == productIdentifier);
      if (productDeleted) {
        let index = myCart.indexOf(productDeleted);
        myCart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(myCart));
        updateCart();
      }
    })
  }
  localStorage.setItem('cart', JSON.stringify(myCart));
};

deleteItemCart();


//-----------------Change Quantity------------
//event target closest 
function changeQuantity() {
  let quantityItems = document.querySelectorAll(".itemQuantity");

  for (let i = 0; i < quantityItems.length; i++) {
    quantityItems[i].addEventListener("change", (event) => {
      event.preventDefault();

      myCart[i].quantityItems = quantityItems[i].valueAsNumber;
      window.localStorage.setItem("cart", JSON.stringify(myCart));
      
      updateCart();
    })
  }
};

changeQuantity();


//---------------Finish Order----------




//---------------FORM--------------

//------------Access DOM Elements-----------

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

//---------------Function add error------------

function addError(input) {
  return 'thin solid ' + (input != '' ? 'green' : 'red');
};


//----------------First Name Form----------------

firstNameInput.addEventListener('blur', (event) => {
  const input = event.target.value;
  firstNameInput.style.border = addError(input);
  input == '' && (firstNameError.innerHTML = firstNameInput.validationMessage);
});


//------------------Last Name Form-------------------

lastNameInput.addEventListener('blur', (event) => {
  const input = event.target.value;
  lastNameInput.style.border = addError(input);
  input == '' && (lastNameError.innerHTML = lastNameInput.validationMessage);
});


//-------------------Address Form-------------

addressInput.addEventListener('blur', (event) => {
  const input = event.target.value;
  addressInput.style.border = addError(input);
  input == '' && (addressError.innerHTML = addressInput.validationMessage);
});


//------------------City Form--------------

cityInput.addEventListener('blur', (event) => {
  const input = event.target.value;
  cityInput.style.border = addError(input);
  input == '' && (cityError.innerHTML = cityInput.validationMessage);
});


//-----------------Email Form--------------

emailInput.addEventListener('blur', (event) => {
  const input = event.target.value;
  emailInput.style.border = addError(input);
  input == '' && (emailError.innerHTML = emailInput.validationMessage);
});


//--------------Submit Event Listener------------

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  const validate = form.checkValidity();
  form.reportValidity();
  if (validate) {
    form.reset();
    return;
  }
  emailError.innerHTML = emailInput.validationMessage;
});