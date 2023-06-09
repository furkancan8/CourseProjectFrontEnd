import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VerifyService } from 'src/app/services/Public/verify.service';
import { AuthService } from 'src/app/services/User/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{

  changePasswordGroup:FormGroup
  userId=parseInt(localStorage.getItem('i_u_c-p'))

  constructor(private formBuilder:FormBuilder,private authService:AuthService,private verifyService:VerifyService) {

  }
  ngOnInit(): void {
   this.createPasswordForm()
  }
  createPasswordForm()
  {
    this.changePasswordGroup=this.formBuilder.group({
      password:new FormControl("",Validators.required)
    })
  }
  ChangePassword()
  {
    setTimeout(() => {
      if(this.authService.IsChangePassword==true)
      {
        localStorage.removeItem('i_u_c-p');
      }
    }, 1000);
  }
}
