import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Order } from "shared/models/order";
import { Router } from "@angular/router";
import { AuthService } from "shared/services/auth.service";
import { OrderService } from "shared/services/order.service";
import { ShoppingCart } from "shared/models/shopping-cart";
import { Subscription } from "rxjs";

@Component({
  selector: "shipping-form",
  templateUrl: "./shipping-form.component.html",
  styleUrls: ["./shipping-form.component.css"],
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input("cart") cart: ShoppingCart;

  shipping = {};
  uid: string;
  userSubscription: Subscription;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(
      (user) => (this.uid = user.uid)
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.shipping, this.uid, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(["/order-success", result.key]);
  }
}
