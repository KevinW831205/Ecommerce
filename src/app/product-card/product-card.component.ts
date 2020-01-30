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

  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart(product: FirebaseData<Product>) {
    this.shoppingCartService.addToCart(product);
  }

}
