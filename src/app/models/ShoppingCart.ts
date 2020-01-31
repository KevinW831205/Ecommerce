import { Item } from './Item';
import { Product } from './Product';
import { FirebaseData } from './FirebaseData';

export class ShoppingCart {

    itemsArr: Item[] = [];
    constructor(public items: { [key: string]: Item }) {
        for (let productId in items) {
            let item = items[productId]
            this.itemsArr.push(new Item(item.product, item.quantity))
        }
    }

    get totalPrice(): number {
        let sum = 0;
        this.itemsArr.forEach(item => {
            sum += item.totalPrice;
        })
        return sum;
    }

    get totalItemCount(): number {
        let count = 0;
        for (let productId in this.items) {
            count += this.items[productId].quantity;
        }
        return count;
    }

    getQuantity(product: FirebaseData<Product>) {
        let item = this.items[product.key];
        return item ? item.quantity : 0;
    }




}