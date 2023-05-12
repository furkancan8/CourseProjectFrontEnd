import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Category } from 'src/app/models/Public/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl="https://localhost:44350/api/category/";
  constructor(private httpClient:HttpClient) { }
  getAllCategory():Observable<ListResponseModel<Category>>
  {
    return this.httpClient.get<ListResponseModel<Category>>(this.apiUrl+"getallcategory");
  }
  getByCategoryId(categoryId:number):Observable<ListResponseModel<Category>>
  {
    return this.httpClient.get<ListResponseModel<Category>>(this.apiUrl+"getbycategoryId?categoryId="+categoryId);
  }
}
