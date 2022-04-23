import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReadComponent } from './read/read.component';

import { HttpClientModule } from '@angular/common/http';
import { EmployeeServiceService } from './employee-service.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent, ReadComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule  ],
  providers: [EmployeeServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
