import { Injectable } from "@angular/core";
import { IUser } from "../../shared/interfaces/user";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { map } from "rxjs/operators";
import {
  SendVerificationMail,
  InitializeUser,
  SignOut,
  AuthLoginWithProvider
} from "src/app/+store/auth/actions";
import { Store } from "@ngrx/store";
import { IAppState, getUserInfoSelector } from "src/app/+store";
import { IPerson } from "src/app/shared/interfaces/person";

@Injectable({
  providedIn: "root"
})
export class AuthServicePerson {
  _personData: IPerson = {"id": "0", "username": "null", "first_name": "", "email": "", "pic":""};
  _loggedIn: boolean = false;
  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
  ) {
  }

  initializeAuthUser(person, username) {
    this._personData.id = person.personId;
    this._personData.username = username;
    this._personData.first_name = person.first_name;
    this._personData.email = person.email;
    this._personData.pic = person.pic;

    this._loggedIn = true;

    console.log("username, ", username);
  }

  get isLoggedIn(): boolean {
    return this._loggedIn;
  }

  // Returns data for logged user
  userData(): IPerson {
    return this._personData;
  }

  // Sign out
  signOut() {
    this._personData = {"id": "", "username": "", "first_name": "", "email": "", "pic":""};
    this._loggedIn = false;
    localStorage.clear();
  }

}
