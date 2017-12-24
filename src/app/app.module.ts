import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { ArticleComponent }  from './article.component';
import { ArticleService } from './article.service';
import {HttpClientModule} from "@angular/common/http";
import {DataTablesModule} from "angular-datatables";

@NgModule({
  imports: [
        BrowserModule,
    HttpClientModule,
		ReactiveFormsModule,
    DataTablesModule
  ],
  declarations: [
        AppComponent,
		ArticleComponent
  ],
  providers: [
        ArticleService
  ],
  bootstrap: [
        AppComponent
  ]
})
export class AppModule { }
