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
import { ChangePasswordComponent } from './Components/Users/change-password/change-password.component';
import { TeacherPageComponent } from './Components/Teacher/Teacher-Page-Cap/teacher-page/teacher-page.component';
import { CourseAddComponent } from './Components/Teacher/course-add/course-add.component';
import { CourseUpdateComponent } from './Components/Teacher/course-update/course-update.component';
import { SideBarComponent } from './Components/Teacher/Teacher-Page-Cap/side-bar/side-bar.component';
import { TeacherPaymentComponent } from './Components/Teacher/Teacher-Page-Cap/teacher-payment/teacher-payment.component';
import { TeacherStudentComponent } from './Components/Teacher/Teacher-Page-Cap/teacher-student/teacher-student.component';
import { TeacherContactComponent } from './Components/Teacher/Teacher-Page-Cap/teacher-contact/teacher-contact.component';
import { CourseDetailsComponent } from './Components/Course/course-details/course-details.component';
import { CourseVideoComponent } from './Components/Course/course-video/course-video.component';
import { OnlyNamePipe } from './pipes/only-name.pipe';
import { DenemePipePipe } from './pipes/deneme-pipe.pipe';
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
    ChangePasswordComponent,
    TeacherPageComponent,
    CourseAddComponent,
    CourseUpdateComponent,
    SideBarComponent,
    TeacherPaymentComponent,
    TeacherStudentComponent,
    TeacherContactComponent,
    CourseDetailsComponent,
    CourseVideoComponent,
    OnlyNamePipe,
    DenemePipePipe,
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
