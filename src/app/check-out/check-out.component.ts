import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from '../models/ShoppingCart';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { OrderService } from '../service/order.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  cart: ShoppingCart;
  cartSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;
  

  constructor(private shoppingCartService: ShoppingCartService, private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
