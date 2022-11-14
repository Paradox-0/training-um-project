import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BarChartModel } from "src/app/models/barChart.model";
import { BookCardModel } from "src/app/models/bookCard.model";


const bookCardURL = "http://localhost:29507/api/DashboardCount/Count";
const barChartURL = "http://localhost:29507/api/DashboardCategory/CategoryDetails";
const table1URL = "http://localhost:29507/api/DashboardBook/BookDetails";


@Injectable({
    providedIn: "root"
})

export class BookDataBaseService {
    constructor(private http: HttpClient) { }


    //injecting fetched bookDatabase to render-table component and dashboard-component
    fetchBookDataBase() {
        return this.http.get(table1URL)
    }
    getBookCardData() {
        return this.http.get<BookCardModel>(bookCardURL)
    }
    getBarChartData() {
        //'http://localhost:10686/api/Users/GetGraphData'
        return this.http.get<BarChartModel>(barChartURL);
    }

}