import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product
  @Input() showActions = true
  @Input('shopping-cart') shoppingCart


  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart() {
    this.cartService.addToCart(this.product.value, this.product.key)

  }


  getQuantity() {
    if (!this.shoppingCart) return 0
    let item = this.shoppingCart.items[this.product.key]
    return item ? item.quantity : 0
  }
}
