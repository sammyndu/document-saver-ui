import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DocumentInfoEntity } from '../models/document-info.model';
import { SearchDocument } from '../models/search-document.model';
import { DocumentService } from '../services/document.service';
import { ToastService } from '../services/toast.service';
import { DeleteDocumentComponent } from './delete-document/delete-document.component';
import { UpdateDocumentComponent } from './update-document/update-document.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  
  search = new SearchDocument;
  submitting = false;
  loading = false;
  searchError = false;

  docs: DocumentInfoEntity[] = [];

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {
    processing: true,
    order: [[3, "desc"]],
    ordering: true
  };
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private documentService: DocumentService,
    private toast: ToastService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    // this.dtOptions = {
     
    // }
    this.getDocs();
  }

  getDocs(rerender = false) {
    this.loading = true;
    return this.documentService.getDocuments().subscribe(res => {
      this.loading = false;
      console.log(res);
      
      this.docs = res;
      // for(let i = 0; i < this.docs.length; i++) {
      //   this.docs[i].documentContent = this.sanitizer.bypassSecurityTrustUrl(this.docs[i].documentContent).toString();
      // }
      rerender ? this.rerender() : this.dtTrigger.next(true);
    }, err => {
      this.loading = false;
      console.log(err);
    });
  }

  safeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  searchDocument(form: NgForm) {
    console.log("here", this.search);
    //this.searchError = false;
    
    if(this.search.date != null || this.search.documentId != "" || this.search.documentName != "") {
      this.submitting = true;
      this.documentService.searchDocument(this.search).subscribe(res => {
        this.submitting = false;
        this.docs = res;
        this.rerender();
      }, err => {
        this.submitting = false;
        console.log(err);
      })
    }
    else {
      //this.searchError = true;
      this.toast.error("Enter a search input", "Nothing to search");
    }
  }

  updateDocument(id: number){
    const modalRef = this.modalService.open(UpdateDocumentComponent, { size: 'md', backdropClass: "modal-backdrop"});
    modalRef.componentInstance.documentInfo = this.docs.find(x => x.id === id) ?? new DocumentInfoEntity;
    modalRef.result.then(() => {
      this.getDocs(true);
      //this.rerender();
    })
  }

  deleteDocument(id: number) {
    const modalRef = this.modalService.open(DeleteDocumentComponent, { size: 'md'});
    modalRef.componentInstance.documentInfo = this.docs.find(x => x.id === id) ?? new DocumentInfoEntity;
    modalRef.result.then(() => {
      this.getDocs(true);
      //this.rerender();
    })
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(true);
    });
  }

}
