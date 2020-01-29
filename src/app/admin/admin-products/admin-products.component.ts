import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products$: Observable<any>;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll()
  }

  ngOnInit() {
    this.products$.subscribe(res=>{
      console.log(res);
    })
  }

}
