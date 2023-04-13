import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/User/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit{
  showDropdown = false;
  IsUserActive:boolean=false;
 constructor(private elementRef: ElementRef,private authService:AuthService) {

 }
 ngOnInit(): void {
   this.IsUser()
 }
 IsUser(){
  if(this.authService.isAuthenticate()){
     this.IsUserActive=true;
  }
}
 ExitUser()
 {
  if(this.authService.isAuthenticate()){
   localStorage.removeItem("token");
   localStorage.removeItem("i_u");
   window.location.replace('http://localhost:4200/products')
  }
 }
 toggleDropdown() {
  this.showDropdown = !this.showDropdown;
}
@HostListener('document:click', ['$event'])
  clickOut(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }
}
