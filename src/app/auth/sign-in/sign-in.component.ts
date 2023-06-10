import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(
    private readonly fb: FormBuilder,
    private readonly  authService: AuthService,
    private readonly router: Router,
  ) { }

  public signInForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  ngOnInit(): void {
  }

  public signIn(): void {
    console.log(this.signInForm.value)
    if (this.signInForm.valid) {
      const email = this.signInForm.get('email')?.value;
      const password = this.signInForm.get('password')?.value;
      this.authService.SignIn(email, password).then(value => {
        this.router.navigate(['categories']);
      })
    }
  }

}
