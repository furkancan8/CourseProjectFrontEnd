import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/User/auth.service';
import { VerifyService } from 'src/app/services/verify.service';

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
}
