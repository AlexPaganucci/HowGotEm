import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  carouselItems = [
    '../../../assets/img/dunkCarousel.jpg',
    '../../../assets/img/jordanCarousel.jpg',
    '../../../assets/img/newBalanceCarousel.png'
  ];
  currentElementIndex = 0;

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.currentElementIndex = (this.currentElementIndex + 1) % this.carouselItems.length;
    }, 5000);
  }

  onNextClick(): void {
    this.currentElementIndex = (this.currentElementIndex + 1) % this.carouselItems.length;
  }

  onPrevClick(): void {
    this.currentElementIndex = (this.currentElementIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
  }

}
