import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Shipping } from 'shared/models/Shipping';
import { ShoppingCart } from 'shared/models/ShoppingCart';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { Subscription } from 'rxjs';
import { Order } from 'shared/models/Order';
import { OrderService } from '../service/order.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out-form',
  templateUrl: './check-out-form.component.html',
  styleUrls: ['./check-out-form.component.css']
})
export class CheckOutFormComponent {
  @Input('cart') cart: ShoppingCart;
  @Input('userId') userId: string;

  shipping: Shipping = new Shipping();


  constructor(private orderService: OrderService ,private router: Router) { }

  async checkOut() {
    let order = new Order(this.userId, this.shipping, this.cart)
    let result = this.orderService.placeOrder(order);
    this.router.navigate(['/order-success',(await result).key])
  }

}
