import { Component, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../../auth/services/auth.service";
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/+store';
import { SignOut } from 'src/app/+store/auth/actions';
import { AuthServicePerson } from "src/app/auth/services/auth.service_person";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private authService: AuthServicePerson) {}

  get isAuth() {
    return this.authService.isLoggedIn;
  }

  get currentUser() {
    return this.authService.userData;
  }

  signOut() {
    this.authService.signOut()
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }
}
