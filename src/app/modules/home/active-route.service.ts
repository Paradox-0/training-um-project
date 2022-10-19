import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ActiveRouteService {
    activeDashboard = new Subject<boolean>();
}