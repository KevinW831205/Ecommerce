import { Shipping } from './Shipping';
import { Item } from './Item';

export class Order{
    userId : string;
    datePlaced: any;
    shipping: Shipping;
    items: Item[];
    totalPrice: number;
}