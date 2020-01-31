import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from '../models/Product';
import { FirebaseData } from '../models/FirebaseData';
import { take, map } from 'rxjs/operators'
import { Item } from '../models/Item';
import { ShoppingCart } from '../models/ShoppingCart';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId()
    return this.db.object<ShoppingCart>('/shopping-carts/' + cartId).snapshotChanges()
      .pipe(
        map(x => new ShoppingCart(x.payload.val().items))
      );
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      let result = await this.create();
      localStorage.setItem('cartId', result.key)
      return result.key;
      // this.create().then(
      //   result => {
      // localStorage.setItem('cartId', result.key)
      // return this.getCart(result.key);
      //   });
    }
    return cartId;
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object<Item>('shopping-carts/' + cartId + '/items/' + productId);
  }

  async addToCart(product: FirebaseData<Product>) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(
      take(1)
    ).subscribe(item => {
      if (item.payload.val()) {
        item$.update({ quantity: item.payload.val().quantity + 1 })
      } else {
        item$.set({
          title: product.data.title,
          price: product.data.price,
          imageUrl: product.data.imageUrl,
          quantity: 1
        })
      }
    })
  }

  async removeFromCart(product: FirebaseData<Product>) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(
      take(1)
    ).subscribe(item => {
      if (item.payload.val().quantity > 0) {
        item$.update({ quantity: item.payload.val().quantity - 1 })
      }
    })
  }
}
