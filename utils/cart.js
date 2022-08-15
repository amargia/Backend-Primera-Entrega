const fs = require('fs');
const prods = require("./products");


const list = async () => {
  try {      
    const data = fs.readFileSync('./public/data/cart.json', 'utf-8')
    const dataObj = JSON.parse(data)       
    return (dataObj)
  }
  catch (err) {      
    throw new Error('No se pudo leer archivo', err)
  }
}

lastID = (arr) => {  
  let id = 0;
  if (arr.length > 0) {
    for (const el of arr ) {
      if (el.id > id) {
        id = el.id
      }
    }
  }
  return id
}

const create = async () => {
  try {
    const arr = await list()
    const previusID = lastID(arr)      
    const cartId = previusID + 1  
    let timestamp = new Date().getTime(); 
     
    arr.push({id : cartId, timestamp: timestamp , products : []})
    fs.writeFileSync(`./public/data/cart.json`, JSON.stringify(arr, null, 2)) 

    return cartId
  }
  catch (err) {      
    throw new Error('Error de escritura', err)
  } 
} 

const deleteById = async (i) => {  
  try {  
    const arr = await list() 
    let index = arr.findIndex(x => x.id == i)     
    if (index == -1) {
      return ({ error: 'Carrito no encontrado' })
    } 
    const newArr = arr.filter(el => el.id != i)
    fs.writeFileSync(`./public/data/cart.json`, JSON.stringify(newArr, null, 2)) 
    return "Carrito Eliminado"  
  }
  catch (err) {      
    throw new Error('Error de escritura', err)
  } 
}

const getById = async (x) => {
  try {    
    const arr = await list()
    if (arr.length === 0) {return "No hay Carrito Creado"}    
    return (arr.find(el => el.id == x) || { error: 'Carrito no encontrado' })  
  }  
  catch (err) {      
    throw new Error('Error de Lectura', err)
  }
}

const addProduct = async (idCarrito, idProducto) => {    
  try {
    const arr = await list()
    if (arr.length === 0) {return ({"Error" : "No hay Carritos"})} 

    let indexCart = arr.findIndex(el => el.id == idCarrito)
    if (indexCart == -1) {
      return ({ error: 'Carrito no encontrado' })
    } 

    const products = await prods.list()
    let indexProduct = products.findIndex(el => el.id == idProducto)
    if (indexProduct == -1) {
      return ({ error: 'Producto no encontrado' })
    } 
    arr[indexCart].products.push(products[indexProduct])
    fs.writeFileSync(`./public/data/cart.json`, JSON.stringify(arr, null, 2))
    return "Producto Agregado"
    
  } 
  catch (err) {      
    throw new Error('Error de escritura', err)
  }  
}

const deleteProduct = async (idCarrito, idProducto) => { 
  try {  
    const arr = await list()

    if (arr.length === 0) {return ({"Error" : "No hay Carritos"})} 

    let indexCart = arr.findIndex(el => el.id == idCarrito)
    if (indexCart == -1) {
      return ({ error: 'Carrito no encontrado' })
    } 

    const products = await prods.list()
    let indexProduct = products.findIndex(el => el.id == idProducto)
    if (indexProduct == -1) {
      return ({ error: 'Producto no encontrado' })
    } 

    arr[indexCart].products.splice(indexProduct, 1);
    fs.writeFileSync(`./public/data/cart.json`, JSON.stringify(arr, null, 2))    
    
    return "Producto Eliminado"
    
  } 
  catch (err) {      
    throw new Error('Error de escritura', err)
  }
} 


module.exports = { create, list, getById, deleteById, addProduct, deleteProduct };