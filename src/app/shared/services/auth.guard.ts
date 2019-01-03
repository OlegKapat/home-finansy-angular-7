
import { CanActivate,CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild{
    constructor( private authService:AuthService, private router:Router){}
    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean{
            if(this.authService.isLogedIn()){
                return true;
            }
            else{
                this.router.navigate(['/login'], {
                    queryParams:{accessDenied:true}
                });
                return false;
            }
    }
    canActivateChild(childRoure:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean{
        return this.canActivate(childRoure,state);
    }

}