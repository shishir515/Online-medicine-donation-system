import { ViewmedicineComponent } from "./layout/user/viewmedicine/viewmedicine.component";
import { UserpageComponent } from "./layout/user/userpage/userpage.component";
import { AddNGOComponent } from "./layout/dashboard/add-ngo/add-ngo.component";
import { ViewuserComponent } from "./layout/dashboard/viewuser/viewuser.component";
import { MainComponent } from "./layout/main/main.component";
import { ViewstockComponent } from "./layout/dashboard/viewstock/viewstock.component";
import { SingnupComponent } from "./layout/singnup/singnup.component";
import { LoginComponent } from "./layout/login/login.component";

import { DashboardComponent } from "./layout/dashboard/dashboard.component";
import { LandingPageComponent } from "./layout/landing-page/landing-page.component";
import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ViewRequestComponent } from "./layout/dashboard/view-request/view-request.component";
import { AddmedicineComponent } from "./layout/user/addmedicine/addmedicine.component";

//guards
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from "@angular/fire/auth-guard";
import { RequestmedicineComponent } from "./layout/user/requestmedicine/requestmedicine.component";
import { MedicineRequestsComponent } from "./layout/dashboard/medicine-requests/medicine-requests.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SingnupComponent },
  {
    path: "user",
    component: UserpageComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  // tslint:disable-next-line: max-line-length
  {
    path: "add",
    component: AddmedicineComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: "request-med",
    component: RequestmedicineComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  // tslint:disable-next-line: max-line-length
  {
    path: "viewall",
    component: ViewmedicineComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      {
        path: "",
        redirectTo: "main",
        pathMatch: "full",
      },
      { path: "main", component: MainComponent },
      { path: "stock", component: ViewstockComponent },
      { path: "user", component: ViewuserComponent },
      { path: "request", component: ViewRequestComponent },
      { path: "medicine-requests", component: MedicineRequestsComponent },
      { path: "ngo", component: AddNGOComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
