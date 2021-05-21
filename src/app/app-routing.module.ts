import { SingnupComponent } from "./layout/singnup/singnup.component";
import { LoginComponent } from "./layout/login/login.component";

import { LandingPageComponent } from "./layout/landing-page/landing-page.component";
import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//guards
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from "@angular/fire/auth-guard";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SingnupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
