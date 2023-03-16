import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scarpa',
  templateUrl: './scarpa.component.html',
  styleUrls: ['./scarpa.component.css']
})
export class ScarpaComponent implements OnInit {
  //QUANTITà
  quantita: number = 1;
  //IMMAGINI
  img1="../../../../assets/img/dunk.jpg";
  img2="../../../../assets/img/logo.svg";
  img3="../../../../assets/img/NewBalanceCarousel.png";
  img4="../../../../assets/img/dunkCarousel.jpg";

  immaginePrincipale: string = this.img1;

  constructor() { }

  ngOnInit(): void {
  }

  aumentaQuantita(){
    this.quantita++;
    console.log(this.quantita);
  }

  diminuisciQuantita(){
    if(this.quantita>1){
      this.quantita--;
      console.log(this.quantita);
    }
  }

  selezionaImmagine(immagine: string) {
    if (immagine !== this.immaginePrincipale) {
      // Salva l'immagine principale nella variabile temp
      const temp = this.immaginePrincipale;
      // Assegna all'immagine principale l'immagine selezionata
      this.immaginePrincipale = immagine;
      // Assegna all'immagine selezionata l'immagine principale salvata nella variabile temp
      switch (immagine) {
        case this.img1:
          this.img1 = temp;
          break;
        case this.img2:
          this.img2 = temp;
          break;
        case this.img3:
          this.img3 = temp;
          break;
        case this.img4:
          this.img4 = temp;
          break;
      }
    }
  }

}
