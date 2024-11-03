import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../../shared/services/user/authentication.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {

  constructor(private _AuthenticationService:AuthenticationService,private _Router:Router) { }

  isLogin : boolean = false

  ngOnInit(): void {

    this._AuthenticationService.userData.subscribe(()=>{

      if ( this._AuthenticationService.userData.getValue() == null) {
        this.isLogin = false
      }
      else{
       this.isLogin=true
      }

    })

  }

  LogOut(){
    localStorage.removeItem('userToken'),
    this._AuthenticationService.userData.next(null)
    this._Router.navigate(['/login'])
  }
}
