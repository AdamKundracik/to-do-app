import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Category} from "../../models/category.model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {ToDoList} from "../../models/toDoList.model";

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private readonly MOCK_API = environment.MOCK_API;

  constructor(
    private http: HttpClient
  ) { }

  public getCategoriesWithList(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.MOCK_API}/toDoCategory`);
    }

  public createTaskInCategory(item: ToDoList, categoryId: string): Observable<ToDoList> {
    return this.http.post<ToDoList>(`${this.MOCK_API}/toDoCategory/${categoryId}/toDoItem`, item);
  }

  public deleteToDoItem(categoryId: string, itemId: string): Observable<ToDoList> {
    return this.http.delete<ToDoList>(`${this.MOCK_API}/toDoCategory/${categoryId}/toDoItem/${itemId}`);
  }

  public createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.MOCK_API}/toDoCategory`, category);
  }

}
