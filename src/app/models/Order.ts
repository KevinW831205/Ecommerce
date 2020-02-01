import { Shipping } from './Shipping';
import { Item } from './Item';

export class Order{
    datePlaced: Date;
    shipping: Shipping;
    items: Item[];
}