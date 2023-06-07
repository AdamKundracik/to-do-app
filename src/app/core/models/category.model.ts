import {ToDoList} from "./toDoList.model";

export interface Category {
  id: string;
  title: string
  toDoList: ToDoList[];
}
