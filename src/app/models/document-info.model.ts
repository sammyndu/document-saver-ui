export class DocumentInfo {
    id!: number;
    documentId: string = '';
    documentName: string = '';
    documentContent: string = '';
}

export class DocumentInfoEntity {
    id!: number;
    documentId: string = '';
    documentName: string = '';
    documentContent: string = '';
    dateSubmitted!: Date;
    dateModified!: Date;
}