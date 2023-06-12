import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {matchValidator} from "./validator/register-validators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
  }

  public signUpForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25),
      matchValidator('againPassword', true)
    ]],
    againPassword: ['', [
      Validators.required,
      matchValidator('password')
    ]],
  })

  ngOnInit(): void {
  }

  public signUp(): void {
    if (this.signUpForm.valid) {
      const email = this.signUpForm.get('email')?.value;
      const password = this.signUpForm.get('password')?.value;
      this.authService.SignUp(email, password).then(value => {
        this.router.navigate(['sign-in']);
      })
    }
  }
}
