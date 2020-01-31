import { Item } from './Item';

export class ShoppingCart {

    itemsArr: Item[] = [];
    constructor(public items: { [key: string]: Item }) {
        for (let productId in items) {
            let item = items[productId]
            this.itemsArr.push(new Item(item.product, item.quantity))
        }
    }


    get totalItemCount(): number {
        let count = 0;
        for (let productId in this.items) {
            count += this.items[productId].quantity;
        }
        return count;
    }



}