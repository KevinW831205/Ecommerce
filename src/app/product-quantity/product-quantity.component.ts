import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/Product';
import { FirebaseData } from '../models/FirebaseData';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { ShoppingCart } from '../models/ShoppingCart';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product: FirebaseData<Product> = null;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }


  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product)
  }


}
