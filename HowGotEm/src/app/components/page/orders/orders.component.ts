import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  pathImg = environment.pathImg;
  user!: User;
  orders: Order[] = [];

  constructor(private userSrv: UserService) { }

  ngOnInit(): void {
    this.getShoesByUserOrders();
  }

  getShoesByUserOrders(){
    this.userSrv.getUser().subscribe({
      next: (user) => this.user = user,
      error: (error) => console.error(error),
      complete: () => this.orders = this.user.orders,
    });
  }

}
