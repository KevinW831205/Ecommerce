import { Component, OnInit, OnDestroy } from '@angular/core';
import { Shipping } from '../models/Shipping';
import { ShoppingCart } from '../models/ShoppingCart';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { Subscription } from 'rxjs';
import { Order } from '../models/Order';
import { Item } from '../models/Item';
import { OrderService } from '../service/order.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-check-out-form',
  templateUrl: './check-out-form.component.html',
  styleUrls: ['./check-out-form.component.css']
})
export class CheckOutFormComponent implements OnInit, OnDestroy {

  shipping: Shipping = new Shipping();
  cart: ShoppingCart;
  cartSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;

  constructor(private shoppingCartService: ShoppingCartService, private orderService: OrderService, private authService: AuthService) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  checkOut() {
    let order = new Order(this.userId, this.shipping, this.cart)
    this.orderService.storeOrder(order);
  }

}
