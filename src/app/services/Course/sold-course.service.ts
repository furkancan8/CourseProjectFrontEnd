import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SoldCourse } from 'src/app/models/Course/soldCourse';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class SoldCourseService {
  apiUrl="https://localhost:44350/api/soldcourse/";
  constructor(private httpClient:HttpClient) { }

  getAllCourseForSoldCourse(courseId:number):Observable<ListResponseModel<SoldCourse>>
  {
    var nawPath=this.apiUrl+"getallcourseforsoldcourse?courseId="+courseId;
    return this.httpClient.get<ListResponseModel<SoldCourse>>(nawPath);
  }
  getAllUserForSoldCourse(userId:number):Observable<ListResponseModel<SoldCourse>>
  {
    var nawPath=this.apiUrl+"getalluserforsoldcourse?userId="+userId;
    return this.httpClient.get<ListResponseModel<SoldCourse>>(nawPath);
  }
  getbyid(id:number):Observable<ListResponseModel<SoldCourse>>
  {
    var nawPath=this.apiUrl+"getbyid?id="+id;
    return this.httpClient.get<ListResponseModel<SoldCourse>>(nawPath);
  }
}
