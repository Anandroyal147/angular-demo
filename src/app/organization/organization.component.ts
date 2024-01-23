import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ResponseModel } from '../_interfaces/response-model';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, switchMap } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
})
export class OrganizationComponent implements OnInit {
  ngOnInit(): void {
    
  }
 
}
