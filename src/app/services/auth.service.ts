import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "../models/user.model";


interface LoginResponseData {
    // data receiving from login api end point
    // userName: string;
    // userId: number;
    // roleName?: any;
    // token: string;
    // profilePic: string;
    name: string;
    userId: number;
    token: string;
    ProfilePicPath: string;
    roleName?: any;
}

const userRolesURL = "http://localhost:29507/api/Roles";
const loginURL = "http://localhost:29507/api/Login";
const registerURL = "http://localhost:29507/api/Users";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    isAuthenticated = false;
    isRegistered = true; //this property is for canActivate but now we do not require this
    profilePic: string;
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient) { }

    //http://localhost:10686/api/Token
    login(email: string, password: string) {
        this.isAuthenticated = true;
        return this.http.post<LoginResponseData>(loginURL, {
            login: email,
            password: password
        })
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(
                        resData.name,
                        resData.userId,
                        resData.token,
                        resData.roleName
                    )
                })
            )


        // send profile picture image to header and profile page using profilePictureService
        //this.profilePic = "https://cdn.dribbble.com/users/1162077/screenshots/7475318/media/8837a0ae1265548e27a2b2bb3ab1f366.png"
    }


    autoLogin() {
        const userData: {
            userName: string,
            userId: number,
            _token: string,
            expirationDate: string,
            roleName: string
        } = JSON.parse(localStorage.getItem('userData'));
        console.log(userData);
        if (!userData) {
            console.log('no user');
            return;
        }

        const loadedUser = new User(
            userData.userName,
            userData.userId,
            userData._token,
            new Date(userData.expirationDate),
            userData.roleName
        );
        console.log(loadedUser);

        if (loadedUser.token) {
            this.user.next(loadedUser);
        }
    }

    //http://localhost:10686/api/Users
    register(registrationValues: any) {
        this.isRegistered = true;
        return this.http.post(registerURL, registrationValues)
    }
    //http://localhost:10686/api/Roles
    fetchUserRoles() {
        return this.http.get(userRolesURL)
    }

    onLogout() {
        localStorage.removeItem('userData');
        this.user.next(null);
    }

    private handleAuthentication(
        userName: string,
        userId: number,
        token: string,
        roleName?: string
    ) {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        console.log(expiry);
        const expirationDate = new Date(expiry * 1000);
        console.log(expirationDate);
        const user = new User(userName, userId, token, expirationDate, roleName);
        localStorage.setItem('userData', JSON.stringify(user));
        console.log(user);
        this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'Oops, something went wrong. Please try again later';
        if (errorRes.statusText !== "Bad Request") {
            return throwError(() => errorMessage);
        }
        else {
            errorMessage = "Invalid Credentials";
        }
        return throwError(() => errorMessage);
    }
}