export default class Cart {
    constructor({ at, products }) {
        this.products = products;
        this.total = this.getCardPrice();
    }

    getCardPrice() {
        return this.products
            .map(product => product.price)
            .reduce((prev, next) => prev + next, 0);
    }
}