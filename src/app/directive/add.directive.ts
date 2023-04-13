import { Directive, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ResponseModel } from '../models/responseModel';
import { AuthService } from '../services/User/auth.service';
import { PaymentService } from '../services/User/payment.service';
import { UserService } from '../services/User/user.service';

@Directive({
  selector: '[appAdd]'
})
export class AddDirective {
  @Input() entityAddForm:FormGroup;
  @Input() entity:string;
  constructor(private userService:UserService,private paymentService:PaymentService) { }
  @HostListener("click")
  add()
  {
   if(this.entity=="payment")
   {
    let entityModel=Object.assign({},this.entityAddForm.value);
     this.paymentService.add(entityModel).subscribe(res=>{
      console.log(res.success)
     })
   }
   else if(this.entity=="contact"&&this.entityAddForm.valid)
   {
    let entityModel=Object.assign({},this.entityAddForm.value);
    this.userService.contactAdd(entityModel).subscribe(res=>{
      this.userService.IsContactSuccess=res.success
      console.log(res.success)
    })
   }
  }
}
