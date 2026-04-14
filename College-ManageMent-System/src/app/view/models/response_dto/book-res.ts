export interface BookRes {
    id: number;
    title: string;
    author: string;
    isbn: string;
    publisher: string;
    edition: number;
    totalCopies: number;
    availableCopies: number;
    category: string;
    shelfLocation: string;
    libraryName: string;
}
