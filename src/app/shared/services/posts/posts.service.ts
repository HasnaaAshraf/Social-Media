import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from '../../../Enviroment/Base';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private _HttpClient:HttpClient) { }

  createPost(data:object):Observable<any>
  {
    return this._HttpClient.post(`${baseURL.Base}/posts`,data)
  }

  getAllPosts():Observable<any>
  {
    return this._HttpClient.get(`${baseURL.Base}/posts`)
  }

  getMyPosts():Observable<any>
  {
    return this._HttpClient.get(`${baseURL.Base}/users/664bcf3e33da217c4af21f00/posts`)
  }

  getSinglePosts(pId:string):Observable<any>
  {
    return this._HttpClient.get(`${baseURL.Base}/posts/${pId}`)
  }

  updatePosts(pId:string,data:object):Observable<any>
  {
    return this._HttpClient.put(`${baseURL.Base}/posts/${pId}`,data)
  }

  deletePosts(pId:string):Observable<any>
  {
    return this._HttpClient.delete(`${baseURL.Base}/posts/${pId}`)
  }




}
