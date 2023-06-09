import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserVerify } from 'src/app/models/Public/userVerify';
import { VerifyService } from 'src/app/services/Public/verify.service';
import { AuthService } from 'src/app/services/User/auth.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  loginFormGroup:FormGroup
  verifyFormGroup:FormGroup
  changePasswordGroup:FormGroup
  sessionFormGroup:FormGroup
  userVerfiy:UserVerify[]=[]
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
    this.loginFormGroup=this.formBuilder.group({
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
    if(this.loginFormGroup.valid){
      let loginModel=Object.assign({},this.loginFormGroup.value)

      this.authService.login(loginModel).subscribe({
        next:(response)=>{

        },
         error:(errorResponse)=>{
          console.log(errorResponse)
          this.loginError=true
         },
         complete:()=>{
          // window.location.replace('http://localhost:4200')
         }
      })
    }
    this.userService.getUser(email).subscribe(res=>{
      this.sessionFormGroup=this.formBuilder.group(
        {
          userId:new FormControl(res.data.id)
        }
      )
        let loginModel=Object.assign({},this.sessionFormGroup.value)
        this.authService.sessionAdd(loginModel).subscribe(res=>{
          console.log(res.success)
        })

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
   setTimeout(() => {
    if(this.userVerfiy)
    {
      this.userVerfiy.forEach(element => {
        if(element.randomCode==userInputCode)
        {
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
