import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { connect } from 'rxjs';
import { AddDirective } from 'src/app/directive/add.directive';
import { UserVerify } from 'src/app/models/Public/userVerify';
import { VerifyService } from 'src/app/services/Public/verify.service';
import { AuthService } from 'src/app/services/User/auth.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  writeUserId:string;
  loginForm:FormGroup
  verifyFormGroup:FormGroup
  changePasswordGroup:FormGroup
  userVerfiy:UserVerify[]=[]
  userId:number
  getMailOfUserId:string=''
  loginError:boolean=false;
  IsrememberPassword:boolean=false;
  IsSuccessMail:boolean=false;
  IsChangePassword:boolean=false;
  newPassword:any;
  IsMailCounter:boolean=false
  mailCounterSecond:number=59
  mailCounterMinute:number=2
  mailWarningMailError:boolean
  mailWarningCodeError:boolean
  constructor(private authService:AuthService,private formBuilder:FormBuilder,private userService:UserService
  ,private verifyService:VerifyService,private router:Router) {
  }
  ngOnInit(): void {
    this.createloginForm();
    this.createVerifyForm();
  }
  createloginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }
  createVerifyForm()
  {
    this.verifyFormGroup=this.formBuilder.group({
      userMail:["",Validators.required],
      randomCode:["",Validators.required]
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
          this.writeUserId=res.data.id.toString();
        }
        localStorage.setItem("i_u",this.writeUserId)
      }
    })
  }
  changeRemmberPasword()
  {
    this.IsrememberPassword=true
  }
  changeRememberInput()
  {
     setTimeout(() => {
      if(this.verifyService.IsMailMassage==undefined)
      {
       this.IsSuccessMail=true
       this.IsMailCounter=true
       this.mailWarningMailError=false
       this.mailCounter()
      }
      if(this.verifyService.IsMailSuccess==false)
      {
        this.mailWarningMailError=true
      }
     }, 1400);
  }
  getCodeInput()
  {
   const userMail=this.verifyFormGroup.get('userMail').value
   const userInputCode=this.verifyFormGroup.get('randomCode').value
   this.getVerifyCode(userMail)
   this.getUserOfMail(userMail)
   console.log(this.userVerfiy)
   setTimeout(() => {
    if(this.userVerfiy)
    {
      this.userVerfiy.forEach(element => {
        if(element.randomCode==userInputCode)
        {
          localStorage.setItem('i_u_c-p',this.getMailOfUserId);
          this.router.navigate(['/login/change_password'])
        }else{
          this.mailWarningCodeError=true
        }
    });
   }
   }, 1000);
  }
  getVerifyCode(mail:string)
  {
    this.verifyService.getUserByMail(mail).subscribe(res=>{
      if(this.userVerfiy.length==0)
      {
        setTimeout(() => {
          this.userVerfiy.push(res.data)
        },1000);
      }
    })
  }
  getUserOfMail(mail:string)
  {
    this.userService.getUser(mail).subscribe(res=>{
       this.getMailOfUserId=res.data.id.toString()
    })
  }
  mailCounter()
  {
    setInterval(() => {
      if (this.mailCounterSecond >= 0&&this.mailCounterMinute>=1) {
        this.mailCounterSecond--;
        if(this.mailCounterSecond==0)
        {
          this.mailCounterMinute--;
          this.mailCounterSecond=59
          if(this.mailCounterMinute==0&&this.mailCounterSecond==59)
          {
            this.mailCounterMinute=0
            this.mailCounterSecond=0
          }
        }
      }
    },1000);
  }
}
