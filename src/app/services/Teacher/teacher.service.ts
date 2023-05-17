import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
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
    var newPath=this.apiUrl+"getteacherofcourse?teacherId="+teacherId;
    return this.httpClient.get<ListResponseModel<TeacherCourse>>(newPath);
  }
  getAllTeacherOfStudent(teacherId:number):Observable<ListResponseModel<TeacherStudent>>
  {
    var newPath=this.apiUrl+"getallteacherofstudent?teacherId="+teacherId;
    return this.httpClient.get<ListResponseModel<TeacherStudent>>(newPath);
  }
  getTeacher(teacherId:number):Observable<SingleResponseModel<Teacher>>
  {
    return this.httpClient.get<SingleResponseModel<Teacher>>(this.apiUrl+"getteacher?teacherId="+teacherId);
  }
}
