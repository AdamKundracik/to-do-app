import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ToDoService} from "../shared/services/to-do.service";
import {Category} from "../models/category.model";

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
}
