import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListsComponent} from './lists/lists.component';
import {ToDoItemComponent} from './to-do-item/to-do-item.component';
import {CategoryItemComponent} from './category-item/category-item.component';
import {CoreRoutingModule} from "./core-routing.module";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ToDoListComponent} from './lists/to-do-list/to-do-list.component';
import {ToDoCategoryComponent} from './lists/to-do-category/to-do-category.component';
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTooltipModule} from "@angular/material/tooltip";


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
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
  ]
})
export class CoreModule {
}
