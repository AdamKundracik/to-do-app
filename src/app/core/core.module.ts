import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './lists/lists.component';
import { ToDoItemComponent } from './to-do-item/to-do-item.component';
import { CategoryItemComponent } from './category-item/category-item.component';
import {CoreRoutingModule} from "./core-routing.module";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ToDoListComponent } from './lists/to-do-list/to-do-list.component';
import { ToDoCategoryComponent } from './lists/to-do-category/to-do-category.component';
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    ListsComponent,
    ToDoItemComponent,
    CategoryItemComponent,
    ToDoListComponent,
    ToDoCategoryComponent,

  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatCheckboxModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule
  ]
})
export class CoreModule { }
