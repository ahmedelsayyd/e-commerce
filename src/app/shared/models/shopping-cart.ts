import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(public itemsMap) {
    this.itemsMap = itemsMap;

    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      this.items.push(new ShoppingCartItem({ ...item, key: productId }));

      // let x = new ShoppingCartItem()
      // Object.assign(x, item)
      // x.key = productId
      // this.items.push(x)
    }
  }

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.itemsMap)
      count += this.itemsMap[productId].quantity;

    return count;
  }

  get totalPrice() {
    let sum = 0;
    for (let productId in this.items) sum += this.items[productId].totalPrice;
    return sum;
  }

  getQuantity(product) {
    if (!this.itemsMap) return 0;
    let item = this.itemsMap[product.key];
    //console.log(item);

    return item ? item.quantity : 0;
  }
}
