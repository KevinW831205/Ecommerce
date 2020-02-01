import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { AppUser } from '../models/AppUser';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { ShoppingCart } from '../models/ShoppingCart';
import { SnapshotAction } from 'angularfire2/database';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser
  shoppingCart$: Observable<ShoppingCart>;
  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.shoppingCart$ = await (await this.shoppingCartService.getCart());
  }

  logout() {
    this.auth.logout();
  }
}
