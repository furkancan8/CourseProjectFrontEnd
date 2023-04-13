import { Directive,Input,ElementRef, HostListener  } from '@angular/core';
import { PaymentService } from '../services/User/payment.service';

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {
  @Input() entityId:number;
  @Input() entity:string;
  constructor(private paymentService:PaymentService) { }
  @HostListener("click")
  onclick()
  {
    if(this.entity=="payment")
    {
      this.paymentService.delete(this.entityId).subscribe(res=>{
        console.log(res.success)
      })
    }
  }
}
