import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';
import { OrderRequest } from '../models/order-request';
import { OrderResponse } from '../models/order-response';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  saveOrder(orderRequest: OrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${this.apiUrl}/order`, orderRequest);
  }

  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/order/${orderId}`);
  }

  filterOrdersByUser(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/order/filter_by_user=${userId}`);
  }

  sendEmail(userId: number, orderId: number) {
    this.http.post<any>(`${this.apiUrl}/email/sendOrderEmail/${userId}/${orderId}`, "").subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }
}
