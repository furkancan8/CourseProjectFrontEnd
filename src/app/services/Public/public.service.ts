import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../../models/listResponseModel';
import { Category } from '../../models/Public/category';
import { ResponseModel } from '../../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  apiUrl="https://localhost:44350/api/public/"
  constructor(private httpClient:HttpClient) { }
  getAllCategory():Observable<ListResponseModel<Category>>
  {
    return this.httpClient.get<ListResponseModel<Category>>(this.apiUrl+"getallcategory");
  }
  updateImageFile(userId:number,formData:FormData):Observable<ResponseModel>
  {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"getimagefile?userId="+userId,formData)
  }
}
