export default class Cart {
    constructor({ at, products }) {
        this.products = products;
        this.total = this.getCardPrice();
    }

    getCardPrice() {
        let price = 0;
        for (const product of this.products) {
            price += product.price
        }
        return price;
    }
}