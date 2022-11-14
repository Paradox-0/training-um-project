import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { catchError, Observable } from "rxjs";
import { BookDataBaseService } from "../services/dashboard-services/bookDatabase.service";
import { ToastrService } from "ngx-toastr";
import { BookCardModel } from "../models/bookCard.model";


@Injectable({
    providedIn: 'root'
})

export class BookCardResolverGuard implements Resolve<BookCardModel>{

    constructor(private bookDatabaseService: BookDataBaseService, private toastr: ToastrService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<BookCardModel> | Promise<BookCardModel> | BookCardModel {
        return this.bookDatabaseService.getBookCardData()
            .pipe(
                catchError(err => {
                    this.toastr.error(`Couldn't load Dashboard`);
                    console.log(err);
                    throw 'error in source. Details: ' + err;
                }))
    }

}