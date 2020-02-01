import { Component, OnInit } from '@angular/core';
import { Shipping } from '../models/Shipping';

@Component({
  selector: 'app-check-out-form',
  templateUrl: './check-out-form.component.html',
  styleUrls: ['./check-out-form.component.css']
})
export class CheckOutFormComponent implements OnInit {

  shipping: Shipping;

  constructor() { }

  ngOnInit() {
  }

}
