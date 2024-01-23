import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  clients!: any[];
  
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.authService.getUsers().subscribe(
      (data) => {
        this.clients = data
        console.log('clients---->',this.clients);
      },
      (err) => {
        this.toastrService.error(err.error.message, 'Failed');
      }
    );
  }

  
}
