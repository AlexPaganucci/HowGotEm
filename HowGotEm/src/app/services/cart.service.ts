import { Injectable } from '@angular/core';
import { Cart, CartShoe } from '../models/cart';
import { CONST_CART } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  authService: any;

  constructor() { }

  private getCart(): Cart {
    const cartString = sessionStorage.getItem(CONST_CART);
    return cartString ? JSON.parse(cartString) : null;
  }

  private setCart(cart: Cart) {
    sessionStorage.setItem(CONST_CART, JSON.stringify(cart));
  }

  public getCartItems(): CartShoe[] {
    return this.getCart().shoes;
  }

  public getCartTotalPrice(): number {
    return this.getCart().totalPrice;
  }

  public addToCart(shoe: CartShoe): void {
    const cart = this.getCart();
    const index = cart.shoes.findIndex(s => s.shoe.id === shoe.shoe.id);
    if (index === -1) {
      // se la scarpa non è ancora nel carrello, la aggiungo
      cart.shoes.push(shoe);
    } else {
      // altrimenti, controllo se la taglia è già presente nel carrello
      const sizeIndex = cart.shoes[index].sizes.findIndex(s => s.size.id === shoe.sizes[0].size.id);
      if (sizeIndex === -1) {
        // se la taglia non è presente, la aggiungo alla scarpa
        cart.shoes[index].sizes.push(shoe.sizes[0]);
      } else {
        // altrimenti, incremento la quantità di taglie nel carrello
        cart.shoes[index].sizes[sizeIndex].quantityOrdered += shoe.sizes[0].quantityOrdered;
      }
    }
    // aggiorno il prezzo totale
    cart.totalPrice += shoe.sizes[0].size.price * shoe.sizes[0].quantityOrdered;
    // salvo il carrello aggiornato nella sessionStorage
    this.setCart(cart);
  }

  public removeFromCart(shoeId: number): void {
    const cart = this.getCart();
    const index = cart.shoes.findIndex(s => s.shoe.id === shoeId);
    if (index !== -1) {
      // se la scarpa è nel carrello, la rimuovo
      const shoe = cart.shoes[index];
      if (shoe.sizes.length > 0) {
        const sizeIndex = shoe.sizes.findIndex(s => s.size === cart.shoes[index].sizes[0].size);
        if (sizeIndex !== -1 && cart.shoes[index].sizes[sizeIndex].quantityOrdered > 0) {
          cart.shoes[index].sizes[sizeIndex].quantityOrdered--;
          cart.totalPrice -= cart.shoes[index].sizes[sizeIndex].size.price; // sottrai il prezzo della taglia dal prezzo totale
        }
      }
      // se non ci sono più scarpe rimuovo la scarpa dal carrello
      if (shoe.sizes.length === 0 || shoe.sizes.every(size => size.quantityOrdered === 0)) {
        cart.shoes.splice(index, 1);
      }
      // salvo il carrello aggiornato nella sessionStorage
      this.setCart(cart);
    }
  }

  public clearCart(): void {
    const cart = this.getCart();
    cart.shoes = [];
    cart.totalPrice = 0;
    this.setCart(cart);
  }
}
