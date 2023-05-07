import { Directive, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SupportContactService } from '../services/support-contact.service';
import { AuthService } from '../services/User/auth.service';
import { UserService } from '../services/User/user.service';

@Directive({
  selector: '[appUpdate]'
})
export class UpdateDirective {
  @Input() entityId:number
  @Input() userId:number
  @Input() entity:string;
  @Input() entityFormGroup:FormGroup
  @Input() changePasswordFormGroup:FormGroup
  @Input() verifypPasswordFormGroup:FormGroup
  constructor(private userService:UserService,private authService:AuthService,private supportService:SupportContactService) { }
  @HostListener("click")
  update()
  {
    if(this.entity=="user")
    {
      setTimeout(() => {
        let userModel=Object.assign({},this.entityFormGroup.value)
        this.userService.update(userModel,this.entityId).subscribe(res=>{
          console.log(userModel)
          console.log(res.success)
        })
      }, 1000);
    }
    else if(this.entity=="password")
    {
      setTimeout(() => {
       let registerModel=Object.assign({},this.changePasswordFormGroup.value)
       this.authService.changePassword(registerModel,this.userId).subscribe(res=>{
         console.log(res.success)
           this.authService.IsChangePassword=res.success
       })
      }, 500)
    }
    else if(this.entity=="supportcontact")
    {
      let registerModel=Object.assign({},this.changePasswordFormGroup.value)
      this.supportService.update(registerModel).subscribe(res=>{
        console.log(res.success)
      })
    }
  }
}
