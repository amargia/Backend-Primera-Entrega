const cart = require("../utils/cart");

class Carts {
    static getCarts() {
        return cart.list();
    }

    static createCart() {
        return cart.create()
    }

    static addProduct(x, y) {
        return cart.addProduct(x, y);
    }

    static getById(x) {
        return cart.getById(x);
    }

    static deleteById(x) {
        return cart.deleteById(x);
    }

    static deletProduct(x, y) {
        return cart.deletProduct(x, y);
    }
}

module.exports = Carts;