import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './shared/services/users.service';
import { AuthService } from './shared/services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './shared/services/auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule
    ],
  providers: [UserService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
