import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { OperationClaim } from 'src/app/models/Public/operationClaim';
import { UserOperationClaim } from 'src/app/models/Public/userOperationClaim';
import { User } from 'src/app/models/User/User';
@Injectable({
  providedIn: 'root'
})
export class OperationClaimService {

  apiUrl="https://localhost:44350/api/claim/";
  constructor(private httpClient:HttpClient) { }
  //useroperationClaim
  getAllTeacherByClaim():Observable<ListResponseModel<UserOperationClaim>>
  {
    return this.httpClient.get<ListResponseModel<UserOperationClaim>>(this.apiUrl+"getallteacherbyclaim");
  }

  // operationClaim

}
