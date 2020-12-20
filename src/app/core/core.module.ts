import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./login/login.component";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [HeaderComponent, LoginComponent, HomeComponent],
  imports: [CommonModule, RouterModule.forChild([]),NgbDropdownModule],

  exports: [HeaderComponent],
})
export class CoreModule {}
