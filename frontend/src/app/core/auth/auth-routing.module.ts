import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from "@core/auth/auth.component";
import { LoginComponent } from "@core/auth/components/login/login.component";
import { ForgotPasswordComponent } from "@core/auth/components/forgot-password/forgot-password.component";
import { CreatePasswordComponent } from "@core/auth/components/create-password/create-password.component";
import { RegisterComponent } from "@core/auth/components/register/register.component";

const routes: Routes = [
  {path: '', component: AuthComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'create-password/:token', component: CreatePasswordComponent},
      {path: 'reset-password/:token', component: CreatePasswordComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
