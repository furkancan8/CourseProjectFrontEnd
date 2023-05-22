import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseVideo } from 'src/app/models/Course/courseVideo';
import { SectionCourse } from 'src/app/models/Course/sectionCourse';
import { SectionVideo } from 'src/app/models/Course/sectionVideo';
import { VideoDetails } from 'src/app/models/Course/videoDetails';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  apiUrl="https://localhost:44350/api/video/";
  sectionUrl="https://localhost:44350/api/sectioncourse/";
  constructor(private httpClient:HttpClient) { }

  getVideoDetails(videoDetailsId:number):Observable<SingleResponseModel<VideoDetails>>
  {
    return this.httpClient.get<SingleResponseModel<VideoDetails>>(this.apiUrl+"getvideodetails?videoDetailsId="+videoDetailsId)
  }
  getAllVideoByCourse(courseId:number):Observable<ListResponseModel<CourseVideo>>
  {
    return this.httpClient.get<ListResponseModel<CourseVideo>>(this.apiUrl+"getallvideobycourse?courseId="+courseId);
  }
  getAllLineVideos(courseId:number):Observable<ListResponseModel<VideoDetails>>
  {
    return this.httpClient.get<ListResponseModel<VideoDetails>>(this.apiUrl+"getallvideoline?courseId="+courseId);
  }
  getCourseOfTrailer(courseId:number):Observable<SingleResponseModel<VideoDetails>>
  {
    return this.httpClient.get<SingleResponseModel<VideoDetails>>(this.apiUrl+"getcourseoftrailer?courseId="+courseId);
  }
  getVideoBySectionVideo(sectionCourseId:number):Observable<ListResponseModel<SectionVideo>>
  {
    return this.httpClient.get<ListResponseModel<SectionVideo>>(this.sectionUrl+"getvideoidofId?sectionCourseId="+sectionCourseId);
  }
  getSectionByCourse(courseId:number):Observable<ListResponseModel<SectionCourse>>
  {
    return this.httpClient.get<ListResponseModel<SectionCourse>>(this.sectionUrl+"getsectionbycourseid?courseId="+courseId);
  }
}
