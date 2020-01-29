import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }


  /*

{
      query: {
        orderByChild: 'name'
      }
    }
  */
  getCategories() {
    return this.db.list('/categories').snapshotChanges()
      .pipe(
        map(category => {
          return category.map(c => {
            const key = c.payload.key;
            const data = c.payload.val();
            return {key,data};
          })
        })
      );
  }

}
