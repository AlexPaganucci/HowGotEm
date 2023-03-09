import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private modalSrv: ModalService) { }

  ngOnInit(): void {
  }

  openLoginModal(){
    this.modalSrv.openLoginModal();
  }

  openSignupModal(){
    this.modalSrv.openSignupModal();
  }
}
