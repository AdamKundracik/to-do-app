import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this._isLoggedIn$.asObservable();

  private static TOKEN_KEY = `token`;
  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly router: Router,// Inject Firebase auth service
  private readonly toastr: ToastrService,

) {}

  getToken() {
    return localStorage.getItem(AuthService.TOKEN_KEY);
  }

  setToken(firebaseToken: string) {
    localStorage.setItem(AuthService.TOKEN_KEY, firebaseToken);
  }

  // Sign up with email/password
  public SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert('You have been successfully registered!');
        console.log(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
        this.toastr.error("Check if your email and password are correct")
      });
  }
  // Sign in with email/password
 public SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result?.user?.refreshToken) {
          this.setToken(result?.user?.refreshToken);
          this.toastr.success("Logged in");
          this._isLoggedIn$.next(true);
        }
      })
      .catch((error) => {
        window.alert(error.message);
        this.toastr.error("Error")
      });
  }

  logoutUser() {
    localStorage.removeItem(AuthService.TOKEN_KEY);
    this._isLoggedIn$.next(false);
    this.router.navigate(['/','auth','sign-in']);
    this.toastr.success("You have been logged out successfully");
  }

}