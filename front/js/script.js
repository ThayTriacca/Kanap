//Access DOM elements

const productContainer = document.getElementById('items');
const baseUrl = 'http://localhost:3000/api';

//Collect data from API
function getProducts() {
    const productEndPoint = '/products';
    const urlToFetch = `${baseUrl}${productEndPoint}`;
    
    fetch(urlToFetch)
    .then (function (data){
        if (data.ok) {
            return data.json();
        }
    })
    .then (products => {
        insertProduct(products);
    })
}
//Insert Products on the web page

function insertProduct(products) {
    for (const product of products) {
        
    const productCard = document.createElement('a');
    productCard.setAttribute('href', `product.html?id=${product._id}`)
    productCard.classList.add('items');
    productCard.setAttribute('id', 'items');
    productCard.innerHTML = `
        <article>
        <img src="${product.imageUrl}" alt="${product.altTxt}">
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
        </article>
    `;
    productContainer.appendChild(productCard);
    }
}
getProducts();
