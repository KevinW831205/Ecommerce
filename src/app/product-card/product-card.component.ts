import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/Product';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { FirebaseData } from '../models/FirebaseData';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: FirebaseData<Product> = null;
  @Input('show-actions') showActions = false;
  @Input('shopping-cart') shoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart) {
      return 0;
    }
    let item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product)
  }

}
