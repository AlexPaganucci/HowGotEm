import { Component} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HowGotEm';
  showFiller = false;
  isSmallScreen = false;
  showSearch = false;


  constructor(private breakpointObserver: BreakpointObserver, private modalSrv: ModalService) {}

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
  }

  openSneakersModal(){
    this.modalSrv.openSneakersModal();
  }

  openLoginModal(){
    this.modalSrv.openLoginModal();
  }

  openSignupModal(){
    this.modalSrv.openSignupModal();
  }

}


