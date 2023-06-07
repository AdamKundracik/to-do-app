import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Category} from "../../models/category.model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";

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
}
