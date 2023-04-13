import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Payment } from 'src/app/models/User/payment';
import { PaymentService } from 'src/app/services/User/payment.service';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css']
})
export class UserPaymentComponent implements OnInit{
  id=localStorage.getItem(('i_u'))
  userId=parseInt(this.id)
  payment:Payment[]=[]
  cardName:string
  delteUrl:string="https://localhost:44350/Uploads/Images/delete.png";
  checkUrl:string="https://localhost:44350/Uploads/Images/check.png";
  zirratIcon:string="https://localhost:44350/Uploads/Images/zirrat-logo.png";
  entityFormGroup:FormGroup;
  IsClicked:boolean=false
  IsCheck:boolean=false
  formCheck = document.getElementById("form-check");
  constructor(private paymentService:PaymentService,private formBuilder:FormBuilder) {

  }

  ngOnInit(): void {
  this.getPaymentByUserId(this.userId)
  this.createFormGroup()
  }
  getPaymentByUserId(userId:number)
  {
    this.paymentService.getByUserId(userId).subscribe(res=>{
    this.payment=res.data
    console.log(this.payment)
    })
  }
  createFormGroup()
  {
    this.entityFormGroup=this.formBuilder.group({
      cardName:new FormControl("",Validators.required),
      cardNumber:new FormControl("",Validators.required),
      expiration:new FormControl("",Validators.required),
      cvc:new FormControl("",Validators.required),
      userId:[this.userId],
    })
  }
  activeCard(){
    this.IsClicked=true
  }
  disabledCard()
  {
      this.IsClicked=false
  }
  addSlash(event: any) {
    const input = event.target;
    if (input.value.length == 2 && input.value.indexOf('/') == -1) {
      input.value = input.value + '/';
    }
  }
  changeCheck()
  {
    const formCheck = document.getElementById("form-check") as HTMLInputElement;
    if(formCheck.checked)
    {
      this.IsCheck=true
    }else{
      this.IsCheck=false
    }
  }
  refreshPayment()
  {
    window.location.reload();
  }
}
