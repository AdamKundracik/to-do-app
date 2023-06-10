import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from "./core/core.module";
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {ToastrModule} from "ngx-toastr";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import {environment} from "../environments/environment";
import {AuthModule} from "./auth/auth.module";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        AuthModule,
        NoopAnimationsModule,
        MatIconModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot({
                positionClass: 'toast-bottom-right'
            }
        ),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        MatButtonModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
