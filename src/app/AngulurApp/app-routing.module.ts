import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from '../Components/Course/course-details/course-details.component';
import { CourseVideoComponent } from '../Components/Course/course-video/course-video.component';
import { HomePageComponent } from '../Components/Home/home-page/home-page.component';
import { CourseAddComponent } from '../Components/Teacher/course-add/course-add.component';
import { TeacherContactComponent } from '../Components/Teacher/Teacher-Page-Cap/teacher-contact/teacher-contact.component';
import { TeacherPageComponent } from '../Components/Teacher/Teacher-Page-Cap/teacher-page/teacher-page.component';
import { TeacherPaymentComponent } from '../Components/Teacher/Teacher-Page-Cap/teacher-payment/teacher-payment.component';
import { TeacherStudentComponent } from '../Components/Teacher/Teacher-Page-Cap/teacher-student/teacher-student.component';
import { ChangePasswordComponent } from '../Components/Users/change-password/change-password.component';
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
  {path:"login/change_password",component:ChangePasswordComponent},
  {path:"user/user_profile",component:UserProfileComponent},
  {path:"user/courses",component:UserCoursesComponent},
  {path:"user/contact",component:UserContactComponent},
  {path:"user/payment",component:UserPaymentComponent},
  {path:"teacher",component:TeacherPageComponent},
  {path:"teacher/contact",component:TeacherContactComponent},
  {path:"teacher/payment",component:TeacherPaymentComponent},
  {path:"teacher/student",component:TeacherStudentComponent},
  {path:"course/course-add",component:CourseAddComponent},
  {path:"course/course-details",component:CourseDetailsComponent},
  {path:"course/course-video",component:CourseVideoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
