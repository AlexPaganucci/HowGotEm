import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';
import { OrderRequest } from '../models/order-request';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  saveOrder(orderRequest: OrderRequest): Observable<Order> {
    return this.http.post<Order>(`http://${this.apiUrl}/order`, orderRequest);
  }

  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`http://${this.apiUrl}/order/${orderId}`);
  }

  filterOrdersByUser(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`http://${this.apiUrl}/order/filter_by_user=${userId}`);
  }
}
