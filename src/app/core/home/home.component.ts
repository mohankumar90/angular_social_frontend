import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/services/auth.service";
import { Router } from "@angular/router";
import { AuthServicePerson } from "src/app/auth/services/auth.service_person";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthServicePerson) {}
  ngOnInit() {
    if (this.authService.isLoggedIn) {
      // this.router.navigate(["post", "list", this.authService._personData.id]);
      window.location.href="/post/list/" + this.authService._personData.id;
    }
  }

  checkLoggedIn() {
    return !this.authService.isLoggedIn;
  }
}
