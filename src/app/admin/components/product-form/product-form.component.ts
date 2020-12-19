import { Component, OnInit } from "@angular/core";
import { CategoryService } from "shared/services/category.service";
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { take } from "rxjs/operators";
import { ProductService } from "shared/services/product.service";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"],
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any[]>;
  product = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = this.categoryService.categories;

    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id)
      this.productService
        .get(this.id)
        .pipe(take(1))
        .subscribe((p) => {
          this.product = p;
        });
  }

  ngOnInit() {}

  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(["/admin/products"]);
  }
}
