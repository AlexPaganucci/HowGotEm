import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Shoe } from 'src/app/models/shoe';
import { FilterSelection } from 'src/app/models/filter-selection';
import { ShoeService } from 'src/app/services/shoe.service';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sneakers',
  templateUrl: './sneakers.component.html',
  styleUrls: ['./sneakers.component.css']
})
export class SneakersComponent implements OnInit {

  shoeBySkuCode: Shoe|undefined;
  shoesFiltered: Shoe[] = [];
  displayShoes: Shoe[] = [];
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
  //PAGINATOR
  showFirstLastButtons= true;



  constructor(private shoeSrv: ShoeService, private breakpointObserver: BreakpointObserver, private route: ActivatedRoute) {
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

  // ngOnInit(): void {
  //   this.getAllBrands();
  //   this.getAllSizes();

  //   this.route.paramMap.subscribe(params => {
  //     const filterParam = params.get('filter');
  //     if (filterParam) {
  //       this.shoeSrv.filterShoeByPartOfModel(filterParam).subscribe((shoes) => {
  //         this.shoesFiltered = shoes;
  //         this.displayShoes = this.shoesFiltered.slice(0, 20);
  //       });
  //     } else {
  //       this.shoeSrv.getAllShoes().subscribe((shoes) => {
  //         this.shoesFiltered = shoes;
  //         this.displayShoes = this.shoesFiltered.slice(0, 20);
  //       });
  //     }
  //   });
  // }

  ngOnInit(): void {
    this.getAllBrands();
    this.getAllSizes();

    this.route.paramMap.subscribe(params => {
      const filterParam = params.get('filter');
      if (filterParam) {
        this.shoeSrv.filterShoeBySkuCode(filterParam).subscribe((shoe) => {
          this.shoeBySkuCode = shoe;
          this.displayShoes.push(this.shoeBySkuCode);
          if(!this.shoeBySkuCode){
            this.shoeSrv.filterShoeByPartOfModel(filterParam).subscribe((shoes) => {
              this.shoesFiltered = shoes;
              this.displayShoes = this.shoesFiltered.slice(0, 20);
            })
          }
        });
      } else {
        this.shoeSrv.getAllShoes().subscribe((shoes) => {
          this.shoesFiltered = shoes;
          this.displayShoes = this.shoesFiltered.slice(0, 20);
        });
      }
    });
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
      complete: () => this.displayShoes = this.shoesFiltered.slice(0, 20)
    })
  }

  onPageChange(event: PageEvent) {
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.displayShoes = this.shoesFiltered.slice(startIndex, endIndex);
    console.log(this.displayShoes);
  }

}
