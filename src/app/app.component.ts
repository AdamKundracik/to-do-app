import { Component } from '@angular/core';
import {AuthService} from "./shared/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'to-do-app';

  public isLoggedIn: boolean = false;

  constructor(
    public readonly authService: AuthService
  ) {
    if (this.authService.getToken()) {
      this.isLoggedIn = !this.isLoggedIn;
    }
  }

  public logoutUser(): void {
    this.authService.logoutUser();
  }
}
