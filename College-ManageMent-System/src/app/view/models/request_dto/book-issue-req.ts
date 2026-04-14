export interface BookIssueReq {
    bookId: number;
    memberId: number;
    issueDate: string; // ISO date
    dueDate: string; // ISO date
    returnDate: string; // ISO date
    fineAmount: number;
    isReturned: boolean;
}
