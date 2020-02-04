import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { QueryService } from './services/query.service';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { AlertifyService } from './services/alertify.service';
import { DashboardService } from './services/dashboard.service';
import { MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    
    ChartsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    FormsModule
  ],
  providers: [QueryService, AlertifyService, DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
