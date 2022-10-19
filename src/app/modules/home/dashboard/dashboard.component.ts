import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BooksDetailService } from 'src/app/utility/books-details.service';
import { ActiveRouteService } from '../active-route.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  totalBooks: any = 500;
  totalAuthors: any = 150;
  booksWrittenInLast1Y: any = 400;
  alertFordeleteBook = false;
  forCopyingBook = false;
  copyNoOfPages: number;
  newBook: any;
  copyBookForm: FormGroup;
  // tableColumns = ['Book Ref.no.', 'Title (Volume)', 'Authors', 'Category (Sub-Category)', 'Total Pages', 'Actions'];

  // alertFordeleteBook :- this property is for opening and closing of modal when deleting book.

  // forcopyingBook :- this property is for opening and closing of modal when copying book

  //copyNoOfPages :- this property used when user enters new total number of pages for adding new volume. (It store new total no. of pages.)

  // newBook :- this is an object for storing new values and then appending them into original object.

  bookDatabase: any = [
    { booksrefno: 1, title: 'The Dhandho', volume: 1, author: 'Mohnish pabrai', category: 'Finance', totalpages: 320 },
    { booksrefno: 2, title: 'Atomic Habits', volume: 1, author: 'James Clear', category: 'Self-help', totalpages: 450 },
    { booksrefno: 1, title: 'The Dhandho', volume: 2, author: 'Mohnish pabrai', category: 'Finance', totalpages: 300 },
    { booksrefno: 1, title: 'The Dhandho', volume: 3, author: 'Mohnish pabrai', category: 'Finance', totalpages: 150 }
  ]

  constructor(private booksDetailService: BooksDetailService, private activeRouteService: ActiveRouteService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.copyBookForm = new FormGroup({
      'pages': new FormControl(50)
    })

    // fetch the books details from api
    this.activeRouteService.activeDashboard.next(true);
  }

  ngOnDestroy() {
    this.activeRouteService.activeDashboard.next(false);
  }


  copyBook(index: number) {
    let newVolume: any;
    this.forCopyingBook = true;
    // this.newBook = this.bookDatabase.slice()[index];

    this.newBook = {
      booksrefno: this.bookDatabase[index].booksrefno,
      title: this.bookDatabase[index].title,
      volume: this.bookDatabase[index].volume,
      author: this.bookDatabase[index].author,
      category: this.bookDatabase[index].category, totalpages: this.bookDatabase[index].totalpages
    };

    //logic for checking last volume
    for (let i = 0; i < this.bookDatabase.length; i++) {
      if (this.bookDatabase[index].title === this.bookDatabase[i].title) {
        if (this.bookDatabase[index].volume < this.bookDatabase[i].volume || this.bookDatabase[index].volume == this.bookDatabase[i].volume) {
          newVolume = this.bookDatabase[i].volume;
          console.log(newVolume);
        }
      }
    }

    this.newBook.volume = newVolume;

    console.log(this.newBook)
  }

  copyBookData(copyForm: HTMLInputElement) {
    console.log(copyForm.value);
    this.newBook.volume++;
    this.newBook.totalpages = copyForm.value;
    console.log(this.newBook);
    this.bookDatabase.push(this.newBook);
    copyForm.value = null;
    this.forCopyingBook = false;

  }

  // logic for deleting book while checking its volume is higher than the available same book volumes

  deleteBook(index: number) {

    // let bookDatabase2 = this.bookDatabase.slice();
    // bookDatabase2.splice(index, 1);
    // console.log(bookDatabase2);
    for (let i = 0; i < this.bookDatabase.length; i++) {
      if (this.bookDatabase[index].title === this.bookDatabase[i].title) {
        if (this.bookDatabase[index].volume < this.bookDatabase[i].volume) {
          // alert('You can not delete lower volume first');
          this.alertFordeleteBook = true;
          return;
        }
      }
    }

    this.toastr.success('Deleted Successfully', `${this.bookDatabase[index].title}(${this.bookDatabase[index].volume})`, {
      timeOut: 3000,
      positionClass: 'toast-bottom-center',
      newestOnTop: true
    });

    this.bookDatabase.splice(index, 1);
  }




}
