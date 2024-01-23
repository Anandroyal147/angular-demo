import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseModel } from 'src/app/_interfaces/response-model';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.css'],
})
export class OrganizationFormComponent implements OnInit {
  content?: ResponseModel;
  organizationForm: FormGroup;
  userControls = new FormControl();
  isSubmitted: boolean = false;
  selectedUsers: string[] = [];
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
    private activeRoute: ActivatedRoute
  ) {
    this.organizationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      name: ['', Validators.required],
      users: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getParamsData();
    this.authService.getUsers().subscribe((users: any) => {
      console.log(users);
      this.userList = users;
    });
  }

  getParamsData() {
    this.activeRoute.paramMap.subscribe((data: Params) => {
      this.userId = data.params['id'];
      if (this.userId) {
        this.getOrganization(data.params['id']);
        this.isEdit = this.router.url.includes('edit');
      }
    });
  }

  getOrganization(id: string) {
    this.apiService.getIndividualOrganization(id).subscribe(
      (data) => {
        this.content = data;
        this.organizationForm.patchValue(data);
        if (!this.isEdit) {
          this.organizationForm.disable();
        }
      },
      (err) => {
        this.toastrService.error(err.error.message, 'Failed');
      }
    );
  }

  setUserCtrlValue(event: any) {
    this.selectedUsers = event.map((user: any) => user.id);
    this.organizationForm.get('users')?.setValue(this.selectedUsers);
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.organizationForm.value, this.selectedUsers);
    if (this.organizationForm.valid) {
      this.isEdit ? this.updateOrganization() : this.createOrganization();
    }
  }

  updateOrganization() {
    const client = this.organizationForm.value;
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
    const client = this.organizationForm.value;
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


  handleClientCreation() {
    const isSuccess = this.content?.status;
    const message = this.content?.message;

    if (isSuccess) {
      this.toastrService.success(message, 'Success', this.toastrConfig);
      this.organizationForm.reset();
      this.userControls.reset();
      this.router.navigate(['/organization/list']);
    } else {
      this.toastrService.error(message, 'Failed', this.toastrConfig);
    }
  }

}
