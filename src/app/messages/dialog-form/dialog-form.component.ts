import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss'],
})
export class DialogFormComponent implements OnInit {
  name: string = '';
  message: string = '';
  messageAdded: string = 'Message Add Successfully';
  cancel: string = 'hide';
  discarded = 'cancelled Successfully';
  isDisabled: boolean = true;
  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}
  onKeyName(event: any) {
    this.name = event.target.value;
    this.disabledButton()
  }
  onKeyTextarea(event: any) {
    this.message = event.target.value;
    this.disabledButton()
  }
  disabledButton() {
    if (this.name && this.message) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
