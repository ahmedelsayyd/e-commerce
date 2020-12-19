import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input() product
  @Input('shopping-cart') shoppingCart: ShoppingCart


  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart() {
    this.cartService.addToCart(this.product.value, this.product.key)

  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product.value, this.product.key)

  }

}
