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

  constructor(private authService: AuthService,
    private authServicePerson: AuthServicePerson) {}

  get isAuth() {
    let sesId = localStorage.getItem("socialSessionId");
    if (sesId != null) {
      return true; //this.authServicePerson.isLoggedIn;
    }
      
  }

  get currentUser() {
    return this.authServicePerson.userData;
  }

  signOut() {
    this.authServicePerson.signOut()
    window.location.href = "home";
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }
}
