import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartShoe } from 'src/app/models/cart';
import { Shoe } from 'src/app/models/shoe';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css'],
})
export class CarrelloComponent implements OnInit, OnDestroy {
  cartShoes: CartShoe[] = [];
  shoes: Shoe[] = [];
  cartTotalPrice: number = 0;
  cartSpeditionPrice: number = 0;
  cartTotalAndSpeditionPrice: number = 0;
  private cartSubscription: Subscription = new Subscription();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartShoes = this.cartService.getCartItems();
    this.cartSubscription = this.cartService.cart$.subscribe((cart) => {
      this.cartShoes = cart.shoes;
      this.shoes = this.cartShoes.map((cartShoe) => cartShoe.shoe);
      this.cartTotalPrice = cart.totalPrice;
      this.cartSpeditionPrice = cart.speditionPrice;
      this.cartTotalAndSpeditionPrice = cart.totalPrice + cart.speditionPrice;
    });
  }

  removeFromCart(shoeId: number): void {
    this.cartService.removeFromCart(shoeId);
    this.cartShoes = this.cartService.getCartItems();
    this.shoes = this.cartShoes.map((cartShoe) => cartShoe.shoe);
    this.cartTotalPrice = this.cartService.getCartTotalPrice();
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  ngOnDestroy(): void {
    // disiscrizione all'observable del carrello quando il componente viene distrutto
    this.cartSubscription.unsubscribe();
  }
}
