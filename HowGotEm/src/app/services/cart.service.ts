import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { Shoe, Size } from '../models/shoe';
import { CONST_CART } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private getCart(): Cart {
    const cartString = sessionStorage.getItem(CONST_CART);
    return cartString ? JSON.parse(cartString) : {userId: '', shoes: [], totalPrice: 0};
  }

  private setCart(cart: Cart) {
    sessionStorage.setItem(CONST_CART, JSON.stringify(cart));
  }

  public getCartItems(): Shoe[] {
    return this.getCart().shoes;
  }

  public getCartTotalPrice(): number {
    return this.getCart().totalPrice;
  }

  public addToCart(shoe: Shoe, size: Size): void {
    const cart = this.getCart();
    const index = cart.shoes.findIndex(s => s.id === shoe.id);
    if (index === -1) {
      // se la scarpa non è ancora nel carrello, la aggiungo
      shoe.sizes = [size];
      cart.shoes.push(shoe);
    } else {
      // altrimenti, controllo se la taglia è già presente nel carrello
      const sizeIndex = cart.shoes[index].sizes.findIndex(s => s.id === size.id);
      if (sizeIndex === -1) {
        // se la taglia non è presente, la aggiungo alla scarpa
        cart.shoes[index].sizes.push(size);
      } else {
        // altrimenti, incremento la quantità di taglie nel carrello
        cart.shoes[index].sizes[sizeIndex].quantityAvailable++;
      }
    }
    // aggiorno il prezzo totale
    cart.totalPrice += size.price;
    // salvo il carrello aggiornato nella sessionStorage
    this.setCart(cart);
  }

  // public addToCart(shoe: Shoe, size: Size, quantity: number = 1): void {
  //   const cart = this.getCart();
  //   const index = cart.shoes.findIndex(s => s.id === shoe.id);
  //   if (index === -1) {
      // se la scarpa non è ancora nel carrello, la aggiungo
    //   shoe.sizes = [{...size, quantityAvailable: quantity}];
    //   cart.shoes.push(shoe);
    // } else {
      // altrimenti, controllo se la taglia è già presente nel carrello
      // const sizeIndex = cart.shoes[index].sizes.findIndex(s => s.id === size.id);
      // if (sizeIndex === -1) {
        // se la taglia non è presente, la aggiungo alla scarpa
      //   cart.shoes[index].sizes.push({...size, quantityAvailable: quantity});
      // } else {
        // altrimenti, incremento la quantità di taglie nel carrello
    //     cart.shoes[index].sizes[sizeIndex].quantityAvailable += quantity;
    //   }
    // }
    // aggiorno il prezzo totale
    // cart.totalPrice += size.price * quantity;
    // salvo il carrello aggiorn

  public removeFromCart(shoeId: number): void {
    const cart = this.getCart();
    const index = cart.shoes.findIndex(s => s.id === shoeId);
    if (index !== -1) {
      // se la scarpa è nel carrello, la rimuovo
      const shoe = cart.shoes[index];
      if (shoe.sizes.length > 0) {
        const sizeIndex = shoe.sizes.findIndex(s => s.size === cart.shoes[index].sizes[0].size);
        if (sizeIndex !== -1 && cart.shoes[index].sizes[sizeIndex].quantityAvailable > 0) {
          cart.shoes[index].sizes[sizeIndex].quantityAvailable--;
          cart.totalPrice -= cart.shoes[index].sizes[sizeIndex].price; // sottrai il prezzo della taglia dal prezzo totale
        }
      }
      // se non ci sono più scarpe rimuovo la scarpa dal carrello
      if (shoe.sizes.length === 0 || shoe.sizes.every(size => size.quantityAvailable === 0)) {
        cart.shoes.splice(index, 1);
      }
      // salvo il carrello aggiornato nella sessionStorage
      this.setCart(cart);
    }
  }

  public clearCart(): void {
    this.setCart({userId: '', shoes: [], totalPrice: 0});
  }
}
