import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AgmCoreModule} from '@agm/core';
import { AppComponent } from './app.component';

import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyC-33MVa7guH_QmpoeU9bbkzJNhApWoZXw'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
