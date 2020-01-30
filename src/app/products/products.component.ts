import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../service/product.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseData } from '../models/FirebaseData';
import { Product } from '../models/Product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: FirebaseData<Product>[] = [];
  filteredProducts: FirebaseData<Product>[];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(private productService: ProductService, route: ActivatedRoute, private shoppingCartService: ShoppingCartService) {


    productService.getAll()
      .pipe(
        switchMap(products => {
          this.products = products;
          return route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = this.category ?
          this.products.filter(p => p.data.category === this.category) :
          this.products;
      })
  }

  async ngOnInit() {
    this.subscription = await (await (this.shoppingCartService.getCart())).snapshotChanges()
      .subscribe(cart => {
        this.cart = cart.payload.val();
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
