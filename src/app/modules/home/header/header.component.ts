import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ActiveRouteService } from '../active-route.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  avatar: string = "../../../assets/defaultProfile.png";
  username: string = "Paradox";
  role: string = "Admin";
  photo: string;
  activeDashboard: any;

  constructor(private router: Router, private authService: AuthService, private activeRouteService: ActiveRouteService) { }

  ngOnInit(): void {
    //this.avatar  = this.authService.profilePic;

    //taking activeDashboard value from dashboard through activeRouteService
    this.activeRouteService.activeDashboard.subscribe(activity => {
      this.activeDashboard = activity;
    })
  }


  logout() {
    console.log("you are logging out");
    //change afterwards so that user can logout
    this.router.navigate(['/login']);
  }

}
