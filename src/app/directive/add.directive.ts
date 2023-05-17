import { CssSelector, ThisReceiver } from '@angular/compiler';
import { Directive, HostListener, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginModel } from '../models/Admin/loginModel';
import { SupportContact } from '../models/Public/supportContact';
import { ResponseModel } from '../models/responseModel';
import { CommentService } from '../services/Public/comment.service';
import { SupportContactService } from '../services/Public/support-contact.service';
import { VerifyService } from '../services/Public/verify.service';
import { AuthService } from '../services/User/auth.service';
import { PaymentService } from '../services/User/payment.service';
import { UserService } from '../services/User/user.service';

@Directive({
  selector: '[appAdd]'
})
export class AddDirective {
  @Input() entityAddForm:FormGroup;
  @Input() entity:string;
  @Output() counter:string
  constructor(private userService:UserService,private paymentService:PaymentService,private verifyService:VerifyService,
    private authService:AuthService,private supportContact:SupportContactService,private commentService:CommentService,
    ) { }
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
   else if(this.entity=="verifycode")
   {
    let entityModel=Object.assign({},this.entityAddForm.value);
    this.verifyService.add(entityModel).subscribe(res=>{
      if(res.success==true)
      {
        this.verifyService.IsSuccessAdd=true
      }
      this.verifyService.IsMailMassage=res.massage
      this.verifyService.IsMailSuccess=res.success
    })
   }else if(this.entity=="verifyemail")
   {
    let entityModel=Object.assign({},this.entityAddForm.value);
    this.verifyService.verifyEmailUserAdd(entityModel,this.authService.userId).subscribe(res=>{
      console.log(res.success)
    })
   }
   else if(this.entity=="supportcontact")
   {
    let entityModel=Object.assign({},this.entityAddForm.value);
    this.supportContact.add(entityModel).subscribe(res=>{
      console.log(res.success)
      this.supportContact.AddPostSuccess=res.success
    })
   }
   else if(this.entity=="comment")
   {
    let entityModel=Object.assign({},this.entityAddForm.value);
    this.commentService.add(entityModel).subscribe(res=>{
      if(res.success==true)
      {
        this.commentService.successAddComment=true
      }
    })
   }
   else if(this.entity=="commentAnswer")
   {
    let entityModel=Object.assign({},this.entityAddForm.value);
    this.commentService.addAnswer(entityModel).subscribe(res=>{
      console.log(res.success)
    })
   }
  }
}
