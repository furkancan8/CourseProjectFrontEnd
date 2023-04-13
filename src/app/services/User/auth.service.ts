import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/models/Admin/loginModel';
import { RegisterModel } from 'src/app/models/Admin/registerModel';
import { TokenModel } from 'src/app/models/Admin/tokenModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl="https://localhost:44350/api/auth/";
  constructor(private httpClient:HttpClient) { }
  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)

  }
  register(registerModel:RegisterModel)
  {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"register",registerModel)
  }
  isAuthenticate(){
    if(localStorage.getItem("token")){
     return true;
    }
    else{
      return false;
    }
  }
  isUser(){
    if(localStorage.getItem("i_u")){
     return true;
    }
    else{
      return false;
    }
  }
}
