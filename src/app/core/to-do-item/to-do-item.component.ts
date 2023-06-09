import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToDoService} from "../shared/services/to-do.service";
import {ToDoList} from "../models/toDoList.model";

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.scss']
})
export class ToDoItemComponent implements OnInit {

  @Output() deletedItem = new EventEmitter<ToDoList>();

  @Input() title: string = "";
  @Input() text: string = "";
  @Input() until: Date = new Date();
  @Input() id: string = "";
  @Input() categoryId: string = "";

  constructor(
    private readonly toDoService: ToDoService
  ) { }

  ngOnInit(): void {
  }

  public onDelete(itemId: string) {
    console.log(itemId);
    this.toDoService.deleteToDoItem(this.categoryId ,itemId).subscribe({
      next: value => {
        this.deletedItem.emit(value);
      }
    });
  }
}
