import { MedicineService } from './shared/medicine.service';

import { ViewuserComponent } from './layout/dashboard/viewuser/viewuser.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LandingPageComponent } from './layout/landing-page/landing-page.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { LoginComponent } from './layout/login/login.component';
import { SingnupComponent } from './layout/singnup/singnup.component';
import { ViewstockComponent } from './layout/dashboard/viewstock/viewstock.component';
import { MainComponent } from './layout/main/main.component';
import { AddNGOComponent } from './layout/dashboard/add-ngo/add-ngo.component';
import { ViewRequestComponent } from './layout/dashboard/view-request/view-request.component';
import { UserpageComponent } from './layout/user/userpage/userpage.component';
import { AddmedicineComponent } from './layout/user/addmedicine/addmedicine.component';
import { ViewmedicineComponent } from './layout/user/viewmedicine/viewmedicine.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';


// firebase and angularfire2
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../environments/environment';
import { AuthService } from './shared/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { NgoService } from './layout/dashboard/add-ngo/ngo.service';
import { RequestMedicineComponent } from './layout/dashboard/request-medicine/request-medicine.component';


//ng2-search-filter
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { DropdownDirective } from './shared/dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    DashboardComponent,
    AddmedicineComponent,
    LoginComponent,
    SingnupComponent,
    ViewstockComponent,
    MainComponent,
    AddNGOComponent,
    ViewRequestComponent,
    ViewuserComponent,
    UserpageComponent,
    AddmedicineComponent,
    ViewmedicineComponent,
    RequestMedicineComponent,
    DropdownDirective

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    ToastrModule.forRoot(),
    Ng2SearchPipeModule,
    NgxPaginationModule,
    FilterPipeModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: ''},
    MedicineService,
    AuthService,
    NgoService,
    AngularFireAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
