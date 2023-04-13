import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterModel } from 'src/app/models/Admin/registerModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { UserContact } from 'src/app/models/User/Contact';
import { User } from 'src/app/models/User/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl="https://localhost:44350/api/user/";
  IsContactSuccess:boolean=false;
  constructor(private httpClient:HttpClient) { }

  getUser(email:string):Observable<SingleResponseModel<User>>
  {
    let newPath=this.apiUrl+"getuser?userMail="+email;
    return this.httpClient.get<SingleResponseModel<User>>(newPath)
  }
  update(user:User,id:number):Observable<ResponseModel>
  {
    var newPath=this.apiUrl+"update?id="+id;
    return this.httpClient.post<ResponseModel>(newPath,user)
  }
  getbyId(userId:number):Observable<SingleResponseModel<User>>
  {
    var newPath=this.apiUrl+"getbyuserid?userId="+userId;
    return this.httpClient.get<SingleResponseModel<User>>(newPath)
  }
  contactAdd(userContact:UserContact):Observable<ResponseModel>
  {
    var newPath=this.apiUrl+"addcontact";
    return this.httpClient.post<ResponseModel>(newPath,userContact);
  }
}
