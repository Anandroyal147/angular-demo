import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { DataService } from './_services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private role: string = '';
  isLoggedIn = false;
  isAdmin = false;
  showModeratorBoard = false;
  username?: string;

  constructor(
    private tokenStorageService: TokenStorageService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.checkLoggedIn();
    this.dataService.loggedInStatus$.subscribe((data) => {
      if (data && Object.keys(data).length !== 0) {
        this.isLoggedIn = data;
        this.role = data?.role

        this.isAdmin = data.role === 'Admin';
        this.showModeratorBoard = this.role === 'User';
        this.username = data.userName;
      }
    });
  }

  private checkLoggedIn() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.role = user.role;
      
      this.isAdmin = this.role === 'Admin';
      this.showModeratorBoard = this.role === 'User';
      this.username = user.userName;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
