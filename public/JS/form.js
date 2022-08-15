import { loadProds } from "./products";
import { loadCart } from "./cart";

export const renderForm = () => {
    const divForm = document.createElement("div")
    divForm.className = "row col-12"

    const form = document.createElement("form")
    form.className = "form col-6"

    const div = document.createElement("div")
    div.innerHTML = "Agregar Producto";

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
    submitBtn.value = "Agregar Producto";
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const formData = new formData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });    
        createProduct(data);
    });

    formBtn.append(submitBtn);

    const returnBtn = document.createElement("button")
    returnBtn.className = "btn"
    returnBtn.innerHTML = "Cancelar"
    returnBtn.addEventListener("click", () => {loadProds(), loadCart()})

    form.append(div, prodName, prodDesc, prodCode, prodThumbnail, prodPrice, prodStock, formBtn, returnBtn)
    divForm.append(form)

    productsContainer.innerHTML = "";
    cartContainer.innerHTML = "";
}

//crear producto
const createProduct = async () => {
    const url = '/api/products';
    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "aplication/json"
        },
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((data) => {
        alert("Producto creado exitosamente");
        loadProds();
        loadCart();
    })
}