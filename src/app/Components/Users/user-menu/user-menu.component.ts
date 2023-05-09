import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { PublicService } from 'src/app/services/Public/public.service';
import { AuthService } from 'src/app/services/User/auth.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit{
  imageUrl:string;
  copyImage:any;
  constructor(private userService:UserService,private authService:AuthService,private publicService:PublicService,private router:Router) {

  }
  ngOnInit(): void {
   this.getUser()
  }
  getUser(){
   this.userService.getbyId(this.authService.userId).subscribe(res=>{
    this.imageUrl="https://localhost:44350/Uploads/Images/"+res.data.imageUrl;
   })
  }
  uploadFile(event:any)
  {
    const file: File = event.target.files[0];
    const reader=new FileReader();
    reader.onload=(event:any)=>{
      const blob=new Blob([event.target.result],{type:file.type});
      const formData = new FormData();
      formData.append('file',blob, file.name);
      this.publicService.updateImageFile(this.authService.userId,formData).subscribe(res=>{

      })
    }
    reader.readAsArrayBuffer(file);
    setTimeout(() => {
      location.reload()
    }, 200);
  }
}
