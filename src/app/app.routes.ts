import { Routes, CanActivateFn } from '@angular/router';
import { LoginComponent } from './layout/pages/login/login/login.component';
import { RegisterComponent } from './layout/pages/Register/register/register.component';
import { NotFoundComponent } from './layout/Additions/notFound/not-found/not-found.component';
import { authGuardGuard } from './shared/guards/auth-guard.guard';
import { TimelineComponent } from './layout/pages/home/timeline/timeline.component';
import { ChangePassComponent } from './layout/Additions/changePass/change-pass/change-pass.component';



export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'home',component:TimelineComponent , canActivate : [authGuardGuard]},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'changePass',component:ChangePassComponent},
    {path:'**',component:NotFoundComponent},
];
