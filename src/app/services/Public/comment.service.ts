import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/Public/comment';
import { CommentAnswer } from 'src/app/models/Public/commentAnswer';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  apiUrl="https://localhost:44350/api/comment/"
  successAddComment:boolean=false;
  constructor(private httpClient:HttpClient) { }

  getAllUserComment(userId:number):Observable<ListResponseModel<Comment>>
  {
    return this.httpClient.get<ListResponseModel<Comment>>(this.apiUrl+"getallusercomment?userId="+userId)
  }
  getAllCommentByCourse(courseId:number):Observable<ListResponseModel<Comment>>
  {
    return this.httpClient.get<ListResponseModel<Comment>>(this.apiUrl+"getallcommentbycourse?courseId="+courseId);
  }
  getAllAnswerForComment(commentId:number):Observable<ListResponseModel<CommentAnswer>>
  {
    return this.httpClient.get<ListResponseModel<CommentAnswer>>(this.apiUrl+"getallanswerforcomment?commentId="+commentId);
  }
  add(comment:Comment):Observable<ResponseModel>
  {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",comment);
  }
  addAnswer(commentAnswer:CommentAnswer):Observable<ResponseModel>
  {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"addanswer",commentAnswer);
  }
}
