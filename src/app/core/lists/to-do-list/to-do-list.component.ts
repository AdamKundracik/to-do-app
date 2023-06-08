import {Component, Input, OnChanges, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Category} from "../../models/category.model";
import {MatDialog} from "@angular/material/dialog";

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
      this.openedCategory = this.categoryData.find(category => category.id === this.id);
    }
  }
  @Input() id: string = '';

  public openedCategory?: Category;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.id)
  }

  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  myFooList = ['Some Item', 'Item Second', 'Other In Row', 'What to write', 'Blah To Do']



  openTempDialog() {
    const myTempDialog = this.dialog.open(this.dialogRef, { data: this.myFooList });
    myTempDialog.afterClosed().subscribe((res) => {

      // Data back from dialog
      console.log({ res });
    });
  }


}
