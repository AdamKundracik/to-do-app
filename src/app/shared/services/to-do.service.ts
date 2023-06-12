import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Category} from "../models/category.model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {ToDoList} from "../models/to-do-list.model";
import {FilterSelectionEnum} from "../models/filter-selection.enum";

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private readonly MOCK_API = environment.MOCK_API;

  private _filteringItems$: BehaviorSubject<string> = new BehaviorSubject<string>(FilterSelectionEnum.All);
  public filteringItems$: Observable<string> = this._filteringItems$.asObservable();

  constructor(
    private http: HttpClient
  ) {
  }

  /*HANDLERS*/

  public setFilter(value: string): void {
    this._filteringItems$.next(value);
  }

  /*HTTP REQUESTS*/

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

  public markToDoItemAsDone(categoryId: string, id: string, item: ToDoList): Observable<ToDoList> {
    return this.http.put<ToDoList>(`${this.MOCK_API}/toDoCategory/${categoryId}/toDoItem/${id}`, item);
  }

  public deleteCategory(categoryId: string): Observable<Category> {
    return this.http.delete<Category>(`${this.MOCK_API}/toDoCategory/${categoryId}`);
  }

}
