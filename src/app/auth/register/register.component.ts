import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

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
    email: ['', Validators.required],
    password: ['', Validators.required]
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
