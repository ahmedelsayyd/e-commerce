import { Component, OnInit } from "@angular/core";

import { AuthService } from "shared/services/auth.service";

import { AppUser } from "shared/models/app-user";
import { ShoppingCartService } from "shared/services/shopping-cart.service";
import { Observable } from "rxjs";
import { ShoppingCart } from "shared/models/shopping-cart";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  appUser: AppUser;
  $cart: Observable<ShoppingCart>;

  constructor(
    public authService: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.authService.appUser$.subscribe((appUser) => (this.appUser = appUser));

    this.$cart = await this.shoppingCartService.getCart();
  }

  logout() {
    this.authService.logout();
  }
}
