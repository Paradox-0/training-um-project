import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Subscription } from 'rxjs';
import { BookDataBaseService } from 'src/app/services/dashboard-services/bookDatabase.service';




@Component({
  selector: 'app-render-table',
  templateUrl: './render-table.component.html',
  styleUrls: ['./render-table.component.css']
})
export class RenderTableComponent implements OnInit, OnDestroy {
  //booksDatabase: any;
  total: number;
  loading: boolean = false;
  bookDataBaseSubscription: Subscription;

  //we will store booksdata from booksDatabase into below array
  booksData: any = [
    { booksrefno: 1, title: 'The Dhandho', volume: 1, author: 'Mohnish pabrai', category: 'Finance', totalpages: 320 },
    { booksrefno: 2, title: 'Atomic Habits', volume: 1, author: 'James Clear', category: 'Self-help', totalpages: 450 },
    { booksrefno: 1, title: 'The Dhandho', volume: 2, author: 'Mohnish pabrai', category: 'Finance', totalpages: 300 },
    { booksrefno: 1, title: 'The Dhandho', volume: 3, author: 'Mohnish pabrai', category: 'Finance', totalpages: 150 }
  ];

  constructor(private bookDataBaseService: BookDataBaseService) { }

  ngOnInit(): void {

  }


  refresh(state: ClrDatagridStateInterface) {
    this.loading = false;
    // We convert the filters from an array to a map,
    // because that's what our backend-calling service is expecting
    let filters: { [prop: string]: any[] } = {};
    if (state.filters) {
      for (let filter of state.filters) {
        let { property, value } = <{ property: string, value: string }>filter;
        filters[property] = [value];
      }
    }
    // fetching books data from BookDataBaseService
    this.bookDataBaseSubscription = this.bookDataBaseService.fetchBookDataBase().subscribe(booksData => {
      this.booksData = booksData;
      this.total = 10;
      console.log(booksData);
    })
  }


  copyBook(index: number) {

  }

  deleteBook(index: number) {
  }



  ngOnDestroy() {
    this.bookDataBaseSubscription.unsubscribe();
  }

}
