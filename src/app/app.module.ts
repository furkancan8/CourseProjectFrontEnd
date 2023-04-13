import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './AngulurApp/app-routing.module';
import { AppComponent } from './AngulurApp/app.component';
import { AuthInterceptor } from './Components/interceptor/auth.interceptor';
import { HomePageComponent } from './Components/Home/home-page/home-page.component';
import { NaviComponent } from './Components/Navbar-Footer/navi/navi.component';
import { LoginComponent } from './Components/Users/login/login.component';
import { RegisterComponent } from './Components/Users/register/register.component';
import { UserContactComponent } from './Components/Users/user-contact/user-contact.component';
import { AddDirective } from './directive/add.directive';
import { DeleteDirective } from './directive/delete.directive';
import { UpdateDirective } from './directive/update.directive';
import { FooterComponent } from './Components/Navbar-Footer/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserProfileComponent } from './Components/Users/user-profile/user-profile.component';
import { UserCoursesComponent } from './Components/Users/user-courses/user-courses.component';
import { UserPaymentComponent } from './Components/Users/user-payment/user-payment.component';
import { UserMenuComponent } from './Components/Users/user-menu/user-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NaviComponent,
    LoginComponent,
    RegisterComponent,
    UserContactComponent,
    AddDirective,
    DeleteDirective,
    UpdateDirective,
    FooterComponent,
    UserProfileComponent,
    UserCoursesComponent,
    UserPaymentComponent,
    UserMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
