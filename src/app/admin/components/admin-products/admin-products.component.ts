import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ProductService } from "shared/services/product.service";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getAll()
      .subscribe(
        (products) => (this.products = this.filteredProducts = products)
      );
  }

  ngOnInit() {}

  delete(productId) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    this.productService.delete(productId);
  }

  filter(query) {
    this.filteredProducts = query
      ? this.products.filter((p) =>
          p.value.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
