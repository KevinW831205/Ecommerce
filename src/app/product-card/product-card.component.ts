import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{
  
  @Input('product') product=null;
  @Input('show-actions') showActions =false;

  constructor() { }


}
