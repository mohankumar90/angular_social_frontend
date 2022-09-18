import { HttpClient, HttpHeaderResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { IAppState } from "src/app/+store";
import { GoogleAuth, SignIn } from "src/app/+store/auth/actions";
import { Constants } from "src/app/constants";
import { HttpHeaders } from "@angular/common/http";
import { Action } from "rxjs/internal/scheduler/Action";
import { Router } from "@angular/router";
import { windowWhen } from "rxjs/operators";
import { AuthServicePerson } from "../services/auth.service_person";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent {
  constructor(
    private authServ: AuthServicePerson,
    private http: HttpClient,
    private router: Router) {}

  wrongAlert: boolean = false;

  signIn(value) {
    var url = Constants.posts + "login";

    var formData: any = new FormData();
    formData.append('un', value['username']);
    formData.append('pw', value['password']);

    this.http.post(url, formData).subscribe(resp => {
      if (resp['status']) {
        this.authServ.initializeAuthUser(resp["data"], value['username']);
        window.location.href="/post/list/" + resp["data"]["userid"];
      } else {
        this.wrongAlert = true;
      }
    });
  }

  checkForWrongAlert() {
    return this.wrongAlert;
  }
}
