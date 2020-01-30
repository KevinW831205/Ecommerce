import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { CategoryService } from '../service/category.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseData } from '../models/FirebaseData';
import { Product } from '../models/Product';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: FirebaseData<Product>[] = [];
  filteredProducts: FirebaseData<Product>[];
  categories$;
  category: string;

  constructor(private productService: ProductService, categoryService: CategoryService, route: ActivatedRoute) {

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


    this.categories$ = categoryService.getAll();

  }





}
