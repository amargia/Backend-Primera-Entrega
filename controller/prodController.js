const productos = require("../utils/products");

class Products { 
  
  static getAll() {
    const productos = productos.list();
    return productos;
  }

  static create(title, price, thumbnail) {
    const prod = productos.add(title, price, thumbnail);
    return prod;
  }

  static update(id, newProduct) {
    const updateProd = productos.update(id, newProduct)
    return updateProd;
  }

  static delete(id) {
    const deleteProd = productos.remove(id);
    return deleteProd;
  }  

} 

module.exports = Products;