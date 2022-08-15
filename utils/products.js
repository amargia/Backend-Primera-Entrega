const fs = require("fs")

const list = async () => {
  try {
    const data = fs.readFileSync('./public/data/products.json', 'utf-8')
    const dataObj = JSON.parse(data)
    return (dataObj)
  }
  catch (error) {
    throw new Error('No se pudo leer archivo', error)
  }
}

const getById = async (id) => {
  try {             
    const array = await list()    
    if (array.length === 0) {return "Archivo Vacio"} 
    return (array.find(elem => elem.id == id) || { error: 'Producto no encontrado' })
  }
  catch (err) {      
    throw new Error('Error de Lectura', err)
  }
}

lastID = (array) => {  
  let id = 0;
  if (array.length > 0) {
    for (const el of array ) {
      if (el.id > id) {
        id = el.id
      }
    }
  }
  return id
}

const add = async (product) => {
  try {  
    let timestamp = new Date().getTime();            
    const array = await list()      
    const previusID = lastID(array)      
    product.id = previusID + 1
    product.timestamp = timestamp 
    array.push(product) 
    fs.writeFileSync(`./public/data/products.json`, JSON.stringify(array, null, 2))    
    return(previusID + 1)
  }
  catch (err) {      
    throw new Error('No se pudo agregar el producto', err)
  }    
} 

const findAllMatch = (title) => {
  const newArr = data.filter((product) => product.title === title);
  return newArr;
};

const remove = async (id) => {
  try {
    const array = await list()    
    let index = array.findIndex(x => x.id == id) 
    if (index == -1) {
      return ({ error: 'Producto no encontrado' })
    }  
    const newArray = array.filter(el => el.id != id)    
    fs.writeFileSync(`./public/data/products.json`, JSON.stringify(newArray, null, 2))    
    return "Producto eliminado exitosamente" 
  } 
  catch (err) {    
    throw new Error('No se pudo eliminar el producto', err)
  }  
}

const update = async (id, object) => {
  try {
    const array = await list() 
    let index = array.findIndex(x => x.id == id)
    if (index == -1) {
      return ({ error: 'Producto no encontrado' })
    } 
    object.id = id
    object.timestamp = array[index].timestamp    
    const editedProduct = {...array[index], ...object}    
    array[index] = editedProduct
    fs.writeFileSync(`./public/data/products.json`, JSON.stringify(array, null, 2))  
    return "Producto actualizado exitosamente"
  }
  catch (err) {    
    throw new Error('No se pudo actualizar el producto', err)
  } 
}

module.exports = { list, getById, add, findAllMatch, remove, update };