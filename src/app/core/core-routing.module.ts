import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ListsComponent} from "./lists/lists.component";

const routes: Routes = [
  {
    path: "categories",
    component: ListsComponent
  },
  {
    path: "categories/:id",
    component: ListsComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: "categories",
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
