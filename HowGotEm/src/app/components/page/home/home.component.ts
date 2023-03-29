import { Component, OnInit } from '@angular/core';
import { Shoe } from 'src/app/models/shoe';
import { ShoeService } from 'src/app/services/shoe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bestSellerShoes: Shoe[] = [];

  constructor(private shoeSrv: ShoeService) { }

  ngOnInit(): void {
    this.shoeSrv.getBestSellerShoes().subscribe((shoes) => this.bestSellerShoes = shoes)
  }
}
