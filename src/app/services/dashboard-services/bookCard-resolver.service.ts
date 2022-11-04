import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { BookDataBaseService } from "./bookDatabase.service";
import { GetGraphDataModel } from "src/app/models/getGraphData.model";

@Injectable({
    providedIn: 'root'
})

export class BookCardResolverService implements Resolve<GetGraphDataModel>{

    constructor(private bookDatabaseService: BookDataBaseService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<GetGraphDataModel> | Promise<GetGraphDataModel> | GetGraphDataModel {
        return this.bookDatabaseService.getGraphData();
    }

}