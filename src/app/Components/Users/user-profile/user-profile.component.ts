import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User/User';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  id=localStorage.getItem(('i_u'))
  userId=parseInt(this.id)
  userDetails:User[]=[]
  userFormGroup:FormGroup
  constructor(private formBuilder:FormBuilder,private userService:UserService) {

  }
  ngOnInit(): void {
   this.createUserForm();
   this.getUserDetail();
  }
  getUserDetail()
  {
   this.userService.getbyId(this.userId).subscribe(res=>{
    this.userDetails.push(res.data)
    this.createUserForm();
   })
  }
  // againRun(){
  //   this.createUserForm()
  // }
  createUserForm(){
   this.userFormGroup=this.formBuilder.group({
    fullName:new FormControl("",Validators.required),
    email:new FormControl("",Validators.required),
    number:new FormControl("",Validators.required),
    isMail:new FormControl("",Validators.required),
   })
   if(this.userDetails.length>0)
   {
    this.userDetails.forEach(element => {
      this.userFormGroup.get('fullName').setValue(element.fullName);
      this.userFormGroup.get('email').setValue(element.email);
      this.userFormGroup.get('number').setValue(element.number);
      // this.userFormGroup.get('isMail').setValue(element);
      console.log(element)
    });
   }
  }
}
