import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-sneakers',
  templateUrl: './sneakers.component.html',
  styleUrls: ['./sneakers.component.css']
})
export class SneakersComponent implements OnInit {

  // FILTER
  // BRAND
  filter: boolean = true;
  // SELECT E CHIP
  availableSizes = [41, 42, 43, 44];
  sizes: string[] = [];
  // SLIDER
  sliderValue: number = 0;
  // COLOR
  colors: string[] = ['red', 'blue', 'green', 'yellow', 'black']; // l'array di colori predefiniti


  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe(result => {
      if (result.matches) {
        // Schermo piccolo, nascondi i filtri
        this.filter = false;
      } else {
        // Schermo grande, mostra i filtri
        this.filter = true;
      }
    });
  }

  ngOnInit(): void {
  }

  addSize(size: string) {
    if (!this.sizes.includes(size)) {
      this.sizes.push(size);
    }
  }

  removeSize(size: string) {
    const index = this.sizes.indexOf(size);
    if (index >= 0) {
      this.sizes.splice(index, 1);
    }
  }

}
