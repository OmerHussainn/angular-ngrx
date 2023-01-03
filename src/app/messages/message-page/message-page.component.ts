import { Component, OnInit } from '@angular/core';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Message } from '../store/model/message.model';
import { Store, select } from '@ngrx/store';
import { MessageAppState } from '../store/state';
import { ADD_MESSAGE, Fetch_MESSAGES } from '../store/action/message.action';
import { getMessages } from '../store/reducer/message.reducer';
export interface PeriodicElement {
  name: string;
  position: number;
  userMessage: number;
  symbol: string;
}
@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.scss'],
})
export class MessagePageComponent implements OnInit {
  
  
  displayedColumns: string[] = ['Id', 'Name', 'Message','Date'];
  userMessage: any = [];
  constructor(
    public dialog: MatDialog,
    private store: Store<MessageAppState>
  ) {}
  messageList: any = [];
  sortedMessageList: any = [];

  ngOnInit(): void {
    this.getMessages();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '500px',
      panelClass: 'my-dialog',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userMessage.name = result[0];
        this.userMessage.message = result[1];
        this.userMessage.date = new Date().getTime();
        this.addMessage(this.userMessage);
        this.userMessage = [];
      }
    });
  }
  getMessages() {
    this.store.dispatch(Fetch_MESSAGES());
    this.store.pipe(select(getMessages)).subscribe((res) => {
      this.messageList = res.messageList;
    });
  }
  addMessage(message: Message) {
    this.store.dispatch(ADD_MESSAGE({ message }));
    this.getMessages();
  }
}
