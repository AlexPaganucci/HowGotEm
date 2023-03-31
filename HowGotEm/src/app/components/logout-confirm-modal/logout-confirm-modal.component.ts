import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-logout-confirm-modal',
  templateUrl: './logout-confirm-modal.component.html',
  styleUrls: ['./logout-confirm-modal.component.css']
})
export class LogoutConfirmModalComponent implements OnInit {

  constructor(private authSrv: AuthService, private modalSrv: ModalService, private router: Router) { }

  ngOnInit(): void {
  }

  confirmLogout(){
    this.authSrv.logout();
    this.router.navigateByUrl("");
    this.modalSrv.showNotification("Logout effettuato con successo");
  }

}
