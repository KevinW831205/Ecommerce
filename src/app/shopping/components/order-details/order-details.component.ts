import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { Observable, Subscription } from 'rxjs';
import { FirebaseData } from 'shared/models/FirebaseData';
import { Order } from 'shared/models/Order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orders$: Observable<FirebaseData<Order>>

  constructor(private route: ActivatedRoute, private orderService: OrderService) {

  }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'))
    this.orders$ = this.orderService.getOrderById(this.route.snapshot.paramMap.get('id'))
    this.orders$.subscribe(s=>{
      console.log(s)
    })
  }

}
