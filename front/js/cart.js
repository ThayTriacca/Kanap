
//Display products added on cart
let myCart = JSON.parse(localStorage.getItem('cart'));
console.log(myCart);

let buyItems = [];
let cartSection = document.getElementById('cart__items');
// function ola(){
  //   console.log(myCart[1].identifier);
  // }
  for (let product in myCart) {
    let productArticle = document.createElement('a');
    productArticle.classList.add('cart__item');
    productArticle.setAttribute('data-identifier', '{myCart[product].identifier}');
    
    buyItems.push(myCart[product].productId);
    // console.log(buyItems);
    
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
  
  // Update Cart

  function updateCart(){

  }
  //Sum of prices
  
  function getTotalPrice(myCart){
    let total = 0;
    for (let i=0; i < myCart.length; i++){
      total += myCart[i].price * myCart[i].quantityItems;
    }
    return total.toFixed(2);
  }
  
  //Sum of quantities
  function getTotalQuantity(myCart){
    let totalQty = 0;
    for (let i=0; i< myCart.length; i++) {
      
      totalQty += Number(myCart[i].quantityItems);
    }
    return totalQty;
  }
  
  //Update Cart Price and Quantity DOM
  let qtyTotal = document.getElementById('totalQuantity');
  let totalPrice = document.getElementById('totalPrice');
  qtyTotal.innerHTML = getTotalQuantity(myCart);
  totalPrice.innerHTML = getTotalPrice(myCart);


  //Delete products

  function deleteItemCart () {

    let deleteBtn = document.getElementsByClassName('deleteItem');

    for ( let i = 0; i <  deleteBtn.length; i ++) {
      let deleteItem = deleteBtn[i];
      deleteItem.addEventListener('click', function (event) {
        itemSelected = event.target;
        let productIdentifier = itemSelected.closest('.cart__item').getAttribute('data-identifier');
        itemSelected.closest('.cart__item').remove();
        let productDeleted = myCart.find(cart => cart.id == productIdentifier);
        if (productDeleted !== -1) {
          myCart.splice(productDeleted, 1);
          getTotalPrice(myCart);
          getTotalQuantity(myCart);
          localStorage.setItem('cart', JSON.stringify (myCart));
        }
      })
    }
    localStorage.setItem('cart', JSON.stringify(myCart));
  };

  deleteItemCart();

    //Change Quantity
    //onchange
    
    //Finish Order
    
    //FORM
    
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

     //Function add error
    function addError(input) {
      return 'thin solid ' + (input != '' ? 'green' : 'red');
    };
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
    cityInput.style.border = addError(input);
    input == '' && (cityError.innerHTML = cityInput.validationMessage);
});

//Email Form

emailInput.addEventListener('blur', (event) => {
    const input = event.target.value;
    emailInput.style.border = addError(input);
    input == '' && (emailError.innerHTML = emailInput.validationMessage);
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