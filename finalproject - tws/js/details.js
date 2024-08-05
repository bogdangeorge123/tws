document.addEventListener("DOMContentLoaded", showProductDetails);

const url = "https://668d7a51099db4c579f31786.mockapi.io/products"

async function showProductDetails() {
    console.log(window.location.search);
    const urlSearchParam = new URLSearchParams(window.location.search);
    const productId = urlSearchParam.get('id');

    const response = await fetch(`${url}/${productId}`);
    const product = await response.json();

    document.querySelector(".main").innerHTML = `<h2>${product.details}</h>`
}