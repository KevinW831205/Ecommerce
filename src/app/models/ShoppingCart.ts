import { Item } from './Item';

export class ShoppingCart {


    constructor(public items: Item[]) {

    }

    get productIds(){
        return Object.keys(this.items)
    }

    get totalItemCount(): number {
        let count = 0;
        for (let productId in this.items) {
            count += this.items[productId].quantity;
        }
        return count;
    }

}