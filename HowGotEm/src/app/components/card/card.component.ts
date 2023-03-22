import { Component, OnInit, Output } from '@angular/core';
import { Shoe } from 'src/app/models/shoe';
import { ShoeService } from 'src/app/services/shoe.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  shoes: Shoe[] = [];

  constructor(private shoeSrv: ShoeService) { }

  ngOnInit(): void {
    this.shoeSrv.getAllShoes().subscribe((shoes: Shoe[]) => {
      this.shoes = shoes;
    });
  }

}
