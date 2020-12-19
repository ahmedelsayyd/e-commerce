import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AdminCategoryComponent } from "./components/admin-category/admin-category.component";
import { AdminOrdersComponent } from "./components/admin-orders/admin-orders.component";
import { AdminProductsComponent } from "./components/admin-products/admin-products.component";
import { ProductFormComponent } from "./components/product-form/product-form.component";
import { AdminAuthGuardService } from "./services/admin-auth-guard.service";
import { AuthGuardService } from "shared/services/auth-guard.service";

const routes: Routes = [
  {
    path: "admin/products/new",
    component: ProductFormComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService],
  },
  {
    path: "admin/products/:id",
    component: ProductFormComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService],
  },
  {
    path: "admin/products",
    component: AdminProductsComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService],
  },

  {
    path: "admin/category/new",
    component: AdminCategoryComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService],
  },
  {
    path: "admin/orders",
    component: AdminOrdersComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
