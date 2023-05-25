import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/Course/course';
import { CourseUser } from 'src/app/models/Course/courseUser';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CourseUserService {
  apiUrl="https://localhost:44350/api/courseuser/";
  constructor(private httpClient:HttpClient) { }

  getAllCourseByUserId(userId:number):Observable<ListResponseModel<CourseUser>>
  {
    var newPath=this.apiUrl+"getalluserbycourse?userId="+userId;
    return this.httpClient.get<ListResponseModel<CourseUser>>(newPath);
  }
  getAllCourseId(courseId:number):Observable<ListResponseModel<CourseUser>>
  {
    var newPath=this.apiUrl+"getallcourseidbyuser?courseId="+courseId;
    return this.httpClient.get<ListResponseModel<CourseUser>>(newPath);
  }
}
