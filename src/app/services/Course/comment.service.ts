import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Observable } from 'rxjs';
import { CourseComment } from 'src/app/models/Course/comment';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient:HttpClient) { }
  apiUrl="https://localhost:44350/api/comment/";
  getAllCourseOfComment(courseId:number):Observable<ListResponseModel<CourseComment>>
  {
    return this.httpClient.get<ListResponseModel<CourseComment>>(this.apiUrl+"getallcourseofcomment?courseId="+courseId)
  }
}
