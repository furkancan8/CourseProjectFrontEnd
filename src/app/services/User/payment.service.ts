import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { Payment } from 'src/app/models/User/payment';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl="https://localhost:44350/api/payment/";
  IsSuccess:boolean=false
  constructor(private httpClient:HttpClient) { }

  getByUserId(userId:number):Observable<ListResponseModel<Payment>>
  {
     var newPath=this.apiUrl+"getbyuserid?userId="+userId;
     return this.httpClient.get<ListResponseModel<Payment>>(newPath);
  }
  delete(id:number):Observable<ResponseModel>
  {
    var newPath=this.apiUrl+"delete?Id="+id;
    return this.httpClient.delete<ResponseModel>(newPath);
  }
  add(payment:Payment):Observable<ResponseModel>
  {
    var newPath=this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newPath,payment);
  }
}
