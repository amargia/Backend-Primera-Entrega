const cartContainer = document.getElementById("cartContainer");

//render Carrito
const renderCart = (arr) => {
    cartContainer.innerHTML = "";
    if (arr.length === 0) {
        const noCart = document.createElement("div");
        noCart.className = "col-12";
        noCart.append("Carrito vacío");

        const newCartBtn = document.createElement("button");
        newCartBtn.className = "row col-12";

        const divCartBtn = document.createElement("div");
        divCartBtn.className = "text-center";

        const cartSubmitBtn = document.createElement("input");
        cartSubmitBtn.value = "Crear carrito";
        cartSubmitBtn.className = "text-center";
        cartSubmitBtn.addEventListener("click", () => createCart());

        divCartBtn.append(cartSubmitBtn);
        newCartBtn.append(divCartBtn);

        cartContainer.append(noCart, newCartBtn);
    } else {
        const cartTitle = document.createElement("h2");
        cartTitle.className = "col-12";
        cartTitle.append = `Cart ID ${data.id}`

        const div = document.createElement("div");
        div.className = "col-12";

        const div2 = document.createElement("div");
        div2.className = "col-12";

        const h3 = document.createElement("h3");
        h3.append("Productos");

        const table = document.createElement("table");
        table.className = "table col-12";

        const thead = document.createElement("thead");

        const tr = document.createElement("tr");

        const thProd = document.createElement("th");
        thProd.scope = "col";
        thProd.innerHTML = "Producto"

        const thPrecio = document.createElement("th")
        thPrecio.scope = "col";
        thPrecio.innerHTML = "Precio"

        const thID = document.createElement("th")
        thID.scope = "col";
        thID.innerHTML = "ID"

        const thDelete = document.createElement("th");
        thDelete.scope = "col";
        thDelete.innerHTML = "Eliminar";

        tr.append(thProd, thPrecio, thID, thDelete)
        thead.append(tr)
        table.append(thead);
        div2.append(h3, table);
        div.append(div2);

        cartContainer.append(cartTitle, div);

        const tbody = document.createElement("tbody");

        for ( let i = 0; data.products.length > 0; i++ ) {
            const tr = document.createElement("tr")

            const tdName = document.createElement("td")
            tdName.innerHTML = data.products[i].name;

            const tdPrice = document.createElement("td")
            tdPrice.innerHTML = data.products[i].price;

            const tdID = document.createElement("td")
            tdID.innerHTML = data.products[i].id;

            const tdDelete = document.createElement("td")
            tdDelete.innerHTML = "X"
            tdDelete.addEventListener("click", () => {
                deleteFromCart(data.id, data.products[i].id);
            });
            
            tr.append(tdName, tdPrice, tdID, tdDelete);
            tbody.append(tr)
        }
        table.append(tbody);

        const createCartBtn = document.createElement("form");
        createCartBtn.className = "col-12 row";

        const createDiv = document.createElement("div");
        createDiv.className = "text-center";

        const createSubmit = document.createElement("input");
        createSubmit.value = "Vaciar carrito"
        createSubmit.className = "text-center"
        createSubmit.addEventListener("click", () => {
            emptyCart();
        })

        createDiv.append(createSubmit)
        createCartBtn.append(createDiv)

        cartContainer.append(createCartBtn);
    }
}

//crear Carrito
const createCart = () => {
    const url = "/api/cart"
    fetch(url, {
        method: "POST",
    })
    .then((res) => res.json())
    .then((data) => {
        alert("Carrito creado exitosamente");
        loadCart();
    })
}

//eliminar producto del Carrito
const deleteFromCart = (idCart, idProd) => {
    const url = `/api/cart/${idCart}/products/${idProd}`;
    fetch(url, {
        method: "DELETE",
    })
    .then((res) => res.json())
    .then((data) => {
        alert(data);
        loadCart();
    })
};

//vaciar Carrito
const emptyCart = () => {
    const url = "/api/cart"
    fetch(url, {
        method: "POST"
    })
    .then((res) => res.json())
    .then((data) => {
        alert("Carrito vacío")
        loadCart();
    })
}

export const loadCart = () => {
    fetch('/api/cart')
    .then(response => response.json())
    .then(data => renderCart(data))
};