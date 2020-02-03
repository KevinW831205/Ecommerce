import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input('category') category;
  @Output('change') change = new EventEmitter()
  query: string;

  constructor(private categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();
  }

  ngOnInit() {
  }

  queryFilter() {
    this.change.emit({ value: this.query })
  }

}

export interface queryEvent {
  value: string
}
