const express = require("express");
const { Router } = require("express");
//declaro el router
const carts = Router();

//importo el controller
const Carts = require("../controller/cartController")

//estructura carrito
//id, timestamp, products[]

carts.get("/", (req, res) => {     
  Carts.getCarts()  
  .then(data => {
    res.status(200).send(data)   
  })
});

carts.post("/", (req, res) => {     
  res.send(Carts.createCart())  
});

carts.delete("/:id", (req, res) => {   
  let id = req.params.id  
  Carts.deleteById(id) 
  .then(data => { 
    res.json(data) 
  })
});

carts.get("/:id/productos", (req, res) => {  
  let id = req.params.id    
  Carts.getById(id)  
  .then (data => { 
    res.status(201).send(data.products)
  })
});

carts.post("/:id/productos/:idProducto", (req, res) => { 
  let idCarrito = req.params.id   
  let idProducto = req.params.idProducto 

  res.send(Carts.addProduct(idCarrito, idProducto))

});

carts.delete("/:id/productos/:idProducto", (req, res) => { 
  let idCarrito = req.params.id   
  let idProducto = req.params.idProducto   
  
  Carts.deleteProduct(idCarrito, idProducto)
  .then(data => {
    res.json(data) 
  })  
});

module.exports = carts;