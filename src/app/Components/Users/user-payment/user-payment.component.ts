import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Payment } from 'src/app/models/User/payment';
import { AuthService } from 'src/app/services/User/auth.service';
import { PaymentService } from 'src/app/services/User/payment.service';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css']
})
export class UserPaymentComponent implements OnInit{

  payment:Payment[]=[]
  cardName:string
  delteUrl:string="https://localhost:44350/Uploads/Images/delete.png";
  cardUrl:string="https://localhost:44350/Uploads/Images/card-visa.jpg";
  checkUrl:string="https://localhost:44350/Uploads/Images/check.png";
  zirratIcon:string="https://localhost:44350/Uploads/Images/zirrat-logo.png";
  entityFormGroup:FormGroup;
  IsClicked:boolean=false
  IsCheck:boolean=false
  formCheck = document.getElementById("form-check");
  constructor(private paymentService:PaymentService,private formBuilder:FormBuilder,private authService:AuthService) {

  }

  ngOnInit(): void {
  this.getPaymentByUserId(this.authService.userId)
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
      userId:[this.authService.userId],
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
