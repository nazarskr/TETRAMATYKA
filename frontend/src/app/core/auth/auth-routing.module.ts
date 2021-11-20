import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from "@core/auth/auth.component";
import { LoginComponent } from "@core/auth/components/login/login.component";
import { ForgotPasswordComponent } from "@core/auth/components/forgot-password/forgot-password.component";
import { NewPasswordComponent } from "@core/auth/components/new-password/new-password.component";

const routes: Routes = [
  {path: '', component: AuthComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'new-password/:token', component: NewPasswordComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
