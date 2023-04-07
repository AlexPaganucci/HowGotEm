import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, map } from 'rxjs';
import { Token } from 'src/app/models/token';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isAuthenticated: boolean = false;

  constructor(private modalSrv: ModalService, private userSrv: UserService, private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.checkAuthentication();
  }

  openLoginModal(){
    this.modalSrv.openLoginModal();
  }

  openSignupModal(){
    this.modalSrv.openSignupModal();
  }

  checkAuthentication(): void {
    this.authSrv.auth$.subscribe(
      (token: Token | null) => {
        this.isAuthenticated = !!token;
      }
    );
  }

  openProfile(){
    if(this.isAuthenticated){
      this.router.navigate(['/profilo']);
    } else {
      this.openLoginModal();
    }
  }

  openOrders(){
    if(this.isAuthenticated){
      this.router.navigate(['/orders']);
    } else {
      this.openLoginModal();
    }
  }

  openSettings(){
    if(this.isAuthenticated){
      this.router.navigate(['/impostazioni']);
    } else {
      this.openLoginModal();
    }
  }
}
