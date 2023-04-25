import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/User/auth.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-user-contact',
  templateUrl: './user-contact.component.html',
  styleUrls: ['./user-contact.component.css']
})
export class UserContactComponent implements OnInit{
  entityFormGroup:FormGroup
  IsSuccess:boolean;
  constructor(private formBuilder:FormBuilder,private userService:UserService,private authService:AuthService) {

  }
  ngOnInit(): void {
    this.createFormGroup()
  }
  createFormGroup()
  {
    this.entityFormGroup=this.formBuilder.group({
      subject:[""],
      description:[""],
      userId:[this.authService.userId]
    })
  }
  asd()
  {
    setTimeout(() => {
      if(this.userService.IsContactSuccess)
      {
        this.IsSuccess=this.userService.IsContactSuccess
      }
    }, 700);
  }
}
