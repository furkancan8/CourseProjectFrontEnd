import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
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
  getAllTeacherOfStudent(teacherId:number):Observable<ListResponseModel<TeacherStudent>>
  {
    var newPath=this.apiUrl+"getallteacherofstudent?teacherId="+teacherId;
    return this.httpClient.get<ListResponseModel<TeacherStudent>>(newPath);
  }
  getTeacher(teacherId:number):Observable<SingleResponseModel<Teacher>>
  {
    return this.httpClient.get<SingleResponseModel<Teacher>>(this.apiUrl+"getteacher?teacherId="+teacherId);
  }
  // --------------------TEACHER COURSE
  getTeacherOfCourse(teacherId:number):Observable<ListResponseModel<TeacherCourse>>
  {
    var newPath=this.apiUrl+"getteacherofcourse?teacherId="+teacherId;
    return this.httpClient.get<ListResponseModel<TeacherCourse>>(newPath);
  }
  teacherCourseAdd(teacherCourse:TeacherCourse):Observable<ResponseModel>
  {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"teachercourseadd",teacherCourse);
  }
  teacherCourseUpdate(teacherCourse:TeacherCourse):Observable<ResponseModel>
  {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"teachercourseupdate",teacherCourse);
  }
  teacherCourseDelete(id:number):Observable<ResponseModel>
  {
    return this.httpClient.delete<ResponseModel>(this.apiUrl+"teachercourseupdate?id="+id);
  }
}
