import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartShoe } from 'src/app/models/cart';
import { OrderRequest } from 'src/app/models/order-request';
import { OrderShoeRequest } from 'src/app/models/order-shoe-request';
import { Shoe } from 'src/app/models/shoe';
import { CartService } from 'src/app/services/cart.service';
import { AuthService, CONST_UTENTE } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';


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
  orderRequest!: OrderRequest;
  isLogged: boolean = false;
  private cartSubscription: Subscription = new Subscription();

  constructor(private cartService: CartService, private authSrv: AuthService, private modalSrv: ModalService) {}

  ngOnInit(): void {
    this.cartShoes = this.cartService.getCartItems();
    this.cartSubscription = this.cartService.cart$.subscribe((cart) => {
      this.cartShoes = cart.shoes;
      this.shoes = this.cartShoes.map((cartShoe) => cartShoe.shoe);
      this.cartTotalPrice = cart.totalPrice;
      this.cartSpeditionPrice = cart.speditionPrice;
      this.cartTotalAndSpeditionPrice = cart.totalPrice + cart.speditionPrice;
    });
    this.createOrderRequest();
    this.authSrv.auth$.subscribe(token => {
      if (token) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
    if (this.authSrv.isLogged() && this.authSrv.checkTokenValidity()) {
      this.isLogged = true;
    }
    window.addEventListener('storage', this.handleStorageChange.bind(this));
  }

  private handleStorageChange(event: StorageEvent) {
    if (event.key === CONST_UTENTE) {
      // Aggiorna la variabile isLogged in base alla presenza del valore nel Session Storage
      this.isLogged = sessionStorage.getItem(CONST_UTENTE) != null;
    }
  }

  removeFromCart(shoeId: number): void {
    this.cartService.removeFromCart(shoeId);
    this.cartShoes = this.cartService.getCartItems();
    this.shoes = this.cartShoes.map((cartShoe) => cartShoe.shoe);
    this.cartTotalPrice = this.cartService.getCartTotalPrice();
    this.createOrderRequest();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.createOrderRequest();
  }

  createOrderRequest(): void {
    const cart = this.cartService.getCart();
    this.orderRequest = {
      userId: +cart.userId,
      shoes: []
    };
    let orderShoeRequests: OrderShoeRequest[] = [];
    cart.shoes.forEach((shoe) => {
      shoe.sizes.forEach((size) => {
        const orderShoeRequest: OrderShoeRequest = {
          shoeId: shoe.shoe.id,
          sizeId: size.size.id,
          quantities: size.quantityOrdered
        };
        orderShoeRequests.push(orderShoeRequest);
      });
    });
    this.orderRequest.shoes = orderShoeRequests;
  }

  openLoginModal(){
    this.modalSrv.openLoginModal();
  }

  ngOnDestroy(): void {
    // disiscrizione all'observable del carrello quando il componente viene distrutto
    this.cartSubscription.unsubscribe();
  }
}
