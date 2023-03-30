import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css'],
})
export class ProfiloComponent implements OnInit {
  user!: User;

  constructor(private userSrv: UserService) {}

  ngOnInit(): void {
    this.userSrv.getUser().subscribe({
      next: (user) => this.user = user,
      error: (error) => console.error(error),
      complete: () => console.log('complete'),
    });
  }
}
