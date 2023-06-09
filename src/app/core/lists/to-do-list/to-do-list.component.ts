import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, EventEmitter,
  Input,
  OnInit, Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {Category} from "../../models/category.model";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToDoService} from "../../shared/services/to-do.service";
import {ToDoList} from "../../models/toDoList.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListComponent implements OnInit {

  get categoryData() {
    return this._categoryData;
  }

  /*Inputs*/
  @Input() set categoryData(categoryData: Category[]) {
    if (categoryData) {
      this._categoryData = categoryData;
      console.log("getter",this.categoryData);
      this.openedCategory = this.categoryData.find(category => category.id === this.id);
    }
  }
  @Input() id: string = '';

  /*Outputs*/
  @Output() toDoItem = new EventEmitter<ToDoList>();
  @Output() deletedToDoItem= new EventEmitter<ToDoList>();

  /*Variables*/
  public openedCategory?: Category;
  private _categoryData: Category[] = [];

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
    private readonly cd: ChangeDetectorRef,
    private readonly toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    console.log(this.id)
  }

  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;


  openTempDialog() {
    const myTempDialog = this.dialog.open(this.dialogRef, {height: "350px", width: "400px"});
  }

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
      console.log("INVALID")
    }
  }


}
