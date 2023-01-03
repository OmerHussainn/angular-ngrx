import { Message } from '../model/message.model';
import * as MessageActions from '../action/message.action';
import { createReducer, on, createSelector } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { MessageAppState } from '../state';

export const initialState = {
  name: '',
  message: '',
};

export const reducer = createReducer(
  initialState,
  on(
    MessageActions.Fetch_MESSAGES,
    (state) => (
      console.log('Fetch Message reducer called'),
      {
        ...state,
        loading: true,
      }
    )
  ),

  on(
    MessageActions.Fetch_MESSAGES_SUCCESS,
    (state, { message }) => (
      console.log('Fetch Message Success reducer called', message),
      {
        ...state,
        messageList: message,
        loading: false,
      }
    )
  ),

  on(
    MessageActions.ADD_MESSAGE_FAILURE,
    (state, { error }) => (
      console.log('Fetc Message Failure reducer called'),
      {
        ...state,
        error: error,
        loading: false,
      }
    )
  ),
  on(
    MessageActions.ADD_MESSAGE,
    (state) => (
      console.log('Add Message reducer called'),
      {
        ...state,
        loading: true,
      }
    )
  ),

  on(
    MessageActions.ADD_MESSAGE_SUCCESS,
    (state, { message }) => (
      console.log('Add Message Success reducer called'),
      {
        ...state,
        loading: false,
      }
    )
  ),

  on(
    MessageActions.ADD_MESSAGE_FAILURE,
    (state, { error }) => (
      console.log('Add Message Failure reducer called'),
      {
        ...state,
        error: error,
        loading: false,
      }
    )
  )
);
export function messageReducer(state: Message | undefined, action: Action) {
  return reducer(state, action);
}
const getMessagesFeatureState = (state: MessageAppState) => state.message;
export const getMessages = createSelector(
  getMessagesFeatureState,
  (state: any) => state
);
