import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { OperationClaim } from 'src/app/models/Public/operationClaim';
import { UserOperationClaim } from 'src/app/models/Public/userOperationClaim';
@Injectable({
  providedIn: 'root'
})
export class OperationClaimService {

  apiUrl="https://localhost:44350/api/userclaim/";
  constructor(private httpClient:HttpClient) { }
  getAllUserOperationClaim():Observable<ListResponseModel<UserOperationClaim>>
  {
    return this.httpClient.get<ListResponseModel<UserOperationClaim>>(this.apiUrl+"getalluserclaim");
  }
  getUserClaimByUserId(userId:number):Observable<ListResponseModel<UserOperationClaim>>
  {
    return this.httpClient.get<ListResponseModel<UserOperationClaim>>(this.apiUrl+"getuserclaimbyuserid?userId="+userId);
  }

  // operationClaim
  getOperationClaimById(operationClaimId:number):Observable<ListResponseModel<OperationClaim>>
  {
    return this.httpClient.get<ListResponseModel<OperationClaim>>(this.apiUrl+"getoperationclaimbyid?id="+operationClaimId);
  }
  getAllOperationClaim():Observable<ListResponseModel<OperationClaim>>
  {
    return this.httpClient.get<ListResponseModel<OperationClaim>>(this.apiUrl+"getalloperationclaim");
  }
}
