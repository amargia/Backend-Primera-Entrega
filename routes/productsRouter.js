const express = require('express');
const { Router } = require('express');
const products = Router();

const Products = require('../controller/prodController.js')
const Admin = require('../controller/adminController.js')

products.get('/', (req, res) => {
    Products.getAll()
    .then(data => {
        res.status(200).send(data);
    })
})

products.get('/:id', (req, res) => {
    Products.findOne(id)
    .then(data => {
        res.status(201).json(data);
    })
})

products.post("/", (req, res) => { 
    let login = Admin.isLogin()
    if (login) {
      const {name, description, code, thumbnail, price, stock} = req.body
      res.send(Products.save({name, description, code, thumbnail, price, stock})) 
    } else {
      res.json({ error : -1, descripcion: "ruta '/' método 'POST' no autorizada" })
    }
  });
  
products.delete("/:id", (req, res) => {
    let login = Admin.isLogin()
    if (login) {
        let id = req.params.id
        Products.deleteById(id)
            .then(data => {
                res.json(data)
            })
    } else {
        res.json({ error: -1, descripcion: `ruta '/${id}' método 'DELETE' no autorizada` })
    }
});

products.put("/:id", (req, res) => {
    let login = Admin.isLogin()
    if (login) {
        let id = parseInt(req.params.id)
        const { name, description, code, thumbnail, price, stock } = req.body
        const data = Products.changeById(id, { name, description, code, thumbnail, price, stock })
        res.json(data)
    } else {
        res.json({ error: -1, descripcion: `ruta '/${id}' método 'PUT' no autorizada` })
    }
});

module.exports = products;