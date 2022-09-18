import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MaterialModule } from "./material/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FirebaseModule } from "./firebase/firebase.module";
import { SharedModule } from "./shared/shared.module";
import { AuthModule } from "./auth/auth.module";
import { CoreModule } from "./core/core.module";

import { StoreModule } from "@ngrx/store";
import { reducers } from "./+store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { UserEffects } from "./+store/users/effects";
import { PostEffects } from "./+store/posts/effects";
import { AuthEffects } from "./+store/auth/effects";
import { HttpClient, HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserModule,
    FlexLayoutModule,
    MaterialModule,
    FirebaseModule,
    CoreModule,
    SharedModule,
    AuthModule,
    EffectsModule.forRoot([AuthEffects, UserEffects, PostEffects]),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({}),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
