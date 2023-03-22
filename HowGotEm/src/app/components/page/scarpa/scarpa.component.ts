import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Shoe, Size } from 'src/app/models/shoe';
import { CartService } from 'src/app/services/cart.service';
import { ShoeService } from 'src/app/services/shoe.service';

@Component({
  selector: 'app-scarpa',
  templateUrl: './scarpa.component.html',
  styleUrls: ['./scarpa.component.css']
})
export class ScarpaComponent implements OnInit {

  //SCARPA CON ID GIUSTO
  shoe!: Shoe;
  //SIZE
  sizeNumber!: number;
  selectedSize!: Size;
  //QUANTITà
  quantita: number = 1;
  //IMMAGINI
  img1="../../../../assets/img/dunk.jpg";
  img2="../../../../assets/img/logo.svg";
  img3="../../../../assets/img/NewBalanceCarousel.png";
  img4="../../../../assets/img/dunkCarousel.jpg";

  immaginePrincipale: string = this.img1;

  constructor(private shoeSrv: ShoeService, private cartSrv: CartService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.shoeSrv.getShoeById(id).subscribe({
      next: (shoe) => this.shoe = shoe,
      error: (error) => console.log(error),
      complete: () => console.log("ok")
    })
  }

  onSizeChange() {
    this.selectedSize = this.shoe.sizes.find(size => size.size === Number(this.sizeNumber))!;
    console.log(this.selectedSize);
    console.log(this.sizeNumber);
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

  addToCart(){
    this.cartSrv.addToCart(this.shoe, this.selectedSize);
  }
}
