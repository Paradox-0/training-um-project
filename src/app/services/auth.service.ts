import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


interface ResponseData {
    // data receiving from register api end point
}


@Injectable({
    providedIn: "root"
})
export class AuthService {
    isAuthenticated = false;
    isRegistered = true;
    profilePic: string;

    constructor(private http: HttpClient) { }


    login(email: string, password: string) {
        this.isAuthenticated = true;

        // send profile picture image to header and profile page using profilePictureService
        //this.profilePic = "https://cdn.dribbble.com/users/1162077/screenshots/7475318/media/8837a0ae1265548e27a2b2bb3ab1f366.png"
    }

    register() {
        this.isRegistered = true;
    }

    fetchUserRoles() {
        return this.http.get('https://localhost:44314/api/Roles')
    }
}