import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User/User';
import { AuthService } from 'src/app/services/User/auth.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  userId=this.authService.userId
  userDetails:User[]=[]
  userFormGroup:FormGroup
  IsVerifyMail:boolean=true
  constructor(private formBuilder:FormBuilder,private userService:UserService,private authService:AuthService) {

  }
  ngOnInit(): void {
   this.createUserForm();
   this.getUserDetail();
  }
  getUserDetail()
  {
   this.userService.getbyId(this.authService.userId).subscribe(res=>{
    this.userDetails.push(res.data)
    console.log(res.data)
    this.createUserForm();
    if(res.data.verifyMail!=undefined)
    {
      this.IsVerifyMail=res.data.verifyMail
      console.log(this.IsVerifyMail)
      console.log(res.data.verifyMail)
    }
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
      this.IsVerifyMail=element.verifyMail
      console.log(this.IsVerifyMail)
        this.userFormGroup.get('fullName').setValue(element.fullName);
        this.userFormGroup.get('email').setValue(element.email);
        this.userFormGroup.get('number').setValue(element.number);
        this.userFormGroup.get('isSendMail').setValue(element.isSendMail);
    });
   }
  }
}
