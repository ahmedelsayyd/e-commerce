import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  categories: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.categories = this.db
      .list("/categories/", (ref) => ref.orderByChild("name"))
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((change) => ({
            key: change.payload.key,
            value: change.payload.val(),
          }))
        )
      );
  }

  getAll() {
    return this.db
      .list("/categories/", (ref) => ref.orderByChild("name"))
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((change) => ({
            key: change.payload.key,
            value: change.payload.val(),
          }))
        )
      );
  }

  // addCategory(categoryName: string) {
  //   this.categorykey = categoryName
  //   this.db.list('/categories/' + categoryName).push({ name: categoryName })
  //     .then(obj => {
  //       let keys = this.getCategoryName(categoryName)
  //       console.log(keys);

  //     })
  // }

  // getCategoryName(categoryName) {
  //   return this.db.list('/categories/' + categoryName).valueChanges();
  // }
}
