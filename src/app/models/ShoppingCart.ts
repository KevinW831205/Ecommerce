import { Item } from './Item';

export class ShoppingCart {

    items: Item[] = [];
    constructor(public itemsMap: { [key: string]: Item }) {
        for (let productId in itemsMap) {
            let item = itemsMap[productId]
            this.items.push(new Item(item.product, item.quantity))
        }
    }


    get totalItemCount(): number {
        let count = 0;
        for (let productId in this.itemsMap) {
            count += this.items[productId].quantity;
        }
        return count;
    }



}