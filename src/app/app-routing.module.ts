import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./core/login/login.component";
import { ProductsComponent } from "./shopping/products/products.component";

const routes: Routes = [
  { path: "", component: ProductsComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
