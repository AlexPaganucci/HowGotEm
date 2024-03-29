import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartShoe } from 'src/app/models/cart';
import { OrderRequest } from 'src/app/models/order-request';
import { OrderShoeRequest } from 'src/app/models/order-shoe-request';
import { Shoe } from 'src/app/models/shoe';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css'],
})
export class CarrelloComponent implements OnInit, OnDestroy {

  imgPath = environment.pathImg
  user: User | undefined;
  isUserPresent: boolean = false;
  cartShoes: CartShoe[] = [];
  shoes: Shoe[] = [];
  cartTotalPrice: number = 0;
  cartSpeditionPrice: number = 0;
  cartTotalAndSpeditionPrice: number = 0;
  orderRequest!: OrderRequest;
  isLogged: boolean = false;
  private cartSubscription: Subscription = new Subscription();

  constructor(private cartService: CartService, private authSrv: AuthService, private modalSrv: ModalService, private userSrv: UserService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart$.subscribe((cart) => {
      this.cartShoes = cart.shoes;
      if (this.cartShoes.length > 0) {
        this.shoes = this.cartShoes.map((cartShoe) => cartShoe.shoe);
      } else {
        this.shoes = [];
      }
      this.cartTotalPrice = cart.totalPrice;
      this.cartSpeditionPrice = cart.speditionPrice;
      this.cartTotalAndSpeditionPrice = cart.totalPrice + cart.speditionPrice;
    });

    this.createOrderRequest();

    this.authSrv.auth$.subscribe(token => {
      if (token) {
        this.isLogged = true;
        this.userSrv.user$.subscribe((user) => {
          if(user){
            this.user = user;
            console.log(this.user);
          }
        });
      } else {
        this.isLogged = false;
        this.user = undefined;
      }
    });

    if (this.authSrv.isLogged() && this.authSrv.checkTokenValidity()) {
      this.isLogged = true;
      this.userSrv.getUser().subscribe();
    }
  }

  getUser(){
    this.userSrv.getUser().subscribe({
      next: (user) => this.user = user,
      error: (error) => console.log(error),
    })
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
    if (!cart || !cart.userId) {
      return;
    }
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
