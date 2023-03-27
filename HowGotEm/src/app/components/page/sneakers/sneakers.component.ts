import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Shoe } from 'src/app/models/shoe';
import { FilterSelection } from 'src/app/models/filter-selection';
import { ShoeService } from 'src/app/services/shoe.service';

@Component({
  selector: 'app-sneakers',
  templateUrl: './sneakers.component.html',
  styleUrls: ['./sneakers.component.css']
})
export class SneakersComponent implements OnInit {

  shoesFiltered: Shoe[] = [];
  // FILTER
  filter: boolean = true;
  selectedFilters: FilterSelection = {
    color: "",
    brands: [],
    sizes: [],
    maxPrice: null
  };
  // BRAND
  stringBrand: string[] = [];
  // SELECT E CHIP
  availableSizes: string[] = [];
  // COLOR
  colors: string[] = [ "Nero", "Bianco", "Rosso", "Blu", "Verde", "Giallo" ];



  constructor(private shoeSrv: ShoeService, private breakpointObserver: BreakpointObserver) {
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
    this.getAllBrands();
    this.getAllSizes();
    this.shoeSrv.getAllShoes().subscribe((shoes) => this.shoesFiltered = shoes);
  }

  getAllBrands(){
    this.shoeSrv.getAllBrands().subscribe((brand) => {
      this.stringBrand = brand;
    })
  }

  getAllSizes(){
    this.shoeSrv.getAllSizes().subscribe((size) => {
      this.availableSizes = size;
    })
  }

  addBrand(brand: string) {
    if(brand && !this.selectedFilters.brands.includes(brand)){
      this.selectedFilters.brands.push(brand);
    }
  }

  removeBrand(brand: string){
    const index = this.selectedFilters.brands.indexOf(brand);
    if(index >= 0) {
      this.selectedFilters.brands.splice(index, 1);
    }
  }

  addSize(size: string) {
    const sizeFloat = parseFloat(size);
    if (!isNaN(sizeFloat) && !this.selectedFilters.sizes.includes(sizeFloat)) {
      this.selectedFilters.sizes.push(sizeFloat);
    }
  }

  removeSize(size: number) {
    const index = this.selectedFilters.sizes.indexOf(size);
    if (index >= 0) {
      this.selectedFilters.sizes.splice(index, 1);
    }
  }

  filterShoes(selectedFilters: FilterSelection){
    this.shoeSrv.filterShoes(selectedFilters).subscribe({
      next: (shoes) => this.shoesFiltered = shoes,
      error: (error) => console.log(error),
      complete: () => console.log("complete filter")
    })
    console.log(selectedFilters);
  }
}
