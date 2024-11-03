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
import {provideNativeDateAdapter} from '@angular/material/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../../shared/services/user/authentication.service';


@Component({
  selector: 'app-register',
  standalone: true,
  providers:[provideNativeDateAdapter(),NgModel],
  imports: [RouterLink,ReactiveFormsModule,MatCardModule,FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCheckboxModule, FormsModule, MatRadioModule,MatFormFieldModule, MatInputModule, MatDatepickerModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {

  readonly checked = model(false);
  readonly indeterminate = model(false);
  readonly labelPosition = model<'female' | 'male'>('male');
  readonly disabled = model(false);

  errMessage : string = ''

  isLoading:boolean=false ;

  constructor(private _AuthenticationService:AuthenticationService,private _Router:Router){}


  registerForm:FormGroup=new FormGroup({
    name: new FormControl (null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email : new FormControl(null,[Validators.required,Validators.email]),
    password : new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    rePassword: new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    dateOfBirth: new FormControl(null,[Validators.required]),
    gender:new FormControl(null,[Validators.required])
  },this.confirmPAssword)

  confirmPAssword(g:any)
  {
    if(  g.get('password').value === g.get('rePassword').value  )
    {
      return null
    }
    else
    {
      return {passMatched : true}
    }
  }
  

  registerSubmit(){

    this.isLoading=true

    this._AuthenticationService.signUp(this.registerForm.value).subscribe(
      {

        

          next:(res)=>{

            console.log(res);
            this.isLoading=false
            this._Router.navigate(['login'])
            
          },
          error:(err)=>{

            console.log(err);
            this.isLoading=false
            this.errMessage = err.error.error;

            
          }
      }
    )

   
    
  }


}
