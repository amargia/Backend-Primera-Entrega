import { loadProds } from "./products";
import { loadCart } from "./cart";

const editedProduct = document.getElementById("editedProduct")
const cartContainer = document.getElementById("cartContainer");

//formulario de edición
const renderEditedProduct = (obj) => {
    const divForm = document.createElement("div")
    divForm.className = "col-12 row"

    const form = document.createElement("form")
    form.className = "form col-6"

    const div = document.createElement("div")
    div.innerHTML = "Editar Producto"

    const prodName = document.createElement("input")
    prodName.type = "text";
    prodName.name = "name";
    prodName.id = "nombre";
    prodName.placeholder = "Nombre del Producto";
    prodName.required = true;

    const prodDesc = document.createElement("input")
    prodDesc.type = "text";
    prodDesc.name = "description";
    prodDesc.id = "descripcion";
    prodDesc.placeholder = "Descripción";
    prodDesc.required = true;

    const prodCode = document.createElement("input")
    prodCode.type = "text";
    prodDesc.name = "code";
    prodDesc.id = "codigo";
    prodDesc.placeholder = "Código del Producto";
    prodDesc.required = true;

    const prodThumbnail = document.createElement("input")
    prodThumbnail.type = "file";
    prodThumbnail.name = "thumbnail";
    prodThumbnail.id = "thumbnail";
    prodThumbnail.placeholder = "Imagen del Producto";
    prodThumbnail.required = true;

    const prodPrice = document.createElement("input")
    prodPrice.type = "number";
    prodPrice.name = "price";
    prodPrice.id = "precio";
    prodPrice.placeholder = "Precio";
    prodPrice.required = true;

    const prodStock = document.createElement("input")
    prodStock.type = "number";
    prodStock.name = "stock";
    prodStock.id = "stock";
    prodStock.placeholder = "Stock disponible";
    prodStock.required = true;

    const formBtn = document.createElement("div")
    formBtn.className = "form-button"

    const submitBtn = document.createElement("input")
    submitBtn.type = "submit"
    submitBtn.value = "Editar Producto";
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const formData = new formData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });    
        editProduct(data, obj.id);
    });

    formBtn.append(submitBtn);

    const returnBtn = document.createElement("button")
    returnBtn.className = "btn"
    returnBtn.innerHTML = "Cancelar"
    returnBtn.addEventListener("click", () => {loadProds(), loadCart()})

    form.append(div, prodName, prodDesc, prodCode, prodThumbnail, prodPrice, prodStock, formBtn, returnBtn)
    divForm.append(form)
    editedProduct.append(divForm)
}

//editar producto
const editProduct = (data, id) => {
    const url = `/api/products/${id}`
    const method = "PUT";
    const headers = {
      "Content-Type": "application/json"
    };
    const body = JSON.stringify(data);
    fetch(url, {method, headers, body})
      .then(res => res.json())
      .then(res => {    
          alert("Producto editado exitosamente");  
          loadProds();
          loadCart();      
      } )
      .catch(err => console.log(err));
}

export const toEdit = (id) => {
    productsContainer.innerHTML = "";
    cartContainer.innerHTML = "";
  
    console.log(id);
    fetch(`/api/productos/${id}`)
    .then(response => response.json())
    .then(data => renderEditedProduct(data));
}