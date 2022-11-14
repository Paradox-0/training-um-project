import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from './animation';
//import '@cds/core/icon/register.js';
//import { ClarityIcons, userIcon } from '@cds/core/icon';

//ClarityIcons.addIcons(userIcon);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [slideInAnimation]
})
export class HomeComponent implements OnInit {

  constructor(private contexts: ChildrenOutletContexts) { }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  ngOnInit(): void {
  }

}

