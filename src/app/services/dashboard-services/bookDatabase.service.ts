import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class BookDataBaseService {
    constructor(private http: HttpClient) { }


    //injecting fetched bookDatabase to render-table component and dashboard-component
    fetchBookDataBase() {
        return this.http.get('apiURLforbookdatabase/path')
    }
}