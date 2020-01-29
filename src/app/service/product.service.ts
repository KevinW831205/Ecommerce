import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  getAll(): Observable<any> {
    return this.db.list('/products').snapshotChanges()
      .pipe(
        map(category => {
          return category.map(c => {
            const key = c.payload.key;
            const data = c.payload.val();
            return { key, data };
          })
        })
      );
    ;
  }

  create(product) {
    return this.db.list('/products').push(product);
  }
}
