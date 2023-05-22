import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/responseModel';
import { CourseQuestion } from 'src/app/models/Public/courseQuestion';
import { QuestionAnswer } from 'src/app/models/Public/questionAnswer';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  apiUrl="https://localhost:44350/api/question/"
  successAddComment:boolean=false;
  constructor(private httpClient:HttpClient) { }

  getAllUserComment(userId:number):Observable<ListResponseModel<CourseQuestion>>
  {
    return this.httpClient.get<ListResponseModel<CourseQuestion>>(this.apiUrl+"getallusercomment?userId="+userId)
  }
  getAllCommentByCourse(courseId:number):Observable<ListResponseModel<CourseQuestion>>
  {
    return this.httpClient.get<ListResponseModel<CourseQuestion>>(this.apiUrl+"getallcommentbycourse?courseId="+courseId);
  }
  getAllAnswerForComment(commentId:number):Observable<ListResponseModel<QuestionAnswer>>
  {
    return this.httpClient.get<ListResponseModel<QuestionAnswer>>(this.apiUrl+"getallanswerforcomment?commentId="+commentId);
  }
  add(comment:Comment):Observable<ResponseModel>
  {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",comment);
  }
  addAnswer(commentAnswer:QuestionAnswer):Observable<ResponseModel>
  {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"addanswer",commentAnswer);
  }
}
