import { Component, OnInit } from '@angular/core';
import { Order, OrderShoe } from 'src/app/models/order';
import { Shoe } from 'src/app/models/shoe';
import { User } from 'src/app/models/user';
import { ShoeService } from 'src/app/services/shoe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  user!: User;
  order: Order[] = [];
  shoesOrdered: Shoe[] = [];

  constructor(private userSrv: UserService, private shoeSrv: ShoeService) { }

  ngOnInit(): void {
    this.getShoesByUserOrders();
  }

  getShoesByUserOrders(){
    this.userSrv.getUser().subscribe({
      next: (user) => this.user = user,
      error: (error) => console.error(error),
      complete: () => {
        this.order = this.user.orders;
        this.order.forEach((order) => {
          let shoes = order.shoes;
          shoes.forEach((shoeOrdered) => {
            this.getShoeById(shoeOrdered.id)
          })
        });
      },
    });
  }

  getShoeById(shoeId: number) {
    this.shoeSrv.getShoeById(shoeId).subscribe({
      next: (shoe) => this.shoesOrdered.push(shoe),
      error: (error) => console.log(error)
    })
  }

}
