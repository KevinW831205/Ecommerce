import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseData } from 'shared/models/FirebaseData';
import { Product } from 'shared/models/Product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/ShoppingCart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: FirebaseData<Product>[] = [];
  filteredProducts: FirebaseData<Product>[];
  category: string;
  cart$: Observable<ShoppingCart>;
  subscription: Subscription;

  constructor(private productService: ProductService, private route: ActivatedRoute, private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.populateProducts()
    this.cart$ = await this.shoppingCartService.getCart();
  }

  private populateProducts() {
    this.productService.getAll()
      .pipe(
        switchMap(products => {
          this.products = products;
          return this.route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      })
  }

  private applyFilter() {
    this.filteredProducts = this.category ?
      this.products.filter(p => p.data.category === this.category) :
      this.products;
  }
}
