import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { AppUser } from '../models/AppUser';
import { ShoppingCartService } from '../service/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser
  shoppingCartItemCount: number;
  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    let cart$ = await (await this.shoppingCartService.getCart()).snapshotChanges();
    cart$.subscribe(cart => {
      let list = cart.payload.val().items;
      this.shoppingCartItemCount = 0;
      for (let productId in list) {
        this.shoppingCartItemCount += list[productId].quantity
      }
    })
  }

  logout() {
    this.auth.logout();
  }
}
