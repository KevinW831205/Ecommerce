import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from '../models/Product';
import { FirebaseData } from '../models/FirebaseData';
import { take, map } from 'rxjs/operators'
import { Item } from '../models/Item';

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

  private getCart(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId);
  }

  private async getOrCreateCartId() {
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

  async addToCart(product: FirebaseData<Product>) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object<Item>('shopping-carts/' + cartId + '/items/' + product.key);
    item$.snapshotChanges().pipe(
      take(1)
    ).subscribe(item => {
      console.log("payload val", item.payload.val());
      if (item.payload.val()) {
        item$.update({ quantity: item.payload.val().quantity + 1 })
      } else {
        item$.set({ product: product.data, quantity: 1 })
      }
    })
  }
}
