import { Component, OnInit } from '@angular/core';
import { PasswordService } from 'src/app/services/passwordGenerator.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  passwordC: string;
  constructor(private passwordService: PasswordService) { }

  ngOnInit(): void {
    this.passwordService.password.subscribe(pass => {
      this.passwordC = pass;
    })
  }

  copyToClip() {
    navigator.clipboard.writeText(this.passwordC);
  }

}
