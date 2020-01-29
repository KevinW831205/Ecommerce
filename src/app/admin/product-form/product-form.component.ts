import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product;
  constructor(categoryService: CategoryService, private productService: ProductService, private router: Router, private route: ActivatedRoute) {
    this.categories$ = categoryService.getCategories(); 
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      // this.productService.get(id)
        // .subscribe(p=> this.product = p);
        this.productService.get(id).subscribe(res=>console.log(res));
    }
  }

  ngOnInit() { 
    console.log(this.product)
   }

  save(product){
    this.productService.create(product);
    this.router.navigate(['/admin/products'])
  }



}
