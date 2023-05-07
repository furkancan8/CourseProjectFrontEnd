import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Teacher } from 'src/app/models/Teacher/teacher';
import { TeacherCourse } from 'src/app/models/Teacher/teacherCourse';
import { TeacherStudent } from 'src/app/models/Teacher/teacherStudent';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  apiUrl="https://localhost:44350/api/teacher/";
  constructor(private httpClient:HttpClient) { }
  getTeacherOfCourse(teacherId:number):Observable<ListResponseModel<TeacherCourse>>
  {
    var newPath=this.apiUrl+"getteachercourse?teacherId="+teacherId;
    return this.httpClient.get<ListResponseModel<TeacherCourse>>(newPath);
  }
  getAllTeacher():Observable<ListResponseModel<Teacher>>
  {
    var newPath=this.apiUrl+"getallteacher";
    return this.httpClient.get<ListResponseModel<Teacher>>(newPath);
  }
  getAllTeacherOfStudent(teacherId:number):Observable<ListResponseModel<TeacherStudent>>
  {
    var newPath=this.apiUrl+"getallteacherofstudent?teacherId="+teacherId;
    return this.httpClient.get<ListResponseModel<TeacherStudent>>(newPath);
  }
}
