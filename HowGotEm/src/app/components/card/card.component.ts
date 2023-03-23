import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { Shoe } from 'src/app/models/shoe';
import { AuthService } from 'src/app/services/auth.service';
import { ShoeService } from 'src/app/services/shoe.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, DoCheck {

  isAdmin: boolean = false;
  shoes: Shoe[] = [];

  constructor(private shoeSrv: ShoeService, private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.shoeSrv.getAllShoes().subscribe((shoes: Shoe[]) => {
      this.shoes = shoes;
    });
    this.isAdminCheck();
  }

  ngDoCheck() {
    this.isAdminCheck();
  }

  isAdminCheck(){
    const user = this.authSrv.getUser(); // Recupera i dati dell'utente dal sessionStorage
    if (user && user.roles.includes('ADMIN')) { // Controlla se l'utente ha il ruolo di amministratore
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  goToAdminPage(shoeId: number){
    this.shoeSrv.getShoeById(shoeId).subscribe(shoe => {
      this.router.navigate(["/admin", shoeId]);
    });
  }
}
