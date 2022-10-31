import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: "root"
})

export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        //const isAuth = this.authService.isAuthenticated;
        // const isReg = this.authService.isRegistered;
        // if (isAuth) {
        //     return true;
        // }
        //else 
        //if (isReg) {
        //    return true;
        //}
        //return this.router.createUrlTree(['/register']);

        return this.authService.user.pipe(
            take(1),
            map(user => {
                const isAuth = !!user;
                console.log(!!user);
                if (isAuth) {
                    return true;
                }
                return this.router.createUrlTree(['/login']);

                //you can not use the below method (navigate) as it must return a boolean value or UrlTree 
                //  return this.router.navigate(['/login']);  
            })
        )

    }
}