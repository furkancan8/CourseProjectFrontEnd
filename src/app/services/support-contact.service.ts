import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SupportContact } from '../models/Public/supportContact';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class SupportContactService {

  apiUrl="https://localhost:44350/api/contact/";
  AddPostSuccess:boolean=false
  constructor(private httpClient:HttpClient) { }

  getAllTeacher(teacherId:number):Observable<ListResponseModel<SupportContact>>
  {
    return this.httpClient.get<ListResponseModel<SupportContact>>(this.apiUrl+"getallteacher?teacherId="+teacherId);
  }
  add(supportContact:SupportContact):Observable<ResponseModel>
  {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",supportContact);
  }
  update(supportContact:SupportContact):Observable<ResponseModel>
  {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",supportContact);
  }
}
