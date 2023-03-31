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
import { UserInfoComponent } from './Components/Users/user-info/user-info.component';
import { UserContactComponent } from './Components/Users/user-contact/user-contact.component';
import { MyCoursesComponent } from './Components/Users/my-courses/my-courses.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NaviComponent,
    LoginComponent,
    RegisterComponent,
    UserInfoComponent,
    UserContactComponent,
    MyCoursesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
