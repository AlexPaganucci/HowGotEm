import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilterSelection } from '../models/filter-selection';
import { Shoe } from '../models/shoe';
import { ShoeDto } from '../models/shoe-dto';

@Injectable({
  providedIn: 'root',
})
export class ShoeService {
  private apiUrl = environment.apiUrl;
  shoesFiltered: Shoe[] = [];

  constructor(private http: HttpClient) {}

  addShoe(shoe: ShoeDto): Observable<Shoe> {
    return this.http.post<Shoe>(`${this.apiUrl}/shoe`, shoe);
  }

  updateShoe(shoeId: number, shoeDto: ShoeDto): Observable<any> {
    return this.http.put<Shoe>(`${this.apiUrl}/shoe/${shoeId}`, shoeDto);
  }

  deleteShoe(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/shoe${id}`);
  }

  getAllShoes(): Observable<Shoe[]> {
    return this.http.get<Shoe[]>(`${this.apiUrl}/shoe`);
  }

  getShoeById(id: number) {
    return this.http.get<Shoe>(`${this.apiUrl}/shoe/${id}`);
  }

  getAllBrands(): Observable<string[]> {
    const url = `${this.apiUrl}/shoe/brands`;
    return this.http.get<string[]>(url);
  }

  getAllSizes(): Observable<string[]> {
    const url = `${this.apiUrl}/shoe/sizes`;
    return this.http.get<string[]>(url);
  }

  filterShoeByPartOfModel(m: string): Observable<Shoe[]> {
    const url = `${this.apiUrl}/shoe/filter_by_part_of_model=${m}`;
    return this.http.get<Shoe[]>(url);
  }

  filterShoeByModel(m: string): Observable<Shoe[]> {
    const url = `${this.apiUrl}/shoe/filter_by_model=${m}`;
    return this.http.get<Shoe[]>(url);
  }

  filterShoeBySkuCode(s: string): Observable<Shoe> {
    const url = `${this.apiUrl}/shoe/filter_by_sku_code=${s}`;
    return this.http.get<Shoe>(url);
  }

  filterShoesByBrands(b: string[]): Observable<Shoe[]> {
    const lowerCaseBrands = b.map((brand) => brand.toLowerCase());
    const url = `${this.apiUrl}/shoe/filter_by_brands=${lowerCaseBrands}`;
    return this.http.get<Shoe[]>(url);
  }

  filterShoesByColor(color: string): Observable<Shoe[]> {
    const lowerCaseColor = color.toLowerCase();
    return this.http.get<Shoe[]>(
      `${this.apiUrl}/shoe/filter_by_color=${lowerCaseColor}`
    );
  }

  // filterShoesBySize(s: number[]): Observable<Shoe[]> {
  //   return this.http.get<Shoe[]>(`${this.apiUrl}/shoe/filter_by_sizes=${s}`);
  // }

  filterShoesBySize(s: number[]): Observable<Shoe[]> {
    const sizes = s.join(',');
    return this.http.get<Shoe[]>(`${this.apiUrl}/shoe/filter_by_sizes=${sizes}`);
  }

  filterShoesByMaxPrice(p: number): Observable<Shoe[]> {
    return this.http.get<Shoe[]>(`${this.apiUrl}/shoe/filter_by_price=${p}`);
  }

  filterShoes(filters: FilterSelection): Observable<Shoe[]> {
    let shoes$: Observable<Shoe[]> = this.getAllShoes();

    if (filters.color !== '') {
      shoes$ = shoes$.pipe(
        switchMap((shoes) => this.filterShoesByColor(filters.color))
      );
    }
    if (filters.brands.length > 0) {
      shoes$ = shoes$.pipe(
        switchMap((shoes) => this.filterShoesByBrands(filters.brands))
      );
    }
    if (filters.sizes.length > 0) {
      shoes$ = shoes$.pipe(
        switchMap((shoes) => this.filterShoesBySize(filters.sizes))
      );
    }
    const maxPrice = filters.maxPrice !== null ? filters.maxPrice : Infinity;
    shoes$ = shoes$.pipe(
      switchMap((shoes) => this.filterShoesByMaxPrice(maxPrice))
    );
    console.log(filters);

    return combineLatest([
      shoes$,
      this.filterShoesByColor(filters.color),
      this.filterShoesByBrands(filters.brands),
      this.filterShoesBySize(filters.sizes),
      this.filterShoesByMaxPrice(maxPrice)
    ]).pipe(
      map(([shoes, filteredByColor, filteredByBrand, filteredBySize, filteredByPrice]) => {
        let filteredShoes = shoes;

        if (filters.color !== '') {
          filteredShoes = filteredByColor;
        }

        if (filters.brands.length > 0) {
          filteredShoes = filteredByBrand;
        }

        if (filters.sizes.length > 0) {
          filteredShoes = filteredBySize;
        }

        if (filters.maxPrice !== null) {
          filteredShoes = filteredByPrice;
        }

        return filteredShoes;
      })
    );
  }
}
