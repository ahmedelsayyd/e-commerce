import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { take, map } from "rxjs/operators";
import { ShoppingCart } from "shared/models/shopping-cart";
import { Observable } from "rxjs";
import { ShoppingCartItem } from "shared/models/shopping-cart-item";
import { Product } from "shared/models/product";

@Injectable({
  providedIn: "root",
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db
      .list("shopping-carts")
      .push({ dateCreated: new Date().getTime() });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db
      .object<ShoppingCart>("/shopping-carts/" + cartId)
      .valueChanges()
      .pipe(map((x) => new ShoppingCart(x.items)));
  }

  getItem(cartId, productId) {
    return this.db.object<ShoppingCartItem>(
      "/shopping-carts/" + cartId + "/items/" + productId
    );
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object("/shopping-carts/" + cartId + "/items/").remove();
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem("cartId");

    if (cartId) return cartId;

    let result = await this.create();

    localStorage.setItem("cartId", result.key);
    return result.key;
  }

  private async updateItemQuantity(product: Product, productkey, change) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, productkey);

    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item) => {
        if (item) {
          console.log(item);

          let quantity = (item.quantity || 0) + change;

          if (quantity === 0) item$.remove();
          else item$.update({ quantity: quantity });
        } else {
          item$.set(
            new ShoppingCartItem({
              title: product.title,
              price: product.price,
              imageUrl: product.imageUrl,
              quantity: change,
            })
          );
        }

        //item$.update({ product: product.value, quantity: (item.quantity || 0) + change })
      });
  }

  async addToCart(product, key) {
    this.updateItemQuantity(product, key, 1);
  }

  async removeFromCart(product, key) {
    this.updateItemQuantity(product, key, -1);
  }
}
