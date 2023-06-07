import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Category} from "../../models/category.model";

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {

  private _categoryData: Category[] = [];
  get categoryData() {
    return this._categoryData;
  }
  @Input() set categoryData(categoryData: Category[]) {
    if (categoryData) {
      this._categoryData = categoryData;
      console.log("getter",this.categoryData);
      this.openedCategory = this.categoryData.find(category => category.id = this.id);
    }
  }
  @Input() id: string = '';

  public openedCategory?: Category;
  constructor(
  ) { }

  ngOnInit(): void {
  }



}
