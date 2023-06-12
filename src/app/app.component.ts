import {Component} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {FilterSelectionEnum} from "./shared/models/filter-selection.enum";
import {ToDoService} from "./shared/services/to-do.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'to-do-app';

  public isLoggedIn: boolean = false;
  public filterOptions: string[] = ["Active", "Done", "All"];

  public selectedFilter: string = "";

  constructor(
    public readonly authService: AuthService,
    private readonly toDoService: ToDoService
  ) {
    if (this.authService.getToken()) {
      this.isLoggedIn = !this.isLoggedIn;
    }
    this.toDoService.filteringItems$.subscribe({
      next: filter => {
        console.log("selectedFIlter", filter)
        this.selectedFilter = filter
      }
    })
  }

  public logoutUser(): void {
    this.authService.logoutUser();
  }


  public onChangeFilter(value: string) {
    // console.log(value)
    this.toDoService.setFilter(value);
  }
}
