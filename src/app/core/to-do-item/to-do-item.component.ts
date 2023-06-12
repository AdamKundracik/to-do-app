import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToDoService} from "../../shared/services/to-do.service";
import {ToDoList} from "../../shared/models/to-do-list.model";

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.scss']
})
export class ToDoItemComponent implements OnInit {

  @Output() deletedItem = new EventEmitter<ToDoList>();
  @Output() changedItem = new EventEmitter<{ id: string, value: boolean }>();

  @Input() title: string = "";
  @Input() text: string = "";
  @Input() until: Date = new Date();
  @Input() id: string = "";
  @Input() categoryId: string = "";
  @Input() isDone: boolean = false;

  constructor(
    private readonly toDoService: ToDoService
  ) {
  }

  ngOnInit(): void {
  }

  public onDelete(itemId: string) {
    console.log(itemId);
    this.toDoService.deleteToDoItem(this.categoryId, itemId).subscribe({
      next: value => {
        this.deletedItem.emit(value);
      }
    });
  }

  public onMarkAsDone(id: string, value: boolean) {
    this.changedItem.emit({id: id, value: value});
  }
}
