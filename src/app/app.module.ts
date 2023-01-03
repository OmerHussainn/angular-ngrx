import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { StoreModule } from '@ngrx/store';
import { messageReducer } from './messages/store/reducer/message.reducer';
import { Messageffects } from './messages/store/effects/message.effects';
import { EffectsModule } from "@ngrx/effects";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    StoreModule.forRoot({
      message: messageReducer,
    }),
    EffectsModule.forRoot([Messageffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
