import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../../shared/services/user/authentication.service';


@Component({
  selector: 'app-login',
  standalone: true,
  providers:[NgModel],
  imports:  [RouterLink,ReactiveFormsModule,MatCardModule,FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCheckboxModule, MatRadioModule, MatDatepickerModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private _AuthenticationService:AuthenticationService,private _Router:Router){}

  errMessage:string=''

  isLoading:boolean=false

  loginForm:FormGroup=new FormGroup({
    email : new FormControl(null,[Validators.required,Validators.email]),
    password : new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    })

    loginSubmit(){

      this.isLoading=true

      this._AuthenticationService.signIn(this.loginForm.value).subscribe(
        {
            next:(res)=>{
              console.log(res);
              this.isLoading=false
              localStorage.setItem('userToken',res.token)
              this._AuthenticationService.userInform()
              this._Router.navigate(['home'])
              
            },
            error:(err)=>{

              console.log(err);
              this.isLoading=false
  
              this.errMessage = err.error.message;
  
              
            }
        }
      )
  
     
      
    }
}
