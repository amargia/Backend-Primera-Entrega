const methodBank = require("../utils/products");

class ProductsContainer { 
  
  static getAll() {
    return methodBank.list();
  }

  static create(object) {
    return methodBank.add(object)
  }

  static getById(id) {
    return methodBank.getById(id)
  }

  static update(id, object) {
    return methodBank.update(id, object)
  }

  static delete(id) {
    return methodBank.remove(id)
  }
} 

module.exports = ProductsContainer;