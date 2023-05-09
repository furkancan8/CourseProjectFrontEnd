import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserVerify } from 'src/app/models/Public/userVerify';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
@Injectable({
  providedIn: 'root'
})
export class VerifyService {
  apiUrl="https://localhost:44350/api/userverify/"
  IsSuccessAdd:boolean=false;
  IsMailMassage:string
  ChangePasswordTheUserId:number
  IsMailSuccess:boolean=true
  constructor(private httpClient:HttpClient) { }

  add(userVerify:UserVerify):Observable<ResponseModel>
  {
   return this.httpClient.post<ResponseModel>(this.apiUrl+"add",userVerify);
  }
  delete(userId:number):Observable<ResponseModel>
  {
    return this.httpClient.delete<ResponseModel>(this.apiUrl+"delete?userVerifyId="+userId);
  }
  getUserByMail(userMail:string):Observable<SingleResponseModel<UserVerify>>
  {
    return this.httpClient.get<SingleResponseModel<UserVerify>>(this.apiUrl+"getbymail?userMail="+userMail);
  }
  verifyEmailUserAdd(userverify:UserVerify,userId:number):Observable<ResponseModel>
  {
    var nawPath=this.apiUrl+"verifyemailuseradd?userId="+userId;
    return this.httpClient.post<ResponseModel>(nawPath,userverify)
  }
}
