import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Course } from 'src/app/models/Course/course';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  apiUrl="https://localhost:44350/api/course/";
  constructor(private httpClient:HttpClient) { }
  add(course:Course):Observable<ResponseModel>
  {
    const newPath=this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newPath,course);
  }
  getAll():Observable<ListResponseModel<Course>>
  {
   var newPath=this.apiUrl+"getall";
   return this.httpClient.get<ListResponseModel<Course>>(newPath);
  }
  getAllTeachingCourse(teacherId:number):Observable<ListResponseModel<Course>>
  {
    var newPath=this.apiUrl+"getallteachingcourse?teacherId="+teacherId;
    return this.httpClient.get<ListResponseModel<Course>>(newPath);
  }
  getCourseById(courseId:number):Observable<SingleResponseModel<Course>>
  {
    var newPath=this.apiUrl+"getcourse?courseId="+courseId;
    return this.httpClient.get<SingleResponseModel<Course>>(newPath);
  }
  getCourseByName(courseName:string):Observable<SingleResponseModel<Course>>
  {
    return this.httpClient.get<SingleResponseModel<Course>>(this.apiUrl+"getcoursebyname?name="+courseName);
  }
  getCourseByRouteId(routeId:string):Observable<SingleResponseModel<Course>>
  {
    return this.httpClient.get<SingleResponseModel<Course>>(this.apiUrl+"getcoursebyroute?routeId="+routeId);
  }
}
