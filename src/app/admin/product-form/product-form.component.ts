import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit() {
    this.categories$.subscribe(res=>{
      console.log(res)
    })

  }

}
