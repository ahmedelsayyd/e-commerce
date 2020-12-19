import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminAuthGuardService } from "./services/admin-auth-guard.service";
import { ProductFormComponent } from "./components/product-form/product-form.component";
import { AdminProductsComponent } from "./components/admin-products/admin-products.component";
import { AdminOrdersComponent } from "./components/admin-orders/admin-orders.component";
import { AdminCategoryComponent } from "./components/admin-category/admin-category.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { SharedModule } from "shared/shared.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminCategoryComponent,
  ],
  imports: [AdminRoutingModule, SharedModule],
  providers: [AdminAuthGuardService],
})
export class AdminModule {}
