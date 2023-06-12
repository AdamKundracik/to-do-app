import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Category} from "../../../shared/models/category.model";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToDoService} from "../../../shared/services/to-do.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-to-do-category',
  templateUrl: './to-do-category.component.html',
  styleUrls: ['./to-do-category.component.scss']
})
export class ToDoCategoryComponent implements OnInit {

  @Output() addedCategory = new EventEmitter<Category>();

  @Input() categoryData: Category[] = [];

  constructor(
    private readonly router: Router,
    public dialog: MatDialog,
    private readonly fb: FormBuilder,
    private readonly toDoService: ToDoService,
    private readonly toastr: ToastrService
  ) {
  }

  public createCategoryForm: FormGroup = this.fb.group({
    title: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
  }

  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;


  openTempDialog() {
    const myTempDialog = this.dialog.open(this.dialogRef, {height: "200px", width: "400px"});
  }

  public navigateToCategory(id: string): void {
    this.router.navigateByUrl(`categories/${id}`);
  }

  public onCategoryCreate() {
    if (this.createCategoryForm.valid) {
      this.toDoService.createCategory(this.createCategoryForm.value).subscribe({
        next: value => {
          this.addedCategory.emit(value);
          this.toastr.success("Category CREATED!");
          this.dialog.closeAll();
        }
      })
    } else {
      this.toastr.error("Form is INVALID!")

    }
  }

}
