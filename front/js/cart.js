//--------------Display products added on cart------------------
let myCart = JSON.parse(localStorage.getItem('cart'));
console.log(myCart);

let buyItems = [];
let cartSection = document.getElementById('cart__items');
for (let product in myCart) {
  let productArticle = document.createElement('a');
  productArticle.addEventListener('change', onChangeQty);
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
    <p>€${myCart[product].price}</p>
    </div>
    <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
    <p>Quantity : </p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${myCart[product].quantityItems}">
    </div>
    <div class="cart__item__content__settings__delete">
    <p class="deleteItem">Delete</p>
    </div>
    </div>
    </div>`

  cartSection.appendChild(productArticle);
  let deleteBtns = document.getElementsByClassName("deleteItem");
  Array.from(deleteBtns).forEach(element => {
    element.addEventListener('click', onDeleteItem);
  });
}




//-------------------Update Total---------------------------

function updateTotal() {
  let myCart = JSON.parse(localStorage.getItem('cart'))
  let qtyTotal = 0;
  let totalPrice = 0;
  for (i = 0; i < myCart.length; i++) {
    qtyTotal += Number(myCart[i].quantityItems);
    totalPrice += myCart[i].price * myCart[i].quantityItems;
  }
  document.getElementById('totalPrice').innerHTML = totalPrice;
  document.getElementById('totalQuantity').innerHTML = qtyTotal;
  document.getElementsByClassName('cart__item__content__settings__quantity').innerHTML = qtyTotal;
};

updateTotal();


//---------------Delete products------------------
function onDeleteItem(event) {
  console.log("event", event);
  let itemSelected = event.target;
  let itemSelectedDom = itemSelected.closest('.cart__item');
  console.log("item dom", itemSelectedDom);
  console.log("itemselected", itemSelected.closest('.cart__item'));
  let productIdentifier = itemSelectedDom.getAttribute('data-identifier');
  let productDeleted = myCart.find(cart => cart.identifier == productIdentifier);
  if (productDeleted) {
    let index = myCart.indexOf(productDeleted);
    myCart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(myCart));
    updateTotal();
    itemSelectedDom.remove();
  }
  localStorage.setItem('cart', JSON.stringify(myCart));
}

//-----------------Change Quantity------------

function onChangeQty(event) {
  itemSelected = event.target;
  let itemSelectedDom = itemSelected.closest('.cart__item');
  console.log("item dom", itemSelectedDom);
  console.log("itemselected", itemSelected.closest('.cart__item'));
  let productIdentifier = itemSelectedDom.getAttribute('data-identifier');
  let productFound = myCart.find(cart => cart.identifier == productIdentifier);
  if (productFound) {
    productFound.quantityItems = itemSelected.value;
    window.localStorage.setItem("cart", JSON.stringify(myCart));
    updateTotal();

  }
}
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


//--------------Submit Order------------
function postOrder() {
  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const validate = form.checkValidity();
    form.reportValidity();
    if (validate) {

      
      let products = [];
      for (let i = 0; i < myCart.length; i++) {
        products.push(myCart[i].productId);
      }
      console.log("products" + products);

      let order = {
        contact: {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        address: addressInput.value,
        city: cityInput.value,
        email: emailInput.value,},

        products: products,
      }
      console.log("order" + JSON.stringify(order))
      localStorage.setItem('order', JSON.stringify(order));

      //-----Sending Info--------

      let sendOptions = {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      };

      fetch("http://localhost:3000/api/products/order", sendOptions)
        .then((response) => response.json())
        .then((data) => {
          localStorage.clear();
          localStorage.setItem("orderId", data.orderId);
          const orderId = data.orderId
          console.log("orderId" + orderId);
          window.location.href = "/front/html/confirmation.html" + "?orderId=" + orderId
        })
        .catch((err) => {
          alert ("Error" + err.message)});

      form.reset();
      return;
    }

    emailError.innerHTML = emailInput.validationMessage;
  })
};
postOrder();