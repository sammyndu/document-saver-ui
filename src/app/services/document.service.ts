import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DocumentInfo } from '../models/document-info.model';
import { Observable } from 'rxjs';
import { SearchDocument } from '../models/search-document.model';

@Injectable()
export class DocumentService {

    apiBaseUrl: string

    constructor(private http: HttpClient) {
        this.apiBaseUrl = environment.baseURI;
    }

    addDocument(data: DocumentInfo): Observable<any>  {
    //     const formData = new FormData(); 
        
    //   // Store form name as "file" with file data
    //   formData.append("documentId", data.documentId);

    //   formData.append("documentName", data.documentName);

    //   formData.append("documentContent", data.documentContent);
        
    //   // Make http post request over api
    //   // with formData as req
    //   return this.http.post(this.baseApiUrl, formData)

        return this.http.post(this.apiBaseUrl, data);
    }

    getDocuments(): Observable<any[]> {
        return this.http.get<any>(this.apiBaseUrl);
    }

    getDocument(id: number): Observable<any>  {
        return this.http.get(`${this.apiBaseUrl}/${id}`);
    }

    updateDocument(id: number, data: DocumentInfo): Observable<any>  {
        return this.http.put(this.apiBaseUrl, data);
    }

    deleteDocument(id: number): Observable<any>  {
        return this.http.delete(`${this.apiBaseUrl}/${id}`);
    }

    searchDocument(data: SearchDocument): Observable<any>  {
    
        return this.http.post(`${this.apiBaseUrl}/search`, data);
    }
    

}
