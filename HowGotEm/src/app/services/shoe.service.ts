import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Shoe } from '../models/shoe';
import { ShoeDto } from '../models/shoe-dto';

@Injectable({
  providedIn: 'root'
})
export class ShoeService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addShoe(shoe: ShoeDto): Observable<Shoe> {
    return this.http.post<Shoe>(`${this.apiUrl}/shoe`, shoe);
  }

  deleteShoe(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/shoe${id}`);
  }

  getAllShoes(): Observable<Shoe[]> {
    return this.http.get<Shoe[]>(`${this.apiUrl}/shoe`);
  }

  getShoeById(id: number){
    return this.http.get<Shoe>(`${this.apiUrl}/shoe/${id}`)
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

  filterShoeByBrand(b: string): Observable<Shoe[]> {
    const url = `${this.apiUrl}/shoe/filter_by_brand=${b}`;
    return this.http.get<Shoe[]>(url);
  }

  filterShoesByColor(c: string): Observable<Shoe[]> {
    return this.http.get<Shoe[]>(`${this.apiUrl}/shoe/filter_by_color=${c}`);
  }

  filterShoesBySize(s: number): Observable<Shoe[]> {
    return this.http.get<Shoe[]>(`${this.apiUrl}/shoe/filter_by_size=${s}`);
  }

  filterShoesByMaxPrice(p: number): Observable<Shoe[]> {
    return this.http.get<Shoe[]>(`${this.apiUrl}/shoe/filter_by_price=${p}`);
  }
}
