import {ToDoList} from "./to-do-list.model";

export interface Category {
  id: string;
  title: string
  toDoList: ToDoList[];
}
