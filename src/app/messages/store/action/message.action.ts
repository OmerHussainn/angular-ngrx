import { Message } from '../model/message.model';
import { createAction, props } from '@ngrx/store';

export enum MessageActionTypes {
  Fetch_MESSAGES = '[MESSAGE] All Message List Request',
  Fetch_MESSAGES_SUCCESS = '[MESSAGE] All Message List Request Success',
  Fetch_MESSAGES_FAILURE = '[MESSAGE] All Message List Request Failed',
  ADD_MESSAGE = '[MESSAGE] Add Message',
  ADD_MESSAGE_SUCCESS = '[EMPLOYEE] Add Message Success',
  ADD_MESSAGE_FAILURE = '[EMPLOYEE] Add Message Failed',
}
export const ADD_MESSAGE = createAction(
  MessageActionTypes.ADD_MESSAGE,
  props<{ message: Message }>()
);

export const ADD_MESSAGE_SUCCESS = createAction(
  MessageActionTypes.ADD_MESSAGE_SUCCESS,
  props<{ message: Message }>()
);

export const ADD_MESSAGE_FAILURE = createAction(
  MessageActionTypes.ADD_MESSAGE_FAILURE,
  props<{ error: any }>()
);
export const Fetch_MESSAGES = createAction(MessageActionTypes.Fetch_MESSAGES);

export const Fetch_MESSAGES_SUCCESS = createAction(
  MessageActionTypes.Fetch_MESSAGES_SUCCESS,
  props<{ message: Message[] }>()
);

export const Fetch_MESSAGES_FAILURE = createAction(
  MessageActionTypes.Fetch_MESSAGES_FAILURE,
  props<{ error: any }>()
);
