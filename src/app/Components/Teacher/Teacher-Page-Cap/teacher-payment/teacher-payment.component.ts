import { Component, OnDestroy, OnInit } from '@angular/core';
import { Payment } from 'src/app/models/User/payment';
import { PaymentService } from 'src/app/services/User/payment.service';

@Component({
  selector: 'app-teacher-payment',
  templateUrl: './teacher-payment.component.html',
  styleUrls: ['./teacher-payment.component.css']
})
export class TeacherPaymentComponent implements OnInit{

  payment:Payment[]=[]

  cardUrl:string="https://localhost:44350/Uploads/Images/card-visa.jpg";
  constructor(private paymentService:PaymentService) {

  }
  ngOnInit(): void {
    this.getPaymentByUserId(6004);
  }
  refreshPayment()
  {
    window.location.reload();
  }
  getPaymentByUserId(userId:number)
  {
    this.paymentService.getByUserId(userId).subscribe(res=>{
    this.payment=res.data
    console.log(this.payment)
    })
  }
}
