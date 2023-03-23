import { Component, OnInit } from '@angular/core';
import { CartShoe } from 'src/app/models/cart';
import { Shoe } from 'src/app/models/shoe';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})
export class CarrelloComponent implements OnInit {

  cartShoes: CartShoe[] = []
  shoes: Shoe[] = [];
  cartTotalPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartShoes = this.cartService.getCartItems();
    console.log(this.cartShoes);
    this.shoes = this.cartShoes.map(cartShoe => cartShoe.shoe);
    this.cartTotalPrice = this.cartService.getCartTotalPrice();
  }

  removeFromCart(shoeId: number): void {
    this.cartService.removeFromCart(shoeId);
    this.cartShoes = this.cartService.getCartItems();
    this.shoes = this.cartShoes.map(cartShoe => cartShoe.shoe);
    this.cartTotalPrice = this.cartService.getCartTotalPrice();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartShoes = [];
    this.shoes = [];
    this.cartTotalPrice = 0;
  }

}
