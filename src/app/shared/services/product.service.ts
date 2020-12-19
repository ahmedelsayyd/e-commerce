import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { map } from "rxjs/operators";
import { Product } from "shared/models/product";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    this.db.list("/products/").push(product);
  }

  getAll() {
    return this.db
      .list("/products/")
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

  get(productId) {
    return this.db
      .object<Product>("/products/" + productId)
      .snapshotChanges()
      .pipe(
        map((change) => ({
          key: change.payload.key,
          value: change.payload.val(),
        }))
      );
  }

  update(productId, newProduct) {
    this.db.object("/products/" + productId).update(newProduct);
  }

  delete(productId) {
    this.db.object("/products/" + productId).remove();
  }
}
