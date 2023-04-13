import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseUser } from 'src/app/models/Course/courseUser';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CourseUserService {
  apiUrl="https://localhost:44350/api/usercourse/";
  constructor(private httpClient:HttpClient) { }

  getCourseByUserId(userId:number):Observable<ListResponseModel<CourseUser>>
  {
    var newPath=this.apiUrl+"getuserbycourse?userId="+userId;
    return this.httpClient.get<ListResponseModel<CourseUser>>(newPath);
  }
}
