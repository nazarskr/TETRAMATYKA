import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from "@core/auth/auth.component";
import { LoginComponent } from "@core/auth/components/login/login.component";
import { ForgotPasswordComponent } from "@core/auth/components/forgot-password/forgot-password.component";
import { CreatePasswordComponent } from "@core/auth/components/create-password/create-password.component";

const routes: Routes = [
  {path: '', component: AuthComponent, children: [
      {path: 'login', component: LoginComponent},
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
