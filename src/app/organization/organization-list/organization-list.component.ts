import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})
export class OrganizationListComponent implements OnInit {

  organizations:any[] = []

  constructor(
    private userService: UserService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.userService.getOrganizations().subscribe(
      (data) => {
        this.organizations = data.data
        console.log('organizations---->',this.organizations);
      },
      (err) => {
        this.toastrService.error(err.error.message, 'Failed');
      }
    );
  }

}
