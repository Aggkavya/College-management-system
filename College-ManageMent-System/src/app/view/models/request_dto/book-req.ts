export interface BookReq {
    title: string;
    author: string;
    isbn: string;
    publisher: string;
    edition: number;
    totalCopies: number;
    availableCopies: number;
    category: string;
    shelfLocation: string;
    libraryId: number;
}
