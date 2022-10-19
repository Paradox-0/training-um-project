import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class PasswordService {
    password = new BehaviorSubject<string>(null);
    //password = '';
    public generatePassword() {
        return this.password.next(Math.random().toString(36).slice(-8));
    }
}