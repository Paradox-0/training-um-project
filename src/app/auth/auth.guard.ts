import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: "root"
})

export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        //const isAuth = this.authService.isAuthenticated;
        const isReg = this.authService.isRegistered;
        // if (isAuth) {
        //     return true;
        // } else 
        if (isReg) {
            return true;
        }
        return this.router.createUrlTree(['/register']);
    }
}