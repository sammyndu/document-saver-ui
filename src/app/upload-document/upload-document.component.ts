import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DocumentInfo } from '../models/document-info.model';
import { DocumentService } from '../services/document.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {

  file!: File;
  fileString = '';

  submitting = false;

  documentInfo = new DocumentInfo;

  constructor(
    private documentService: DocumentService,
    private toast: ToastService) { }

  ngOnInit() {
  }

  getFile(event: any) {
    this.file = event.target?.files[0];
  }

  async addDocument(form: NgForm) {
    
    if(form.valid) {
      this.submitting = true
      const data = await this.readBase64(this.file);
      this.documentInfo.documentContent = data;
        this.documentService.addDocument(this.documentInfo).subscribe(resp => {
          this.submitting = false;
          console.log(resp);
          if(typeof(resp) == 'string') {
            this.toast.error(resp);
          } else {
            this.toast.success("Document added successfully.", "Added");
            form.resetForm();
            this.documentInfo = new DocumentInfo;
            this.fileString = '';
          }
          console.log(resp);
        }, err => {
          this.submitting = false;
          console.log(err);
        })
      }
    //   this.readBase64(this.file).then((data) => {
        
  }

  private readBase64(file: any): Promise<any> {
    const reader = new FileReader();
    const future = new Promise((resolve, reject) => {
      reader.addEventListener('load', function () {
        resolve(reader.result);
      }, false);
      reader.addEventListener('error', function (event) {
        reject(event);
      }, false);
    
      reader.readAsDataURL(file);
    });
    return future;
  }

}
