import { HttpClient, HttpHeaders } from "@angular/common/http";
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
    isRegistered = true; //this property is for canActivate but now we do not require this
    profilePic: string;

    constructor(private http: HttpClient) { }


    login(email: string, password: string) {
        this.isAuthenticated = true;

        // send profile picture image to header and profile page using profilePictureService
        //this.profilePic = "https://cdn.dribbble.com/users/1162077/screenshots/7475318/media/8837a0ae1265548e27a2b2bb3ab1f366.png"
    }

    register(registrationValues: any) {
        this.isRegistered = true;
        return this.http.post('http://localhost:10686/api/Users', registrationValues)
    }

    fetchUserRoles() {
        return this.http.get('http://localhost:10686/api/Roles')
    }
}