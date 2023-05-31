import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseVideo } from 'src/app/models/Course/courseVideo';
import { SectionCourse } from 'src/app/models/Course/sectionCourse';
import { SectionVideo } from 'src/app/models/Course/sectionVideo';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  apiUrl="https://localhost:44350/api/sectioncourse/"
  constructor(private httpClient:HttpClient) { }
  // ------------SectionCourse
  courseAdd(sectionCourse:SectionCourse):Observable<ResponseModel>
  {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"courseadd",sectionCourse);
  }
  courseUpdate(sectionCourse:SectionCourse):Observable<ResponseModel>
  {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"courseupdate",sectionCourse)
  }
  courseDelete(id:number):Observable<ResponseModel>
  {
    return this.httpClient.delete<ResponseModel>(this.apiUrl+"coursedelete?id="+id);
  }
  getSectionByCourse(courseId:number):Observable<ListResponseModel<SectionCourse>>
  {
    return this.httpClient.get<ListResponseModel<SectionCourse>>(this.apiUrl+"getsectionbycourseid?courseId="+courseId);
  }
  // ----------------------------SECTİON VİDEO
  // VİDEODAN METOTLARI AL
  videoAdd(sectionVideo:SectionVideo):Observable<ResponseModel>
  {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"videoadd",sectionVideo)
  }
  videoUpdate(sectionVideo:SectionVideo):Observable<ResponseModel>
  {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"videoupdate",sectionVideo)
  }
  videoDelete(id:number):Observable<ResponseModel>
  {
    return this.httpClient.delete<ResponseModel>(this.apiUrl+"videodelete?id="+id);
  }
  getVideoBySectionVideo(sectionCourseId:number):Observable<ListResponseModel<SectionVideo>>
  {
    return this.httpClient.get<ListResponseModel<SectionVideo>>(this.apiUrl+"getvideoidofId?sectionCourseId="+sectionCourseId);
  }
}
