import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../Components/Home/home-page/home-page.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:HomePageComponent},//pathmatch=anasayfa için verilir
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
