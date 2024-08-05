document.addEventListener("DOMContentLoaded", displayAllProducts);
const mainContainer = document.querySelector(".main");

function getAllProducts() {
  const url = "https://668d7a51099db4c579f31786.mockapi.io/products";
  return fetch(url).then((response) => response.json());
}

function displayAllProducts() {
  getAllProducts().then(
    (products) =>
      (mainContainer.innerHTML = products
        .map(
          (product) =>
            `
    <div class="product-card">
        <h3 class="card-title">${product.name}</h3>
        <img class="card-img" src=${product.imageUrl}>
        <p class="card-details">${product.details}</p>
        <br>
        <br>
        <p class="card-price">${product.price}</p>
        <a href="../pages/details.html?id=${product.id}">Details</a>
        <br>
        <br>
        <button class="addtocart" data-id=${product.id}>Adauga in cos</button> 
    </div>
    `
        )
        .join(""))
  );
}

const cardTitle = document.querySelectorAll(".card-title")
console.log(cardTitle)


