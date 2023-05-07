import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserVerify } from 'src/app/models/Public/userVerify';
import { User } from 'src/app/models/User/User';
import { AuthService } from 'src/app/services/User/auth.service';
import { UserService } from 'src/app/services/User/user.service';
import { VerifyService } from 'src/app/services/verify.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  userId=this.authService.userId
  userDetails:User[]=[]
  verifyUser:UserVerify[]=[]
  userMail:string
  userFormGroup:FormGroup
  verifyEmailFormGroup:FormGroup
  userVerifyFormGroup:FormGroup
  IsVerifyMail:boolean=false
  IsVerifyCodeInput:boolean=false
  userInputCode:string
  ISuccessVerifyCode:boolean=undefined
  showSuccessVerify:boolean=false
  constructor(private formBuilder:FormBuilder,private userService:UserService,private authService:AuthService,
    private verifyService:VerifyService) {

  }
  ngOnInit(): void {
   this.createUserForm();
   this.getUserDetail();
   this.createVerifyEmailForm()
   this.createUserVerifyForm()
  }
  getUserDetail()
  {
   this.userService.getbyId(this.authService.userId).subscribe(res=>{
    this.userDetails.push(res.data)
    this.createUserForm();
    if(res.data.verifyEmail==false)
    {
      this.IsVerifyMail=true
    }
    this.userMail=res.data.email
   })
  }
  createUserForm(){
   this.userFormGroup=this.formBuilder.group({
    fullName:new FormControl("",Validators.required),
    email:new FormControl("",Validators.required),
    number:new FormControl("",Validators.required),
    isSendMail:new FormControl("",Validators.required),
   })
   if(this.userDetails.length>0)
   {
    this.userDetails.forEach(element => {
        this.userFormGroup.get('fullName').setValue(element.fullName);
        this.userFormGroup.get('email').setValue(element.email);
        this.userFormGroup.get('number').setValue(element.number);
        this.userFormGroup.get('isSendMail').setValue(element.isSendMail);
    });
   }
  }
  createVerifyEmailForm()
  {
    this.verifyEmailFormGroup=this.formBuilder.group({
      userMail:new FormControl(this.userMail)
    })
  }
  createUserVerifyForm()
  {
    this.userVerifyFormGroup=this.formBuilder.group({
      verifyEmail:new FormControl(true,Validators.required),
    })
  }
  getVerifyCodeUser(mail:string)
  {
      this.verifyService.getUserByMail(mail).subscribe(res=>{
       if(this.verifyUser.length==0)
       {
        this.verifyUser.push(res.data)
       }
      })
  }
  ActiveCodeInput()
  {
    this.IsVerifyCodeInput=true
  }
  VerifyCodeButton()
  {
    let registerModel=Object.assign({},this.userVerifyFormGroup.value)
    this.getVerifyCodeUser(this.userMail)
    setTimeout(() => {
      this.verifyUser.forEach(element => {
        if(element.randomCode==this.userInputCode)
        {
          this.userService.update(registerModel,this.authService.userId).subscribe(res=>{
            this.ISuccessVerifyCode=res.success
            if(res.success==true)
            {
              this.IsVerifyMail=false
              this.IsVerifyCodeInput=false
            }
            this.showSuccessVerify=res.success
          })
        }else{
          this.ISuccessVerifyCode=false
        }
    });
    }, 500);
  }
}
