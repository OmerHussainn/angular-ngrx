import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as MessageActions from '../action/message.action';
import { of, from } from 'rxjs';
import { mergeMap, map, catchError, tap, switchMap } from 'rxjs/operators';
import { FirebaseService } from 'src/services/firebase.service';
import { Injectable } from '@angular/core';
import { Message } from '../model/message.model';

@Injectable()
export class Messageffects {
  constructor(private actions$: Actions, private firebase: FirebaseService) {}

  addMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessageActions.ADD_MESSAGE),
      mergeMap(({ message }) =>
        of(this.firebase.addMessage(message)).pipe(
          map(() => MessageActions.ADD_MESSAGE_SUCCESS({ message })),
          catchError((error) =>
            of(MessageActions.ADD_MESSAGE_FAILURE({ error }))
          )
        )
      )
    )
  );
  loadMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessageActions.Fetch_MESSAGES),
      switchMap(() =>
        from(this.firebase.getMessages()).pipe(
          map((message) => MessageActions.Fetch_MESSAGES_SUCCESS({ message })),
          catchError((error) =>
            of(MessageActions.Fetch_MESSAGES_FAILURE({ error }))
          )
        )
      )
    )
  );
}
