import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseVideo } from 'src/app/models/Course/courseVideo';
import { VideoDetails } from 'src/app/models/Course/videoDetails';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  apiUrl="https://localhost:44350/api/video/";
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
}
