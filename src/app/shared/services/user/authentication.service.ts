import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { baseURL } from '../../../Enviroment/Base';
import { Register, Login } from '../../interfaces/register';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  userData : BehaviorSubject<any> = new BehaviorSubject(null)

  constructor(private _HttpClient:HttpClient,private _Router:Router) {

   if (typeof localStorage !== 'undefined') {
    if (localStorage.getItem('userToken') != null) {
      this.userInform()
      this._Router.navigate(['/home'])
     }
   }
   }

  signUp(data:Register):Observable<any>
  {
    return this._HttpClient.post(`${baseURL.Base}/users/signup`,data)
  }

  signIn(data:Login):Observable<any>
  {
    return this._HttpClient.post(`${baseURL.Base}/users/signin`,data)
  }

  changePass(data:object):Observable<any>
  {
     return this._HttpClient.patch(`${baseURL.Base}/users/change-password`,data)
  }

  uploadPic(data:object):Observable<any>
  {
     return this._HttpClient.put(`${baseURL.Base}/users/upload-photo`,data)
  }

  loggedUserData():Observable<any>
  {
     return this._HttpClient.get(`${baseURL.Base}/users/profile-data`)
  }



  userInform(){
   this.userData.next(jwtDecode(JSON.stringify(localStorage.getItem('userToken')))) ;
   console.log(this.userData.getValue());
  }

}
