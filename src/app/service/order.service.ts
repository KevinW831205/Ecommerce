import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Order } from '../models/Order';
import { ShoppingCartService } from './shopping-cart.service';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order: Order) {
    let result = await this.storeOrder(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders');
  }

  getOrdersByUser(userId: string) {
    this.db.list('/orders', ref => ref.equalTo(userId));
  }

  private storeOrder(order: Order) {
    return this.db.list<Order>('/orders').push(order);
  }
}
