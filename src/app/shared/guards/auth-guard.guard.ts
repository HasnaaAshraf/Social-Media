import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/user/authentication.service';


export const authGuardGuard: CanActivateFn = (route, state) => {

  let _AuthService : AuthenticationService  = inject(AuthenticationService);

  let _Router : Router = inject(Router)

  if(typeof localStorage !== 'undefined')
  {
    if(localStorage.getItem('userToken') != null)
      {
    
        _AuthService.userInform()
        return true;
      }
      else
      {
        _Router.navigate(['login'])
        return false
      }
  }

  return false;

  

};
