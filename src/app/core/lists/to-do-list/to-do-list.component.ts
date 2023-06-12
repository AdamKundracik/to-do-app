import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, EventEmitter,
  Input,
  OnInit, Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {Category} from "../../../shared/models/category.model";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToDoService} from "../../../shared/services/to-do.service";
import {ToDoList} from "../../../shared/models/to-do-list.model";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {FilterSelectionEnum} from "../../../shared/models/filter-selection.enum";
import {distinctUntilChanged, filter, map, Observable, Subject} from "rxjs";
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListComponent implements OnInit {


  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  /*Inputs*/
  @Input() set categoryData(categoryData: Category[]) {
    if (categoryData) {
      this._categoryData = categoryData;
      this.getFilter();
    }
  }

  @Input() id: string = '';

  /*Outputs*/
  @Output() toDoItem = new EventEmitter<ToDoList>();
  @Output() deletedToDoItem = new EventEmitter<ToDoList>();

  /* Variables*/
  public openedCategory?: Category;
  public doneItems?: ToDoList[];
  public activeItems?: ToDoList[];
  public filteringItem: string = 'All'
  public itemFilter$: Subject<string> = new Subject<string>();
  public filteredItems: ToDoList[] = [];
  public isFiltering: boolean = false;
  private _categoryData: Category[] = [];
  private _updatedItem?: ToDoList;

  get categoryData() {
    return this._categoryData;
  }

  public createTaskForm: FormGroup = this.fb.group({
    title: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
    isDone: new FormControl(false),
    doUntil: new FormControl(null, Validators.required),
    isExpired: new FormControl(false),
  })

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private readonly toDoService: ToDoService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly cd: ChangeDetectorRef
  ) {
  }

  /*LIFECYCLES*/
  ngOnInit(): void {
    this.toDoService.filteringItems$.subscribe({
      next: filter => {
        this.filteringItem = filter;
      }
    })

    this.itemFilter$.pipe(
      untilDestroyed(this),
      filter(value => value.length > 2 || value === ""),
      distinctUntilChanged(),
      map(value => value.trim().toLocaleLowerCase())
    ).subscribe(searchString => {
      if (searchString === '') {
        this.isFiltering = false;
        this.filteredItems = [];
      }
      else {
        this.isFiltering = true;
        switch (this.filteringItem) {
          case "All":
            if(this.activeItems && this.doneItems)
            this.filteredItems = [...this.activeItems, ...this.doneItems]
              .filter(item => item.title.toLowerCase().includes(searchString));
            console.log(this.filteredItems);
            break;
          case "Active":
            if(this.activeItems)
              this.filteredItems =this.activeItems.filter(item => item.title.toLowerCase().includes(searchString));
            break;
          case "Done":
            if(this.doneItems)
              this.filteredItems =this.doneItems.filter(item => item.title.toLowerCase().includes(searchString));
            break;
        }
      }
    });
  }


  /**
   * Opening mat-dialog
   *
   * @return {void}
   * */
  openTempDialog() {
    const myTempDialog = this.dialog.open(this.dialogRef, {height: "350px", width: "400px"});
  }

  /**
   * Form submission and creating new
   *
   * @return {void}
   * */
  public onCreateFormSubmit(): void {
    if (this.createTaskForm.valid) {
      const date = this.createTaskForm.get('doUntil')?.value
      const unixTime = Math.floor(date.getTime() / 1000) + 86399;
      console.log(unixTime);
      this.createTaskForm.get('doUntil')?.setValue(unixTime);
      this.toDoService.createTaskInCategory(this.createTaskForm.value, this.id).subscribe({
        next: value => {
          if (value) {
            this.toDoItem.emit(value);
            this.toastr.success("New item successfully added!");
            this.dialog.closeAll();
          }
        }
      });
    } else {
      this.toastr.error("Form is INVALID!")
    }
  }

  /**
   * Marking item as done or active with logic for rerendering items
   *
   * @param toDoItem  - object of type {id: string, value: boolean}
   *
   * @return {void}
   * */
  public markAsDone(toDoItem: { id: string, value: boolean }) {
    const item: ToDoList = this.openedCategory?.toDoList.find(val => val.id.toString() === toDoItem.id)!;

    this.toDoService.filteringItems$.subscribe({
      next: filter => {
        if (toDoItem.value) {
          const updatedActiveItem = this.activeItems?.filter(value => value.id !== item.id);
          this.activeItems = updatedActiveItem;
          this._updatedItem = {...item, isDone: true};
          this.doneItems?.push(this._updatedItem);
        } else {
          const updatedDoneItem = this.doneItems?.filter(value => value.id !== item.id);
          this.doneItems = updatedDoneItem;
          this._updatedItem = {...item, isDone: false};
          this.activeItems?.push(this._updatedItem);
        }
      }
    });

    this.toDoService.markToDoItemAsDone(this.openedCategory?.id!, toDoItem.id, this._updatedItem!).subscribe({
      next: value => {
        if (value) {

          if (value.isDone) {
            this.toastr.success("Marked as DONE!")
          } else {
            this.toastr.success("Marked as NOT DONE!")

          }

        } else {
          this.toastr.error("Something went wrong!")

        }
      }
    });
  }

  /**
   * Deletes given category using his ID
   *
   * @param categoryId  - id (string) of category
   *
   * @return {void}
   * */
  public onDeleteCategory(categoryId: string) {
    this.toDoService.deleteCategory(categoryId).subscribe({
      next: value => {
        this.router.navigate(['/', 'categories'])
        if (value) this.toastr.success("Category was DELETED!");
      }
    })
  }

  /**
   * Listens to change of Observable from service and modify data for filtering
   *
   * @return {void}
   * */
  private getFilter(): void {
    this.toDoService.filteringItems$.subscribe({
      next: filter => {
        this.filteringItem = filter;
        this.openedCategory = this.categoryData.find(category => category.id === this.id);
        if (filter === FilterSelectionEnum.Active) {
          const activeToDoItems: ToDoList[] = this.openedCategory?.toDoList.filter(item => item.isDone === false)!;
          const activeItemsCategory: Category = {...this.openedCategory!, toDoList: activeToDoItems};
          this.openedCategory = activeItemsCategory;
          this.doneItems = []
          this.activeItems = this.openedCategory?.toDoList.filter(item => item.isDone === false);
          this.cd.detectChanges();

        } else if (filter === FilterSelectionEnum.Done) {
          const doneToDoItems: ToDoList[] = this.openedCategory?.toDoList.filter(item => item.isDone === true)!
          const doneItemsCategory: Category = {...this.openedCategory!, toDoList: doneToDoItems};
          this.openedCategory = doneItemsCategory;
          this.doneItems = this.openedCategory?.toDoList.filter(item => item.isDone === true);
          this.activeItems = [];
          this.cd.detectChanges();

        } else {
          this.doneItems = this.openedCategory?.toDoList.filter(item => item.isDone === true);
          this.activeItems = this.openedCategory?.toDoList.filter(item => item.isDone === false);
          this.cd.detectChanges();
        }
      }
    });
  }

  public onFilterInput(value: string = ""): void {
    this.itemFilter$.next(value);
  }

  public clearFilter(filterInput: HTMLInputElement): void {
    filterInput.value = '';
    this.itemFilter$.next('');
  }

}
