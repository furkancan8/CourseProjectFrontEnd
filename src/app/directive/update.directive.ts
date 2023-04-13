import { Directive, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from '../services/User/user.service';

@Directive({
  selector: '[appUpdate]'
})
export class UpdateDirective {
  @Input() entityId:number
  @Input() entity:string;
  @Input() entityFormGroup:FormGroup
  constructor(private userService:UserService) { }
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
  }
}
