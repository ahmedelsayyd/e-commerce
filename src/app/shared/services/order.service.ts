import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { ShoppingCartService } from "shared/services/shopping-cart.service";
import { Order } from "shared/models/order";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) {}

  async placeOrder(order) {
    let result = await this.db.list("/orders").push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list("/orders").valueChanges();
  }

  getOrderByUser(userId: string){
    return this.db
      .list<Order>("/orders", (ref) => ref.orderByChild('UserId').equalTo(userId))
      .valueChanges();
  }
}
