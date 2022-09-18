import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/+store';
import { SignUp, GoogleAuth } from 'src/app/+store/auth/actions';
import { Constants } from "src/app/constants";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent {
  avatars: { value: string; link: string }[] = [
    {
      value: "Man",
      link: "assets/images/avatar-man.png"
    },
    {
      value: "Women",
      link: "assets/images/avatar-women.png"
    }
  ];

  constructor( private store: Store<IAppState>,
    private http: HttpClient,
    private router: Router
    ) {}

  signUp(value) {
    var url = Constants.posts + "signup";

    var payload = new FormData();

    payload.append("username", value["username"]);
    payload.append("password", value["passwordsGroup"]["password"]);
    payload.append("email", value["email"]);
    payload.append("first_name", value["first_name"]);
    payload.append("country", value["country"]);
    payload.append("pic", value["avatar"]);

    console.log(value["passwordsGroup"]["password"], value["country"]);
    
    this.http.post(url, payload).subscribe(resp => {
      if (resp["status"]) {
        window.location.href = "/post/list/" + resp["data"];
      }
      else {
        console.log(resp["data"]["error"]);
      }
    });
  }
}
