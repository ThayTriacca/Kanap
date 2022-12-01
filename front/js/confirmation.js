//----Display Order ID-----

function diplayOrderId(){
    const orderNumber = document.getElementById("orderId");
    orderNumber.innerText = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"))
    localStorage.clear();
};

diplayOrderId();

