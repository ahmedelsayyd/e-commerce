import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuardService } from "shared/services/auth-guard.service";
import { SharedModule } from "shared/shared.module";

import { CheckOutComponent } from "./check-out/check-out.component";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { OrderSuccessComponent } from "./order-success/order-success.component";
import { ProductsFilterComponent } from "./products/products-filter/products-filter.component";
import { ProductsComponent } from "./products/products.component";
import { ShippingFormComponent } from "./shipping-form/shipping-form.component";
import { ShoppingCartSummaryComponent } from "./shopping-cart-summary/shopping-cart-summary.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";

@NgModule({
  declarations: [
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductsComponent,
    ProductsFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: "shopping-card", component: ShoppingCartComponent },
      { path: "products", component: ProductsComponent },

      {
        path: "check-out",
        component: CheckOutComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "order-success/:id",
        component: OrderSuccessComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "my/orders",
        component: MyOrdersComponent,
        canActivate: [AuthGuardService],
      },
    ]),
  ],
})
export class ShoppingModule {}
