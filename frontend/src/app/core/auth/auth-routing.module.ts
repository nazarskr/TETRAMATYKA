import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from "@core/auth/auth.component";
import { LoginComponent } from "@core/auth/components/login/login.component";
import { ForgotPasswordComponent } from "@core/auth/components/forgot-password/forgot-password.component";
import { RegisterComponent } from "@core/auth/components/register/register.component";
import { NewPasswordComponent } from "@core/auth/components/new-password/new-password.component";
import { GoogleLoginResultComponent } from "@core/auth/components/google-login-result/google-login-result.component";

const routes: Routes = [
  {path: '', component: AuthComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'new-password/:token', component: NewPasswordComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: 'google-login/success/:token', component: GoogleLoginResultComponent},
      {path: 'google-login/failure', component: GoogleLoginResultComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
