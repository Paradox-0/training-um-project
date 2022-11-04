import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})

export class CanLoadAuthGuard implements CanLoad {

    constructor(private authService: AuthService, private router: Router) { }

    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.user.pipe(
            take(1),
            map(user => {
                const isAuth = !!user;
                console.log(!!user);
                if (isAuth) {
                    return true;
                }
                return this.router.createUrlTree(['/login'])

                //we can not use the navigate method as it must return a boolean value or UrlTree
            })
        )
    }

}