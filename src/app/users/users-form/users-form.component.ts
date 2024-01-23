import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ResponseModel } from 'src/app/_interfaces/response-model';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-clients-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {

  content?: ResponseModel;
  userForm: FormGroup;
  userControl = new FormControl();
  isSubmitted: boolean = false;
  toastrConfig = { timeOut: 3000 };
  userList: any[] = [];
  userId: string = '';
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: UserService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      name: ['', Validators.required],
      userControl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getParamsData();
    this.userControl.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((value) => this.authService.getUsers())
      )
      .subscribe((users: any) => {
        console.log(users);
        this.userList = users.filter(
          (user: any) =>
            !this.userControl.value ||
            user?.userName.toLowerCase().includes(this.userControl.value.toLowerCase())
        );
      });
  }

  getParamsData() {
    this.activeRoute.paramMap.subscribe((data: Params) => {
      this.userId = data.params['id'];
      if (this.userId) {
        this.getOgranization(data.params['id']);
        this.isEdit = this.router.url.includes('edit');
      }
    });
  }

  getOgranization(id: string) {
    this.apiService.getIndividualOrganization(id).subscribe((data) => {
      this.content = data;
      this.userForm.patchValue(data);
      if (!this.isEdit) {
        this.userForm.disable();
      }
    },
      (err) => {
        this.toastrService.error(err.error.message, 'Failed');
      });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.userForm.valid) {
     this.isEdit ? this.updateOrganization() : this.createOrganization();
    }
  }

  updateOrganization() {
    const client = this.userForm.value;
    this.apiService.updateOrganization(client).subscribe(
      (data) => {
        this.content = data;
        this.handleClientCreation();
      },
      (err) => {
        this.toastrService.error(err.error.message, 'Failed');
      }
    );
  }

  createOrganization() {
    const client = this.userForm.value;
    this.apiService.createOrganization(client).subscribe(
      (data) => {
        this.content = data;
        this.handleClientCreation();
      },
      (err) => {
        this.toastrService.error(err.error.message, 'Failed');
      }
    );
  }

  selectUser(user: any) {
    this.userForm.value.users = [user.userName];
    this.userForm.value;
    this.userControl.setValue(user?.userName);
  }

  handleClientCreation() {
    const isSuccess = this.content?.status;
    const message = this.content?.message;

    if (isSuccess) {
      this.toastrService.success(message, 'Success', this.toastrConfig);
      this.userForm.reset();
      this.userControl.reset();
      this.router.navigate(['/organization/list']);
    } else {
      this.toastrService.error(message, 'Failed', this.toastrConfig);
    }
  }

}
