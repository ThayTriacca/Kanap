// Get current URL
const urlProduct = window.location.search;
const url = new URLSearchParams(urlProduct);
const idProductParams = url.get('id');


//Collect data from API
let product;
function getProduct() {
    fetch('http://localhost:3000/api/products/' + idProductParams)

        .then(function (data) {
            if (data.ok) {
                return data.json();
            }
        })
        .then((value) => {
            product = value;
            displayProductDetails(value);
        })
}


//Access DOM Element

const itemImage = document.getElementsByClassName('item__img');
const itemTitle = document.getElementById('title');
const itemPrice = document.getElementById('price');
const itemDescription = document.getElementById('description');
const itemColors = document.getElementById('colors');
const quantityItems = document.getElementById('quantity');
const buttonCart = document.getElementById('addToCart');

//Add details on the page

function displayProductDetails(product) {
    itemImage[0].innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"/>`;
    console.log(itemImage.innerHTML);
    itemTitle.innerHTML = `${product.name}`;
    itemPrice.innerHTML = `${product.price}`;
    itemDescription.innerHTML = `${product.description}`;
    addColors(product);
}

//Add Colors

function addColors(product) {
    for (let color of product.colors) {
        let options = document.createElement('option');
        itemColors.appendChild(options);
        options.setAttribute('value', color);
        options.innerText = color;
    }
    
}

//Add to Cart

buttonCart.addEventListener('click', addItemCart);

function addItemCart(){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(cart);
    let identifier = idProductParams + '@' + itemColors.value;
    let findId = cart.findIndex((item) => item.identifier == identifier);
    if (findId > -1) {
        cart[findId].quantityItems = Number(cart[findId].quantityItems) + Number(quantityItems.value);
    } else {
        let item = {
            identifier,
            productId: idProductParams,
            itemColors: document.getElementById('colors').value,
            quantityItems: document.getElementById('quantity').value,
            price: product.price
        }
        cart.push(item);
    }; 
    let cartString = JSON.stringify(cart);
    localStorage.setItem('cart', cartString);
    alert('Your item has been added to the cart!');
}

//Get all Product
getProduct();



