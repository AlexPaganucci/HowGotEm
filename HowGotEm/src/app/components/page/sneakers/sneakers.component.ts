import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Shoe } from 'src/app/models/shoe';
import { FilterSelection } from 'src/app/models/filter-selection';
import { ShoeService } from 'src/app/services/shoe.service';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sneakers',
  templateUrl: './sneakers.component.html',
  styleUrls: ['./sneakers.component.css']
})
export class SneakersComponent implements OnInit {

  // filterParam: string = "";
  // filterSubscription: Subscription = new Subscription;
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
  //PAGINATOR
  pageSize: number = 20;
  pageIndex: number = 0;



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

  ngOnInit(): void {
    this.getAllBrands();
    this.getAllSizes();
    const filterParam = this.route.snapshot.paramMap.get('filter');
    if (filterParam) {
      // Se il parametro "q" è presente, effettua la ricerca filtrata per "partOfModel"
      this.shoeSrv.filterShoeByPartOfModel(filterParam).subscribe((shoes) => this.shoesFiltered = shoes);
    } else {
      // Altrimenti, ottieni tutte le scarpe
      this.shoeSrv.getAllShoes().subscribe((shoes) => this.shoesFiltered = shoes);
    }
  }

  // ngDoCheck(): void {
  //   const newFilterParam = this.route.snapshot.queryParamMap.get('filter');
  //   if (newFilterParam !== this.filterParam) {
  //     this.shoeSrv.filterShoeByPartOfModel(newFilterParam).subscribe((shoes) => this.shoesFiltered = shoes);
  //   }
  // }

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
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.shoesFiltered = this.shoesFiltered.slice(startIndex, endIndex + 1); // Aggiunge 1 all'indice di pagina
    console.log(this.shoesFiltered); // Verifica se l'array shoes è stato correttamente aggiornato dopo la modifica di pagina
  }

  // ngOnDestroy(): void {
  //   this.filterSubscription.unsubscribe();
  // }
}
