import { renderForm } from "./form.js";
import { toEdit } from "./editedProduct.js";
import { loadCart } from "./cart.js";
import { response } from "express";

const productsContainer = document.getElementById("productsContainer");
const form = document.getElementById("formulario");
const editedProduct = document.getElementById("editedProduct");

//render de productos
const renderProducts = (arr) => {
    if (arr.length === 0) {
        const noProds = document.createElement("h2");
        h2.className = "col-12";
        h2.append("No products in DB");
        productsContainer.appendChild(noProds);
    } else {
        for (const elem of arr) {
            const prodContainer = document.createElement("div");
            prodContainer.className = "col-12 col-md-3";

            const prodImage = document.createElement("div");
            prodImage.innerHTML = `<img src="${elem.thumbnail}" alt="Product Image" class="prodImage">`

            const prodInfo = document.createElement("div");
            prodInfo.className = "prodInfo"

            const prodName = document.createElement("h2");
            prodName.innerHTML = elem.name.toUpperCase();

            const prodDescription = document.createElement("p");
            prodDescription.innerHTML = `${elem.description}`;

            const prodCode = document.createElement("p");
            prodCode.innerHTML = `${elem.code}`;

            const prodPrice = document.createElement("p");
            prodPrice.innerHTML = `$${elem.price}`;

            const prodStock = document.createElement("p");
            prodStock.innerHTML = `En stock: ${elem.stock}`;

            const prodId = document.createElement("p");
            prodId.innerHTML = `ID: ${elem.id}`;

            const prodBtn = document.createElement("div");
            prodBtn.className = "prodBtn";

            const editBtn = document.createElement("button");
            editBtn.className = "btn";
            editBtn.innerHTML = "Editar Producto";
            editBtn.addEventListener("click", () => toEdit(elem.id))

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "btn";
            deleteBtn.innerHTML = "Eliminar Producto";
            deleteBtn.addEventListener("click", () => deleteProd(elem.id));

            prodBtn.append(editBtn, deleteBtn);

            prodInfo.append(prodName, prodDescription, prodCode, prodPrice, prodStock, prodId, prodBtn);

            const addToCart = document.createElement("div");
            addToCart.className = "text-center";
            const addBtn = document.createElement("button");
            addBtn.className = "btn";
            addBtn.innerHTML = "Agregar al Carrito";
            addBtn.addEventListener("click", () => addProdToCart(elem.id));

            addToCart.append(addBtn);

            prodContainer.append(prodImage, prodInfo, addToCart);
            productsContainer.append(prodContainer);
        }
    }
    const btnContainer = document.createElement("div");
    btnContainer.className = "col-12 justify-content-center align-items-center text-center"
    
    const form =document.createElement("button");
    form.className = "col-12 col-md-3";
    form.innerHTML = "Ir al formulario";
    form.addEventListener("click", () => {
        renderForm()
    });
    btnContainer.append(form);
    productsContainer.append(btnContainer);
}

export const loadProds = () => {
    productsContainer.innerHTML = "";
    form.innerHTML = "";
    editedProduct.innerHTML = "";
    fetch('/api/productos')
    .then(response => response.json())
    .then(data => renderProducts(data))
}

function addProdToCart(idElem) {
    fetch('/api/carrito')
    .then(response => response.json())
    .then(data => renderCart(data, idElem));
}

const renderCart = (arr, idElem) => {
    if (arr.length === 0) {
        alert("Carrito vacío")
    } else {
        const idCart = arr[arr.length - 1].id;
        const idProd = idElem;
        const url = `/api/carrito/${idCart}/products/${idProd}`;
        fetch (url, { method: "POST" })
        .then(response => response.json())
        .then(data => {
            alert("Producto agregado exitosamente");
            loadCart();
        }).catch(err => console.log(err));      
    }
}

const deleteProd = (idElem) => {
    const url = `/api/productos/${idElem}`;
    fetch (url, { method: "DELETE" })
    .then(response => response.json())
    .then(data => {
      alert(data);
      loadProds();
    }).catch(err => console.log(err));
}