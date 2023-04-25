import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserVerify } from '../models/Public/userVerify';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/User/User';

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
    // ÇALIŞMIYOR
    return this.httpClient.get<SingleResponseModel<UserVerify>>(this.apiUrl+"getbymail?userMail="+userMail);
  }
}
