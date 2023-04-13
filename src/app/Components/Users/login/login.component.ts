import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/User/auth.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  userId:string;
  loginForm:FormGroup
  id = localStorage.getItem("i_u");
  loginError:boolean=false;
  constructor(private authService:AuthService,private formBuilder:FormBuilder,private userService:UserService) {

  }
  ngOnInit(): void {
    this.createloginForm();
  }
  createloginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }
  login(email:string){
    if(this.loginForm.valid){
      let loginModel=Object.assign({},this.loginForm.value)

      this.authService.login(loginModel).subscribe({
        next:(response)=>{
         localStorage.setItem("token",response.data.token)
         console.log(response.success)
        },
         error:(errorResponse)=>{
          console.log(errorResponse)
          this.loginError=true
         },
         complete:()=>{
          window.location.replace('http://localhost:4200/products')
         }
      })
    }

    this.userService.getUser(email).subscribe({
      next:(res)=>{
        if(res.data.id)
        {
          this.userId=res.data.id.toString();
        }
        localStorage.setItem("i_u",this.userId)
      }
    })
  }
}
