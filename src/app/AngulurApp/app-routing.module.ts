import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../Components/Home/home-page/home-page.component';
import { LoginComponent } from '../Components/Users/login/login.component';
import { RegisterComponent } from '../Components/Users/register/register.component';
import { UserContactComponent } from '../Components/Users/user-contact/user-contact.component';
import { UserCoursesComponent } from '../Components/Users/user-courses/user-courses.component';
import { UserPaymentComponent } from '../Components/Users/user-payment/user-payment.component';
import { UserProfileComponent } from '../Components/Users/user-profile/user-profile.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:HomePageComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"user/user_profile",component:UserProfileComponent},
  {path:"user/courses",component:UserCoursesComponent},
  {path:"user/contact",component:UserContactComponent},
  {path:"user/payment",component:UserPaymentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
