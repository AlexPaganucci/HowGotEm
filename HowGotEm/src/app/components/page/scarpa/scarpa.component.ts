import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scarpa',
  templateUrl: './scarpa.component.html',
  styleUrls: ['./scarpa.component.css']
})
export class ScarpaComponent implements OnInit {

  quantita: number = 1;

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

}
