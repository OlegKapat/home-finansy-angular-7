import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { LoaderComponent } from '../shared/components/loader/loader.component';



@NgModule({
    declarations: [LoginComponent, RegistrationComponent, AuthComponent,NotFoundComponent],
    imports: [
        CommonModule, AuthRoutingModule, ReactiveFormsModule, FormsModule
    ]
})

export class AuthModule {}
