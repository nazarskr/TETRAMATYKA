import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from "@core/auth/auth.component";
import { LoginComponent } from "@core/auth/components/login/login.component";
import { RegisterComponent } from "@core/auth/components/register/register.component";
import { ForgotPasswordComponent } from "@core/auth/components/forgot-password/forgot-password.component";

const routes: Routes = [
  {path: '', component: AuthComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'register/:token', component: RegisterComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
