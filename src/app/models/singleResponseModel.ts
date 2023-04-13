import { ResponseModel } from "./responseModel";

//tek bir data var yani bize gelen token,expiration objesini tutar.listresponsemodel array'li generic
export interface SingleResponseModel<T> extends ResponseModel{
   data:T
}
