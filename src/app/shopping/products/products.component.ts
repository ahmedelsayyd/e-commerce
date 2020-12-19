import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "shared/services/product.service";
import { CategoryService } from "shared/services/category.service";
import { Router, ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { ShoppingCartService } from "shared/services/shopping-cart.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  selectedCategory;
  cart;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
  ) {
    this.productService
      .getAll()
      .pipe(
        switchMap((products) => {
          this.products = products;
          return this.route.queryParams;
        })
      )
      .subscribe((query) => {
        this.selectedCategory = query.category;

        this.filteredProducts = this.selectedCategory
          ? this.products.filter(
              (p) => p.value.category === this.selectedCategory
            )
          : this.products;
      });
  }

  async ngOnInit() {
    (await this.cartService.getCart()).subscribe((cart) => {
      this.cart = cart;
    });
  }
}
