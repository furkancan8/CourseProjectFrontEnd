import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/Course/course';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  apiUrl="https://localhost:44350/api/usercourse/";
  constructor(private httpClient:HttpClient) { }

  getCourseById(courseId:number):Observable<SingleResponseModel<Course>>
  {
    var newPath=this.apiUrl+"getcourse?courseId="+courseId;
    return this.httpClient.get<SingleResponseModel<Course>>(newPath);
  }
}
