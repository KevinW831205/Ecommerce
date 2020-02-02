import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$;

  constructor(private orderService: OrderService, authService: AuthService) {
    this.orders$ = authService.user$.pipe(
      switchMap(
        u => {
          console.log(u.uid)
          return orderService.getOrdersByUser(u.uid)
        }
      )
    )
    // this.orders$=orderService.getOrders();
  }

}
