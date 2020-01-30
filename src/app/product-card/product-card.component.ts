import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/Product';
import { ShoppingCartService } from '../service/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product = null;
  @Input('show-actions') showActions = false;

  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart(product: Product) {

  }

}
