import {Component, Input, OnInit} from '@angular/core';
import {Category} from "../../models/category.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-to-do-category',
  templateUrl: './to-do-category.component.html',
  styleUrls: ['./to-do-category.component.scss']
})
export class ToDoCategoryComponent implements OnInit {

  @Input() categoryData: Category[] = [];

  constructor(
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  public navigateToCategory(id: string): void {
    this.router.navigateByUrl(`${id}`)
  }

}
