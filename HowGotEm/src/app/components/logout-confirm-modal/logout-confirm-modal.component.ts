import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-logout-confirm-modal',
  templateUrl: './logout-confirm-modal.component.html',
  styleUrls: ['./logout-confirm-modal.component.css']
})
export class LogoutConfirmModalComponent implements OnInit {

  constructor(private authSrv: AuthService, private modalSrv: ModalService) { }

  ngOnInit(): void {
  }

  confirmLogout(){
    this.authSrv.logout();
    // window.location.reload();
    this.modalSrv.showNotification("Logout effettuato con successo");
  }

}
