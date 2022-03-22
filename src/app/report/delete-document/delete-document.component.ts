import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentInfo, DocumentInfoEntity } from 'src/app/models/document-info.model';
import { DocumentService } from 'src/app/services/document.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-delete-document',
  templateUrl: './delete-document.component.html',
  styleUrls: ['./delete-document.component.scss']
})
export class DeleteDocumentComponent implements OnInit {

  submitting = false;

  documentInfo = new DocumentInfoEntity;

  constructor(
    public activeModal: NgbActiveModal,
    private documentService: DocumentService,
    private toast: ToastService
  ) { }

  ngOnInit() {
  }

  deleteDoc() {
    this.submitting = true;
    this.documentService.deleteDocument(this.documentInfo.id).subscribe(resp => {
      this.submitting = false;
      if(typeof(resp) == 'string') {
        this.toast.error(resp);
      } else {
        this.toast.success("Deleted Successfully", "Deleted");
        this.activeModal.close();
      }
      
    }, err => {
      this.submitting = false;
      this.toast.error("Error Occurred");
      console.log(err);
    })
  }

}
