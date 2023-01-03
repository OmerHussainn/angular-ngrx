import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  Firestore,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  DocumentData,
  CollectionReference,
  QuerySnapshot,
} from 'firebase/firestore';
import { Subject, observable, Observable, of, from } from 'rxjs';
import { environment } from '../environments/environment';
import { Message } from '../app/messages/store/model/message.model';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  db: Firestore;
  messages: CollectionReference<DocumentData>;
  private updatedSnapshot = new Subject<QuerySnapshot<DocumentData>>();
  obsr_UpdatedSnapshot = this.updatedSnapshot.asObservable();
  messageCollectiondata: { name: string; email: string }[] | any = [];
  constructor() {
    initializeApp(environment.firebaseConfig);
    this.db = getFirestore();
    this.messages = collection(this.db, 'Messages');
  }
  getMessages(): Observable<Message[]> {
    return from(
      (async () => {
        const snapshot = await getDocs(this.messages);
        this.updateStudentCollection(snapshot);
        this.messageCollectiondata.sort(function (
          x: { date: any },
          y: { date: any }
        ) {
          return x.date - y.date;
        });
        return this.messageCollectiondata;
      })()
    );
  }

  updateStudentCollection(snapshot: QuerySnapshot<DocumentData>) {
    this.messageCollectiondata = [];
    snapshot.docs.forEach((student) => {
      this.messageCollectiondata.push({ ...student.data(), id: student.id });
    });
  }

  async addMessage(message: any) {
    let messageId = this.getIncrementedId();
    let name = message.name;
    let userMessage = message.message;
    let date = message.date;
    await addDoc(this.messages, {
      messageId,
      name,
      userMessage,
      date,
    });
    return;
  }
  getIncrementedId() {
    let max = 1;
    this.getMessages();
    if (this.messageCollectiondata.length) {
      this.messageCollectiondata.forEach((element: { messageId: number }) => {
        if (element.messageId > max) max = element.messageId;
      });
      return max + 1;
    }
    return 1;
  }
}
