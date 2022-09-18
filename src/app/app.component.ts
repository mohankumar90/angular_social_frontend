import { Component } from "@angular/core";
import { AuthService } from "./auth/services/auth.service";
import { Store } from "@ngrx/store";
import { IAppState } from "./+store";
import { InitializeUser } from "./+store/auth/actions";
import { AuthServicePerson } from "./auth/services/auth.service_person";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  get isReady(): boolean {
    return this.authService.userData !== undefined;
  }
  constructor(private authService: AuthServicePerson) {
    
  }
}
