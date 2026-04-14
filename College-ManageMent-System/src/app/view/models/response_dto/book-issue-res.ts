export interface BookIssueRes {
    id: number;
    bookTitle: string;
    memberName: string;
    issueDate: string; // ISO date
    dueDate: string; // ISO date
    returnDate: string; // ISO date
    fineAmount: number;
    isReturned: boolean;
}
