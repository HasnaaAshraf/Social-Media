import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from '../../../Enviroment/Base';



@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private _HttpClient:HttpClient) { }

  createComment(data:object):Observable<any>
  {
    return this._HttpClient.post(`${baseURL.Base}/comments`,data)
  }

  getPostComment(id:string):Observable<any>
  {
    return this._HttpClient.get(`${baseURL.Base}/posts/${id}/comments`)
  }

  updateComment(data:object,id:string):Observable<any>
  {
    return this._HttpClient.put(`${baseURL.Base}/comments/${id}`,data)
  }

  deleteComment(id:string):Observable<any>
  {
    return this._HttpClient.delete(`${baseURL.Base}/comments/${id}`)
  }

}
