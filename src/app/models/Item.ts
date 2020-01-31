import { Product } from './Product';

export class Item {

    title: string;
    imageUrl: string;
    price: number;
    quantity: number

    constructor(){

    }

    get totalPrice() {
        return this.price * this.quantity;
    }
}