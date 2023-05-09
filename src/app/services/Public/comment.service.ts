import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/Public/comment';
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  apiUrl="https://localhost:44350/api/comment/"
  constructor(private httpClient:HttpClient) { }

  getAllUserComment(userId:number):Observable<ListResponseModel<Comment>>
  {
    return this.httpClient.get<ListResponseModel<Comment>>(this.apiUrl+"getallusercomment?userId="+userId)
  }
}
