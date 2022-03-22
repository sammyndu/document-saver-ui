import { SignInComponent } from './sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterLayoutComponent } from './master-layout/master-layout.component';
import { ReportComponent } from './report/report.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';

const routes: Routes = [
  {
    path: '',
    component: SignInComponent
  }, 
  {
    
    path: '',
    component: MasterLayoutComponent,
    children: [
      {
        path: 'upload',
        component: UploadDocumentComponent
      }, 
      {
        path: 'report',
        component: ReportComponent
      }
    ]
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
