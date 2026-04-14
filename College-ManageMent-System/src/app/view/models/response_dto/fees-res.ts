export interface FeesRes {
    id: number;
    transactionId: string;
    category: string;
    totalAmount: number;
    amountPaid: number;
    dueDate: string; // ISO date
    paymentMode: string;
    paymentStatus: "PAID" | "PENDING" | "FAILED";
    studentName: string;
    studentRollNo: string;
}
