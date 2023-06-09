import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ToDoService} from "../shared/services/to-do.service";
import {Category} from "../models/category.model";
import {ToDoList} from "../models/toDoList.model";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  public param: string = "";
  public categoryData: Category[] = [];
  constructor(
    private route: ActivatedRoute,
    private toDoService: ToDoService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.param = params.get('id')!;
      }
    });

    this.toDoService.getCategoriesWithList().subscribe({
      next: value => {
        this.categoryData = value;
        console.log("DATA",this.categoryData);
      }
    })
  }

  public addToList(item: ToDoList) {
    const categoryIndex = this.categoryData.findIndex(ctg => ctg.id === this.param);

    if (categoryIndex !== -1) {
      const category = this.categoryData[categoryIndex];
      const updatedToDoList = [...category.toDoList, item];
      const updatedCategory = { ...category, toDoList: updatedToDoList };
      const updatedCategoryData = [...this.categoryData];
      updatedCategoryData[categoryIndex] = updatedCategory;
      this.categoryData = updatedCategoryData;
    }
  }

  public deleteFromList(deletedItem: ToDoList) {
    const categoryIndex = this.categoryData.findIndex(ctg => ctg.id === this.param);

    if (categoryIndex !== -1) {
      const category = this.categoryData[categoryIndex];
      const updatedToDoList = category.toDoList.filter(item => item.id !== deletedItem.id);
      const updatedCategory = { ...category, toDoList: updatedToDoList };
      const updatedCategoryData = [...this.categoryData];
      updatedCategoryData[categoryIndex] = updatedCategory;
      this.categoryData = updatedCategoryData;
    }
  }

  addToCategories(category: Category) {
    this.categoryData.push(category);
  }
}
