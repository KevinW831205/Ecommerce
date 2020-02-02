import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$;

  constructor(private orderService: OrderService) {
    this.orders$=orderService.getOrders();
  }

}
