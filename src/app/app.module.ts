import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasterLayoutComponent } from './master-layout/master-layout.component';
import { DocumentService } from './services/document.service';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { ReportComponent } from './report/report.component';
import { DataTablesModule } from 'angular-datatables';
import { DeleteDocumentComponent } from './report/delete-document/delete-document.component';
import { UpdateDocumentComponent } from './report/update-document/update-document.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  declarations: [				
    AppComponent,
      MasterLayoutComponent,
      UploadDocumentComponent,
      ReportComponent,
      UpdateDocumentComponent,
      DeleteDocumentComponent,
      SignInComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    DataTablesModule,
    NgbModule
  ],
  providers: [
    DocumentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
