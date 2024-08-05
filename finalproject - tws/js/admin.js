// load products
const url = "https://668d7a51099db4c579f31786.mockapi.io/products";

const productsTableBody = document
  .getElementById("products-table")
  .querySelector("tbody");

document.addEventListener("DOMContentLoaded", displayAllProducts);

function getAllProducts() {
  return fetch(url).then((response) => response.json());
}

function getProductById(id) {
  return fetch(`${url}/${id}`).then((response) => response.json());
}

function displayAllProducts() {
  getAllProducts().then((products) => {
    productsTableBody.innerHTML = products
      .map(
        (product) => `
        <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
              <img src=${product.imageUrl} width="100px"/>
            </td>
            <td>
              <button class="edit-${product.id}">
                <i class="fa thin fa-pen-to-square">
                </i>
              </button>
            </td>
            <td>
              <button class="delete-${product.id}">
                <i class="fa thin fa-x">
                </i>
              </button>
            </td>
        </tr>
        `
      )
      .join("");
  });
}

// save new product
const form = document.getElementById("product-form");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const imageUrlInput = document.getElementById("image-url");
const detailsInput = document.getElementById("details");
const saveProductButton = document.getElementById("savebutton");
let editMode = false;
let currentEditableProductId;

saveProductButton.addEventListener("click", saveProduct);



function saveProduct(event) {
  event.preventDefault();
  const product = {
    name: nameInput.value,
    price: Number(priceInput.value),
    image: imageUrlInput.value,
    details: detailsInput.value,
  };

  fetch(editMode ? `${url}/${currentEditableProductId}` : url, {
    method: editMode ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).then(() => {
    form.reset();
    displayAllProducts();
    editMode: false; 
  });
}

// edit product
productsTableBody.addEventListener('click', handleActions);

  function handleActions(event) {
    const className = event.target.parentElement.className;
    if (className.includes('edit')) {
      const productId = className.split("-")[1];
      editProduct(productId);
    } else if (className.includes('delete')){
      const productId = className.split("-")[1];
      deleteProduct (productId)
    }
  }

function editProduct(id) {
  getProductById(id).then((product) => 
  {
      editMode = true;
      nameInput.value = product.name;
      priceInput.value = product.price;
      imageUrlInput.value = product.imageUrl;
      details.value = product.details;

      currentEditableProductId = product.id;
  });
}

// delete
function deleteProduct(id) {
  fetch(`${url}/${id}`, {
    method: "DELETE",
  }).then(() => {
    displayAllProducts();
  });
}