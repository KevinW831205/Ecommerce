import { Component, OnInit, OnDestroy } from '@angular/core';
import { Shipping } from '../models/Shipping';
import { ShoppingCart } from '../models/ShoppingCart';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-check-out-form',
  templateUrl: './check-out-form.component.html',
  styleUrls: ['./check-out-form.component.css']
})
export class CheckOutFormComponent implements OnInit, OnDestroy {

  shipping: Shipping = new Shipping();
  cart: ShoppingCart;
  subscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.subscription = cart$.subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  checkOut() {
    console.log(this.shipping);
  }

}
