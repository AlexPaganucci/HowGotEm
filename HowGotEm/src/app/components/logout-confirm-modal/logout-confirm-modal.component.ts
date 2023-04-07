import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ModalService } from 'src/app/services/modal.service';
import { Cart } from 'src/app/models/cart';

@Component({
  selector: 'app-logout-confirm-modal',
  templateUrl: './logout-confirm-modal.component.html',
  styleUrls: ['./logout-confirm-modal.component.css']
})
export class LogoutConfirmModalComponent implements OnInit {

  constructor(private authSrv: AuthService, private modalSrv: ModalService, private cartSrv: CartService, private router: Router) { }

  ngOnInit(): void {
  }

  confirmLogout(){
    this.authSrv.logout();
    this.router.navigateByUrl("");
    let cart: Cart = {
      userId: '',
      shoes: [],
      totalPrice: 0,
      speditionPrice: 0
    };
    this.cartSrv.cartSubject.next(cart);
    this.modalSrv.showNotification("Logout effettuato con successo");
  }

}
