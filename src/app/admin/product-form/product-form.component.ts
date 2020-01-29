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
  product: any = {
    data: {
      title: "",
      price: "",
      imageUrl: "",
      category: ""
    }
  };
  id;
  constructor(categoryService: CategoryService, private productService: ProductService, private router: Router, private route: ActivatedRoute) {
    this.categories$ = categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      // this.productService.get(id)
      // .subscribe(p=> this.product = p);
      this.productService.get(this.id).pipe(take(1)).subscribe(res => {
        this.product = res;
      });
    }
  }

  ngOnInit() {
  }


  save(product) {
    if (this.id) {
      this.productService.update(this.id,product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products'])
  }

  delete(){
    if(confirm('are you sure you want to delete this product?')){
      this.productService.delete(this.id)
      this.router.navigate(['/admin/products'])
    }
  }


}
