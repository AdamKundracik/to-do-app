import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ListsComponent} from "../core/lists/lists.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  {
    path: "sign-in",
    component: SignInComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class AuthRoutingModule { }
