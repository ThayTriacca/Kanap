//----Display Order ID-----
const orderNumber = document.getElementById("orderId");
orderNumber.innerText = localStorage.getItem("orderId");
localStorage.clear();