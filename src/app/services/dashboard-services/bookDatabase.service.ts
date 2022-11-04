import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GetGraphDataModel } from "src/app/models/getGraphData.model";

@Injectable({
    providedIn: "root"
})

export class BookDataBaseService {
    constructor(private http: HttpClient) { }


    //injecting fetched bookDatabase to render-table component and dashboard-component
    fetchBookDataBase() {
        return this.http.get('apiURLforbookdatabase/path')
    }

    getGraphData() {
        return this.http.get<GetGraphDataModel>('http://localhost:10686/api/Users/GetGraphData');
    }
}