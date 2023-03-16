import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  data = [
    {nome:"dunk-low", brand:"nike"},
    {nome:"jordan1", brand:"nike"},
    {nome:"550", brand:"new-balance"},
    {nome:"dunk-low", brand:"nike"},
    {nome:"jordan1", brand:"nike"},
    {nome:"550", brand:"new-balance"},
    {nome:"dunk-low", brand:"nike"},
    {nome:"jordan1", brand:"nike"},
    {nome:"550", brand:"new-balance"},
    {nome:"dunk-low", brand:"nike"},
    {nome:"jordan1", brand:"nike"},
    {nome:"550", brand:"new-balance"},
    {nome:"dunk-low", brand:"nike"},
    {nome:"jordan1", brand:"nike"},
    {nome:"550", brand:"new-balance"},
    {nome:"dunk-low", brand:"nike"},
    {nome:"jordan1", brand:"nike"},
    {nome:"550", brand:"new-balance"},
    {nome:"dunk-low", brand:"nike"},
    {nome:"jordan1", brand:"nike"},
    {nome:"550", brand:"new-balance"},
    {nome:"dunk-low", brand:"nike"},
    {nome:"jordan1", brand:"nike"},
    {nome:"550", brand:"new-balance"}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
